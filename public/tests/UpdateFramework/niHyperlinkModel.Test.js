//****************************************
// Tests for HyperlinkModel class
// National Instruments Copyright 2015
//****************************************

describe('A HyperlinkModel', function () {
    'use strict';
    var controlModel;
    var id = 'testId';
    var top = 100;
    var left = 200;
    var width = 300;
    var height = 400;
    var visible = true;
    var href = 'href';
    var content = 'content';
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
            href: href,
            content: content,
            configuration: configuration
        };

        otherSettings = {
            top: top + 1,
            left: left + 1,
            width: width + 1,
            height: height + 1,
            href: href + ' other',
            content: content + ' other',
            configuration: { controlSetting: 2 }
        };

        controlModel = new NationalInstruments.HtmlVI.HyperlinkModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    it('allows to set and get the href property', function () {
        controlModel.setHRef(href);
        expect(controlModel.getHRef()).toEqual(href);
    });

    it('allows to set and get the content property', function () {
        controlModel.setContent(content);
        expect(controlModel.getContent()).toEqual(content);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the hyperlinkModelMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.hyperlinkModelMethods();
    });

    it('allows to call the initializeModel method to update the configuration property', function () {
        controlModel.initializeModel(completeSettings);
        var localConfiguration = controlModel.getConfiguration();
        expect(localConfiguration.controlSetting).toEqual(completeSettings.configuration.controlSetting);
        expect(controlModel.getWidth()).toEqual(completeSettings.width);
        expect(controlModel.getHeight()).toEqual(completeSettings.height);
        expect(controlModel.getHRef()).toEqual(completeSettings.href);
        expect(controlModel.getContent()).toEqual(completeSettings.content);
    });

    it('allows to call the updateModelFromDataSource method to update model properties', function () {
        controlModel.updateModelFromDataSource(otherSettings);
        expect(controlModel.getTop()).toEqual(otherSettings.top);
        expect(controlModel.getLeft()).toEqual(otherSettings.left);
        expect(controlModel.getWidth()).toEqual(otherSettings.width);
        expect(controlModel.getHeight()).toEqual(otherSettings.height);
        expect(controlModel.getHRef()).toEqual(otherSettings.href);
        expect(controlModel.getContent()).toEqual(otherSettings.content);
    });

    it('allows to call the printToConsole method', function () {
        controlModel.initializeModel(completeSettings);
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});