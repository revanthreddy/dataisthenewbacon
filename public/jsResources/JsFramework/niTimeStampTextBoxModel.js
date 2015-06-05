//****************************************
// Time Stamp Text Box Model
// Note that all values are expeced in LV time units 
// (currently a number storing seconds since 1904, eventually also a number storing fractional seconds)
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.TimeStampTextBoxModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.NumericControlModel.call(this, id);

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.timeStampTextBoxModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.TimeStampTextBoxModel.prototype;
        proto.timeStampTextBoxModelMethods = function () {
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.TimeStampTextBoxModel, NationalInstruments.HtmlVI.NumericControlModel);