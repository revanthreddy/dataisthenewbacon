//****************************************
// CartesianAxis View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.CartesianAxisViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualComponentViewModel.call(this, element, model);

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.CartesianAxisViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.CartesianAxisViewModel.prototype;
        proto.CartesianAxisViewModelMethods = function () {
        };

        proto.getViewConfig = function()
        {
            var axis = {};

            axis.position = this.model.getAxisPosition();

            if (this.model.getShowLabel()) {
                axis.axisLabel = this.model.getAxisLabel();
            }

            axis.autoScale = this.model.getAutoScale();
            if (!this.model.getAutoScale()) {
                axis.min = this.model.getMinimum();
                axis.max = this.model.getMaximum();
            }

            axis.mode = this.model.getMode();

            return axis;
        };

        proto.modelPropertyChanged = function (changes) {
            var viewConfig = NationalInstruments.HtmlVI.VisualComponentViewModel.prototype.modelPropertyChanged.call(this, changes);
            var n = changes.length;
            for (var i = 0; i < n; i++) {
                switch (changes[i]) {
                    case 'max':
                        if (this.model.getMaximum() !== null) {
                            viewConfig.other.max = this.model.getMaximum();
                        }
                        break;
                    case 'min':
                        if (this.model.getMinimum() !== null) {
                            viewConfig.other.min = this.model.getMinimum();
                        }
                        break;
                    case 'axisLabel':
                        if (this.model.getAxisLabel() !== null) {
                            viewConfig.other.axisLabel = this.model.getAxisLabel();
                        }
                        break;
                    case 'show':
                        break;
                    case 'showLabel': 
                        viewConfig.other.showLabel = this.model.getShowLabel();
                        break;
                    case 'axisposition':
                        break;
                    case 'autoScale':
                        viewConfig.other.autoScale = this.model.getAutoScale();
                        break;
                    case 'logScale':
                        viewConfig.other.mode = this.model.getMode();
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
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.CartesianAxisViewModel, NationalInstruments.HtmlVI.VisualComponentViewModel);