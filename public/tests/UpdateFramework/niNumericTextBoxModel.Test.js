//****************************************
// Tests for NumericTextBoxModel class
// National Instruments Copyright 2014
//****************************************

describe('A NumericTextBoxModel', function () {
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
    var interval = 700;
    var value = 800;
    var decimalDigits = 900;
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
            interval: interval,
            value: value,
            decimalDigits: decimalDigits,
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
            interval: interval + 1,
            value: value + 1,
            decimalDigits: decimalDigits + 1,
            configuration: { controlSetting: 2 }
        };
        controlModel = new NationalInstruments.HtmlVI.NumericTextBoxModel(id);
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
    it('allows to call the numericTextBoxModelMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.numericTextBoxModelMethods();
    });

    it('allows to call the initializeModel method to update the configuration property', function () {
        controlModel.initializeModel(completeSettings);
        expect(controlModel.getConfiguration()).toEqual({
            controlSetting: 1
        });
    });

    it('allows to call the updateModelFromDataSource method to update model properties', function () {
        controlModel.updateModelFromDataSource(otherSettings);
        expect(controlModel.getTop()).toEqual(otherSettings.top);
        expect(controlModel.getLeft()).toEqual(otherSettings.left);
        expect(controlModel.getWidth()).toEqual(otherSettings.width);
        expect(controlModel.getHeight()).toEqual(otherSettings.height);
        expect(controlModel.getMaximum()).toEqual(otherSettings.maximum);
        expect(controlModel.getMinimum()).toEqual(otherSettings.minimum);
        expect(controlModel.getInterval()).toEqual(otherSettings.interval);
        expect(controlModel.getValue()).toEqual(otherSettings.value);
        expect(controlModel.getDecimalDigits()).toEqual(otherSettings.decimalDigits);
        expect(controlModel.getConfiguration()).toEqual(otherSettings.configuration);
    });

    it('allows to call the printToConsole method', function () {
        controlModel.initializeModel(completeSettings);
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});