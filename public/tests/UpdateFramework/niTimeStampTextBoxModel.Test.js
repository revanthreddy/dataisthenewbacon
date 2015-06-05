//****************************************
// Tests for TimeStampTextBoxModel class
// National Instruments Copyright 2015
//****************************************

describe('A TimeStampTextBoxModel', function () {
    'use strict';
    var controlModel;
    var id = 'testId';
    var top = 100;
    var left = 200;
    var width = 300;
    var height = 400;
    var visible = true;
    var value = 3376663199;
    var value2 = 2714018400;
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
            value: value,
            configuration: configuration
        };
        otherSettings = {
            top: top + 1,
            left: left + 1,
            width: width + 1,
            height: height + 1,
            visible: !visible,
            value: value2,
            configuration: { controlSetting: 2 }
        };
        controlModel = new NationalInstruments.HtmlVI.TimeStampTextBoxModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    it('allows to set and get the value property', function () {
        controlModel.setValue(value);
        expect(controlModel.getValue()).toEqual(value);
    });
    
    it('allows to set and get the readOnly property', function () {
        controlModel.setReadOnly(true);
        expect(controlModel.getReadOnly()).toEqual(true);
        controlModel.setReadOnly(false);
        expect(controlModel.getReadOnly()).toEqual(false);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the timeStampTextBoxModelMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.timeStampTextBoxModelMethods();
    });

    it('allows to call the initializeModel method to update the configuration property', function () {
        controlModel.initializeModel(completeSettings);
        var localConfiguration = controlModel.getConfiguration();
        expect(localConfiguration.controlSetting).toEqual(configuration.controlSetting);
        expect(controlModel.getWidth()).toEqual(width);
        expect(controlModel.getHeight()).toEqual(height);
        expect(controlModel.getValue()).toEqual(value);
    });

    it('allows to call the updateModelFromDataSource method to update model properties', function () {
        controlModel.updateModelFromDataSource(otherSettings);
        expect(controlModel.getTop()).toEqual(otherSettings.top);
        expect(controlModel.getLeft()).toEqual(otherSettings.left);
        expect(controlModel.getWidth()).toEqual(otherSettings.width);
        expect(controlModel.getHeight()).toEqual(otherSettings.height);
        expect(controlModel.getValue()).toEqual(otherSettings.value);
        expect(controlModel.getConfiguration()).toEqual(otherSettings.configuration);
    });

    it('allows to call the printToConsole method', function () {
        controlModel.initializeModel(completeSettings);
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});