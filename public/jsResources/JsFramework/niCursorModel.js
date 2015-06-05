//****************************************
// Cartesian Axis Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.CursorModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualComponentModel.call(this, id);
    this.showLabel = true;
    this.showValue = true;
    this.cursorColor = 'black';
    this.targetShape = 'ellipse';
    this.cursorLabel = '';
    this.snapToData = false;
    this.crosshairStyle = 'both';

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.CursorModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.CursorModel.prototype;
        proto.CursorModelMethods = function () {
        };

        proto.setShowValue = function (show) {
            this.showValue = show;
        };

        proto.getShowValue = function () {
            return this.showValue;
        };

        proto.setShowLabel = function (show) {
            this.showLabel = show;
        };

        proto.getShowLabel = function () {
            return this.showLabel;
        };

        proto.setCursorLabel = function (label) {
            this.cursorLabel = label;
        };

        proto.getCursorLabel = function () {
            return this.cursorLabel;
        };

        proto.setCursorColor = function (color) {
            this.cursorColor = color;
        };

        proto.getCursorColor = function () {
            return this.cursorColor;
        };

        proto.setTargetShape = function (shape) {
            this.targetShape = shape;
        };

        proto.getTargetShape = function () {
            return this.targetShape;
        };

        proto.setSnapToData = function (snap) {
            this.snapToData = snap;
        };

        proto.getSnapToData = function () {
            return this.snapToData;
        };

        proto.setCrosshairStyle = function (style) {
            this.crosshairStyle = style;
        };

        proto.getCrosshairStyle = function () {
            return this.crosshairStyle;
        };

        proto.getPosition = function() {
            return this.position;
        };

        proto.setProperty = function (name, settings) {
            switch (name) {
                case 'show':
                    // TODO
                    break;
                case 'cursorId':
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

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.CursorModel, NationalInstruments.HtmlVI.VisualComponentModel);