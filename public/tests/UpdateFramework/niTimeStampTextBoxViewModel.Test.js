//****************************************
// Tests for TimeStampTextBoxViewModel class
// National Instruments Copyright 2015
//****************************************

describe('A TimeStampTextBoxViewModel', function () {
    'use strict';
    var viName = 'Function.gvi';
    var controlId = 'TimeStampTextBoxViewModelId';
    var elementName = 'ni-time-stamp-text-box';
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
            kind:NationalInstruments.HtmlVI.ControlKindEnum.NI_TIME_STAMP_TEXT_BOX,
            visible: true,
            value: 2714018400,
            readOnly: false,
            configuration: {
                formatString: 'F'
            },
            left: '272px',
            top: '166px',
            width: '90px',
            height: '22px'
        };

        updateSettings = {
            value: new Date(2010, 11, 31),
            readOnly: true
        };
    });

    it('allows to call the timeStampTextBoxViewModelMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viModel.createElement(controlId, htmlTagCanvasId, elementName, settings);
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viewModel.timeStampTextBoxViewModelMethods();
        viModel.removeFrontPanelControl(controlId);
    });
    
    it('allows to call the modelPropertyChanged method with a property update', function () {
        // Verify that the model and viewModel were created
        viModel.createElement(controlId, htmlTagCanvasId, elementName, settings);
        controlElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        controlModel = frontPanelControls[controlId];
        expect(controlModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();

        // Verify properties were correctly set
        expect(controlModel.value).toEqual(settings.value);
        expect(controlModel.readOnly).toEqual(false);

        // Verify property updates is working
        controlModel.updateModelFromDataSource(updateSettings);
        Platform.performMicrotaskCheckpoint();
        expect(controlModel.value).toEqual(updateSettings.value);
        expect(controlModel.readOnly).toEqual(updateSettings.readOnly);

        // Verify unknown properties are handled correctly
        viewModel.modelPropertyChanged('{Unknown}');
        expect(controlModel.value).toEqual(updateSettings.value);
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

        var oldValue = controlModel.getValue();
        expect(oldValue).toEqual(2714018400);
        var newDate = new Date(2010, 11, 31, 11, 59, 59);
        $(internalControl)[0].value = newDate;
        // Note: event name changes from valuechanged to valueChanged in different versions of jqwidgets
        // http://www.jqwidgets.com/community/topic/cannot-bind-to-events/
        $(internalControl).trigger($.Event('valuechanged', { args: { date: newDate } }));
        
        var newValue = controlModel.getValue();
        expect(newValue).toEqual(3376663199);
        viModel.removeFrontPanelControl(controlId);
        
        if (deleteVireoRuntime) {
            NationalInstruments.HtmlVI.niVireoRuntime = undefined;
        }
    });
    

    it('allows to create an indicator', function () {
        settings.readOnly = true;
        viModel.createElement(controlId, htmlTagCanvasId, elementName, settings);
        controlElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        controlModel = frontPanelControls[controlId];
        expect(controlModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();

        // Verify properties were correctly set
        expect(controlModel.value).toEqual(settings.value);
        expect(controlModel.readOnly).toEqual(true);
    });
});
