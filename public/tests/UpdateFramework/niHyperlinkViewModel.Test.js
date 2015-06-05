//****************************************
// Tests for HyperlinkViewModel class
// National Instruments Copyright 2015
//****************************************

describe('A HyperlinkViewModel', function () {
    'use strict';
    var viName = 'viName';
    var controlId = 'HyperlinkViewModelId';
    var frontPanelCanvas = document.createElement('section');
    frontPanelCanvas.id = 'FrontPanelCanvas';
    if (document.body === null) {
        var body = document.createElement('body');
        document.body = body;
    }

    document.body.appendChild(frontPanelCanvas);
    var viModel = new NationalInstruments.HtmlVI.VIModel(viName);
    var frontPanelControls, controlModel, controlElement, settings, updateSettings;
    beforeEach(function () {
        var button = document.createElement('a');
        button.style.position = 'absolute';
        button.style.left = '100px';
        button.style.top = '200px';
        button.style.width = '300px';
        button.style.height = '400px';
        button.id = controlId;
        frontPanelCanvas.appendChild(button);
        settings = {
            id: controlId,
            kind:NationalInstruments.HtmlVI.ControlKindEnum.NI_HYPERLINK,
            visible: true,
            href: 'missing',
            content: 'content',
            configuration: {
            }
        };
        updateSettings = {
            href: 'notAvailable',
            content: 'other'
        };
    });

    it('allows to call the hyperlinkViewModelMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viModel.addFrontPanelControl(settings);
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viewModel.hyperlinkViewModelMethods();
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows to call the modelPropertyChanged method with a property update', function () {
        // This test exercises most of the code in the HyperlinkViewModel class.
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
        expect(controlElement.href).toMatch(updateSettings.href);
        expect(controlElement.firstChild).toBeDefined();
        expect(controlElement.firstChild.nodeValue).toBeDefined();
        expect(controlElement.firstChild.nodeValue).toEqual(updateSettings.content);

        // Verify unknown properties are handled correctly
        viewModel.modelPropertyChanged('{Unknown}');
        expect(controlElement.href).toMatch(updateSettings.href);
        expect(controlElement.firstChild).toBeDefined();
        expect(controlElement.firstChild.nodeValue).toBeDefined();
        expect(controlElement.firstChild.nodeValue).toEqual(updateSettings.content);

        viModel.removeFrontPanelControl(controlId);
    });
});