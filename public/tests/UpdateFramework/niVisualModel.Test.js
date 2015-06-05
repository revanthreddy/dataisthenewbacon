//****************************************
// Tests for VisualModel class
// National Instruments Copyright 2014
//****************************************

describe('A VisualModel', function () {
    'use strict';
    var controlModel;
    var id = 'testId';
    var top = 100;
    var left = 200;
    var width = 300;
    var height = 400;
    var readOnly = true;
    var foreground = '#0000FF';
    var fontSize = '20px';
    var fontFamily = 'Arial, sans-serif';
    var settings = {};
    var completeSettings = {};
    var otherSettings = {};

    beforeEach(function () {
        completeSettings = {
            top: top,
            left: left,
            width: width,
            height: height,
            readOnly: readOnly,
            foreground: foreground,
            fontSize: fontSize,
            fontFamily: fontFamily
        };
        otherSettings = {
            top: top + 1,
            left: left + 1,
            width: width + 1,
            height: height + 1,
            readOnly: !readOnly,
            foreground: '#FF0000',
            fontSize: '30px',
            fontFamily: 'serif'
        };
        settings = {};
        controlModel = new NationalInstruments.HtmlVI.VisualModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    it('allows to set and get the top property', function () {
        controlModel.setTop(top);
        expect(controlModel.getTop()).toEqual(top);
    });

    it('allows to set and get the left property', function () {
        controlModel.setLeft(left);
        expect(controlModel.getLeft()).toEqual(left);
    });

    it('allows to call the setPosition method to set the top and left properties', function () {
        controlModel.setPosition(top, left);
        expect(controlModel.getTop()).toEqual(top);
        expect(controlModel.getLeft()).toEqual(left);
    });

    it('allows to set and get the width property', function () {
        controlModel.setWidth(width);
        expect(controlModel.getWidth()).toEqual(width);
    });

    it('allows to set and get the height property', function () {
        controlModel.setHeight(height);
        expect(controlModel.getHeight()).toEqual(height);
    });

    it('allows to call the setSize method to set the width and height properties', function () {
        controlModel.setSize(width, height);
        expect(controlModel.getWidth()).toEqual(width);
        expect(controlModel.getHeight()).toEqual(height);
    });

    it('allows to set and get the readOnly property', function () {
        controlModel.setReadOnly(readOnly);
        expect(controlModel.getReadOnly()).toEqual(readOnly);
    });

    it('allows to set and get the foreground property', function () {
        controlModel.setForeground(foreground);
        expect(controlModel.getForeground()).toEqual(foreground);
    });

    it('allows to set and get the fontSize property', function () {
        controlModel.setFontSize(fontSize);
        expect(controlModel.getFontSize()).toEqual(fontSize);
    });

    it('allows to set and get the fontFamily property', function () {
        controlModel.setFontFamily(fontFamily);
        expect(controlModel.getFontFamily()).toEqual(fontFamily);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the visualModelMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.visualModelMethods();
    });

    it('allows to call the initializeModel method to update all the properties at the same time', function () {
        controlModel.initializeModel(completeSettings);
        expect(controlModel.getTop()).toEqual(top);
        expect(controlModel.getLeft()).toEqual(left);
        expect(controlModel.getWidth()).toEqual(width);
        expect(controlModel.getHeight()).toEqual(height);
        expect(controlModel.getReadOnly()).toEqual(readOnly);
        expect(controlModel.getForeground()).toEqual(foreground);
        expect(controlModel.getFontSize()).toEqual(fontSize);
        expect(controlModel.getFontFamily()).toEqual(fontFamily);
    });

    it('allows to call the initializeModel method with an unknown property', function () {
        controlModel.initializeModel(completeSettings);
        settings = {
            unknownProperty: 'someValue'
        };
        controlModel.initializeModel(settings);
        expect(controlModel.getTop()).toEqual(top);
        expect(controlModel.getLeft()).toEqual(left);
        expect(controlModel.getWidth()).toEqual(width);
        expect(controlModel.getHeight()).toEqual(height);
        expect(controlModel.getReadOnly()).toEqual(readOnly);
        expect(controlModel.getForeground()).toEqual(foreground);
        expect(controlModel.getFontSize()).toEqual(fontSize);
        expect(controlModel.getFontFamily()).toEqual(fontFamily);
    });

    it('allows to call the initializeModel method to update just one property without updating others', function () {
        controlModel.initializeModel(completeSettings);
        settings = {
            top: top * 2,
        };
        controlModel.initializeModel(settings);
        expect(controlModel.getTop()).toEqual(settings.top);
        expect(controlModel.getLeft()).toEqual(left);
        expect(controlModel.getWidth()).toEqual(width);
        expect(controlModel.getHeight()).toEqual(height);
        expect(controlModel.getReadOnly()).toEqual(readOnly);
        expect(controlModel.getForeground()).toEqual(foreground);
        expect(controlModel.getFontSize()).toEqual(fontSize);
        expect(controlModel.getFontFamily()).toEqual(fontFamily);
    });

    it('allows to call the updateModelFromDataSource method to update model properties', function () {
        controlModel.updateModelFromDataSource(otherSettings);
        expect(controlModel.getLeft()).toEqual(otherSettings.left);
        expect(controlModel.getTop()).toEqual(otherSettings.top);
        expect(controlModel.getWidth()).toEqual(otherSettings.width);
        expect(controlModel.getHeight()).toEqual(otherSettings.height);
        expect(controlModel.getReadOnly()).toEqual(otherSettings.readOnly);
        expect(controlModel.getForeground()).toEqual(otherSettings.foreground);
        expect(controlModel.getFontSize()).toEqual(otherSettings.fontSize);
        expect(controlModel.getFontFamily()).toEqual(otherSettings.fontFamily);
    });

    it('allows to call the printToConsole method', function () {
        controlModel.initializeModel(completeSettings);
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log).toHaveBeenCalledWith('top: 100');
        expect(console.log).toHaveBeenCalledWith('left: 200');
        expect(console.log).toHaveBeenCalledWith('width: 300');
        expect(console.log).toHaveBeenCalledWith('height: 400');
        expect(console.log).toHaveBeenCalledWith('readOnly: ' + readOnly);
        expect(console.log).toHaveBeenCalledWith('foreground: ' + foreground);
        expect(console.log).toHaveBeenCalledWith('fontSize: ' + fontSize);
        expect(console.log).toHaveBeenCalledWith('fontFamily: ' + fontFamily);
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});