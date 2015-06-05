//****************************************
// Slider Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.SliderModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.LinearNumericPointerModel.call(this, id);

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.sliderModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.SliderModel.prototype;
        proto.sliderModelMethods = function () {
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.SliderModel, NationalInstruments.HtmlVI.LinearNumericPointerModel);