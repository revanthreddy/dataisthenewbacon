//****************************************
// CheckBox Model
// National Instruments Copyright 2015
//****************************************

NationalInstruments.HtmlVI.CheckBoxModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.BooleanControlModel.call(this, id);

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.checkBoxModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.CheckBoxModel.prototype;
        proto.checkBoxModelMethods = function () {
        };

        proto.getDOMType = function () {
            return 'div';
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.CheckBoxModel, NationalInstruments.HtmlVI.BooleanControlModel);