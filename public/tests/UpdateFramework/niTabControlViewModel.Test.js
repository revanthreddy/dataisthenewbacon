//****************************************
// Tests for BooleantabModel class
// National Instruments Copyright 2014
//****************************************

describe('A TabControlViewModel', function () {
    'use strict';
    var viName = 'viName';
    var controlId = 'Function1';
    var frontPanelCanvas = document.createElement('section');
    var htmlTagCanvasId = 'FrontPanelCanvas';
    frontPanelCanvas.id = htmlTagCanvasId;
    if (document.body === null) {
        var body = document.createElement('body');
        document.body = body;
    }

    document.body.appendChild(frontPanelCanvas);
    var viModel = new NationalInstruments.HtmlVI.VIModel(viName);
    var frontPanelControls, tabModel, tabElement, settings;
    beforeEach(function () {
        var tab = document.createElement('div');
        tab.style.position = 'absolute';
        tab.style.left = '10px';
        tab.style.top = '20px';
        tab.style.width = '800px';
        tab.style.height = '1200px';
        tab.id = controlId;
        frontPanelCanvas.appendChild(tab);
        settings = {
            id: controlId,
            selectedIndex: 0,
            placement: 'top',
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_TAB_CONTROL,
            tabs: [{
                tabIndex: '0',
                header: 'someText',
                id: 'Function11',
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_TAB_ITEM
            }],
            getOwner: function () { return viModel; }
        };
    });
    afterEach(function () {
        tabElement = document.getElementById(controlId);
        if (tabElement !== null) {
            tabElement.parentNode.removeChild(tabElement);
        }
    });
    it('allows to call the tabControlViewModelMethods    method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viModel.addFrontPanelControl(settings);
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viewModel.tabControlViewModelMethods();
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows creation with default settings', function () {
        viModel.addFrontPanelControl(
        {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_TAB_CONTROL,
            visible: true,
            tabs: [{
                id: 'Function11',
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_TAB_ITEM
            }],
            getOwner: function () { return viModel; }
        });
        tabElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        tabModel = frontPanelControls[controlId];
        expect(tabModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viModel.removeFrontPanelControl(controlId);
    });
    it('allows to call the modelPropertyChanged method with a property update', function () {
        viModel.addFrontPanelControl(
        {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_TAB_CONTROL,
            visible: true,
            tabs: [{
                id: 'Function11',
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_TAB_ITEM
            }],
            getOwner: function () { return viModel; }
        });
        tabElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        tabModel = frontPanelControls[controlId];
        expect(tabModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        tabModel.updateModelFromDataSource(settings);
        Platform.performMicrotaskCheckpoint();
        viModel.removeFrontPanelControl(controlId);
    });
});