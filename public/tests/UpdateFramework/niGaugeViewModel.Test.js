//****************************************
// Tests for BooleangaugeModel class
// National Instruments Copyright 2014
//****************************************

describe('A GaugeViewModel', function () {
    'use strict';
    var viName = 'Function.gvi';
    var controlId = 'Function1';
    var frontPanelCanvas = document.createElement('section');
    var htmlTagCanvasId = 'FrontPanelCanvas';
    frontPanelCanvas.id = htmlTagCanvasId;
    if (document.body === null) {
        var body = document.createElement('body');
        document.body = body;
    }

    document.body.appendChild(frontPanelCanvas);
    var viModel = NationalInstruments.HtmlVI.viModelsService.getVI(viName);
    if (viModel === null) {
        viModel = NationalInstruments.HtmlVI.viModelsService.addVI(viName);
    }
    var frontPanelControls, gaugeModel, gaugeElement, settings;
    beforeEach(function () {
        settings = {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_GAUGE,
            minimum: 0.0,
            maximum: 10.0,
            interval: 2.0,
            majorTicksVisible: true,
            minorTicksVisible: true,
            labelsVisible: true,
            decimalDigits: 2,
            precisionDigits: 4,
            value: 5.0,
            left: '100px',
            top: '200px',
            width: '300px',
            height: '400px'
        };
    });

    it('allows to call the gaugeViewModelMethods  method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viModel.createElement(controlId, htmlTagCanvasId, 'ni-gauge', settings);
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viewModel.gaugeViewModelMethods();
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows to call the modelPropertyChanged method with a property update', function () {
        viModel.createElement(controlId, htmlTagCanvasId, 'ni-gauge', settings);
        gaugeElement = document.getElementById(controlId);
        var internalControl = $(gaugeElement.firstElementChild);
        frontPanelControls = viModel.getRootModelControls();
        gaugeModel = frontPanelControls[controlId];
        expect(gaugeModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        var settings2 = { maximum: 10.0 };
        gaugeModel.updateModelFromDataSource(settings2);
        Platform.performMicrotaskCheckpoint();
        var maximum = internalControl.jqxGauge('max');
        expect(maximum).toEqual(10.0);
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows view changes to update the model', function () {

        // Need a vireo runtime object for processUpdateMessage call 
        var deleteVireoRuntime = false;
        if (NationalInstruments.HtmlVI.niVireoRuntime === undefined) {
            NationalInstruments.HtmlVI.niVireoRuntime = {
                processUpdateMessage: function () {}
            };
            deleteVireoRuntime = true;
        }
        viModel.createElement(controlId, htmlTagCanvasId, 'ni-gauge', { id: controlId, kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_GAUGE, value: 50.0 });
        gaugeElement = document.getElementById(controlId);
        var internalControl = $(gaugeElement.firstElementChild);
        frontPanelControls = viModel.getRootModelControls();
        gaugeModel = frontPanelControls[controlId];
        expect(gaugeModel).toBeDefined();

        var oldValue = gaugeModel.getValue();
        expect(oldValue).toEqual(50.0);
        internalControl.jqxGauge({ animationDuration: 0 });
        gaugeElement.value = 10.0;
        Platform.performMicrotaskCheckpoint();
        expect(gaugeModel.getValue()).toEqual(10.0);
    
        viModel.removeFrontPanelControl(controlId);

        if (deleteVireoRuntime) {
            NationalInstruments.HtmlVI.niVireoRuntime = undefined;
        }

    });
});