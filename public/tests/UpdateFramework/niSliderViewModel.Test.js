//****************************************
// Tests for SliderViewModel class
// National Instruments Copyright 2014
//****************************************

describe('A SliderViewModel', function () {
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

    var frontPanelControls, sliderModel, sliderElement, settings;
    beforeEach(function () {
        settings = {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_SLIDER,
            minimum: 0.0,
            maximum: 10.0,
            interval: 2.0,
            value: 5.0,
            left: '100px',
            top: '200px',
            width: '300px',
            height: '400px'
        };
    });

    it('allows to call the sliderViewModelMethods  method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viModel.createElement(controlId, htmlTagCanvasId, 'ni-slider', settings);
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viewModel.sliderViewModelMethods();
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows to call the modelPropertyChanged method with a property update', function () {
        viModel.createElement(controlId, htmlTagCanvasId, 'ni-slider', settings);
        sliderElement = document.getElementById(controlId);
        var internalControl = $(sliderElement.firstElementChild);
        frontPanelControls = viModel.getRootModelControls();
        sliderModel = frontPanelControls[controlId];
        expect(sliderModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        var settings2 = { interval: 2.0 };
        sliderModel.updateModelFromDataSource(settings2);
        Platform.performMicrotaskCheckpoint();
        var interval = internalControl.jqxSlider('step');
        expect(interval).toEqual(2.0);

        // Verify unknown properties are handled correctly
        viewModel.modelPropertyChanged('{Unknown}');
        interval = internalControl.jqxSlider('step');
        expect(interval).toEqual(2.0);
        
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows to call the click event updates value', function () {
        var deleteVireoRuntime = false;
        if (NationalInstruments.HtmlVI.niVireoRuntime === undefined) {
            NationalInstruments.HtmlVI.niVireoRuntime =
            {
                processUpdateMessage: function () {
                }
            };
            deleteVireoRuntime = true;
        }
        viModel.createElement(controlId, htmlTagCanvasId, 'ni-slider', { id: controlId, kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_SLIDER });
        sliderElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        sliderModel = frontPanelControls[controlId];
        var val = sliderModel.getValue();
        expect(val).toEqual(0.0);
        
        // Need to use mouse actions to control change
        sliderElement.value = 6.0;
        Platform.performMicrotaskCheckpoint();
        var newVal = sliderModel.getValue();
        expect(newVal).toEqual(6.0);
        viModel.removeFrontPanelControl(controlId);
        if (deleteVireoRuntime) {
            NationalInstruments.HtmlVI.niVireoRuntime = undefined;
        }
    });
});