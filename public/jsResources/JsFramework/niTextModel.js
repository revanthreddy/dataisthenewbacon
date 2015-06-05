//****************************************
// Text Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.TextModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualModel.call(this, id);
    this.text = '';

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.textModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.TextModel.prototype;
        proto.textModelMethods = function () {
        };

        proto.getDOMType = function () {
            return 'pre';
        };

        proto.setText = function (text) {
            this.text = text;
        };

        proto.getText = function () {
            return this.text;
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.TextModel, NationalInstruments.HtmlVI.VisualModel);