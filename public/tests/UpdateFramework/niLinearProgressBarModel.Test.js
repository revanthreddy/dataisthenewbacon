//****************************************
// Tests for LinearProgressBarModel class
// National Instruments Copyright 2014
//****************************************

describe('A LinearProgressBar', function () {
    'use strict';
    var id = 'TestId';
    var controlModel;
    var top = 100;
    var left = 200;
    var width = 300;
    var height = 400;
    var orientation = NationalInstruments.HtmlVI.ProgressBarModelOrientationEnum.HORIZONTAL;
    var minimum = 0;
    var maximum = 100;
    var value = 50;
    var settings = {};
    var completeSettings = {};
    var otherSettings = {};

    beforeEach(function () {
        completeSettings = {
            top: top,
            left: left,
            width: width,
            height: height,
            orientation: orientation,
            minimum: minimum,
            maximum: maximum,
            value: value
        };
        otherSettings = {
            top: top + 1,
            left: left + 1,
            width: width + 1,
            height: height + 1,
            orientation: NationalInstruments.HtmlVI.ProgressBarModelOrientationEnum.VERTICAL,
            minimum: minimum + 1,
            maximum: maximum + 1,
            value: value
        };
        settings = {};
        controlModel = new NationalInstruments.HtmlVI.LinearProgressBarModel(id);
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
    it('allows to call the linearProgressBarModelMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.linearProgressBarModelMethods();
    });

    it('allows to call the initializeModel method to test setting properties all at once', function () {
        controlModel.initializeModel(completeSettings);
        expect(controlModel.getTop()).toEqual(top);
        expect(controlModel.getLeft()).toEqual(left);
        expect(controlModel.getWidth()).toEqual(width);
        expect(controlModel.getHeight()).toEqual(height);
        expect(controlModel.getOrientation()).toEqual(orientation);
        expect(controlModel.getMinimum()).toEqual(minimum);
        expect(controlModel.getMaximum()).toEqual(maximum);
        expect(controlModel.getValue()).toEqual(value);
    });

    it('allows to call the updateModelFromDataSource method to update model properties', function () {
        controlModel.updateModelFromDataSource(otherSettings);
        expect(controlModel.getTop()).toEqual(otherSettings.top);
        expect(controlModel.getLeft()).toEqual(otherSettings.left);
        expect(controlModel.getWidth()).toEqual(otherSettings.width);
        expect(controlModel.getHeight()).toEqual(otherSettings.height);
        expect(controlModel.getOrientation()).toEqual(otherSettings.orientation);
        expect(controlModel.getMaximum()).toEqual(otherSettings.maximum);
        expect(controlModel.getMinimum()).toEqual(otherSettings.minimum);
        expect(controlModel.getValue()).toEqual(otherSettings.value);
    });

    it('allows to call the printToConsole method', function () {
        controlModel.initializeModel(completeSettings);
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});