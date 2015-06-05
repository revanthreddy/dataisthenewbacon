//****************************************
// Numeric Control Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.NumericControlModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualModel.call(this, id);
    this.minimum = 0;
    this.maximum = 10;
    this.interval = 1;
    this.value = 0;
    this.decimalDigits = 0;
    this.precisionDigits = 1;

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.numericControlModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.NumericControlModel.prototype;
        proto.numericControlModelMethods = function () {
        };

        // Methods
        proto.setMaximum = function (maximum) {
            this.maximum = maximum;
        };

        proto.getMaximum = function () {
            return this.maximum;
        };

        proto.setMinimum = function (minimum) {
            this.minimum = minimum;
        };

        proto.getMinimum = function () {
            return this.minimum;
        };

        proto.setInterval = function (interval) {
            this.interval = interval;
        };

        proto.getInterval = function () {
            return this.interval;
        };

        proto.setValue = function (value) {
            this.value = value;
        };

        proto.getValue = function () {
            return this.value;
        };

        proto.setDecimalDigits = function (decimalDigits) {
            this.decimalDigits = decimalDigits;
        };

        proto.getDecimalDigits = function () {
            return this.decimalDigits;
        };

        proto.setPrecisionDigits = function (precisionDigits) {
            this.precisionDigits = precisionDigits;
            };

        proto.getPrecisionDigits = function () {
            return this.precisionDigits;
        };

        proto.controlChanged = function () {
            if (this.rootOwner instanceof Object) {
                var propertyChange = { 'value': this.getValue() };
                this.rootOwner.controlChanged(this.getId(), this.getKind(), propertyChange);
            }
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.NumericControlModel, NationalInstruments.HtmlVI.VisualModel);