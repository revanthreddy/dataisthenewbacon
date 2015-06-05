//****************************************
// Tests for Cartesian Plot class
// National Instruments Copyright 2014
//****************************************

describe('A CartesianPlotModel', function () {
    'use strict';
    var controlModel;
    var id = 'testId';
    var xaxis = 'xaxis';
    var yaxis = 'yaxis';
    var renderer = 'renderer';
    var completeSettings = {};
    var otherSettings = {};

    beforeEach(function () {
        completeSettings = {
            xaxis: xaxis,
            yaxis: yaxis
        };
        otherSettings = {
            xaxis: xaxis + '1',
            yaxis: yaxis + '1'
        };
        controlModel = new NationalInstruments.HtmlVI.CartesianPlotModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    it('allows to set and get the xaxis property', function () {
        controlModel.setXAxis(xaxis);
        expect(controlModel.getXAxis()).toEqual(xaxis);
    });

    it('allows to set and get the yaxis property', function () {
        controlModel.setYAxis(yaxis);
        expect(controlModel.getYAxis()).toEqual(yaxis);
    });

    it('allows to set and get the renderer property', function () {
        controlModel.setRenderer(renderer);
        expect(controlModel.getRenderer()).toEqual(renderer);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the cartesianPlotModelMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.cartesianPlotModelMethods();
    });

    it('allows to call the initializeModel method to update the configuration property', function () {
        controlModel.initializeModel(completeSettings);
        expect(controlModel.getXAxis()).toEqual(xaxis);
        expect(controlModel.getYAxis()).toEqual(yaxis);
    });

    it('allows to call the updateModelFromDataSource method to update model properties', function () {
        controlModel.updateModelFromDataSource(otherSettings);
        expect(controlModel.getXAxis()).toEqual(otherSettings.xaxis);
        expect(controlModel.getYAxis()).toEqual(otherSettings.yaxis);
    });

    it('allows to call the printToConsole method', function () {
        controlModel.initializeModel(completeSettings);
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});