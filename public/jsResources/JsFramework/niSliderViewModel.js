//****************************************
// Slider View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.SliderViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.LinearNumericPointerViewModel.call(this, element, model);

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.sliderViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.SliderViewModel.prototype;
        proto.sliderViewModelMethods = function () {
        };

        proto.instantiate = undefined;
        proto.bindToView = function () {
            var that = this;
            NationalInstruments.HtmlVI.LinearNumericPointerViewModel.prototype.instantiate.call(this);
            if (this.model instanceof Object) {                
                var id = '#' + this.model.getId();

                $(id).on('value-changed', function (event) {
                    that.model.setValue(parseFloat(event.originalEvent.detail.value));
                    that.model.controlChanged();
                });
            }
            else {
                var errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNABLE_TO_CREATE_CONTROL,
                    this.model.getId(), this.model.getKind());
                throw new Error(errorMessage);
            }
        };

        proto.modelPropertyChanged = function (changes) {
            var viewConfig = NationalInstruments.HtmlVI.LinearNumericPointerViewModel.prototype.modelPropertyChanged.call(this, changes);
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

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.SliderViewModel, NationalInstruments.HtmlVI.LinearNumericPointerViewModel);
NationalInstruments.HtmlVI.Elements.NIElement.prototype.addProperty(NationalInstruments.HtmlVI.Elements.Slider.prototype, { propertyName: 'bindingInfo', defaultValue:'{}' });
