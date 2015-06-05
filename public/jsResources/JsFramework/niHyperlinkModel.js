//****************************************
// Hyperlink Model
// National Instruments Copyright 2015
//****************************************

NationalInstruments.HtmlVI.HyperlinkModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualModel.call(this, id);
    this.href = '';
    this.content = '';

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.hyperlinkModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.HyperlinkModel.prototype;
        proto.hyperlinkModelMethods = function () {
        };

        proto.getDOMType = function () {
            return 'a';
        };

        proto.setHRef = function (href) {
            this.href = href;
        };

        proto.getHRef = function () {
            return this.href;
        };

        proto.setContent = function (content) {
            this.content = content;
        };

        proto.getContent = function () {
            return this.content;
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.HyperlinkModel, NationalInstruments.HtmlVI.VisualModel);