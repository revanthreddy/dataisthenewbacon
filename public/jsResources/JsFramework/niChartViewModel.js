//****************************************
// Chart View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.ChartViewModel = function (element, model) {
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
    this.chart = null;

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.chartViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.ChartViewModel.prototype;
        proto.chartViewModelMethods = function() {
        };

        proto.createChartData = function (plotConfig) {
            var cartesianChartData = [
                {
                    data: [],
                    color: plotConfig.renderer.color
                }];

            return cartesianChartData;
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

            return {
                min: min,
                max: max
            };
        };

        proto.getCartesianChartSettings = function (plotConfig) {
            var settings = {
                lines: {
                    show: true,
                    lineWidth: plotConfig.renderer.lineWidth
                },
                canvas: true,
                series: {
                    historyBuffer: this.model.historyBuffer,
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
            var i, xaxis = null,
                yaxis = null,
                x, y, range;
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
            } else {
                range = this.getDataRange(data, true);
                x = (range.max - range.min) / 2;
            }

            if (yaxis.model.getAutoScale() === false) {
                y = (yaxis.model.getMaximum() - yaxis.model.getMinimum()) / 2;
            } else {
                range = this.getDataRange(data, false);
                y = (range.max - range.min) / 2;
            }

            settings.cursors = [];
            for (i = 0; i < this.cursors.length; i++) {
                settings.cursors.push(this.cursors[i].getViewConfig());
            }
        };

        proto.configureChart = function (plotConfig, data) {
            var axes = this.axes;
            var i;
            var cartesianChartSettings = this.getCartesianChartSettings(plotConfig);
            // Apply Settings from host
            cartesianChartSettings.xaxes = [];
            cartesianChartSettings.yaxes = [];

            for (i = 0; i < axes.length; i++) {
                var a = axes[i];
                var viewConfig = a.getViewConfig();
                if (viewConfig.position && ((viewConfig.position === 'left') || (viewConfig.position === 'right'))) {
                    cartesianChartSettings.yaxes.push(viewConfig);
                }

                if (viewConfig.position && ((viewConfig.position === 'top') || (viewConfig.position === 'bottom'))) {
                    cartesianChartSettings.xaxes.push(viewConfig);
                }
            }

            if (this.cursors.length > 0) {
                this.getCursorSettings(cartesianChartSettings, data);
            }

            return cartesianChartSettings;
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
                var plotConfig = {
                    renderer: {
                        color: '#ff0000',
                        lineWidth: 1
                    }
                };
                if (this.plots.length > 0) {
                    plotConfig = this.plots[0].getViewConfig();
                }
                var cartesianChartData = this.createChartData(plotConfig);
                var cartesianChartSettings = this.configureChart(plotConfig, cartesianChartData[0].data);
                this.chart = $.plot('#' + this.model.getId(), cartesianChartData, cartesianChartSettings);
                $('#' + this.model.getId()).data('chart', this.chart);
            } else {
                var errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNABLE_TO_CREATE_CONTROL,
                    this.model.getId(), this.model.getKind());
                throw new Error(errorMessage);
            }
        };

        proto.modelPropertyChanged = function (changes) {
            var viewModel = null;
            var axes = null;
            var plots = null;
            var cursors = null;
            var i, j;
            var chartChanged = false;
            var viewConfig = NationalInstruments.HtmlVI.VisualViewModel.prototype.modelPropertyChanged.call(this, changes);
            var n = changes.length;
            for (i = 0; i < n; i++) {
                switch (changes[i]) {
                case 'axes':
                    this.axes.length = 0;
                    axes = this.model.getAxes();
                    for (j = 0; j < axes.length; j++) {
                        viewModel = this.model.getRoot().findViewModel(axes[i].getId());
                        viewModel.setOwner(this);
                        this.axes.push(viewModel);
                    }
                    chartChanged = true;
                    break;
                case 'plots':
                    this.plots.length = 0;
                    plots = this.model.getPlots();
                    for (j = 0; j < plots.length; j++) {
                        viewModel = this.model.getRoot().findViewModel(plots[i].getId());
                        viewModel.setOwner(this);
                        this.plots.push(viewModel);
                    }
                    chartChanged = true;
                    break;
                case 'cursors':
                    this.cursors.length = 0;
                    cursors = this.model.getCursors();
                    for (j = 0; j < cursors.length; j++) {
                        viewModel = this.model.getRoot().findViewModel(cursors[i].getId());
                        viewModel.setOwner(this);
                        this.cursors.push(viewModel);
                    }
                    chartChanged = true;
                    break;
                case 'DataSource':
                    break;
                default:
                    break;
                }
            }

            if ($.isEmptyObject(viewConfig) && chartChanged === false) {
                return;
            }

            if (chartChanged) {
                this.updateChartConfig();
            }
        };

        proto.updateChartConfig = function () {
            this.value = this.model.getValue();
            var plotConfig = {
                renderer: {
                    color: '#ff0000',
                    lineWidth: 1
                }
            };
            if (this.plots.length > 0) {
                plotConfig = this.plots[0].getViewConfig();
            }
            var cartesianChartData = this.createChartData(plotConfig);
            var cartesianChartSettings = this.configureChart(plotConfig, cartesianChartData[0].data);
            this.chart = $.plot('#' + this.model.getId(), cartesianChartData, cartesianChartSettings);
            this.chart.draw();
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
            this.updateChartConfig();
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.ChartViewModel, NationalInstruments.HtmlVI.VisualViewModel);