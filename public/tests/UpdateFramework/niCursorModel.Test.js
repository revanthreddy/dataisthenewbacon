//****************************************
// Tests for Cartesian Axis class
// National Instruments Copyright 2014
//****************************************

describe('A CursorModel', function () {
    'use strict';
    var controlModel;
    var id = 'testId';
    var showLabel = false;
    var showValue = false;
    var cursorColor = 'black';
    var targetShape = 'ellipse';
    var cursorLabel = '';
    var snapToData = false;
    var crosshairStyle = 'both';
    var completeSettings = {};
    var otherSettings = {};

    beforeEach(function () {
        completeSettings = {
            showLabel: showLabel,
            showValue: showValue,
            cursorColor: cursorColor,
            targetShape: targetShape,
            cursorLabel: cursorLabel,
            snapToData: snapToData,
            crosshairStyle: crosshairStyle,
        };
        otherSettings = {
            showLabel: !showLabel,
            showValue: !showValue,
            cursorColor: 'red',
            targetShape: 'square',
            cursorLabel: 'cursor',
            snapToData: !snapToData,
            crosshairStyle: 'none',
        };
        controlModel = new NationalInstruments.HtmlVI.CursorModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    it('allows to set and get the showLabel property', function () {
        controlModel.setShowLabel(showLabel);
        expect(controlModel.getShowLabel()).toEqual(showLabel);
    });

    it('allows to set and get the showValue property', function () {
        controlModel.setShowValue(showValue);
        expect(controlModel.getShowValue()).toEqual(showValue);
    });

    it('allows to set and get the cursorColor property', function () {
        controlModel.setCursorColor(cursorColor);
        expect(controlModel.getCursorColor()).toEqual(cursorColor);
    });

    it('allows to set and get the targetShape property', function () {
        controlModel.setTargetShape(targetShape);
        expect(controlModel.getTargetShape()).toEqual(targetShape);
    });

    it('allows to set and get the cursorLabel property', function () {
        controlModel.setCursorLabel(cursorLabel);
        expect(controlModel.getCursorLabel()).toEqual(cursorLabel);
    });

    it('allows to set and get the snapToData property', function () {
        controlModel.setSnapToData(snapToData);
        expect(controlModel.getSnapToData()).toEqual(snapToData);
    });

    it('allows to set and get the crosshairStyle property', function () {
        controlModel.setCrosshairStyle(crosshairStyle);
        expect(controlModel.getCrosshairStyle()).toEqual(crosshairStyle);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the initializeModel method to update the configuration property', function () {
        controlModel.initializeModel(completeSettings);
        expect(controlModel.getShowLabel()).toEqual(showLabel);
        expect(controlModel.getShowValue()).toEqual(showValue);
        expect(controlModel.getCursorColor()).toEqual(cursorColor);
        expect(controlModel.getTargetShape()).toEqual(targetShape);
        expect(controlModel.getCursorLabel()).toEqual(cursorLabel);
        expect(controlModel.getSnapToData()).toEqual(snapToData);
        expect(controlModel.getCrosshairStyle()).toEqual(crosshairStyle);
    });

    it('allows to call the updateModelFromDataSource method to update model properties', function () {
        controlModel.updateModelFromDataSource(otherSettings);
        expect(controlModel.getShowLabel()).toEqual(otherSettings.showLabel);
        expect(controlModel.getShowValue()).toEqual(otherSettings.showValue);
        expect(controlModel.getCursorColor()).toEqual(otherSettings.cursorColor);
        expect(controlModel.getTargetShape()).toEqual(otherSettings.targetShape);
        expect(controlModel.getCursorLabel()).toEqual(otherSettings.cursorLabel);
        expect(controlModel.getSnapToData()).toEqual(otherSettings.snapToData);
        expect(controlModel.getCrosshairStyle()).toEqual(otherSettings.crosshairStyle);
    });

    it('allows to call the printToConsole method', function () {
        controlModel.initializeModel(completeSettings);
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});