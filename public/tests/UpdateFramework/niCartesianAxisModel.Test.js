//****************************************
// Tests for Cartesian Axis class
// National Instruments Copyright 2014
//****************************************

describe('A CartesianAxisModel', function () {
    'use strict';
    var controlModel;
    var id = 'testId';
    var max = 100;
    var min = 200;
    var axisposition = 'right';
    var showLabel = false;
    var axisLabel = 'none';
    var mode = 'log';
    var autoScale = true;
    var completeSettings = {};
    var otherSettings = {};

    beforeEach(function () {
        completeSettings = {
            max: max,
            min: min,
            axisposition: axisposition,
            showLabel: showLabel,
            logScale: true,
            axisLabel: axisLabel,
            mode: mode,
            autoScale: autoScale
        };
        otherSettings = {
            max: max + 1,
            min: min + 1,
            axisposition: axisposition + '1',
            showLabel: !showLabel,
            logScale: false,
            axisLabel: axisLabel + '1',
            mode: mode + '1',
            autoScale: !autoScale
        };
        controlModel = new NationalInstruments.HtmlVI.CartesianAxisModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    it('allows to set and get the autoScale property', function () {
        controlModel.setAutoScale(autoScale);
        expect(controlModel.getAutoScale()).toEqual(autoScale);
    });

    it('allows to set and get the max property', function () {
        controlModel.setMaximum(max);
        expect(controlModel.getMaximum()).toEqual(max);
    });

    it('allows to set and get the min property', function () {
        controlModel.setMinimum(min);
        expect(controlModel.getMinimum()).toEqual(min);
    });

    it('allows to set and get the position property', function () {
        controlModel.setAxisPosition(axisposition);
        expect(controlModel.getAxisPosition()).toEqual(axisposition);
    });

    it('allows to set and get the showLabel property', function () {
        controlModel.setShowLabel(showLabel);
        expect(controlModel.getShowLabel()).toEqual(showLabel);
    });

    it('allows to set and get the axisLabel property', function () {
        controlModel.setAxisLabel(axisLabel);
        expect(controlModel.getAxisLabel()).toEqual(axisLabel);
    });

    it('allows to set and get the mode property', function () {
        controlModel.setMode(mode);
        expect(controlModel.getMode()).toEqual(mode);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the cartesianAxisModelMethods  method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.cartesianAxisModelMethods();
    });

    it('allows to call the initializeModel method to update the configuration property', function () {
        controlModel.initializeModel(completeSettings);
        expect(controlModel.getAutoScale()).toEqual(autoScale);
        expect(controlModel.getMaximum()).toEqual(max);
        expect(controlModel.getMinimum()).toEqual(min);
        expect(controlModel.getAxisPosition()).toEqual(axisposition);
        expect(controlModel.getShowLabel()).toEqual(showLabel);
        expect(controlModel.getAxisLabel()).toEqual(axisLabel);
        expect(controlModel.getMode()).toEqual(mode);
    });

    it('allows to call the updateModelFromDataSource method to update model properties', function () {
        controlModel.updateModelFromDataSource(otherSettings);
        expect(controlModel.getAutoScale()).toEqual(otherSettings.autoScale);
        expect(controlModel.getMaximum()).toEqual(otherSettings.max);
        expect(controlModel.getMinimum()).toEqual(otherSettings.min);
        expect(controlModel.getAxisPosition()).toEqual(otherSettings.axisposition);
        expect(controlModel.getShowLabel()).toEqual(otherSettings.showLabel);
        expect(controlModel.getAxisLabel()).toEqual(otherSettings.axisLabel);
        expect(controlModel.getMode()).toEqual(otherSettings.mode);
    });

    it('allows to call the printToConsole method', function () {
        controlModel.initializeModel(completeSettings);
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});