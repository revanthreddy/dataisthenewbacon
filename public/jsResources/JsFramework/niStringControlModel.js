//****************************************
// String Control Model
// National Instruments Copyright 2015
//****************************************

NationalInstruments.HtmlVI.StringControlModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualModel.call(this, id);
    this.text = '';

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.stringControlModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.StringControlModel.prototype;
        proto.stringControlModelMethods = function () {
        };

        proto.getDOMType = function () {
            return 'input';
        };

        proto.setText = function (text) {
            this.text = text;
        };

        proto.getText = function () {
            return this.text;
        };

        proto.controlChanged = function () {
            if (this.rootOwner instanceof Object) {
                var propertyChange = { 'text': this.getText() };
                this.rootOwner.controlChanged(this.getId(), this.getKind(), propertyChange);
            }
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.StringControlModel, NationalInstruments.HtmlVI.VisualModel);