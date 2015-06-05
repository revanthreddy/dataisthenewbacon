//****************************************
// Tests for BooleanButtonModel class
// National Instruments Copyright 2014
//****************************************

describe('A BooleanLEDViewModel', function () {
    'use strict';
    var viName = 'viName';
    var controlId = 'Function1';
    var controlId2 = 'Function2';
    var controlId3 = 'Function3';
    var frontPanelCanvas = document.createElement('section');
    var htmlTagCanvasId = 'FrontPanelCanvas';
    frontPanelCanvas.id = htmlTagCanvasId;
    if (document.body === null) {
        var body = document.createElement('body');
        document.body = body;
    }

    document.body.appendChild(frontPanelCanvas);
    var viModel = new NationalInstruments.HtmlVI.VIModel(viName);
    var frontPanelControls, buttonModel, buttonElement, settings;
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
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_LED,
            trueContent: 'trueContent',
            falseContent: 'falseContent',
            contentVisible: true,
            shape: NationalInstruments.HtmlVI.BooleanLEDModelShapeEnum.ROUND,
            value: false,
            clickMode: NationalInstruments.HtmlVI.BooleanControlModelClickModeEnum.PRESS,
            momentary: false
        };
    });

    it('allows to call the BooleanLEDViewModelMethods  method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viModel.addFrontPanelControl(settings);
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viewModel.BooleanLEDViewModelMethods();
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows creation with false value to create falseContent', function () {
        viModel.addFrontPanelControl(
        {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_LED,
            value: false,
            falseContent: 'falseContent',
            visible: true
        });
        buttonElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        buttonModel = frontPanelControls[controlId];
        expect(buttonModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        var content = $('#' + controlId).attr('value');
        expect(content).toEqual('falseContent');
        viModel.removeFrontPanelControl(controlId);
    });
    
    it('allows creation with true value to create trueContent', function () {
        viModel.addFrontPanelControl(
        {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_LED,
            value: true,
            trueContent: 'trueContent',
            visible: true
        });
        buttonElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        buttonModel = frontPanelControls[controlId];
        expect(buttonModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        
        var content = $('#' + controlId).attr('value');
        expect(content).toEqual('trueContent');
        viModel.removeFrontPanelControl(controlId);
    });
    
    it('allows creation with shape set to square', function () {
        viModel.addFrontPanelControl(
        {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_LED,
            value: true,
            trueContent: 'trueContent',
            visible: true,
            shape: NationalInstruments.HtmlVI.BooleanLEDModelShapeEnum.SQUARE
        });
        buttonElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        buttonModel = frontPanelControls[controlId];
        expect(buttonModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        
        expect(buttonModel.getShape()).toEqual(NationalInstruments.HtmlVI.BooleanLEDModelShapeEnum.SQUARE);
        viModel.removeFrontPanelControl(controlId);
    });
    
    it('allows to call the modelPropertyChanged method with a property update', function () {
        viModel.addFrontPanelControl(
        {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_LED,
            visible: true,
            shape: NationalInstruments.HtmlVI.BooleanLEDModelShapeEnum.ROUND
        });
        buttonElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        buttonModel = frontPanelControls[controlId];
        expect(buttonModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        
        buttonModel.updateModelFromDataSource(settings);
        Platform.performMicrotaskCheckpoint();
        var content = $('#' + controlId).attr('value');
        expect(content).toEqual('falseContent');
        
        buttonModel.updateModelFromDataSource({ value: true });
        Platform.performMicrotaskCheckpoint();
        content = $('#' + controlId).attr('value');
        expect(content).toEqual('trueContent');
        
        buttonModel.updateModelFromDataSource({ trueContent: 'this is all true' });
        Platform.performMicrotaskCheckpoint();
        content = $('#' + controlId).attr('value');
        expect(content).toEqual('this is all true');
        
        buttonModel.updateModelFromDataSource(settings);
        buttonModel.updateModelFromDataSource({ contentVisible: false });
        Platform.performMicrotaskCheckpoint();
        content = $('#' + controlId).attr('value');
        expect(content).toEqual('');
        
        buttonModel.updateModelFromDataSource({ value: true,
                                                contentVisible: true,
                                              });
        Platform.performMicrotaskCheckpoint();
        content = $('#' + controlId).attr('value');
        expect(content).toEqual('trueContent');
        
        
        buttonModel.updateModelFromDataSource({
            shape: NationalInstruments.HtmlVI.BooleanLEDModelShapeEnum.SQUARE
        });
        Platform.performMicrotaskCheckpoint();
        content = $('#' + controlId).attr('value');
        expect(buttonModel.getShape()).toEqual(NationalInstruments.HtmlVI.BooleanLEDModelShapeEnum.SQUARE);
        
        buttonModel.updateModelFromDataSource(settings);
        Platform.performMicrotaskCheckpoint();
        content = $('#' + controlId).attr('value');
        expect(content).toEqual('falseContent');
        
        expect($('#' + controlId).jqxToggleButton('toggled')).toEqual(false);
        expect(buttonModel.getMomentary()).toEqual(false);
        expect(buttonModel.getClickMode()).toEqual(NationalInstruments.HtmlVI.BooleanControlModelClickModeEnum.PRESS);
        
        buttonModel.updateModelFromDataSource({
            value: false,
            clickMode: NationalInstruments.HtmlVI.BooleanControlModelClickModeEnum.RELEASE,
            momentary: true
        });
        Platform.performMicrotaskCheckpoint();
        
        expect($('#' + controlId).jqxToggleButton('toggled')).toEqual(false);
        expect(buttonModel.getMomentary()).toEqual(true);
        expect(buttonModel.getClickMode()).toEqual(NationalInstruments.HtmlVI.BooleanControlModelClickModeEnum.RELEASE);
        
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

        var button = document.getElementById(controlId);
        button.id = controlId2;
        viModel.addFrontPanelControl(
        {
            id: controlId2,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_LED,
            visible: true
        });
        buttonElement = document.getElementById(controlId2);
        frontPanelControls = viModel.getRootModelControls();
        buttonModel = frontPanelControls[controlId2];
        var val = buttonModel.getValue();
        expect(val).toEqual(false);

        // Need to use simulate since mechanical actions fires on addEventListener events, not bind events
        $('#' + controlId2).simulate('mousedown');
        $('#' + controlId2).simulate('mouseup');
        
        var newVal = buttonModel.getValue();
        expect(newVal).toEqual(true);
        viModel.removeFrontPanelControl(controlId2);

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
        var button = document.getElementById(controlId);
        button.id = controlId3;
        viModel.addFrontPanelControl(
        {
            id: controlId3,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_LED,
            contentVisible: false,
            value: false,
            falseContent: 'isfalse',
            trueContent: 'istrue'
        });
        buttonElement = document.getElementById(controlId3);
        frontPanelControls = viModel.getRootModelControls();
        buttonModel = frontPanelControls[controlId3];
        var content = $('#' + controlId3).attr('value');
        expect(content).toEqual('');

        buttonModel.updateModelFromDataSource({
            contentVisible: true
        });
        Platform.performMicrotaskCheckpoint();

        expect($('#' + controlId3).attr('value')).toEqual('isfalse');

        viModel.removeFrontPanelControl(controlId3);
        if (deleteVireoRuntime) {
            NationalInstruments.HtmlVI.niVireoRuntime = undefined;
        }
    });
});