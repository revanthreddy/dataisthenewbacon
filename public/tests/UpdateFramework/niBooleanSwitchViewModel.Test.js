//****************************************
// Tests for BooleanSwitchViewModel class
// National Instruments Copyright 2015
//****************************************

describe('A BooleanSwitchViewModel', function () {
    'use strict';
    var viName = 'viName';
    var controlId = 'BooleanSwitchViewModelId';
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
        var button = document.createElement('div');
        button.style.position = 'absolute';
        button.style.left = '32px';
        button.style.top = '212px';
        button.style.width = '50px';
        button.style.height = '50px';
        button.id = controlId;
        frontPanelCanvas.appendChild(button);
        settings = {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_SWITCH,
            visible: true,
            shape: NationalInstruments.HtmlVI.BooleanSwitchModelShapeEnum.SLIDER,
            orientation: 'vertical',
            value: false,
            contentVisible: true,
            trueContent: 'On',
            falseContent: 'Off'
        };

        updateSettings = {
            orientation: 'horizontal',
            value: true,
            contentVisible: false,
            trueContent: 'On-',
            falseContent: 'Off-'
        };
    });

    it('allows to call the booleanSwitchViewModelMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viModel.addFrontPanelControl(settings);
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viewModel.booleanSwitchViewModelMethods();
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows to call the modelPropertyChanged method with a property update', function () {
        // Verify that the model and viewModel were created
        viModel.addFrontPanelControl(settings);
        controlElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        controlModel = frontPanelControls[controlId];
        expect(controlModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();

        // Verify properties were correctly set
        expect(controlModel.value).toEqual(settings.value);
        expect(controlModel.contentVisible).toEqual(settings.contentVisible);
        expect(controlModel.orientation).toEqual(settings.orientation);
        expect(controlModel.trueContent).toEqual(settings.trueContent);
        expect(controlModel.falseContent).toEqual(settings.falseContent);

        // Verify property updates is working
        controlModel.updateModelFromDataSource(updateSettings);
        Platform.performMicrotaskCheckpoint();
        expect(controlModel.value).toEqual(updateSettings.value);
        expect(controlModel.contentVisible).toEqual(updateSettings.contentVisible);
        expect(controlModel.orientation).toEqual(updateSettings.orientation);
        expect(controlModel.trueContent).toEqual(updateSettings.trueContent);
        expect(controlModel.falseContent).toEqual(updateSettings.falseContent);

        // Verify unknown properties are handled correctly
        viewModel.modelPropertyChanged('{Unknown}');
        expect(controlModel.value).toEqual(updateSettings.value);
        expect(controlModel.contentVisible).toEqual(updateSettings.contentVisible);
        expect(controlModel.orientation).toEqual(updateSettings.orientation);
        expect(controlModel.trueContent).toEqual(updateSettings.trueContent);
        expect(controlModel.falseContent).toEqual(updateSettings.falseContent);

        viModel.removeFrontPanelControl(controlId);
    });

    it('allows to create with contentVisible false', function () {
        // Verify that the model and viewModel were created
        settings.contentVisible = false;
        viModel.addFrontPanelControl(settings);
        controlElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        controlModel = frontPanelControls[controlId];

        expect(controlModel.contentVisible).toEqual(settings.contentVisible);
        var onLabel = $('#' + controlId).jqxSwitchButton('onLabel');
        expect(onLabel).toEqual('');
        var offLabel = $('#' + controlId).jqxSwitchButton('offLabel');
        expect(offLabel).toEqual('');

        viModel.removeFrontPanelControl(controlId);
    });

    it('allows to create with shape set to power', function () {
        // Verify that the model and viewModel were created
        settings.shape = NationalInstruments.HtmlVI.BooleanSwitchModelShapeEnum.POWER;
        viModel.addFrontPanelControl(settings);
        controlElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        controlModel = frontPanelControls[controlId];
        expect(controlModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();

        expect(viewModel.checkBoxElement).toBeDefined();

        // Verify property updates is working
        controlModel.updateModelFromDataSource(updateSettings);
        Platform.performMicrotaskCheckpoint();
        expect(controlModel.value).toEqual(updateSettings.value);
        expect(controlModel.contentVisible).toEqual(updateSettings.contentVisible);
        expect(controlModel.orientation).toEqual(updateSettings.orientation);
        expect(controlModel.trueContent).toEqual(updateSettings.trueContent);
        expect(controlModel.falseContent).toEqual(updateSettings.falseContent);

        viModel.removeFrontPanelControl(controlId);
    });

    it('allows to call the click event to update the value when shape is set to power', function () {
        var deleteVireoRuntime = false;
        if (NationalInstruments.HtmlVI.niVireoRuntime === undefined) {
            NationalInstruments.HtmlVI.niVireoRuntime =
            {
                processUpdateMessage: function () {
                }
            };
            deleteVireoRuntime = true;
        }

        // Verify that the model and viewModel were created
        settings.shape = NationalInstruments.HtmlVI.BooleanSwitchModelShapeEnum.POWER;
        viModel.addFrontPanelControl(settings);
        controlElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        controlModel = frontPanelControls[controlId];
        expect(controlModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();

        var val = controlModel.getValue();
        expect(val).toEqual(settings.value);
        var e = $.Event('click');
        $('#' + controlId).trigger(e);
        var newVal = controlModel.getValue();
        expect(newVal).toEqual(!settings.value);
        viModel.removeFrontPanelControl(controlId);

        if (deleteVireoRuntime) {
            NationalInstruments.HtmlVI.niVireoRuntime = undefined;
        }
    });

    it('allows to create with shape set to round', function () {
        // Verify that the model and viewModel were created
        settings.shape = NationalInstruments.HtmlVI.BooleanSwitchModelShapeEnum.ROUND;
        viModel.addFrontPanelControl(settings);
        controlElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        controlModel = frontPanelControls[controlId];
        expect(controlModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();

        expect(viewModel.checkBoxElement).toBeDefined();

        // Verify property updates is working
        controlModel.updateModelFromDataSource(updateSettings);
        Platform.performMicrotaskCheckpoint();
        expect(controlModel.value).toEqual(updateSettings.value);
        expect(controlModel.contentVisible).toEqual(updateSettings.contentVisible);
        expect(controlModel.orientation).toEqual(updateSettings.orientation);
        expect(controlModel.trueContent).toEqual(updateSettings.trueContent);
        expect(controlModel.falseContent).toEqual(updateSettings.falseContent);

        viModel.removeFrontPanelControl(controlId);
    });

    it('allows to call the click event to update the value when shape is set to round', function () {
        var deleteVireoRuntime = false;
        if (NationalInstruments.HtmlVI.niVireoRuntime === undefined) {
            NationalInstruments.HtmlVI.niVireoRuntime =
            {
                processUpdateMessage: function () {
                }
            };
            deleteVireoRuntime = true;
        }

        // Verify that the model and viewModel were created
        settings.shape = NationalInstruments.HtmlVI.BooleanSwitchModelShapeEnum.ROUND;
        viModel.addFrontPanelControl(settings);
        controlElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        controlModel = frontPanelControls[controlId];
        expect(controlModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();

        var val = controlModel.getValue();
        expect(val).toEqual(settings.value);
        var e = $.Event('click');
        $('#' + controlId).trigger(e);
        var newVal = controlModel.getValue();
        expect(newVal).toEqual(!settings.value);
        viModel.removeFrontPanelControl(controlId);

        if (deleteVireoRuntime) {
            NationalInstruments.HtmlVI.niVireoRuntime = undefined;
        }
    });
});