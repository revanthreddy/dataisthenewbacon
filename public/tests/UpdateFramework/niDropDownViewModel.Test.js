//****************************************
// Tests for DropDownViewModel class
// National Instruments Copyright 2015
//****************************************

describe('A DropDownViewModel', function () {
    'use strict';

    var viName = 'viName';
    var controlId = 'DropDownViewModelId';
    var frontPanelCanvas = document.createElement('section');
    frontPanelCanvas.id = 'FrontPanelCanvas';

    if (document.body === null) {
        document.body = document.createElement('body');
    }

    document.body.appendChild(frontPanelCanvas);
    var viModel = new NationalInstruments.HtmlVI.VIModel(viName);
    var frontPanelControls, controlModel, controlElement, settings, updateSettings;

    beforeEach(function () {
        var dropDown = document.createElement('div');
        dropDown.style.position = 'absolute';
        dropDown.style.left = '32px';
        dropDown.style.top = '68px';
        dropDown.style.width = '88px';
        dropDown.style.height = '23px';
        dropDown.id = controlId;
        frontPanelCanvas.appendChild(dropDown);

        settings = {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_DROPDOWN,
            visible: true,
            selectedIndex: 0,
            source: [ 'alpha', 'beta', 'charlie' ]
        };

        updateSettings = {
            selectedIndex: 1,
            source: [ 'zero', 'one', 'two' ]
        };
    });

    afterEach(function () {
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows calls to the dropDownViewModelMethods function', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viModel.addFrontPanelControl(settings);
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viewModel.dropDownViewModelMethods();
    });

    it('allows calls to the modelPropertyChanged method with a property update', function () {
        // Verify that the model and viewModel were created
        viModel.addFrontPanelControl(settings);
        controlElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        controlModel = frontPanelControls[controlId];
        expect(controlModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();

        // Verify properties were correctly set
        expect(controlModel.selectedIndex).toEqual(settings.selectedIndex);
        expect(controlModel.source).toEqual(settings.source);

        // Verify property updates is working
        controlModel.updateModelFromDataSource(updateSettings);
        Platform.performMicrotaskCheckpoint();
        expect(controlModel.selectedIndex).toEqual(updateSettings.selectedIndex);
        expect(controlModel.source).toEqual(updateSettings.source);

        // Verify unknown propertyes are handled correctly
        viewModel.modelPropertyChanged('{Unknown}');
        expect(controlModel.selectedIndex).toEqual(updateSettings.selectedIndex);
        expect(controlModel.source).toEqual(updateSettings.source);
    });

    it('responds to the select event and sets the new selected index', function () {
        viModel.addFrontPanelControl(settings);
        controlElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        controlModel = frontPanelControls[controlId];
        $('#' + controlId).trigger($.Event('select', {args: {index: 2}}));
        expect(controlModel.selectedIndex).toEqual(2);
    });
});
