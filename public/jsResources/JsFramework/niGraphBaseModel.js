//****************************************
// Graph Base Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.GraphBaseModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualModel.call(this, id);

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.graphBaseModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.GraphBaseModel.prototype;
        proto.graphBaseModelMethods = function () {
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.GraphBaseModel, NationalInstruments.HtmlVI.VisualModel);