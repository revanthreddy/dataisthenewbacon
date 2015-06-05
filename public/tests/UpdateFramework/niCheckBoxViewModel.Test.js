//****************************************
// Tests for CheckBoxViewModel class
// National Instruments Copyright 2015
//****************************************

describe('A CheckBoxViewModel', function () {
    'use strict';
    var viName = 'viName';
    var controlId = 'CheckBoxViewModelId';
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
        button.style.top = '68px';
        button.style.width = '88px';
        button.style.height = '23px';
        button.id = controlId;
        frontPanelCanvas.appendChild(button);
        settings = {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CHECK_BOX,
            visible: true,
            value: false,
            contentVisible: true,
            content: 'Off/On',
            clickMode: NationalInstruments.HtmlVI.BooleanControlModelClickModeEnum.PRESS,
            momentary: false
        };
        updateSettings = {
            value: true,
            contentVisible: false,
            content: 'none',
            clickMode: NationalInstruments.HtmlVI.BooleanControlModelClickModeEnum.RELEASE,
            momentary: true
        };
    });

    it('allows to call the checkBoxViewModelMethods  method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viModel.addFrontPanelControl(settings);
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viewModel.checkBoxViewModelMethods();
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
        expect(controlModel.content).toEqual(settings.content);
        expect(controlModel.clickMode).toEqual(settings.clickMode);
        expect(controlModel.momentary).toEqual(settings.momentary);

        // Verify property updates is working
        controlModel.updateModelFromDataSource(updateSettings);
        Platform.performMicrotaskCheckpoint();
        expect(controlModel.value).toEqual(updateSettings.value);
        expect(controlModel.contentVisible).toEqual(updateSettings.contentVisible);
        expect(controlModel.content).toEqual(updateSettings.content);
        expect(controlModel.clickMode).toEqual(updateSettings.clickMode);
        expect(controlModel.momentary).toEqual(updateSettings.momentary);

        // Verify unknown properties are handled correctly
        viewModel.modelPropertyChanged('{Unknown}');
        expect(controlModel.value).toEqual(updateSettings.value);
        expect(controlModel.contentVisible).toEqual(updateSettings.contentVisible);
        expect(controlModel.content).toEqual(updateSettings.content);

        viModel.removeFrontPanelControl(controlId);
    });

    it('allows to call the click event to update the value', function () {
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
        viModel.addFrontPanelControl(settings);
        controlElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        controlModel = frontPanelControls[controlId];

        var val = controlModel.getValue();
        expect(val).toEqual(settings.value);

        // Need to use simulate since mechanical actions fires on addEventListener events, not bind events
        $('#' + controlId).simulate('mousedown');
        $('#' + controlId).simulate('mouseup');
        var newVal = controlModel.getValue();
        expect(newVal).toEqual(!settings.value);
        viModel.removeFrontPanelControl(controlId);

        if (deleteVireoRuntime) {
            NationalInstruments.HtmlVI.niVireoRuntime = undefined;
        }
    });

    it('allows to create with contentVisible false', function () {
        // Verify that the model and viewModel were created
        settings.contentVisible = false;
        viModel.addFrontPanelControl(settings);
        controlElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        controlModel = frontPanelControls[controlId];
        var viewModel = viModel.findViewModel(controlId);

        expect(controlModel.contentVisible).toEqual(false);
        expect(viewModel.textHtmlNode).toBeDefined();
        expect(viewModel.textHtmlNode.nodeValue).toEqual('');

        viModel.removeFrontPanelControl(controlId);
    });
    
    it('allows instantiation with a false value', function () {
        // Verify that the model and viewModel were created
        settings.value = true;
        viModel.addFrontPanelControl(settings);
        controlElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        controlModel = frontPanelControls[controlId];

        expect($('#' + controlId).jqxCheckBox('checked')).toEqual(true);

        viModel.removeFrontPanelControl(controlId);
    });
});