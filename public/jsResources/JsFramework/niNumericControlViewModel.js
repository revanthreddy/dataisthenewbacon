//****************************************
// Visual View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.NumericControlViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualViewModel.call(this, element, model);

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.numericControlViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.NumericControlViewModel.prototype;
        proto.numericControlViewModelMethods = function () {
        };

        proto.modelPropertyChanged = function (changes) {
            var viewConfig = NationalInstruments.HtmlVI.VisualViewModel.prototype.modelPropertyChanged.call(this, changes);
            var n = changes.length;
            for (var i = 0; i < n; i++) {
                switch (changes[i]) {
                    case 'maximum':
                        if (this.model.getMaximum() !== null) {
                            viewConfig.properties.maximum = this.model.getMaximum();
                        }
                        break;
                    case 'minimum':
                        if (this.model.getMinimum() !== null) {
                            viewConfig.properties.minimum = this.model.getMinimum();
                        }
                        break;
                    case 'interval':
                        if (this.model.getInterval() !== null) {
                            viewConfig.properties.interval = this.model.getInterval();
                        }
                        break;
                    case 'value':
                        viewConfig.properties.value = this.model.getValue();
                        break;
                    default:
                        break;
                }
            }

            return viewConfig;
        };

        proto.updateModelSettingsFromElement = function (element) {
            var model = this.getModel();
            NationalInstruments.HtmlVI.VisualViewModel.prototype.updateModelSettingsFromElement.call(this, element);
            model.value = element.value;
            model.maximum = element.maximum;
            model.minimum = element.minimum;
            model.interval = element.interval;
        };

        proto.applyModelSettings = function (settings) {
            var element = this.element;
            NationalInstruments.HtmlVI.VisualViewModel.prototype.applyModelSettings.call(this, settings);
            if (settings.value !== undefined) {
                element.valueNonSignaling = settings.value;
            }
            if (settings.maximum !== undefined) {
                element.maximum = settings.maximum;
            }
            if (settings.minimum !== undefined) {
                element.minimum = settings.minimum;
            }
            if (settings.interval !== undefined) {
                element.interval = settings.interval;
            }
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.NumericControlViewModel, NationalInstruments.HtmlVI.VisualViewModel);
