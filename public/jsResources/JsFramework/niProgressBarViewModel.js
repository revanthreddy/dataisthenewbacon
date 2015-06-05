//****************************************
// Progress Bar View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.ProgressBarViewModel = function (element, model) {
    'use strict';

    // Properties
    NationalInstruments.HtmlVI.VisualViewModel.call(this, element, model);

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.progressBarViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.ProgressBarViewModel.prototype;
        proto.progressBarViewModelMethods = function () {
        };

        proto.modelPropertyChanged = function (changes) {
            var viewConfig = NationalInstruments.HtmlVI.VisualViewModel.prototype.modelPropertyChanged.call(this, changes);
            var n = changes.length;
            for (var i = 0; i < n; i++) {
                switch (changes[i]) {
                    case 'maximum':
                        if (this.model.getMaximum() !== null) {
                            viewConfig.properties.max = this.model.getMaximum();
                        }
                        break;
                    case 'minimum':
                        if (this.model.getMinimum() !== null) {
                            viewConfig.properties.min = this.model.getMinimum();
                        }
                        break;
                    case 'value':
                        if (this.model.getValue() !== null) {
                            viewConfig.properties.value = this.model.getValue();
                        }
                        break;
                    case 'orientation':
                        if (this.model.getOrientation() !== null) {
                            viewConfig.properties.orientation = this.model.getOrientation().toLowerCase();
                        }
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
            model.orientation = element.orientation;
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
            if (settings.orientation !== undefined) {
                element.orientation = settings.orientation;
            }
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.ProgressBarViewModel, NationalInstruments.HtmlVI.VisualViewModel);