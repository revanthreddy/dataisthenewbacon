//****************************************
// Tests for ImageViewModel class
// National Instruments Copyright 2015
//****************************************

describe('An ImageViewModel', function () {
    'use strict';
    var viName = 'viName';
    var controlId = 'ImageViewModelId';
    var frontPanelCanvas = document.createElement('section');
    var htmlTagCanvasId = 'FrontPanelCanvas';
    frontPanelCanvas.id = htmlTagCanvasId;
    if (document.body === null) {
        var body = document.createElement('body');
        document.body = body;
    }

    document.body.appendChild(frontPanelCanvas);
    var viModel = new NationalInstruments.HtmlVI.VIModel(viName);
    var frontPanelControls, controlModel, controlElement, settings, updateSettings;
    beforeEach(function () {
        var button = document.createElement('img');
        button.style.position = 'absolute';
        button.style.left = '100px';
        button.style.top = '200px';
        button.style.width = '300px';
        button.style.height = '400px';
        button.id = controlId;
        frontPanelCanvas.appendChild(button);
        settings = {
            id: controlId,
            kind:NationalInstruments.HtmlVI.ControlKindEnum.NI_IMAGE,
            visible: true,
            source: 'missing',
            alternate: 'alternate',
            configuration: {
            }
        };
        updateSettings = {
            source: 'notAvailable',
            alternate: 'other',
        };
    });

    it('allows to call the imageViewModelMethods  method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viModel.addFrontPanelControl(settings);
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viewModel.imageViewModelMethods();
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows to call the modelPropertyChanged method with a property update', function () {
        // This test exercises most of the code in the TextViewModel class.
        // It is difficult to test each function separately.

        // Verify that the model and viewModel were created
        viModel.addFrontPanelControl(settings);
        controlElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        controlModel = frontPanelControls[controlId];
        expect(controlModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();

        // Verify property updates is working
        controlModel.updateModelFromDataSource(updateSettings);
        Platform.performMicrotaskCheckpoint();
        expect(controlElement.src).toMatch(updateSettings.source);
        expect(controlElement.alt).toEqual(updateSettings.alternate);

        // Verify unknown properties are handled correctly
        viewModel.modelPropertyChanged('{Unknown}');
        expect(controlElement.src).toMatch(updateSettings.source);
        expect(controlElement.alt).toEqual(updateSettings.alternate);

        viModel.removeFrontPanelControl(controlId);
    });
});