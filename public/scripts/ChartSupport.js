/*jshint browser: true*/
/*global $: false, engine:false, designerCodeLoaded: false*/

'use strict';

var defaultSampleChartData = [
    [[0, 1], [10, 100], [20, 50], [30, 150], [40, 100], [50, 200]],
    [[0, 10], [10, 110], [20, 60], [30, 160], [40, 110], [50, 210]],
    [[0, 40], [10, 140], [20, 90], [30, 190], [40, 140], [50, 240]],
    [[0, 80], [10, 180], [20, 100], [30, 220], [40, 180], [50, 280]]
];


var chartSettings = {
    lines: {
        show: true,
        lineWidth: 1
    },
    canvas: true,
    series: {
        shadowSize: 0, // Drawing is faster without shadows
        downsample: {
            threshold: 1000
        }
    },
    axisLabels: {
        show: true
    },
    xaxes: [
        {}
    ],
    yaxes: [
        {}
    ]
};

var chartData = [
    {
        data: defaultSampleChartData[0],
        color: '#ff0000'
    }];

var findIndex = function(arr, id) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return i;
        }
    }
    return -1;
};

var fromLVColor = function (str) {
    return (str === '') ? '#000000' : '#' + str.substr(3);
};

var fromLVShape = function (shape) {
    var shapesDictionary = {
        Rectangle: 'square',
        Ellipse: 'circle',
        Diamond: 'diamond',
        Cross: 'cross',
        InwardTriangle: 'triangle',
        OutwardTriangle: 'triangle',
        Plus: 'plus'
    };

    return shapesDictionary[shape];
};

var axisSettingFromHost = function (a) {
    var axis = {};

    axis.position = a.position;

    if (a.showLabel) {
        axis.axisLabel = a.axisLabel;
    }

    if (!a.autoScale) {
        axis.min = a.min;
        axis.max = a.max;
    }

    if (a.log) {
        axis.mode = 'log';
    }

    axis.id = a.axisId;

    return axis;
};

var applySettingsFromHost = function (settings) {
    var axes = settings.axes;
    var plots = settings.plots;

    chartSettings.xaxes = [];
    chartSettings.yaxes = [];

    axes.forEach(function (a) {
        if (a.position && ((a.position === 'left') || (a.position === 'right'))) {
            chartSettings.yaxes.push(axisSettingFromHost(a));
        }

        if (a.position && ((a.position === 'top') || (a.position === 'bottom'))) {
            chartSettings.xaxes.push(axisSettingFromHost(a));
        }
    });

    chartData = [];

    plots.forEach(function (p, i) {
        var series = {};
        var lines = {
            lineWidth: p.lineWidth
        };

        var points = {
            show: true,
            fill: true,
            symbol: 'square',
            radius: 3
        };

        chartData.push(series);
        series.color = fromLVColor(p.color);
        series.data = defaultSampleChartData[i];
        series.lines = lines;

        var xaxisId = findIndex(chartSettings.xaxes, p.xaxis);

        if (xaxisId !== -1) {
            series.xaxis = xaxisId + 1;
        }

        var yaxisId = findIndex(chartSettings.yaxes, p.yaxis);

        if (xaxisId !== -1) {
            series.yaxis = yaxisId + 1;
        }


        if (p.pointColor) {
            points.fillColor = fromLVColor(p.pointColor);
            points.symbol = fromLVShape(p.pointShape);
            series.points = points;
        }
    });
};

engine.on('UpdateChartPosition', function (id, data) {
    engine.call('GetChartPosition', data).then(function (bounds) {
        var element = document.getElementById('n' + id);

        /* flot doesn't like 0 as a dimension*/
        if (bounds.Width === 0) {
            bounds.Width = 1;
        }

        if (bounds.Height === 0) {
            bounds.Height = 1;
        }

        var elementStyle = element.style;
        elementStyle.top = bounds.Y + 'px';
        elementStyle.left = bounds.X + 'px';
        var width = bounds.Width + 'px';
        var height = bounds.Height + 'px';
        var update = false;
        if (elementStyle.width !== width) {
            update = true;
            elementStyle.width = width;
        }
        if (elementStyle.height !== height) {
            update = true;
            elementStyle.height = height;
        }

        if (update) {
            var chart = $('#' + 'n' + id).data('chart');

            chart.resize();
            chart.setupGrid();
            chart.draw();
        }
    });
});

engine.on('refreshChart', function (id) {
    var chart = $('#' + id).data('chart');

    chart.resize();
    chart.setupGrid();
    chart.draw();
});

engine.on('setMinHeight', function (id, minHeight) {
    document.getElementById(id).style.minHeight = minHeight;
});

engine.on('createCanvasChart', function (settings) {
    var element = document.createElement('div');
    var elementStyle = element.style;
    element.id = settings.id;
    elementStyle.position = 'absolute';
    elementStyle.width = '1px';
    elementStyle.height = '1px';
    var parent = document.getElementById('FPCanvas');
    parent.appendChild(element);

    applySettingsFromHost(JSON.parse(settings.settings));

    $('#' + settings.id).data('chart', $.plot('#' + settings.id, chartData, chartSettings));
});

engine.on('createResponsiveChart', function (settings) {
    var column = document.createElement('div');
    column.className = 'col-lg-6';
    column.id = 'r' + settings.Id;
    var element = document.createElement('div');
    var elementStyle = element.style;
    element.id = settings.id;
    elementStyle.minHeight = '400px';
    column.appendChild(element);
    var parent = document.getElementById('responsiveRow');
    parent.appendChild(column);
    $('#' + settings.id).data('chart', $.plot('#' + settings.id, chartData, chartSettings));
});

designerCodeLoaded();