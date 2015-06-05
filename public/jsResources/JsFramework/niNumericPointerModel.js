//****************************************
// Numeric Pointer Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.NumericPointerModel = function(id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.NumericControlModel.call(this, id);
    this.majorTicksVisible = true;
    this.minorTicksVisible = true;
    this.labelsVisible = true;

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.numericPointerModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.NumericPointerModel.prototype;
        proto.numericPointerModelMethods = function () {
        };

        proto.setMajorTicksVisible = function (majorTicksVisible) {
            this.majorTicksVisible = majorTicksVisible;
        };

        proto.getMajorTicksVisible = function () {
            return this.majorTicksVisible;
        };

        proto.setMinorTicksVisible = function (minorTicksVisible) {
            this.minorTicksVisible = minorTicksVisible;
        };

        proto.getMinorTicksVisible = function () {
            return this.minorTicksVisible;
        };

        proto.setLabelsVisible = function (labelsVisible) {
            this.labelsVisible = labelsVisible;
        };

        proto.getLabelsVisible = function () {
            return this.labelsVisible;
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.NumericPointerModel, NationalInstruments.HtmlVI.NumericControlModel);



