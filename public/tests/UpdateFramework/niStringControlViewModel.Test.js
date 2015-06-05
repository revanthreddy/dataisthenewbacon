//****************************************
// Tests for StringControlViewModel class
// National Instruments Copyright 2015
//****************************************

describe('A StringControlViewModel', function () {
    'use strict';
    var viName = 'Function.gvi';
    var controlId = 'StringControlViewModelId';
    var elementName = 'ni-string-control';
    var frontPanelCanvas = document.createElement('section');
    var htmlTagCanvasId = 'FrontPanelCanvas';
    frontPanelCanvas.id = htmlTagCanvasId;
    if (document.body === null) {
        var body = document.createElement('body');
        document.body = body;
    }

    document.body.appendChild(frontPanelCanvas);
    var viModel = NationalInstruments.HtmlVI.viModelsService.getVI(viName);
    if(viModel === null) {
       viModel = NationalInstruments.HtmlVI.viModelsService.addVI(viName);
    }

    var frontPanelControls, controlModel, controlElement, settings, updateSettings;

    beforeEach(function () {
        settings = {
            id: controlId,
            kind:NationalInstruments.HtmlVI.ControlKindEnum.NI_STRING_CONTROL,
            visible: true,
            text: 'Editable',
            readOnly: false,
            configuration: {
            },
            left: '272px',
            top: '166px',
            width: '90px',
            height: '22px'
        };

        updateSettings = {
            text: 'ReadOnly',
            readOnly: true
        };
    });

    it('allows to call the stringControlViewModelMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viModel.createElement(controlId, htmlTagCanvasId, elementName, settings);
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viewModel.stringControlViewModelMethods();
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows to call the modelPropertyChanged method with a property update', function () {
        // Verify that the model and viewModel were created
        viModel.createElement(controlId, htmlTagCanvasId, elementName, settings);
        controlElement = document.getElementById(controlId);
        var internalControl = controlElement.firstElementChild;
        frontPanelControls = viModel.getRootModelControls();
        controlModel = frontPanelControls[controlId];
        expect(controlModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();

        // Verify properties were correctly set
        expect(controlModel.text).toEqual(settings.text);
        expect(controlModel.readOnly).toEqual(settings.readOnly);
        expect(internalControl.style.borderWidth).toEqual('medium');
        expect(internalControl.style.borderStyle).toEqual('double');

        // Verify property updates is working
        controlModel.updateModelFromDataSource(updateSettings);
        Platform.performMicrotaskCheckpoint();
        expect(controlModel.text).toEqual(updateSettings.text);
        expect(controlModel.readOnly).toEqual(updateSettings.readOnly);
        expect(internalControl.style.borderWidth).toEqual('thin');
        expect(internalControl.style.borderStyle).toEqual('solid');

        // Verify unknown properties are handled correctly
        viewModel.modelPropertyChanged('{Unknown}');
        expect(controlModel.text).toEqual(updateSettings.text);
        expect(controlModel.readOnly).toEqual(updateSettings.readOnly);

        viModel.removeFrontPanelControl(controlId);
    });

    it('allows the change event listener to update value', function () {

        // Need a vireo runtime object for processUpdateMessage call
        var deleteVireoRuntime = false;
        if (NationalInstruments.HtmlVI.niVireoRuntime === undefined) {
            NationalInstruments.HtmlVI.niVireoRuntime =
            {
                processUpdateMessage: function () {
                }
            };
            deleteVireoRuntime = true;
        }

        viModel.createElement(controlId, htmlTagCanvasId, elementName, settings);
        controlElement = document.getElementById(controlId);
        var internalControl = controlElement.firstElementChild;
        frontPanelControls = viModel.getRootModelControls();
        controlModel = frontPanelControls[controlId];
        expect(controlModel).toBeDefined();

        var oldValue = controlModel.getText();
        expect(oldValue).toEqual('Editable');
        $(internalControl).val('Testing');
        $(internalControl).trigger('change'); // Normally this happens when the textbox loses focus

        var newValue = controlModel.getText();
        expect(newValue).toEqual('Testing');
        viModel.removeFrontPanelControl(controlId);

        if (deleteVireoRuntime) {
            NationalInstruments.HtmlVI.niVireoRuntime = undefined;
        }
    });
});
