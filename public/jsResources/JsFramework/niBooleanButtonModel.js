//****************************************
// Boolean Button Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.BooleanButtonModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.BooleanControlModel.call(this, id);

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.booleanButtonModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.BooleanButtonModel.prototype;
        proto.booleanButtonModelMethods = function () {
        };

        proto.getDOMType = function () {
            return 'input';
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.BooleanButtonModel, NationalInstruments.HtmlVI.BooleanControlModel);