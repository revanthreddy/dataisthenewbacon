//****************************************
// Tests for TextViewModel class
// National Instruments Copyright 2015
//****************************************

describe('A TextViewModel', function () {
    'use strict';
    var viName = 'viName';
    var controlId = 'TextViewModelId';
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
        var text = document.createElement('input');
        text.style.position = 'absolute';
        text.style.left = '272px';
        text.style.top = '64px';
        text.style.width = '23px';
        text.style.height = '16px';
        text.id = controlId;
        frontPanelCanvas.appendChild(text);
        settings = {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_TEXT,
            visible: true,
            text: 'Text',
            foreground: '#4D5359',
            fontSize: '12px',
            configuration: {
            }
        };
        updateSettings = {
            visible: true,
            text: 'OtherText',
            foreground: '#3AB878',
            fontSize: '19px',
        };
    });

    it('allows to call the textViewModelMethods   method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viModel.addFrontPanelControl(settings);
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viewModel.textViewModelMethods();
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
        expect(controlElement.firstChild).toBeDefined();
        expect(controlElement.firstChild.nodeValue).toBeDefined();
        expect(controlElement.firstChild.nodeValue).toEqual(updateSettings.text);
        expect(controlElement.style.color).toEqual('rgb(58, 184, 120)');
        expect(controlElement.style.fontSize).toEqual(updateSettings.fontSize);

        // Verify unknown properties are handled correctly
        viewModel.modelPropertyChanged('{Unknown}');
        expect(controlElement.style.color).toEqual('rgb(58, 184, 120)');
        expect(controlElement.style.fontSize).toEqual(updateSettings.fontSize);

        viModel.removeFrontPanelControl(controlId);
    });
});