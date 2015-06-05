//****************************************
// Linear Numeric Pointer Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.LinearNumericPointerModel = function (id) {
    'use strict';
    // Properties
    this.orientation = 'horizontal';
    NationalInstruments.HtmlVI.NumericPointerModel.call(this, id);

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.linearNumericPointerModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.LinearNumericPointerModel.prototype;
        proto.linearNumericPointerModelMethods = function () {
        };
        proto.setOrientation = function (orientation) {
            this.orientation = orientation;
        };

        proto.getOrientation = function () {
            return this.orientation;
        };

    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.LinearNumericPointerModel, NationalInstruments.HtmlVI.NumericPointerModel);
