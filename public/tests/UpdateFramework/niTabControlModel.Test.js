//****************************************
// Tests for TabControlModel class
// National Instruments Copyright 2014
//****************************************

describe('A TabControlModel', function () {
    'use strict';
    var controlModel;
    var id = 'testId';
    var tabId = 'tabId';
    var tabs = [{ id: tabId }];
    var selectedIndex = 0;
    var placement = 'bottom';

    beforeEach(function () {
        controlModel = new NationalInstruments.HtmlVI.TabControlModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    it('allows to set and get the tabs property', function () {
        var frontPanel = {
            addFrontPanelControl: function (settings) {
                expect(settings.id).toEqual(tabId);
                return settings;
            },
            getOwner: function() { return null; }
        };
        controlModel.setOwner(frontPanel);
        controlModel.setTabs(tabs);        
        expect(controlModel.getTabs()).toEqual(tabs);
    });


    it('allows to set and get the selectedIndex property', function () {
        controlModel.setSelectedIndex(selectedIndex);
        expect(controlModel.getSelectedIndex()).toEqual(selectedIndex);
    });

    it('allows to set and get the placement property', function () {
        controlModel.setPlacement(placement);
        expect(controlModel.getPlacement()).toEqual(placement);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the tabControlModelMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.tabControlModelMethods();
    });

    it('allows to call the setProperty method', function () {
        var settings = {
            tabs: tabs,
            selectedIndex: 0,
            placement: 'bottom'
        };
        var frontPanel = {
            addFrontPanelControl: function (settings) {
                return settings;
            },
            getOwner: function () { return null; }
        };
        controlModel.setOwner(frontPanel);
        controlModel.setProperty('tabs', settings);
        expect(controlModel.getTabs()).toEqual(tabs);
    });

    it('allows to call the printToConsole method', function () {
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});