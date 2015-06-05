//****************************************
// Tests for ClusterModel class
// National Instruments Copyright 2014
//****************************************

describe('A ClusterModel', function () {
    'use strict';
    var controlModel;
    var id = 'testId';
    var childId = 'childId';
    var childId2 = 'childId2';
    var child2 = { id: childId2, getId: function() { return childId2; } };
    var children = [{ id: childId }];

    beforeEach(function () {
        controlModel = new NationalInstruments.HtmlVI.ClusterModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    it('allows to set and get the children property', function () {
        var frontPanel = {
            addFrontPanelControl: function (settings) {
                expect(settings.id).toEqual(childId);
                return settings;
            },
            getOwner: function() { return null; }
        };
        controlModel.setOwner(frontPanel);
        controlModel.setChildren(children);        
        expect(controlModel.getChildren()).toEqual(children);
    });


    it('allows to addChild and removeChild methods', function () {
        controlModel.addChild(child2);
        expect(controlModel.getChildren().length).toEqual(1);
        controlModel.removeChild(child2);
        expect(controlModel.getChildren().length).toEqual(0);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the clusterModelMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.clusterModelMethods();
    });

    it('allows to call the setProperty method', function () {
        var settings = {
            children: children,
        };
        var frontPanel = {
            addFrontPanelControl: function (settings) {
                return settings;
            },
            getOwner: function () { return null; }
        };
        controlModel.setOwner(frontPanel);
        controlModel.setProperty('children', settings);
        expect(controlModel.getChildren()).toEqual(children);
    });

    it('allows to call the printToConsole method', function () {
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});