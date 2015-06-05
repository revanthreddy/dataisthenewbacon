//****************************************
// Visual Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.VisualModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualComponentModel.call(this, id);
    this.top = '0px';
    this.left = '0px';
    this.right = '0px';
    this.bottom = '0px';
    this.width = '100px';
    this.height = '100px';
    this.readOnly = true;
    this.foreground = '#000000';
    this.fontSize = '20px';
    this.fontFamily = 'sans-serif';
    
    this.leftGuideline = '';
    this.rightGuideline = '';
    this.topGuideline = '';
    this.bottomGuideline = '';

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.visualModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.VisualModel.prototype;
        proto.visualModelMethods = function () {
        };

        proto.setTop = function (top) {
            this.top = top;
        };

        proto.getTop = function () {
            return this.top;
        };

        proto.setLeft = function (left) {
            this.left = left;
        };

        proto.getLeft = function () {
            return this.left;
        };

        proto.setPosition = function (top, left) {
            this.top = top;
            this.left = left;
        };

        proto.setWidth = function (width) {
            this.width = width;
        };

        proto.getWidth = function () {
            return this.width;
        };

        proto.setHeight = function (height) {
            this.height = height;
        };

        proto.getHeight = function () {
            return this.height;
        };

        proto.setSize = function (width, height) {
            this.width = width;
            this.height = height;
        };
        
         proto.setRight = function (right) {
            this.right = right;
        };

        proto.getRight = function () {
            return this.right;
        };

        proto.setBottom = function (bottom) {
            this.bottom = bottom;
        };

        proto.getBottom = function () {
            return this.bottom;
        };

        proto.setReadOnly = function (readOnly) {
            this.readOnly = readOnly;
        };

        proto.getReadOnly = function () {
            return this.readOnly;
        };

        proto.setForeground = function (foreground) {
            this.foreground = foreground;
        };

        proto.getForeground = function () {
            return this.foreground;
        };

        proto.setFontSize = function (fontSize) {
            this.fontSize = fontSize;
        };

        proto.getFontSize = function () {
            return this.fontSize;
        };

        proto.setFontFamily = function (fontFamily) {
            this.fontFamily = fontFamily;
        };

        proto.getFontFamily = function () {
            return this.fontFamily;
        };
        
        proto.updateModelFromDataSource = function (settings) {
            // Update the model
            for (var name in settings) {
                if (settings.hasOwnProperty(name)) {
                    this.setProperty(name, settings);
                    if (settings.hasOwnProperty(name)) {
                        this[name] = settings[name];
                    }
                }
            }
        };

        proto.getDOMType = function () {
            return 'div';
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.VisualModel, NationalInstruments.HtmlVI.VisualComponentModel);
