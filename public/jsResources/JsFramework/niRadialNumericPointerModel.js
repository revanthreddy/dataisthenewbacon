//****************************************
// Radial Numeric Pointer Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.RadialNumericPointerModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.NumericPointerModel.call(this, id);

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.radialNumericPointerModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.RadialNumericPointerModel.prototype;
        proto.radialNumericPointerModelMethods = function () {
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.RadialNumericPointerModel, NationalInstruments.HtmlVI.NumericPointerModel);
