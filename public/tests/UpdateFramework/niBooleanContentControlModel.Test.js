//****************************************
// Tests for BooleanContentControlModel class
// National Instruments Copyright 2014
//****************************************

describe('A BooleanContentControlModel', function () {
    'use strict';
    var controlModel;
    var id = 'testId';
    var trueContent = 'on';
    var falseContent = 'off';

    beforeEach(function () {
        controlModel = new NationalInstruments.HtmlVI.BooleanContentControlModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    it('allows to set and get the trueContent property', function () {
        controlModel.setTrueContent(trueContent);
        expect(controlModel.getTrueContent()).toEqual(trueContent);
    });

    it('allows to set and get the falseContent property', function () {
        controlModel.setFalseContent(falseContent);
        expect(controlModel.getFalseContent()).toEqual(falseContent);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the BooleanContentControlModelMethods  method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.BooleanContentControlModelMethods();
    });

    it('allows to call the printToConsole method', function () {
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});