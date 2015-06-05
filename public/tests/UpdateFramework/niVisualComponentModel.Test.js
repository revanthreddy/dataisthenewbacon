//****************************************
// Tests for VisualComponentModel class
// National Instruments Copyright 2014
//****************************************

describe('A VisualComponentModel', function () {
    'use strict';
    var controlModel;
    var id = 'testId';
    var kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_GAUGE;
    var configuration = { controlSetting: 1 };
    var frontPanel = { frontPanel: 'frontPanel', getOwner: function () { return null; } };
    var visible = true;
    var labelId = 'labelId';
    var settings = {};
    var completeSettings = {};
    var otherSettings = {};

    beforeEach(function () {
        completeSettings = {
            labelId: labelId,
            kind: kind,
            visible: visible,
            configuration: configuration
        };
        otherSettings = {
            labelId: labelId + '2',
            visible: !visible,
            configuration: { controlSetting: 2 }
        };
        settings = {};
        controlModel = new NationalInstruments.HtmlVI.VisualComponentModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    it('allows to set and get the id property', function () {
        controlModel.setId(id + 'other');
        expect(controlModel.getId()).toEqual(id + 'other');
    });

    it('allows to set and get the frontPanel property', function () {
        controlModel.setOwner(frontPanel);
        expect(controlModel.getRoot()).toEqual(frontPanel);
    });

    it('allows to set and get the kind property', function () {
        controlModel.setKind(kind);
        expect(controlModel.getKind()).toEqual(kind);
    });

    it('allows to set and get the configuration property', function () {
        controlModel.setConfiguration(configuration);
        expect(controlModel.getConfiguration()).toEqual(configuration);
    });

    it('allows to set and get the visible property', function () {
        controlModel.setVisible(visible);
        expect(controlModel.getVisible()).toEqual(visible);
    });

    it('allows to set and get the labelId property', function () {
        controlModel.setLabelId(labelId);
        expect(controlModel.getLabelId()).toEqual(labelId);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the VisualComponentModelMethods  method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.VisualComponentModelMethods();
    });

    it('allows to call the initializeModel method to update all the properties at the same time', function () {
        controlModel.initializeModel(completeSettings);
        expect(controlModel.getKind()).toEqual(kind);
        expect(controlModel.getConfiguration()).toEqual(configuration);
        expect(controlModel.getVisible()).toEqual(visible);
        expect(controlModel.getLabelId()).toEqual(labelId);
    });

    it('allows to call the initializeModel method with an unknown property', function () {
        controlModel.initializeModel(completeSettings);
        settings = {
            unknownProperty: 'someValue'
        };
        controlModel.initializeModel(settings);
        expect(controlModel.getKind()).toEqual(kind);
        expect(controlModel.getConfiguration()).toEqual(configuration);
        expect(controlModel.getVisible()).toEqual(visible);
        expect(controlModel.getLabelId()).toEqual(labelId);
    });

    it('allows to call the initializeModel method to update just one property without updating others', function () {
        controlModel.initializeModel(completeSettings);
        settings = {
            kind: kind + '_test',
        };
        controlModel.initializeModel(settings);
        expect(controlModel.getKind()).toEqual(settings.kind);
        expect(controlModel.getConfiguration()).toEqual(configuration);
        expect(controlModel.getVisible()).toEqual(visible);
        expect(controlModel.getLabelId()).toEqual(labelId);
    });

    it('allows to call the updateModelFromDataSource method to update model properties', function () {
        controlModel.updateModelFromDataSource(otherSettings);
        expect(controlModel.getKind()).toEqual('');
        expect(controlModel.getVisible()).toEqual(otherSettings.visible);
        expect(controlModel.getConfiguration()).toEqual(otherSettings.configuration);
        expect(controlModel.getLabelId()).toEqual(otherSettings.labelId);
    });

    it('allows to call the printToConsole method', function () {
        controlModel.initializeModel(completeSettings);
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log).toHaveBeenCalledWith('id: ' + id);
        expect(console.log).toHaveBeenCalledWith('kind: ' + kind);
        expect(console.log).toHaveBeenCalledWith('visible: ' + visible);
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });
});