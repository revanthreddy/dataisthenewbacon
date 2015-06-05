//****************************************
// CartesianGraph View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.CartesianGraphViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualViewModel.call(this, element, model);
    this.axes = [];
    this.plots = [];
    this.cursors = [];
    this.value = [];
    this.axesObserver = null;
    this.plotsObserver = null;
    this.cursorsObserver = null;
    this.graph = null;

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.cartesianGraphViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.CartesianGraphViewModel.prototype;
        proto.cartesianGraphViewModelMethods = function () {
        };
        proto.createGraphData = function (plotConfig, data) {
            var defaultSampleCartesianGraphData = [
                [[0, 1], [10, 100], [20, 50], [30, 150], [40, 100], [50, 200]],
                [[0, 10], [10, 110], [20, 60], [30, 160], [40, 110], [50, 210]],
                [[0, 40], [10, 140], [20, 90], [30, 190], [40, 140], [50, 240]],
                [[0, 80], [10, 180], [20, 100], [30, 220], [40, 180], [50, 280]]
            ];

            var graphdata = data.length > 0 ? data : defaultSampleCartesianGraphData[0];
            var cartesianGraphData = [
                {
                    data: graphdata,
                    color: plotConfig.renderer.color
                }];

            return cartesianGraphData;
        };

        proto.getDataRange = function (data, getX) {
            var i;
            var index = getX ? 0 : 1;
            var max = -Infinity;
            var min = Infinity;
            for (i = 0; i < data.length; i++) {
                if (data[i][index] > max) {
                    max = data[i][index];
                }
                if (data[i][index] < min) {
                    min = data[i][index];
                }
            }

            return { min: min, max: max};
        };

        proto.updateData = function () {
            var plotConfig = { renderer: { color: '#ff0000', lineWidth: 1 } };
            if (this.plots.length > 0) {
                plotConfig = this.plots[0].getViewConfig();
            }
            this.graph.setData(this.createGraphData(plotConfig, this.value));
            this.graph.draw();
        };

        proto.getCartesianGraphSettings = function(plotConfig) {
            var settings = {
                lines: {
                    show: true,
                    lineWidth: plotConfig.renderer.lineWidth
                },
                canvas: true,
                series: {
                    shadowSize: 0, // Drawing is faster without shadows
                    downsample: {
                        threshold: 1000
                    }
                },
                axisLabels: {
                    show: true
                },
                xaxes: [
                    {}
                ],
                yaxes: [
                    {}
                ]
                };

            return settings;
        };

        proto.getCursorSettings = function (settings, data) {
            var i, xaxis = null, yaxis = null, x, y, range;
            for (i = 0; i < this.axes.length; i++) {
                var a = this.axes[i];
                var viewConfig = a.getViewConfig();
                if (viewConfig.position && ((viewConfig.position === 'left') || (viewConfig.position === 'right')) && yaxis === null) {
                    yaxis = a;
                }

                if (viewConfig.position && ((viewConfig.position === 'top') || (viewConfig.position === 'bottom')) && xaxis === null) {
                    xaxis = a;
                }
            }
            if (xaxis.model.getAutoScale() === false) {
                x = (xaxis.model.getMaximum() - xaxis.model.getMinimum()) / 2;
            }
            else {
                range = this.getDataRange(data, true);
                x = (range.max - range.min) / 2;
            }

            if (yaxis.model.getAutoScale() === false) {
                y = (yaxis.model.getMaximum() - yaxis.model.getMinimum()) / 2;
            }
            else {
                range = this.getDataRange(data, false);
                y = (range.max - range.min) / 2;
            }

            settings.cursors = [];
            for (i = 0; i < this.cursors.length; i++) {
                settings.cursors.push(this.cursors[i].getViewConfig());
                settings.cursors[i].position = { x: x, y: y };
            }
        };

        proto.configureGraph = function (plotConfig, data) {
            var axes = this.axes;
            var i;
            var cartesianGraphSettings = this.getCartesianGraphSettings(plotConfig);
            // Apply Settings from host
            cartesianGraphSettings.xaxes = [];
            cartesianGraphSettings.yaxes = [];

            for (i = 0; i < axes.length; i++) {
                var a = axes[i];
                var viewConfig = a.getViewConfig();
                if (viewConfig.position && ((viewConfig.position === 'left') || (viewConfig.position === 'right'))) {
                    cartesianGraphSettings.yaxes.push(viewConfig);
                }

                if (viewConfig.position && ((viewConfig.position === 'top') || (viewConfig.position === 'bottom'))) {
                    cartesianGraphSettings.xaxes.push(viewConfig);
                }
            }

            if (this.cursors.length > 0) {
                this.getCursorSettings(cartesianGraphSettings, data);
            }

            return cartesianGraphSettings;
        };

        proto.instantiate = function () {
            var i;
            NationalInstruments.HtmlVI.VisualViewModel.prototype.instantiate.call(this);
            if (this.model instanceof Object) {
                // hook up component viewmodels
                var viewModel;
                var axes = this.model.getAxes();
                for (i = 0; i < axes.length; i++) {
                    viewModel = this.model.getRoot().findViewModel(axes[i].getId());
                    viewModel.setOwner(this);
                    this.axes.push(viewModel);
                }
                var plots = this.model.getPlots();
                for (i = 0; i < plots.length; i++) {
                    viewModel = this.model.getRoot().findViewModel(plots[i].getId());
                    viewModel.setOwner(this);
                    this.plots.push(viewModel);
                }
                var cursors = this.model.getCursors();
                for (i = 0; i < cursors.length; i++) {
                    viewModel = this.model.getRoot().findViewModel(cursors[i].getId());
                    viewModel.setOwner(this);
                    this.cursors.push(viewModel);
                }
                this.value = this.model.getValue();
                var plotConfig = { renderer: { color: '#ff0000', lineWidth: 1 } };
                if (this.plots.length > 0) {
                    plotConfig = this.plots[0].getViewConfig();
                }
                var cartesianGraphData = this.createGraphData(plotConfig, this.value);
                var cartesianGraphSettings = this.configureGraph(plotConfig, cartesianGraphData[0].data);
                this.graph = $.plot('#' + this.model.getId(), cartesianGraphData, cartesianGraphSettings);
                $('#' + this.model.getId()).data('chart', this.graph);
            }
            else {
                var errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNABLE_TO_CREATE_CONTROL,
                    this.model.getId(), this.model.getKind());
                throw new Error(errorMessage);
            }
        };

        proto.modelPropertyChanged = function (changes) {
            var viewConfig = NationalInstruments.HtmlVI.VisualViewModel.prototype.modelPropertyChanged.call(this, changes);
            var viewModel = null;
            var axes = null;
            var plots = null;
            var cursors = null;
            var i, j;
            var graphChanged = false;
            var dataChanged = false;
            var n = changes.length;
            for (i = 0; i < n; i++) {
                switch (changes[i]) {
                    case 'axes':
                        this.axes.length = 0;
                        axes = this.model.getAxes();
                        for (j = 0; j < axes.length; j++)
                        {
                            viewModel = this.model.getRoot().findViewModel(axes[i].getId());
                            viewModel.setOwner(this);
                            this.axes.push(viewModel);
                        }
                        graphChanged = true;
                        break;
                    case 'plots':
                        this.plots.length = 0;
                        plots = this.model.getPlots();
                        for (j = 0; j < plots.length; j++) {
                            viewModel = this.model.getRoot().findViewModel(plots[i].getId());
                            viewModel.setOwner(this);
                            this.plots.push(viewModel);
                        }
                        graphChanged = true;
                        break;
                    case 'cursors':
                        this.cursors.length = 0;
                        cursors = this.model.getCursors();
                        for (j = 0; j < cursors.length; j++) {
                            viewModel = this.model.getRoot().findViewModel(cursors[i].getId());
                            viewModel.setOwner(this);
                            this.cursors.push(viewModel);
                        }
                        graphChanged = true;
                        break;
                    case 'value':
                        this.value = this.model.getValue();
                        dataChanged = true;
                        break;
                    default:
                        break;
                }
            }

            if (!$.isEmptyObject(viewConfig)) {
                this.applyElementChanges(viewConfig);
            }

            if (graphChanged) {
                this.updateGraphConfig();
            }

            if (dataChanged) {
                this.updateData();
            }
        };

        proto.updateGraphConfig = function () {
            this.value = this.model.getValue();
            var plotConfig = { renderer: { color: '#ff0000', lineWidth: 1 } };
            if (this.plots.length > 0) {
                plotConfig = this.plots[0].getViewConfig();
            }
            var cartesianGraphData = this.createGraphData(plotConfig, this.value);
            var cartesianGraphSettings = this.configureGraph(plotConfig, cartesianGraphData[0].data);
            this.graph = $.plot('#' + this.model.getId(), cartesianGraphData, cartesianGraphSettings);
            this.graph.draw();
        };

        proto.observe = function () {
            var that = this;
            NationalInstruments.HtmlVI.VisualViewModel.prototype.observe.call(this);
            this.axesObserver = new ArrayObserver(this.model.axes);
            this.axesObserver.open(function () {
                that.modelPropertyChanged(['axes']);
            });
            this.plotsObserver = new ArrayObserver(this.model.plots);
            this.plotsObserver.open(function () {
                that.modelPropertyChanged(['plots']);
            });
            this.cursorsObserver = new ArrayObserver(this.model.cursors);
            this.cursorsObserver.open(function () {
                that.modelPropertyChanged(['cursors']);
            });
        };

        proto.componentChanged = function () {
            this.updateGraphConfig();
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.CartesianGraphViewModel, NationalInstruments.HtmlVI.VisualViewModel);

