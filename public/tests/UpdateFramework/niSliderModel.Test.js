//****************************************
// Tests for SliderModel class
// National Instruments Copyright 2014
//****************************************

describe('A SliderModel', function () {
    'use strict';
    var controlModel;
    var id = 'testId';
    var top = 100;
    var left = 200;
    var width = 300;
    var height = 400;
    var visible = true;
    var minimum = 500;
    var maximum = 600;
    var value = 700;
    var interval = 800;
    var decimalDigits = 900;
    var majorTicksVisible = true;
    var minorTicksVisible = true;
    var labelsVisible = true;
    var configuration = { controlSetting: 1 };
    var completeSettings = {};
    var otherSettings = {};

    beforeEach(function () {
        completeSettings = {
            top: top,
            left: left,
            width: width,
            height: height,
            visible: visible,
            minimum: minimum,
            maximum: maximum,
            value: value,
            interval: interval,
            decimalDigits: decimalDigits,
            majorTicksVisible: majorTicksVisible,
            minorTicksVisible: minorTicksVisible,
            labelsVisible: labelsVisible,
            configuration: configuration
        };
        otherSettings = {
            top: top + 1,
            left: left + 1,
            width: width + 1,
            height: height + 1,
            visible: !visible,
            minimum: minimum + 1,
            maximum: maximum + 1,
            value: value + 1,
            decimalDigits: decimalDigits + 1,
            majorTicksVisible: !majorTicksVisible,
            minorTicksVisible: !minorTicksVisible,
            labelsVisible: !labelsVisible,
            configuration: { controlSetting: 2 }
        };
        controlModel = new NationalInstruments.HtmlVI.SliderModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the sliderModelMethods  method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.sliderModelMethods();
    });

    it('allows to call the initializeModel method to update the configuration property', function () {
        controlModel.initializeModel(completeSettings);
        var localConfiguration = controlModel.getConfiguration();
        expect(localConfiguration.controlSetting).toEqual(1);
        expect(controlModel.getWidth()).toEqual(width);
        expect(controlModel.getHeight()).toEqual(height);
        expect(controlModel.getMaximum()).toEqual(maximum);
        expect(controlModel.getMinimum()).toEqual(minimum);
        expect(controlModel.getValue()).toEqual(value);
        expect(controlModel.getDecimalDigits()).toEqual(decimalDigits);
        expect(controlModel.getMajorTicksVisible()).toEqual(majorTicksVisible);
        expect(controlModel.getMinorTicksVisible()).toEqual(minorTicksVisible);
        expect(controlModel.getLabelsVisible()).toEqual(labelsVisible);        
    });

    it('allows to call the updateModelFromDataSource method to update model properties', function () {
        controlModel.updateModelFromDataSource(otherSettings);
        expect(controlModel.getTop()).toEqual(otherSettings.top);
        expect(controlModel.getLeft()).toEqual(otherSettings.left);
        expect(controlModel.getWidth()).toEqual(otherSettings.width);
        expect(controlModel.getHeight()).toEqual(otherSettings.height);
        expect(controlModel.getMaximum()).toEqual(otherSettings.maximum);
        expect(controlModel.getMinimum()).toEqual(otherSettings.minimum);
        expect(controlModel.getValue()).toEqual(otherSettings.value);
        expect(controlModel.getDecimalDigits()).toEqual(otherSettings.decimalDigits);
        expect(controlModel.getMajorTicksVisible()).toEqual(otherSettings.majorTicksVisible);
        expect(controlModel.getMinorTicksVisible()).toEqual(otherSettings.minorTicksVisible);
        expect(controlModel.getLabelsVisible()).toEqual(otherSettings.labelsVisible);
        expect(controlModel.getConfiguration()).toEqual(otherSettings.configuration);
    });

    it('allows to call the printToConsole method', function () {
        controlModel.initializeModel(completeSettings);
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});