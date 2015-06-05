//****************************************
// Tests for BooleangraphModel class
// National Instruments Copyright 2014
//****************************************

describe('A PlotRendererViewModel', function () {
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
            lineWidth: 4,
            color: '#FFFF00',
            pointColor: '#FFFF00',
            pointSize: 3,
            pointShape: 'ellipse',
            lineStroke: 'blue',
            id: 'Function31',
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_PLOTRENDERER
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
                id: 'Function13',
                kind:  NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANAXIS  }],
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
                    lineStroke: 'black',
                    id: 'Function31',
                    kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_PLOTRENDERER
                },
                xaxis: 'Function13',
                yaxis: 'Function12',
                id: 'Function21',
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANPLOT
            }],
        });
        graphElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        graphModel = frontPanelControls[controlId];
        expect(graphModel).toBeDefined();
        var plotModel = graphModel.plots[0];
        expect(plotModel).toBeDefined();
        var rendererModel = plotModel.renderer;
        expect(rendererModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        var plotViewModel = viewModel.plots[0];
        expect(plotViewModel).toBeDefined();
        var rendererViewModel = plotViewModel.renderer;
        expect(rendererViewModel).toBeDefined();
        rendererModel.updateModelFromDataSource(settings);
        Platform.performMicrotaskCheckpoint();

        // Verify unknown properties are handled correctly
        viewModel = viModel.findViewModel('Function31');
        viewModel.modelPropertyChanged('{Unknown}');

        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viewModel.PlotRendererViewModelMethods();

        viModel.removeFrontPanelControl(controlId);
    });
});