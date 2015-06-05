//****************************************
// CartesianPlot View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.CartesianPlotViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualComponentViewModel.call(this, element, model);
    this.renderer = null;

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.CartesianPlotViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.CartesianPlotViewModel.prototype;
        proto.CartesianPlotViewModelMethods = function () {
        };

        proto.componentAdded = function (type, component) {
            this.renderer = component;
        };

        proto.instantiate = function () {
            NationalInstruments.HtmlVI.VisualViewModel.prototype.instantiate.call(this);
            if (this.model instanceof Object && this.model.getRenderer() instanceof Object) {
                var viewModel = this.model.getRoot().findViewModel(this.model.getRenderer().getId());
                viewModel.setOwner(this);
                this.renderer = viewModel;
            }
        };

        proto.getViewConfig = function () {
            var viewConfig = {};
            if (this.renderer !== null) {
                viewConfig.renderer = this.renderer.getViewConfig();
            }

            return viewConfig;
        };

        proto.modelPropertyChanged = function (changes) {
            var viewConfig = NationalInstruments.HtmlVI.VisualComponentViewModel.prototype.modelPropertyChanged.call(this, changes);
            var n = changes.length;
            for (var i = 0; i < n; i++) {
                switch (changes[i]) {
                    case 'xaxis':
                        viewConfig.other.xaxis = this.model.getXAxis();
                        break;
                    case 'yaxis':
                        viewConfig.other.yaxis = this.model.getYAxis();
                        break;
                    case 'renderer':
                        viewConfig.other.renderer = this.model.getRenderer();
                        break;
                    default:
                        break;
                }
            }

            if ($.isEmptyObject(viewConfig.other)) {
                return;
            }

            this.notifyComponentChanged(viewConfig);
        };

        proto.componentChanged = function (viewConfig) {
            this.notifyComponentChanged(viewConfig);
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.CartesianPlotViewModel, NationalInstruments.HtmlVI.VisualComponentViewModel);
