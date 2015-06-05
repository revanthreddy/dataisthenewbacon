//****************************************
// Tests for LinearProgressBarViewModel class
// National Instruments Copyright 2014
//****************************************

describe('A LinearProgressBarViewModel', function () {
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
    var frontPanelControls, linearProgressBarModel, linearProgressBarElement, settings;
    beforeEach(function () {
        settings = {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_LINEAR_PROGRESSBAR,
            minimum: 0.0,
            maximum: 10.0,
            value: 5.0,
            left: '100px',
            top: '200px',
            width: '300px',
            height: '400px',
            orientation: NationalInstruments.HtmlVI.ProgressBarModelOrientationEnum.VERTICAL
        };
    });

    it('allows to call the linearProgressBarViewModelMethods  method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viModel.createElement(controlId, htmlTagCanvasId, 'ni-linear-progress-bar', settings);
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viewModel.linearProgressBarViewModelMethods();
        viewModel.progressBarViewModelMethods();
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows to call the modelPropertyChanged method with a property update', function () {
        viModel.createElement(controlId, htmlTagCanvasId, 'ni-linear-progress-bar',
        {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_LINEAR_PROGRESSBAR,
            minimum: 15,
            maximum: 100,
            value: 50,
            orientation: NationalInstruments.HtmlVI.ProgressBarModelOrientationEnum.HORIZONTAL
        });
        linearProgressBarElement = document.getElementById(controlId);
        var internalControl = $(linearProgressBarElement.firstElementChild);
        frontPanelControls = viModel.getRootModelControls();
        linearProgressBarModel = frontPanelControls[controlId];
        expect(linearProgressBarModel).toBeDefined();
        
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        linearProgressBarModel.updateModelFromDataSource(settings);
        Platform.performMicrotaskCheckpoint();
        var maximum = internalControl.jqxProgressBar('max');
        expect(maximum).toEqual(100.0);
        viModel.removeFrontPanelControl(controlId);
    });

});