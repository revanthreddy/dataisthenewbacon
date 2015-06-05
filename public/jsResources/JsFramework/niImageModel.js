//****************************************
// Image Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.ImageModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualModel.call(this, id);
    this.source = '';
    this.alternate = '';

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.imageModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.ImageModel.prototype;
        proto.imageModelMethods = function () {
        };

        proto.getDOMType = function () {
            return 'img';
        };

        proto.setSource = function (source) {
            this.source = source;
        };

        proto.getSource = function () {
            return this.source;
        };

        proto.setAlternate = function (alternate) {
            this.alternate = alternate;
        };

        proto.getAlternate = function () {
            return this.alternate;
        };

        proto.setProperty = function (name, settings) {
            switch (name) {
                case 'source':
                    this.setSource(settings.source);
                    break;
                case 'alternate':
                    this.setAlternate(settings.alternate);
                    break;
                default:
                    NationalInstruments.HtmlVI.VisualModel.prototype.setProperty.call(this, name, settings);
                    break;
            }
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.ImageModel, NationalInstruments.HtmlVI.VisualModel);