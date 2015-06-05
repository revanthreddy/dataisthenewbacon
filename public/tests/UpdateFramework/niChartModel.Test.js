//****************************************
// Tests for ChartModel class
// National Instruments Copyright 2014
//****************************************

describe('A ChartModel', function () {
    'use strict';
    var controlModel;
    var id = 'testId';
    var top = 100;
    var left = 200;
    var width = 300;
    var height = 400;
    var visible = true;
    var configuration = {
        controlSetting: 1
    };
    var completeSettings = {};
    var otherSettings = {};

    beforeEach(function () {
        completeSettings = {
            top: top,
            left: left,
            width: width,
            height: height,
            visible: visible,
            configuration: configuration
        };
        otherSettings = {
            top: top + 1,
            left: left + 1,
            width: width + 1,
            height: height + 1,
            visible: !visible,
            bufferSize: 128,
            configuration: {
                controlSetting: 2
            }
        };
        controlModel = new NationalInstruments.HtmlVI.ChartModel(id);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call the chartModelMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        controlModel.chartModelMethods();
    });

    it('allows to call his constructor', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.getId()).toEqual(id);
    });

    it('allows to call an override setSize method to set the width and height properties', function () {
        controlModel.setSize(width, height);
        expect(controlModel.getWidth()).toEqual(width);
        expect(controlModel.getHeight()).toEqual(height);
        controlModel.setSize(0, 0);
        expect(controlModel.getWidth()).toEqual(1);
        expect(controlModel.getHeight()).toEqual(1);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the initializeModel method to update the configuration property', function () {
        controlModel.initializeModel(completeSettings);
        expect(controlModel.getConfiguration()).toEqual({
            controlSetting: 1
        });
    });

    it('allows to call the updateModelFromDataSource method to update model properties', function () {
        controlModel.updateModelFromDataSource(otherSettings);
        expect(controlModel.getTop()).toEqual(otherSettings.top);
        expect(controlModel.getLeft()).toEqual(otherSettings.left);
        expect(controlModel.getWidth()).toEqual(otherSettings.width);
        expect(controlModel.getHeight()).toEqual(otherSettings.height);
        expect(controlModel.getHistorySize()).toEqual(otherSettings.bufferSize);
        expect(controlModel.getConfiguration()).toEqual(otherSettings.configuration);
    });

    it('allows to call the printToConsole method', function () {
        controlModel.initializeModel(completeSettings);
        spyOn(console, 'log');
        controlModel.printToConsole('');
        expect(console.log.calls.count()).toEqual(Object.keys(controlModel).length);
    });

    it('should have default history size of 1024', function () {
        controlModel.initializeModel(completeSettings);
        expect(controlModel.getHistorySize()).toEqual(1024);
    });

    it('should be able to add numbers to a chart', function () {
        controlModel.updateModelFromDataSource({value: 7});

        expect(controlModel.historyBuffer.count).toBe(1);
        expect(controlModel.historyBuffer.toSeries()).toEqual([[0, 7]]);
    });

    it('should be able to add 1D arrays of numbers to a chart', function () {
        controlModel.updateModelFromDataSource({value: '[7, 8]'});

        expect(controlModel.historyBuffer.count).toBe(2);
        expect(controlModel.historyBuffer.toSeries()).toEqual([[0, 7], [1, 8]]);
    });

    it('should be able to add 1D arrays of 1 element arrays of numbers to a chart', function () {
        controlModel.updateModelFromDataSource({value: '[[7], [8]]'});

        expect(controlModel.historyBuffer.count).toBe(1);
        expect(controlModel.historyBuffer.toSeries(0)).toEqual([[0, 7]]);
        expect(controlModel.historyBuffer.toSeries(1)).toEqual([[0, 8]]);
    });

    it('should be able to add 1D arrays of multiple elements arrays of numbers to a chart', function () {
        controlModel.updateModelFromDataSource({value: '[[7, 8], [9, 10]]'});

        expect(controlModel.historyBuffer.count).toBe(2);
        expect(controlModel.historyBuffer.toSeries(0)).toEqual([[0, 7], [1, 8]]);
        expect(controlModel.historyBuffer.toSeries(1)).toEqual([[0, 9], [1, 10]]);
    });

    it('should set the width of the history buffer to 1 when pushing numbers to the buffer', function () {
        controlModel.updateModelFromDataSource({value: '[[7], [8]]'});
        controlModel.updateModelFromDataSource({value: 7});

        expect(controlModel.historyBuffer.width).toBe(1);        
    });

    it('should set the width of the history buffer to 1 when pushing 1D arrays of numbers to the buffer', function () {
        controlModel.updateModelFromDataSource({value: '[[7], [8]]'});
        controlModel.updateModelFromDataSource({value: '[7, 8]'});

        expect(controlModel.historyBuffer.width).toBe(1);        
    });

    it('should set the width of the history buffer to the lenght of the array rows when pushing 2D arrays of numbers to the buffer', function () {
        controlModel.updateModelFromDataSource({value: 7});
        controlModel.updateModelFromDataSource({value: '[[7], [8], [9]]'});

        expect(controlModel.historyBuffer.width).toBe(3);        
    });

    it('should empty the history buffer on width change', function () {
        controlModel.updateModelFromDataSource({ value: 7 });
        controlModel.updateModelFromDataSource({ value: '[[7], [8], [9]]' });

        expect(controlModel.historyBuffer.count).toBe(1);
    });

    it('should do nothing when receiving invalid JSON', function () {
        controlModel.updateModelFromDataSource({ value: 'invalidJsonString: [[7], [8], [9]]' });

        expect(controlModel.historyBuffer.count).toBe(0);
    });
    it('should do nothing when receiving unexpected data types', function () {
        controlModel.updateModelFromDataSource({ value: {} });

        expect(controlModel.historyBuffer.count).toBe(0);
    });
});