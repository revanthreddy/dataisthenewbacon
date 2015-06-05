//****************************************
// Tests for BooleangraphModel class
// National Instruments Copyright 2014
//****************************************

describe('A ChartViewModel', function () {
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
    var frontPanelControls, chartModel, chartElement, settings;
    beforeEach(function () {
        var chart = document.createElement('div');
        chart.style.position = 'absolute';
        chart.style.left = '100px';
        chart.style.top = '200px';
        chart.style.width = '300px';
        chart.style.height = '400px';
        chart.id = controlId;
        frontPanelCanvas.appendChild(chart);
        settings = {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CHART,
            left: '100px',
            top: '200px',
            width: '300px',
            height: '400px',
            bufferSize: 128,
            axes: [{
                axisLabel: 'Amplitude',
                show: true,
                showLabel: true,
                axisposition: 'left',
                min: 0,
                max: 10,
                autoScale: false,
                logScale: false,
                id: 'Function11',
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
                xaxis: 'Function11',
                yaxis: 'Function12',
                id: 'Function21',
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANPLOT
        }]
        };
    });

    it('allows to call the chartViewModelMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viModel.addFrontPanelControl(settings);
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viewModel.chartViewModelMethods();
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows creation with default settings', function () {
        viModel.addFrontPanelControl({
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CHART,
            left: '270px',
            top: '150px',
            width: '75px',
            height: '30px',
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
                    id: 'Function31',
                    kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_PLOTRENDERER
                },
                xaxis: 'Function13',
                yaxis: 'Function12',
                id: 'Function21',
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANPLOT
            }]
        });
        chartElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        chartModel = frontPanelControls[controlId];
        expect(chartModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        viModel.removeFrontPanelControl(controlId);
    });

    it('allows to call the modelPropertyChanged method with a property update', function () {
        viModel.addFrontPanelControl({
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CHART,
            left: '270px',
            top: '150px',
            width: '75px',
            height: '30px',
            visible: true,
            axes: [{
                axisLabel: 'Amplitude1',
                show: true,
                showLabel: true,
                axisposition: 'right',
                min: 0,
                max: 10,
                autoScale: false,
                logScale: false,
                id: 'Function11',
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
                xaxis: 'Function11',
                yaxis: 'Function12',
                id: 'Function21',
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANPLOT
            }]
        });
        chartElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        chartModel = frontPanelControls[controlId];
        expect(chartModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        chartModel.updateModelFromDataSource(settings);
        Platform.performMicrotaskCheckpoint();
        viModel.removeFrontPanelControl(controlId);
    });
});