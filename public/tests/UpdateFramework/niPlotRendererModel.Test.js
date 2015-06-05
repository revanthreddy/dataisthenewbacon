//****************************************
// Tests for Plot Renderer Model class
// National Instruments Copyright 2014
//****************************************

describe('A PlotRendererModel', function () {
    'use strict';
    var controlModel;
    var id = 'testId';
    var lineWidth = 100;
    var pointSize = 200;
    var pointColor = 'blue';
    var pointShape = 'circle';
    var lineStroke = 'black';
    var completeSettings = {};
    var otherSettings = {};

    beforeEach(function () {
        completeSettings = {
            lineWidth: lineWidth,
            pointSize: pointSize,
            pointColor: pointColor,
            pointShape: pointShape,
            lineStroke: lineStroke
        };
        otherSettings = {
            lineWidth: lineWidth + 1,
            pointSize: pointSize + 1,
            pointColor: pointColor + '1',
            pointShape: pointShape + '1',
            lineStroke: lineStroke + '1'
        };
        controlModel = new NationalInstruments.HtmlVI.PlotRendererModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    it('allows to set and get the autoScale property', function () {
        controlModel.setLineWidth(lineWidth);
        expect(controlModel.getLineWidth()).toEqual(lineWidth);
    });

    it('allows to set and get the max property', function () {
        controlModel.setPointShape(pointShape);
        expect(controlModel.getPointShape()).toEqual(pointShape);
    });

    it('allows to set and get the min property', function () {
        controlModel.setPointSize(pointSize);
        expect(controlModel.getPointSize()).toEqual(pointSize);
    });

    it('allows to set and get the position property', function () {
        controlModel.setPointColor(pointColor);
        expect(controlModel.getPointColor()).toEqual(pointColor);
    });

    it('allows to set and get the showLabel property', function () {
        controlModel.setLineStroke(lineStroke);
        expect(controlModel.getLineStroke()).toEqual(lineStroke);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the PlotRendererModelMethods  method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.PlotRendererModelMethods();
    });

    it('allows to call the initializeModel method to update the configuration property', function () {
        controlModel.initializeModel(completeSettings);
        expect(controlModel.getLineWidth()).toEqual(lineWidth);
        expect(controlModel.getPointShape()).toEqual(pointShape);
        expect(controlModel.getPointSize()).toEqual(pointSize);
        expect(controlModel.getPointColor()).toEqual(pointColor);
        expect(controlModel.getLineStroke()).toEqual(lineStroke);
    });

    it('allows to call the updateModelFromDataSource method to update model properties', function () {
        controlModel.updateModelFromDataSource(otherSettings);
        expect(controlModel.getLineWidth()).toEqual(otherSettings.lineWidth);
        expect(controlModel.getPointShape()).toEqual(otherSettings.pointShape);
        expect(controlModel.getPointSize()).toEqual(otherSettings.pointSize);
        expect(controlModel.getPointColor()).toEqual(otherSettings.pointColor);
        expect(controlModel.getLineStroke()).toEqual(otherSettings.lineStroke);
    });

    it('allows to call the printToConsole method', function () {
        controlModel.initializeModel(completeSettings);
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});