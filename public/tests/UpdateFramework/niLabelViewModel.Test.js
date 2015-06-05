//****************************************
// Tests for LabelViewModel class
// National Instruments Copyright 2015
//****************************************

describe('A LabelViewModel', function () {
    'use strict';
    var viName = 'viName';
    var controlId = 'LabelViewModelId';
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
        var button = document.createElement('input');
        button.style.position = 'absolute';
        button.style.left = '100px';
        button.style.top = '200px';
        button.style.width = '300px';
        button.style.height = '400px';
        button.id = controlId;
        frontPanelCanvas.appendChild(button);
        settings = {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_LABEL,
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

    it('allows to call the labelViewModelMethods   method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viModel.addFrontPanelControl(settings);
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viewModel.labelViewModelMethods();
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows to call the modelPropertyChanged method with a property update', function () {
        // This test exercises most of the code in the LabelViewModel class.
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