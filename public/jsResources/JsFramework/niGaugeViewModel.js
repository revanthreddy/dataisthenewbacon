//****************************************
// Gauge View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.GaugeViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.RadialNumericPointerViewModel.call(this, element, model);

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.gaugeViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.GaugeViewModel.prototype;
        proto.gaugeViewModelMethods = function () {
        };

        proto.instantiate = undefined;
        proto.bindToView = function () {
            var that = this;
            NationalInstruments.HtmlVI.RadialNumericPointerViewModel.prototype.instantiate.call(this);
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
            var viewConfig = NationalInstruments.HtmlVI.RadialNumericPointerViewModel.prototype.modelPropertyChanged.call(this, changes);
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

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.GaugeViewModel, NationalInstruments.HtmlVI.RadialNumericPointerViewModel);
NationalInstruments.HtmlVI.Elements.NIElement.prototype.addProperty(NationalInstruments.HtmlVI.Elements.Gauge.prototype, { propertyName: 'bindingInfo', defaultValue: '{}' });
