//****************************************
// Tests for BooleangraphModel class
// National Instruments Copyright 2014
//****************************************

describe('A CursorViewModel', function () {
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
    var frontPanelControls, graphModel, graphElement, settings;
    beforeEach(function () {
        var graph = document.createElement('div');
        graph.style.position = 'absolute';
        graph.style.left = '100px';
        graph.style.top = '200px';
        graph.style.width = '300px';
        graph.style.height = '400px';
        graph.id = controlId;
        frontPanelCanvas.appendChild(graph);
        settings = {
            showLabel: false,
            id: 'Function11',
            showValue: true,
            cursorColor: 'red',
            targetShape: 'square',
            snapToData: true,
            crosshairStyle: 'both',
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CURSOR
        };
    });

    it('allows creation with default settings', function () {
        viModel.addFrontPanelControl(
        {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANGRAPH,
            visible: true,
            axes: [{
                axisLabel: 'Amplitude1',
                show: true,
                showLabel: true,
                axisposition: 'left',
                min: 0,
                max: 10,
                autoScale: false,
                logScale: false,
                id: 'Function12',
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANAXIS
            },
            {
                axisLabel: 'count',
                show: true,
                showLabel: true,
                axisposition: 'bottom',
                min: 0,
                max: 10,
                autoScale: true,
                logScale: false,
                id: 'Function13',
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANAXIS
            }],
            plots: [{
                renderer: {
                    lineWidth: 1,
                    color: '#FF0000',
                    pointColor: '#00FF00',
                    pointSize: 1,
                    pointShape: 'square',
                    id: 'Function31',
                    kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_PLOTRENDERER
                },
                xaxis: 'Function13',
                yaxis: 'Function12',
                id:  'Function21',
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANPLOT
            }],
            cursors: [{
                    'cursorLabel': 'Cursor1',
                    'show': true,
                    'showLabel': true,
                    'showValue': false,
                    'cursorColor': 'black',
                    'targetShape': 'ellipse',
                    'snapToData': false,
                    'crosshairStyle': 'vertical',
                    'cursorId': 'Function41',
                    'kind': NationalInstruments.HtmlVI.ControlKindEnum.NI_CURSOR
                }],
        });
        graphElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        graphModel = frontPanelControls[controlId];
        expect(graphModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows to call the modelPropertyChanged method with a property update', function () {
        viModel.addFrontPanelControl(
        {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANGRAPH,
            visible: true,
            axes: [{
                axisLabel: 'Amplitude1',
                show: true,
                showLabel: true,
                axisposition: 'left',
                min: 0,
                max: 10,
                autoScale: false,
                logScale: false,
                id: 'Function12',
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANAXIS
            },
            {
                axisLabel: 'count',
                show: true,
                showLabel: true,
                axisposition: 'bottom',
                min: 0,
                max: 10,
                autoScale: true,
                logScale: false,
                id: 'Function13',
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANAXIS
            }],
            plots: [{
                renderer: {
                    lineWidth: 1,
                    color: '#FF0000',
                    pointColor: '#00FF00',
                    pointSize: 1,
                    pointShape: 'square',
                    id: 'Function31',
                    kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_PLOTRENDERER
                },
                xaxis: 'Function13',
                yaxis: 'Function12',
                id: 'Function21',
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANPLOT
            }],
            cursors: [{
                'cursorLabel': 'Cursor1',
                'show': true,
                'showLabel': true,
                'showValue': false,
                'cursorColor': 'black',
                'targetShape': 'ellipse',
                'snapToData': false,
                'crosshairStyle': 'horizontal',
                'cursorId': 'Function41',
                'kind': NationalInstruments.HtmlVI.ControlKindEnum.NI_CURSOR
            }],
        });
        graphElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        graphModel = frontPanelControls[controlId];
        expect(graphModel).toBeDefined();
        var axisModel = graphModel.axes[0];
        expect(axisModel).toBeDefined();
        var cursorModel = graphModel.cursors[0];
        expect(cursorModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        var axisViewModel = viewModel.axes[0];
        expect(axisViewModel).toBeDefined();
        axisModel.updateModelFromDataSource(settings);
        var cursorViewModel = viewModel.cursors[0];
        expect(cursorViewModel).toBeDefined();
        cursorModel.updateModelFromDataSource(settings);
        settings.crosshairStyle = 'horizontal';
        cursorModel.updateModelFromDataSource(settings);
        settings.crosshairStyle = 'vertical';
        cursorModel.updateModelFromDataSource(settings);
        Platform.performMicrotaskCheckpoint();
        viModel.removeFrontPanelControl(controlId);
    });
});