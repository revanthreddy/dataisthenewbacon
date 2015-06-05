//****************************************
// Tests for DropDownModel class
// National Instruments Copyright 2015
//****************************************

describe('A DropDownModel', function () {
    'use strict';

    var controlModel;
    var id = 'testId';
    var top = 100;
    var left = 200;
    var width = 300;
    var height = 400;
    var visible = true;
    var source = [ 'one', 'two', 'three' ];
    var otherSource = [ 'alpha', 'beta', 'charlie' ];
    var selectedIndex = 0;
    var configuration = { controlSetting: 1 };
    var completeSettings = {};
    var otherSettings = {};

    beforeEach(function () {
        completeSettings = {
            top: top,
            left: left,
            width: width,
            height: height,
            visible: visible,
            source: source,
            selectedIndex: selectedIndex,
            configuration: configuration
        };

        otherSettings = {
            top: top + 1,
            left: left + 1,
            width: width + 1,
            height: height + 1,
            visible: !visible,
            source: otherSource,
            selectedIndex: selectedIndex + 1,
            configuration: { controlSetting: 2 }
        };

        controlModel = new NationalInstruments.HtmlVI.DropDownModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------

    it('can be constructed', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    it('can get and set the selectedIndex property', function () {
        controlModel.setSelectedIndex(selectedIndex);
        expect(controlModel.getSelectedIndex()).toEqual(selectedIndex);
    });

    it('can get and set the source property', function() {
        controlModel.setSource(source);
        expect(controlModel.getSource()).toEqual(source);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------

    it('allows calls to the dropDownModelMethods function', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.dropDownModelMethods();
    });

    it('allows to call the initializeModel method to update the configuration property', function () {
        controlModel.initializeModel(completeSettings);
        var localConfiguration = controlModel.getConfiguration();
        expect(localConfiguration.controlSetting).toEqual(configuration.controlSetting);
        expect(controlModel.getWidth()).toEqual(width);
        expect(controlModel.getHeight()).toEqual(height);
        expect(controlModel.getSelectedIndex()).toEqual(selectedIndex);
        expect(controlModel.getSource()).toEqual(source);
    });

    it('allows to call the updateModelFromDataSource method to update model properties', function () {
        controlModel.updateModelFromDataSource(otherSettings);
        expect(controlModel.getTop()).toEqual(otherSettings.top);
        expect(controlModel.getLeft()).toEqual(otherSettings.left);
        expect(controlModel.getWidth()).toEqual(otherSettings.width);
        expect(controlModel.getHeight()).toEqual(otherSettings.height);
        expect(controlModel.getSelectedIndex()).toEqual(otherSettings.selectedIndex);
        expect(controlModel.getSource()).toEqual(otherSettings.source);
        expect(controlModel.getConfiguration()).toEqual(otherSettings.configuration);
    });
});
