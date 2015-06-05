//****************************************
// Tests for BooleanButtonModel class
// National Instruments Copyright 2014
//****************************************

describe('A BooleanButtonViewButtonModel', function () {
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
    if(viModel === null) {
       viModel = NationalInstruments.HtmlVI.viModelsService.addVI(viName);
    }
    
    var frontPanelControls, buttonModel, buttonElement, settings;
    
    beforeEach(function () {
        settings = {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
            content: 'content',
            contentVisible: true,
            value: false,
            clickMode: NationalInstruments.HtmlVI.BooleanControlModelClickModeEnum.PRESS,
            momentary: false,
            left: '100px',
            top: '200px',
            width: '300px',
            height: '400px'
        };
    });

    it('allows to call the booleanButtonViewModelMethods  method', function () {
        viModel.createElement(controlId, htmlTagCanvasId, 'ni-boolean-button', settings);
        
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viewModel.booleanButtonViewModelMethods();
        viModel.removeFrontPanelControl(controlId);
    });
    
    it('allows creating an instance with value set to true', function () {
        settings.value = true;
        settings.id = controlId;
        viModel.createElement(controlId, htmlTagCanvasId, 'ni-boolean-button', settings);
        buttonElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        buttonModel = frontPanelControls[controlId];
        var val = buttonModel.getValue();
        
        expect(val).toEqual(true);

        viModel.removeFrontPanelControl(controlId);
    });
    
    it('allows creating an instance with value set to false', function () {
        settings.value = false;
        settings.id = controlId;
        viModel.createElement(controlId, htmlTagCanvasId, 'ni-boolean-button', settings);
        buttonElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        buttonModel = frontPanelControls[controlId];
        var val = buttonModel.getValue();
        
        expect(val).toEqual(false);

        viModel.removeFrontPanelControl(controlId);
    });
    
    it('allows to call the modelPropertyChanged method with a property update', function () {
        viModel.createElement(controlId, htmlTagCanvasId, 'ni-boolean-button', {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
            content: '',
            contentVisible: false,
            value: true,
            clickMode: NationalInstruments.HtmlVI.BooleanControlModelClickModeEnum.RELEASE,
            momentary: true
        });
        
        buttonElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        buttonModel = frontPanelControls[controlId];
        expect(buttonModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        var internalControl = $(buttonElement.firstElementChild);
        
        expect(internalControl.attr('value')).toEqual('');
        expect(internalControl.jqxToggleButton('toggled')).toEqual(true);
        expect(buttonModel.getMomentary()).toEqual(true);
        expect(buttonModel.getClickMode()).toEqual(NationalInstruments.HtmlVI.BooleanControlModelClickModeEnum.RELEASE);
        
        buttonModel.updateModelFromDataSource(settings);
        Platform.performMicrotaskCheckpoint();
        
        expect(internalControl.attr('value')).toEqual('content');
        expect(internalControl.jqxToggleButton('toggled')).toEqual(false);
        expect(buttonModel.getMomentary()).toEqual(false);
        expect(buttonModel.getClickMode()).toEqual(NationalInstruments.HtmlVI.BooleanControlModelClickModeEnum.PRESS);
        
        settings.contentVisible = false;
        
        buttonModel.updateModelFromDataSource(settings);
        Platform.performMicrotaskCheckpoint();
        
        expect(internalControl.attr('value')).toEqual('');

        
        viModel.removeFrontPanelControl(controlId);
        // add check that it is gone
    });

    it('allows a click with mechnical action set to when released to update value', function () {
        var deleteVireoRuntime = false;
        if (NationalInstruments.HtmlVI.niVireoRuntime === undefined) {
            NationalInstruments.HtmlVI.niVireoRuntime =
            {
                processUpdateMessage: function () {
                }
            };
            deleteVireoRuntime = true;
        }

        viModel.createElement(controlId, htmlTagCanvasId, 'ni-boolean-button', {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
            visible: true,
            value: false,
            momentary: false,
            clickMode: NationalInstruments.HtmlVI.BooleanControlModelClickModeEnum.RELEASE
        });
        buttonElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        buttonModel = frontPanelControls[controlId];
        
        // Button not pressed
        expect(buttonModel.getValue()).toEqual(false);
        
        // Button mouse down
        $('#' + controlId).simulate('mousedown');
        expect(buttonModel.getValue()).toEqual(false);
        
        //Button mouse up
        $('#' + controlId).simulate('mouseup');
        expect(buttonModel.getValue()).toEqual(true);
        
        viModel.removeFrontPanelControl(controlId);
        if (deleteVireoRuntime) {
            NationalInstruments.HtmlVI.niVireoRuntime = undefined;
        }
    });
    
    it('allows a click with mechnical action set to when pressed to update value', function () {
        var deleteVireoRuntime = false;
        if (NationalInstruments.HtmlVI.niVireoRuntime === undefined) {
            NationalInstruments.HtmlVI.niVireoRuntime =
            {
                processUpdateMessage: function () {
                }
            };
            deleteVireoRuntime = true;
        }

        viModel.createElement(controlId, htmlTagCanvasId, 'ni-boolean-button', {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
            visible: true,
            value: false,
            momentary: false,
            clickMode: NationalInstruments.HtmlVI.BooleanControlModelClickModeEnum.PRESS
        });
        buttonElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        buttonModel = frontPanelControls[controlId];
        
        // Button not pressed
        expect(buttonModel.getValue()).toEqual(false);
        
        // Button mouse down
        $('#' + controlId).simulate('mousedown');
        expect(buttonModel.getValue()).toEqual(true);
        
        //Button mouse up
        $('#' + controlId).simulate('mouseup');
        expect(buttonModel.getValue()).toEqual(true);
        
        viModel.removeFrontPanelControl(controlId);
        if (deleteVireoRuntime) {
            NationalInstruments.HtmlVI.niVireoRuntime = undefined;
        }
    });
    
    it('allows a click with mechnical action set to until released to update value', function () {
        var deleteVireoRuntime = false;
        if (NationalInstruments.HtmlVI.niVireoRuntime === undefined) {
            NationalInstruments.HtmlVI.niVireoRuntime =
            {
                processUpdateMessage: function () {
                }
            };
            deleteVireoRuntime = true;
        }

        viModel.createElement(controlId, htmlTagCanvasId, 'ni-boolean-button', {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
            visible: true,
            value: false,
            momentary: true,
            clickMode: NationalInstruments.HtmlVI.BooleanControlModelClickModeEnum.RELEASE
        });
        buttonElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        buttonModel = frontPanelControls[controlId];
        
        // Button not pressed
        expect(buttonModel.getValue()).toEqual(false);
        
        // Button mouse down
        $('#' + controlId).simulate('mousedown');
        expect(buttonModel.getValue()).toEqual(true);
        
        //Button mouse up
        $('#' + controlId).simulate('mouseup');
        expect(buttonModel.getValue()).toEqual(false);
        
        viModel.removeFrontPanelControl(controlId);
        if (deleteVireoRuntime) {
            NationalInstruments.HtmlVI.niVireoRuntime = undefined;
        }
    });
    

    it('allows to create with contentVisible false', function () {
        var deleteVireoRuntime = false;
        if (NationalInstruments.HtmlVI.niVireoRuntime === undefined) {
            NationalInstruments.HtmlVI.niVireoRuntime =
            {
                processUpdateMessage: function () {
                }
            };
            deleteVireoRuntime = true;
        }

        viModel.createElement(controlId, htmlTagCanvasId, 'ni-boolean-button', {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
            visible: true,
            contentVisible: false,
            value: true,
            falseContent: 'isfalse',
            trueContent: 'istrue'
        });
        buttonElement = document.getElementById(controlId);
        buttonModel = frontPanelControls[controlId];
        expect($('#' + controlId).attr('value')).toEqual('');

        buttonModel.updateModelFromDataSource({
            contentVisible: true
        });
        Platform.performMicrotaskCheckpoint();

        viModel.removeFrontPanelControl(controlId);
        if (deleteVireoRuntime) {
            NationalInstruments.HtmlVI.niVireoRuntime = undefined;
        }
    });
});