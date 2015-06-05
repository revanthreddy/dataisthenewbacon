//****************************************
// Gauge Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.GaugeModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.RadialNumericPointerModel.call(this, id);

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.gaugeModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.GaugeModel.prototype;
        proto.gaugeModelMethods = function () {
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.GaugeModel, NationalInstruments.HtmlVI.RadialNumericPointerModel);