//****************************************
// Tests for NumericControlModel class
// National Instruments Copyright 2014
//****************************************

describe('A NumericControlModel', function () {
    'use strict';
    var controlModel;
    var id = 'testId';
    var minimum = 100;
    var maximum = 200;
    var interval = 1;
    var value = 300;
    var decimalDigits = 400;
    var precisionDigits = 500;
    var configuration = { controlSetting: 1 };
    var settings = {};
    var completeSettings = {};
    var otherSettings = {};

    beforeEach(function () {
        completeSettings = {
            minimum: minimum,
            maximum: maximum,
            interval: interval,
            value: value,
            decimalDigits: decimalDigits,
            precisionDigits: precisionDigits,
            configuration: configuration
        };
        otherSettings = {
            minimum: minimum + 1,
            maximum: maximum + 1,
            interval: interval + 1,
            value: value + 1,
            decimalDigits: decimalDigits + 1,
            precisionDigits: precisionDigits + 1,
            configuration: { controlSetting: 2 }
        };
        settings = {};
        controlModel = new NationalInstruments.HtmlVI.NumericControlModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    it('allows to set and get the maximum property', function () {
        controlModel.setMinimum(minimum);
        expect(controlModel.getMinimum()).toEqual(minimum);
    });

    it('allows to set and get the minimum property', function () {
        controlModel.setMaximum(maximum);
        expect(controlModel.getMaximum()).toEqual(maximum);
    });

    it('allows to set and get the interval property', function () {
        controlModel.setInterval(interval);
        expect(controlModel.getInterval()).toEqual(interval);
    });

    it('allows to set and get the value property', function () {
        controlModel.setValue(value);
        expect(controlModel.getValue()).toEqual(value);
    });

    it('allows to set and get the decimalDigits property', function () {
        controlModel.setDecimalDigits(decimalDigits);
        expect(controlModel.getDecimalDigits()).toEqual(decimalDigits);
    });

    it('allows to set and get the precisionDigits property', function () {
        controlModel.setPrecisionDigits(precisionDigits);
        expect(controlModel.getPrecisionDigits()).toEqual(precisionDigits);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the numericControlModelMethods  method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.numericControlModelMethods();
    });

    it('allows to call the initializeModel method to update all the properties at the same time', function () {
        controlModel.initializeModel(completeSettings);
        expect(controlModel.getMinimum()).toEqual(minimum);
        expect(controlModel.getMaximum()).toEqual(maximum);
        expect(controlModel.getInterval()).toEqual(interval);
        expect(controlModel.getValue()).toEqual(value);
        expect(controlModel.getDecimalDigits()).toEqual(decimalDigits);
        expect(controlModel.getPrecisionDigits()).toEqual(precisionDigits);
    });

    it('allows to call the initializeModel method with an unknown property', function () {
        controlModel.initializeModel(completeSettings);
        settings = {
            unknownProperty: 'someValue'
        };
        controlModel.initializeModel(settings);
        expect(controlModel.getMinimum()).toEqual(minimum);
        expect(controlModel.getMaximum()).toEqual(maximum);
        expect(controlModel.getInterval()).toEqual(interval);
        expect(controlModel.getValue()).toEqual(value);
        expect(controlModel.getDecimalDigits()).toEqual(decimalDigits);
        expect(controlModel.getPrecisionDigits()).toEqual(precisionDigits);
    });

    it('allows to call the initializeModel method to update just one property without updating others', function () {
        controlModel.initializeModel(completeSettings);
        settings = {
            minimum: minimum * 2,
        };
        controlModel.initializeModel(settings);
        expect(controlModel.getMinimum()).toEqual(settings.minimum);
        expect(controlModel.getMaximum()).toEqual(maximum);
        expect(controlModel.getInterval()).toEqual(interval);
        expect(controlModel.getValue()).toEqual(value);
        expect(controlModel.getDecimalDigits()).toEqual(decimalDigits);
        expect(controlModel.getPrecisionDigits()).toEqual(precisionDigits);
    });

    it('allows to call the updateModelFromDataSource method to update model properties', function () {
        controlModel.updateModelFromDataSource(otherSettings);
        expect(controlModel.getMinimum()).toEqual(otherSettings.minimum);
        expect(controlModel.getMaximum()).toEqual(otherSettings.maximum);
        expect(controlModel.getInterval()).toEqual(otherSettings.interval);
        expect(controlModel.getValue()).toEqual(otherSettings.value);
        expect(controlModel.getDecimalDigits()).toEqual(otherSettings.decimalDigits);
        expect(controlModel.getPrecisionDigits()).toEqual(otherSettings.precisionDigits);
        expect(controlModel.getConfiguration()).toEqual(otherSettings.configuration);
    });

    it('allows to call the printToConsole method', function () {
        controlModel.initializeModel(completeSettings);
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log).toHaveBeenCalledWith('minimum: ' + minimum);
        expect(console.log).toHaveBeenCalledWith('maximum: ' + maximum);
        expect(console.log).toHaveBeenCalledWith('interval: ' + interval);
        expect(console.log).toHaveBeenCalledWith('value: ' + value);
        expect(console.log).toHaveBeenCalledWith('decimalDigits: ' + decimalDigits);
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});