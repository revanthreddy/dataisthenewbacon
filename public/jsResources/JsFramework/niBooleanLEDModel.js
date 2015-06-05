//****************************************
// Boolean Button Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.BooleanLEDModelShapeEnum = Object.freeze({
    ROUND:      'Round',
    SQUARE:     'Square'
});

NationalInstruments.HtmlVI.BooleanLEDModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.BooleanContentControlModel.call(this, id);
    this.shape = NationalInstruments.HtmlVI.BooleanLEDModelShapeEnum.ROUND;

    // Prevent Closing on Constructor Properties
    id = undefined;
    
    // Methods
    if (typeof this.BooleanLEDModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.BooleanLEDModel.prototype;
        proto.BooleanLEDModelMethods = function () {
        };

        proto.getShape = function () {
            return this.shape;
        };

        proto.setShape = function (shape) {
            this.shape = shape;
        };

        proto.getDOMType = function () {
            return 'input';
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.BooleanLEDModel, NationalInstruments.HtmlVI.BooleanContentControlModel);