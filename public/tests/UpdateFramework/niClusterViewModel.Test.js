//****************************************
// Tests for BooleanclusterModel class
// National Instruments Copyright 2014
//****************************************

describe('A ClusterViewModel', function () {
    'use strict';
    var viName = 'viName';
    var controlId = 'Function1';
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
    var frontPanelItems, clusterModel, tabElement, settings, settings2;
    beforeEach(function () {
        var cluster = document.createElement('div');
        cluster.style.position = 'absolute';
        cluster.style.left = '10px';
        cluster.style.top = '20px';
        cluster.style.width = '800px';
        cluster.style.height = '1200px';
        cluster.id = controlId;
        frontPanelCanvas.appendChild(cluster);
        var button = document.createElement('input');
        button.style.position = 'absolute';
        button.style.left = '10px';
        button.style.top = '20px';
        button.style.width = '300px';
        button.style.height = '400px';
        button.id = buttonId;
        cluster.appendChild(button);
        settings = {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CLUSTER,
            children: [{
                id: buttonId,
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
                content: 'content',
                contentVisible: true,
                getId: function () { return buttonId; },
                getDOMType: function () { return 'input'; }
            }]
        };
        settings2 = {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CLUSTER,
            children: [{
                id: buttonId,
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
                content: 'content2',
                contentVisible: true,
                getId: function () { return buttonId; },
                getDOMType: function () { return 'input'; }
            }]
        };
    });

    it('allows to call the clusterViewModelMethods    method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viModel.addFrontPanelControl(settings);
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viewModel.clusterViewModelMethods();
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows creation with default settings', function () {
        viModel.addFrontPanelControl(
        {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CLUSTER,
            visible: true,
            children: [{
                id: buttonId,
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
                content: 'content',
                contentVisible: true,
                getId: function () { return buttonId; },
                getDOMType: function () { return 'input'; }
                }
            ],
            getOwner: function () { return viModel; }
        });
        tabElement = document.getElementById(controlId);
        frontPanelItems = viModel.getRootModelControls();
        clusterModel = frontPanelItems[controlId];
        expect(clusterModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows to call the modelPropertyChanged method with a property update', function () {
        viModel.addFrontPanelControl(
        {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CLUSTER,
            visible: true,
            children: [{
                id: buttonId,
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
                content: 'content',
                contentVisible: true,
                getId: function () { return buttonId; },
                getDOMType: function () { return 'input'; }
            }],
            getOwner: function () { return viModel; }
        });
        tabElement = document.getElementById(controlId);
        frontPanelItems = viModel.getRootModelControls();
        clusterModel = frontPanelItems[controlId];
        expect(clusterModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        clusterModel.updateModelFromDataSource(settings2);
        Platform.performMicrotaskCheckpoint();
        viModel.removeFrontPanelControl(controlId);
    });
});