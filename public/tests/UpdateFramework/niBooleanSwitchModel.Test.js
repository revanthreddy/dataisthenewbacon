//****************************************
// Tests for BooleanSwitchModel class
// National Instruments Copyright 2015
//****************************************

describe('A BooleanSwitchModel', function () {
    'use strict';
    var controlModel;
    var id = 'testId';
    var top = 100;
    var left = 200;
    var width = 300;
    var height = 400;
    var visible = true;
    var value = true;
    var contentVisible = false;
    var content = 'booleanSwitchButton';
    var trueContent = 'on';
    var falseContent = 'off';
    var shape = 'slider';
    var orientation = 'vertical';
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
            contentVisible: contentVisible,
            content: content,
            trueContent: trueContent,
            falseContent: falseContent,
            shape: shape,
            orientation: orientation,
            configuration: configuration
        };
        otherSettings = {
            top: top + 1,
            left: left + 1,
            width: width + 1,
            height: height + 1,
            visible: !visible,
            value: !value,
            contentVisible: !contentVisible,
            content: content + 'other',
            trueContent: trueContent + 'other',
            falseContent: falseContent + 'other',
            shape: shape + 'other',
            orientation: orientation + 'other',
            configuration: { controlSetting: 2 }
        };
        controlModel = new NationalInstruments.HtmlVI.BooleanSwitchModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    it('allows to set and get the shape property', function () {
        controlModel.setShape(shape);
        expect(controlModel.getShape()).toEqual(shape);
    });

    it('allows to set and get the orientation property', function () {
        controlModel.setOrientation(orientation);
        expect(controlModel.getOrientation()).toEqual(orientation);
    });
    
    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the booleanSwitchModelMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.booleanSwitchModelMethods();
    });

    it('allows to call the initializeModel method to update the configuration property', function () {
        controlModel.initializeModel(completeSettings);
        expect(controlModel.getTop()).toEqual(completeSettings.top);
        expect(controlModel.getLeft()).toEqual(completeSettings.left);
        expect(controlModel.getWidth()).toEqual(completeSettings.width);
        expect(controlModel.getHeight()).toEqual(completeSettings.height);
        expect(controlModel.getValue()).toEqual(completeSettings.value);
        expect(controlModel.getContentVisible()).toEqual(completeSettings.contentVisible);
        expect(controlModel.getContent()).toEqual(completeSettings.content);
        expect(controlModel.getTrueContent()).toEqual(completeSettings.trueContent);
        expect(controlModel.getFalseContent()).toEqual(completeSettings.falseContent);
        expect(controlModel.getShape()).toEqual(completeSettings.shape);
        expect(controlModel.getOrientation()).toEqual(completeSettings.orientation);
        expect(controlModel.getConfiguration()).toEqual(configuration);
    });

    it('allows to call the updateModelFromDataSource method to update model properties', function () {
        controlModel.updateModelFromDataSource(otherSettings);
        expect(controlModel.getTop()).toEqual(otherSettings.top);
        expect(controlModel.getLeft()).toEqual(otherSettings.left);
        expect(controlModel.getWidth()).toEqual(otherSettings.width);
        expect(controlModel.getHeight()).toEqual(otherSettings.height);
        expect(controlModel.getValue()).toEqual(otherSettings.value);
        expect(controlModel.getContentVisible()).toEqual(otherSettings.contentVisible);
        expect(controlModel.getContent()).toEqual(otherSettings.content);
        expect(controlModel.getTrueContent()).toEqual(otherSettings.trueContent);
        expect(controlModel.getFalseContent()).toEqual(otherSettings.falseContent);
        expect(controlModel.getShape()).toEqual(otherSettings.shape);
        expect(controlModel.getOrientation()).toEqual(otherSettings.orientation);
        expect(controlModel.getConfiguration()).toEqual(otherSettings.configuration);
    });

    it('allows to call the printToConsole method', function () {
        controlModel.initializeModel(completeSettings);
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});