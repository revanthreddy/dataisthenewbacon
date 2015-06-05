//****************************************
// Cartesian Axis Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.PlotRendererModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualComponentModel.call(this, id);
    this.lineWidth = 1;
    this.pointSize = 1;
    this.pointColor = 'red';
    this.pointShape = 'square';
    this.lineStroke = 'black';

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.PlotRendererModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.PlotRendererModel.prototype;
        proto.PlotRendererModelMethods = function () {
        };

        proto.setLineWidth = function (width) {
            this.lineWidth = width;
        };

        proto.getLineWidth = function () {
            return this.lineWidth;
        };

        proto.setPointShape = function (shape) {
            this.pointShape = shape;
        };

        proto.getPointShape = function () {
            return this.pointShape;
        };

        proto.setPointSize = function (size) {
            this.pointSize = size;
        };

        proto.getPointSize = function () {
            return this.pointSize;
        };

        proto.setPointColor = function (color) {
            this.pointColor = color;
        };

        proto.getPointColor = function () {
            return this.pointColor;
        };

        proto.setLineStroke = function (color) {
            this.lineStroke = color;
        };

        proto.getLineStroke = function () {
            return this.lineStroke;
        };

        proto.setProperty = function (name, settings) {
            switch (name) {
                case 'rendererId':
                    break;
                default:
                    NationalInstruments.HtmlVI.VisualComponentModel.prototype.setProperty.call(this, name, settings);
                    break;
            }
        };

        proto.updateModelFromDataSource = function (settings) {
            // Update the model
            NationalInstruments.HtmlVI.VisualComponentModel.prototype.updateModelFromDataSource.call(this, settings);
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.PlotRendererModel, NationalInstruments.HtmlVI.VisualComponentModel);