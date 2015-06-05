//****************************************
// Tests for CartesianGraphModel class
// National Instruments Copyright 2014
//****************************************

describe('A CartesianGraphModel', function () {
    'use strict';
    var controlModel;
    var id = 'testId';
    var axisId = 'axisId';
    var plotId = 'plotsId';
    var cursorId = 'cursorId';
    var axes = [{ id: axisId }];
    var plots = [{ id: plotId }];
    var cursors = [{ id: cursorId }];
    var value = 'value';

    beforeEach(function () {
        controlModel = new NationalInstruments.HtmlVI.CartesianGraphModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    it('allows to set and get the axes property', function () {
        var frontPanel = {
            addFrontPanelControlToParent: function (model, settings) {
                expect(settings.id).toEqual(axisId);
                return settings;
            },
            getOwner: function() { return null; }
        };
        controlModel.setOwner(frontPanel);
        controlModel.setAxes(axes);        
        expect(controlModel.getAxes()).toEqual(axes);
    });

    it('allows to set and get the plots property', function () {
        var frontPanel = {
            addFrontPanelControlToParent: function (model, settings) {
                expect(settings.id).toEqual(plotId);
                return settings;
            },
            getOwner: function () { return null; }
        };
        controlModel.setOwner(frontPanel);
        controlModel.setPlots(plots);
        expect(controlModel.getPlots()).toEqual(plots);
    });

    it('allows to set and get the cursors property', function () {
        var frontPanel = {
            addFrontPanelControlToParent: function (model, settings) {
                expect(settings.id).toEqual(cursorId);
                return settings;
            },
            getOwner: function () { return null; }
        };
        controlModel.setOwner(frontPanel);
        controlModel.setCursors(cursors);
        expect(controlModel.getCursors()).toEqual(cursors);
    });

    it('allows to set and get the value property', function () {
        controlModel.setValue(value);
        expect(controlModel.getValue()).toEqual(value);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the cartesianGraphModelMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.cartesianGraphModelMethods();
    });

    it('allows to call the setProperty method', function () {
        var settings = {
            axes: axes,
            plots: plots,
            cursors: cursors
        };
        var frontPanel = {
            addFrontPanelControlToParent: function (model, settings) {
                return settings;
            },
            getOwner: function () { return null; }
        };
        controlModel.setOwner(frontPanel);
        controlModel.setProperty('axes', settings);
        controlModel.setProperty('plots', settings);
        controlModel.setProperty('cursors', settings);
        expect(controlModel.getAxes()).toEqual(axes);
        expect(controlModel.getPlots()).toEqual(plots);
        expect(controlModel.getCursors()).toEqual(cursors);
    });

    it('allows to call the printToConsole method', function () {
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});