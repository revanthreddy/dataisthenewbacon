//****************************************
// Visual View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.RadialNumericPointerViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.NumericPointerViewModel.call(this, element, model);

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.radialNumericPointerViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.RadialNumericPointerViewModel.prototype;
        proto.radialNumericPointerViewModelMethods = function () {
        };

        proto.modelPropertyChanged = function (changes) {
            var viewConfig = NationalInstruments.HtmlVI.NumericPointerViewModel.prototype.modelPropertyChanged.call(this, changes);
            var n = changes.length;
            for (var i = 0; i < n; i++) {
                switch (changes[i]) {
                    case 'startAngle':
                        viewConfig.properties.startAngle = this.mode.startAngle;
                        break;
                    case 'endAngle':
                        viewConfig.properties.endAngle = this.mode.endAngle;
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
            model.StartAngle = this.StartAngle;
            model.EndAngle = this.EndAngle;
        };

        proto.applyModelSettings = function (settings) {
            var element = this.element;
            NationalInstruments.HtmlVI.NumericPointerViewModel.prototype.applyModelSettings.call(this, settings);
            if (settings.StartAngle !== undefined) {
                element.StartAngle = settings.StartAngle;
            }
            if (settings.EndAngle !== undefined) {
                element.EndAngle = settings.EndAngle;
            }
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.RadialNumericPointerViewModel, NationalInstruments.HtmlVI.NumericPointerViewModel);
