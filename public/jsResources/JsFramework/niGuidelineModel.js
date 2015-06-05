//****************************************
// Visual Model
// National Instruments Copyright 2015
//****************************************

NationalInstruments.HtmlVI.GuidelinePositions = Object.freeze({
    TOP : 'topGuideline',
    LEFT: 'leftGuideline',
    BOTTOM: 'bottomGuideline',
    RIGHT: 'rightGuideline'
});

NationalInstruments.HtmlVI.GuidelineModel = function (id, horizontal, percentage, startMargin, endMargin) {
    'use strict';
    // Properties
    this.id = id;
    this.percentage = percentage;
    this.startMargin = startMargin;
    this.endMargin = endMargin;
    this.horizontal = horizontal;

    // Prevent Closing on Constructor Properties
    id = horizontal = percentage = startMargin = endMargin = undefined;

    // Methods
    if (typeof this.GuidelineModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.GuidelineModel.prototype;
        proto.GuidelineModelMethods = function () {};

        proto.setId = function (id) {
            this.id = id;
        };

        proto.getId = function () {
            return this.id;
        };

        proto.setPercentage = function (percentage) {
            this.percentage = percentage;
        };
        
        proto.getPercentage = function() {
            return this.percentage;
        };
        
        proto.setStartMargin = function(startMargin) {
            this.startMargin = startMargin;
        };
        
        proto.getStartMargin = function() {
            return this.startMargin;   
        };
        
        proto.setEndMargin = function(endMargin) {
            this.endMargin = endMargin;
        };
        
        proto.getEndMargin = function() {
            return this.endMargin;   
        };

    }
};