//****************************************
// Visual View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.LinearNumericPointerViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.NumericPointerViewModel.call(this, element, model);

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.linearNumericPointerViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.LinearNumericPointerViewModel.prototype;
        proto.linearNumericPointerViewModelMethods = function () {
        };

        proto.modelPropertyChanged = function (changes) {
            var viewConfig = NationalInstruments.HtmlVI.NumericPointerViewModel.prototype.modelPropertyChanged.call(this, changes);
            var n = changes.length;
            for (var i = 0; i < n; i++) {
                switch (changes[i]) {
                    case 'orientation':
                        viewConfig.properties.orientation = this.model.getOrientation();
                        break;
                    default:
                        break;
                }
            }

            return viewConfig;
        };

        proto.updateModelSettingsFromElement = function (element) {
            var model = this.getModel();
            NationalInstruments.HtmlVI.NumericPointerViewModel.prototype.updateModelSettingsFromElement.call(this, element);
            model.orientation = element.orientation;
        };

        proto.applyModelSettings = function (settings) {
            var element = this.element;
            NationalInstruments.HtmlVI.NumericPointerViewModel.prototype.applyModelSettings.call(this, settings);
            if (settings.orientation !== undefined) {
                element.orientation = settings.orientation;
            }
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.LinearNumericPointerViewModel, NationalInstruments.HtmlVI.NumericPointerViewModel);
