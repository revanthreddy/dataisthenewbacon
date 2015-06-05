//****************************************
// Label Model
// National Instruments Copyright 2015
//****************************************

NationalInstruments.HtmlVI.LabelModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualModel.call(this, id);
    this.text = '';

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.labelModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.LabelModel.prototype;
        proto.labelModelMethods = function () {
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

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.LabelModel, NationalInstruments.HtmlVI.VisualModel);