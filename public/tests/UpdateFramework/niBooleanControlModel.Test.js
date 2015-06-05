//****************************************
// Tests for BooleanControlModel class
// National Instruments Copyright 2014
//****************************************

describe('A BooleanControlModel', function () {
    'use strict';
    var controlModel;
    var content = 'content';
    var contentVisible = false;
    var id = 'testId';
    var clickMode = NationalInstruments.HtmlVI.BooleanControlModelClickModeEnum.RELEASE;
    var momentary = true;

    beforeEach(function () {
        controlModel = new NationalInstruments.HtmlVI.BooleanControlModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    it('allows to set and get the content property', function () {
        controlModel.setContent(content);
        expect(controlModel.getContent()).toEqual(content);
    });

    it('allows to set and get the contentVisible property', function () {
        controlModel.setContentVisible(contentVisible);
        expect(controlModel.getContentVisible()).toEqual(contentVisible);
    });
    
    it('allows to set and get the clickMode property', function () {
        controlModel.setClickMode(clickMode);
        expect(controlModel.getClickMode()).toEqual(clickMode);
    });
    
    it('allows to set and get the momentary property', function () {
        controlModel.setMomentary(momentary);
        expect(controlModel.getMomentary()).toEqual(momentary);
    });
    
    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the booleanControlModelMethods  method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.booleanControlModelMethods();
    });

    it('allows to call the printToConsole method', function () {
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});