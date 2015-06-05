//****************************************
// Tests for NumericPointerModel class
// National Instruments Copyright 2014
//****************************************

describe('A NumericPointerModel', function () {
    'use strict';
    var controlModel;
    var id = 'testId';
    var majorTicksVisible = true;
    var minorTicksVisible = true;
    var labelsVisible = true;
    var configuration = { controlSetting: 1 };
    var settings = {};
    var completeSettings = {};
    var otherSettings = {};

    beforeEach(function () {
        completeSettings = {
            majorTicksVisible: majorTicksVisible,
            minorTicksVisible: minorTicksVisible,
            labelsVisible: labelsVisible,
            configuration: configuration
        };
        otherSettings = {
            majorTicksVisible: !majorTicksVisible,
            minorTicksVisible: !minorTicksVisible,
            labelsVisible: !labelsVisible,
            configuration: { controlSetting: 2 }
        };
        controlModel = new NationalInstruments.HtmlVI.NumericPointerModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    it('allows to set and get the majorTicksVisible property', function () {
        controlModel.setMajorTicksVisible(majorTicksVisible);
        expect(controlModel.getMajorTicksVisible()).toEqual(majorTicksVisible);
    });

    it('allows to set and get the minorTicksVisible property', function () {
        controlModel.setMinorTicksVisible(minorTicksVisible);
        expect(controlModel.getMinorTicksVisible()).toEqual(minorTicksVisible);
    });

    it('allows to set and get the labelsVisible property', function () {
        controlModel.setLabelsVisible(labelsVisible);
        expect(controlModel.getLabelsVisible()).toEqual(labelsVisible);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the numericPointerModelMethods  method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.numericPointerModelMethods();
    });

    it('allows to call the initializeModel method to update all the properties at the same time', function () {
        controlModel.initializeModel(completeSettings);
        expect(controlModel.getMajorTicksVisible()).toEqual(majorTicksVisible);
        expect(controlModel.getMinorTicksVisible()).toEqual(minorTicksVisible);
        expect(controlModel.getLabelsVisible()).toEqual(labelsVisible);
    });

    it('allows to call the initializeModel method with an unknown property', function () {
        controlModel.initializeModel(completeSettings);
        settings = {
            unknownProperty: 'someValue'
        };
        controlModel.initializeModel(settings);
        expect(controlModel.getMajorTicksVisible()).toEqual(majorTicksVisible);
        expect(controlModel.getMinorTicksVisible()).toEqual(minorTicksVisible);
        expect(controlModel.getLabelsVisible()).toEqual(labelsVisible);
    });

    it('allows to call the initializeModel method to update just one property without updating others', function () {
        controlModel.initializeModel(completeSettings);
        settings = {
            majorTicksVisible: !majorTicksVisible
        };
        controlModel.initializeModel(settings);
        expect(controlModel.getMajorTicksVisible()).toEqual(settings.majorTicksVisible);
        expect(controlModel.getMinorTicksVisible()).toEqual(minorTicksVisible);
        expect(controlModel.getLabelsVisible()).toEqual(labelsVisible);
    });

    it('allows to call the updateModelFromDataSource method to update model properties', function () {
        controlModel.updateModelFromDataSource(otherSettings);
        expect(controlModel.getMajorTicksVisible()).toEqual(otherSettings.majorTicksVisible);
        expect(controlModel.getMinorTicksVisible()).toEqual(otherSettings.minorTicksVisible);
        expect(controlModel.getLabelsVisible()).toEqual(otherSettings.labelsVisible);
        expect(controlModel.getConfiguration()).toEqual(otherSettings.configuration);
    });

    it('allows to call the printToConsole method', function () {
        controlModel.initializeModel(completeSettings);
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log).toHaveBeenCalledWith('majorTicksVisible: ' + majorTicksVisible);
        expect(console.log).toHaveBeenCalledWith('minorTicksVisible: ' + minorTicksVisible);
        expect(console.log).toHaveBeenCalledWith('labelsVisible: ' + labelsVisible);
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});