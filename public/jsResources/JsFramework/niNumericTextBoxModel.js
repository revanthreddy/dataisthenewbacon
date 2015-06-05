//****************************************
// Numeric TextBox Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.NumericTextBoxModel = function(id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.NumericControlModel.call(this, id);

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.numericTextBoxModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.NumericTextBoxModel.prototype;
        proto.numericTextBoxModelMethods = function () {
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.NumericTextBoxModel, NationalInstruments.HtmlVI.NumericControlModel);