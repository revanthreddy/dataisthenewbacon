//****************************************
// Progress Bar Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.ProgressBarModelOrientationEnum = Object.freeze({
    VERTICAL: 'Vertical',
    HORIZONTAL: 'Horizontal'
});

NationalInstruments.HtmlVI.ProgressBarModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualModel.call(this, id);
    this.minimum = 0;
    this.maximum = 10;
    this.orientation = NationalInstruments.HtmlVI.ProgressBarModelOrientationEnum.HORIZONTAL;
    this.value = 0;
    
    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.progressBarModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.ProgressBarModel.prototype;
        proto.progressBarModelMethods = function () {
        };

        // Methods
        proto.setMaximum = function (maximum) {
            this.maximum = maximum;
        };

        proto.getMaximum = function () {
            return this.maximum;
        };

        proto.setMinimum = function (minimum) {
            this.minimum = minimum;
        };

        proto.getMinimum = function () {
            return this.minimum;
        };

        proto.setValue = function (value) {
            this.value = value;
        };

        proto.getValue = function () {
            return this.value;
        };

        proto.setOrientation = function (orientation) {
            this.orientation = orientation;
        };

        proto.getOrientation = function () {
            return this.orientation;
        };
        
        proto.controlChanged = function () {
            if (this.rootOwner instanceof Object) {
                var propertyChange = { 'value': this.getValue() };
                this.rootOwner.controlChanged(this.getId(), this.getKind(), propertyChange);
            }
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.ProgressBarModel, NationalInstruments.HtmlVI.VisualModel);