//****************************************
// Boolean Control Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.BooleanContentControlModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.BooleanControlModel.call(this, id);
    this.trueContent = 'on';
    this.falseContent = 'off';

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.BooleanContentControlModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.BooleanContentControlModel.prototype;
        proto.BooleanContentControlModelMethods = function () {
        };

        proto.getTrueContent = function () {
            return this.trueContent;
        };

        proto.setTrueContent = function (trueContent) {
            this.trueContent = trueContent;
        };

        proto.getFalseContent = function () {
            return this.falseContent;
        };

        proto.setFalseContent = function (falseContent) {
            this.falseContent = falseContent;
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.BooleanContentControlModel, NationalInstruments.HtmlVI.BooleanControlModel);