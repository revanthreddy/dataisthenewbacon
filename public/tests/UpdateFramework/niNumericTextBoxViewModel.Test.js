//****************************************
// Tests for NumericTextBoxViewModel class
// National Instruments Copyright 2014
//****************************************

describe('A NumericTextBoxViewModel', function () {
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

    var frontPanelControls, numericTextBoxModel, numericTextBoxElement, settings;
    beforeEach(function () {
        settings = {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_NUMERIC_TEXTBOX,
            minimum: 0.0,
            maximum: 10.0,
            decimalDigits: 2,
            value: 5.0,
            left: '100px',
            top: '200px',
            width: '300px',
            height: '400px'
        };
    });

    it('allows to call the numericTextBoxViewModelMethods  method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viModel.createElement(controlId, htmlTagCanvasId, 'ni-numeric-text-box', settings);
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viewModel.numericTextBoxViewModelMethods();
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows to call the modelPropertyChanged method with a property update', function () {
        settings.maximum = 11.0;
        settings.minimum = 100.0;
        viModel.createElement(controlId, htmlTagCanvasId, 'ni-numeric-text-box', settings);
        numericTextBoxElement = document.getElementById(controlId);
        var internalControl = $(numericTextBoxElement.firstElementChild);
        frontPanelControls = viModel.getRootModelControls();
        numericTextBoxModel = frontPanelControls[controlId];
        expect(numericTextBoxModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        numericTextBoxModel.updateModelFromDataSource({maximum: 10.0});
        Platform.performMicrotaskCheckpoint();
        var maximum = internalControl.jqxNumberInput('max');
        expect(maximum).toEqual(10.0);

        // Verify unknown properties are handled correctly
        viewModel.modelPropertyChanged('{Unknown}');
        maximum = internalControl.jqxNumberInput('max');
        expect(maximum).toEqual(10.0);

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
        viModel.createElement(controlId, htmlTagCanvasId, 'ni-numeric-text-box', { id: controlId, kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_NUMERIC_TEXTBOX });
        numericTextBoxElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        numericTextBoxModel = frontPanelControls[controlId];
        var val = numericTextBoxModel.getValue();
        expect(val).toEqual(0.0);
        numericTextBoxElement.value = 6.0;
        Platform.performMicrotaskCheckpoint();
        var newVal = numericTextBoxModel.getValue();
        expect(newVal).toEqual(6);
        viModel.removeFrontPanelControl(controlId);
        if (deleteVireoRuntime) {
            NationalInstruments.HtmlVI.niVireoRuntime = undefined;
        }
    });
});