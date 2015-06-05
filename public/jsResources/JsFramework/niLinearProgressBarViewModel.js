//****************************************
// Linear Progress Bar View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.LinearProgressBarViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.ProgressBarViewModel.call(this, element, model);

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.linearProgressBarViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.LinearProgressBarViewModel.prototype;
        proto.linearProgressBarViewModelMethods = function () {
        };

        proto.instantiate = undefined;
        proto.bindToView = function () {
        };

        proto.modelPropertyChanged = function (changes) {
            var viewConfig = NationalInstruments.HtmlVI.ProgressBarViewModel.prototype.modelPropertyChanged.call(this, changes);
            var n = changes.length;
            for (var i = 0; i < n; i++) {
                switch (changes[i]) {
                    default:
                        break;
                }
            }

            if (!$.isEmptyObject(viewConfig.widget)) {
                viewConfig.properties.configuration = JSON.stringify(viewConfig.widget);
            }

            this.applyElementChanges(viewConfig);
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.LinearProgressBarViewModel, NationalInstruments.HtmlVI.ProgressBarViewModel);
NationalInstruments.HtmlVI.Elements.NIElement.prototype.addProperty(NationalInstruments.HtmlVI.Elements.LinearProgressBar.prototype, { propertyName: 'bindingInfo', defaultValue: '{}' });
