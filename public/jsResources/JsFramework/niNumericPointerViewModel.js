//****************************************
// Visual View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.NumericPointerViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.NumericControlViewModel.call(this, element, model);

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.numericPointerViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.NumericPointerViewModel.prototype;
        proto.numericPointerViewModelMethods = function () {
        };

        proto.modelPropertyChanged = function (changes) {
            // no specific view model config here
            return NationalInstruments.HtmlVI.NumericControlViewModel.prototype.modelPropertyChanged.call(this, changes);
        };

        proto.updateModelSettingsFromElement = function (element) {
            var model = this.getModel();
            NationalInstruments.HtmlVI.NumericControlViewModel.prototype.updateModelSettingsFromElement.call(this, element);
            model.majorTicksVisible = element.majorTicksVisible;
            model.minorTicksVisible = element.minorTicksVisible;
            model.labelsVisible = element.labelsVisible;
        };

        proto.applyModelSettings = function (settings) {
            var element = this.element;
            NationalInstruments.HtmlVI.NumericControlViewModel.prototype.applyModelSettings.call(this, settings);
            if (settings.majorTicksVisible !== undefined) {
                element.majorTicksVisible = settings.majorTicksVisible;
            }
            if (settings.minorTicksVisible !== undefined) {
                element.minorTicksVisible = settings.minorTicksVisible;
            }
            if (settings.labelsVisible !== undefined) {
                element.labelsVisible = settings.labelsVisible;
            }
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.NumericPointerViewModel, NationalInstruments.HtmlVI.NumericControlViewModel);
