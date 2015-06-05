//****************************************
// Tests for ImageModel class
// National Instruments Copyright 2014
//****************************************

describe('An ImageModel', function () {
    'use strict';
    var controlModel;
    var id = 'testId';
    var top = 100;
    var left = 200;
    var width = 300;
    var height = 400;
    var visible = true;
    var source = 'source';
    var alternate = 'alternate';
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
            source: source,
            alternate: alternate,
            configuration: configuration
        };
        otherSettings = {
            top: top + 1,
            left: left + 1,
            width: width + 1,
            height: height + 1,
            source: source + ' other',
            alternate: alternate + ' other',
            configuration: { controlSetting: 2 }
        };
        controlModel = new NationalInstruments.HtmlVI.ImageModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    it('allows to set and get the source property', function () {
        controlModel.setSource(source);
        expect(controlModel.getSource()).toEqual(source);
    });

    it('allows to set and get the alternate property', function () {
        controlModel.setAlternate(alternate);
        expect(controlModel.getAlternate()).toEqual(alternate);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the imageModelMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.imageModelMethods();
    });

    it('allows to call the initializeModel method to update the configuration property', function () {
        controlModel.initializeModel(completeSettings);
        var localConfiguration = controlModel.getConfiguration();
        expect(localConfiguration.controlSetting).toEqual(1);
        expect(controlModel.getWidth()).toEqual(width);
        expect(controlModel.getHeight()).toEqual(height);
        expect(controlModel.getSource()).toEqual(source);
        expect(controlModel.getAlternate()).toEqual(alternate);
    });

    it('allows to call the updateModelFromDataSource method to update model properties', function () {
        controlModel.updateModelFromDataSource(otherSettings);
        expect(controlModel.getTop()).toEqual(otherSettings.top);
        expect(controlModel.getLeft()).toEqual(otherSettings.left);
        expect(controlModel.getWidth()).toEqual(otherSettings.width);
        expect(controlModel.getHeight()).toEqual(otherSettings.height);
        expect(controlModel.getSource()).toEqual(otherSettings.source);
        expect(controlModel.getAlternate()).toEqual(otherSettings.alternate);
    });

    it('allows to call the printToConsole method', function () {
        controlModel.initializeModel(completeSettings);
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});