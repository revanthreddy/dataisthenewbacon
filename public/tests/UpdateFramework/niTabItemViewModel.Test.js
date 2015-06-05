//****************************************
// Tests for BooleantabModel class
// National Instruments Copyright 2014
//****************************************

describe('A TabItemViewModel', function () {
    'use strict';
    var viName = 'viName';
    var controlId = 'Function1';
    var tabId = 'Function11';
    var buttonId = 'Function4';
    var frontPanelCanvas = document.createElement('section');
    var htmlTagCanvasId = 'FrontPanelCanvas';
    frontPanelCanvas.id = htmlTagCanvasId;
    if (document.body === null) {
        var body = document.createElement('body');
        document.body = body;
    }

    document.body.appendChild(frontPanelCanvas);
    var viModel = new NationalInstruments.HtmlVI.VIModel(viName);
    var frontPanelItems, tabModel, tabElement, settings, settings2;
    beforeEach(function () {
        var tab = document.createElement('div');
        tab.style.position = 'absolute';
        tab.style.left = '10px';
        tab.style.top = '20px';
        tab.style.width = '800px';
        tab.style.height = '1200px';
        tab.id = controlId;
        frontPanelCanvas.appendChild(tab);
        var ul = document.createElement('ul');
        ul.id = controlId + '_ul';
        tab.appendChild(ul);
        var li = document.createElement('li');
        li.id = tabId + '_li';
        var txt = document.createTextNode('someText');
        li.appendChild(txt);
        ul.appendChild(li);
        var div = document.createElement('div');
        div.id = tabId;
        tab.appendChild(div);
        var button = document.createElement('input');
        button.style.position = 'absolute';
        button.style.left = '10px';
        button.style.top = '20px';
        button.style.width = '300px';
        button.style.height = '400px';
        button.id = buttonId;
        div.appendChild(button);
        settings = {
            id: controlId,
            selectedIndex: 0,
            placement: 'top',
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_TAB_CONTROL,
            tabs: [{
                tabIndex: '0',
                header: 'someText',
                id: tabId,
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_TAB_ITEM
            }],
            getOwner: function () { return viModel; }
        };
        settings2 = {
            tabIndex: '1',
            header: 'someText4',
            children: [{
                id: buttonId,
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
                content: 'content',
                contentVisible: true,
                getId: function () { return buttonId; },
                getDOMType: function () { return 'input'; }
            }]
        };
    });
    afterEach(function () {
        tabElement = document.getElementById(controlId);
        if (tabElement !== null) {
            tabElement.parentNode.removeChild(tabElement);
        }
    });
    it('allows to call the TabItemViewModelMethods    method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viModel.addFrontPanelControl(settings);
        var viewModel = viModel.findViewModel(tabId);
        expect(viewModel).toBeDefined();
        viewModel.TabItemViewModelMethods();
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows creation with default settings', function () {
        viModel.addFrontPanelControl(
        {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_TAB_CONTROL,
            visible: true,
            tabs: [{
                tabIndex: '0',
                header: 'someText2',
                id: tabId,
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_TAB_ITEM,
                children: [{
                    id: buttonId,
                    kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
                    content: 'content',
                    contentVisible: true,
                    getId: function () { return buttonId; },
                    getDOMType: function () { return 'input'; }
                    }
                ]
            }],
            getOwner: function () { return viModel; }
        });
        tabElement = document.getElementById(controlId);
        frontPanelItems = viModel.getRootModelControls();
        tabModel = frontPanelItems[tabId];
        expect(tabModel).toBeDefined();
        var viewModel = viModel.findViewModel(tabId);
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
                id: tabId,
                tabIndex: '0',
                header: 'someText3',
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_TAB_ITEM,
                children: [{
                    id: buttonId,
                    kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
                    content: 'content',
                    contentVisible: true,
                    getId: function () { return buttonId; },
                    getDOMType: function () { return 'input'; }
                }]
            }],
            getOwner: function () { return viModel; }
        });
        tabElement = document.getElementById(controlId);
        frontPanelItems = viModel.getRootModelControls();
        tabModel = frontPanelItems[tabId];
        expect(tabModel).toBeDefined();
        var viewModel = viModel.findViewModel(tabId);
        expect(viewModel).toBeDefined();
        tabModel.updateModelFromDataSource(settings2);
        Platform.performMicrotaskCheckpoint();
        viModel.removeFrontPanelControl(controlId);
    });
});