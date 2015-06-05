//****************************************
// Boolean Switch Model
// National Instruments Copyright 2015
//****************************************

NationalInstruments.HtmlVI.BooleanSwitchModelOrientationEnum = Object.freeze({
    VERTICAL:      'Vertical',
    HORIZONTAL:    'Horizontal'
});

NationalInstruments.HtmlVI.BooleanSwitchModelShapeEnum = Object.freeze({
    SLIDER:     'Slider',
    ROUND:      'Round',
    POWER:      'Power'
});

NationalInstruments.HtmlVI.BooleanSwitchModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.BooleanContentControlModel.call(this, id);
    this.shape = NationalInstruments.HtmlVI.BooleanSwitchModelShapeEnum.SLIDER;
    this.orientation = NationalInstruments.HtmlVI.BooleanSwitchModelOrientationEnum.HORIZONTAL;

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.booleanSwitchModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.BooleanSwitchModel.prototype;
        proto.booleanSwitchModelMethods = function () {
        };

        proto.getDOMType = function () {
            return 'div';
        };

        proto.getShape = function () {
            return this.shape;
        };

        proto.setShape = function (shape) {
            this.shape = shape;
        };

        proto.getOrientation = function () {
            return this.orientation;
        };

        proto.setOrientation = function (orientation) {
            this.orientation = orientation;
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.BooleanSwitchModel, NationalInstruments.HtmlVI.BooleanContentControlModel);