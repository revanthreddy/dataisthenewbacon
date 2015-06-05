/* global $: false*/
/* exported generateChartData, createChart, setChartPosition, setChartSize*/

'use strict';

function generateChartData(dataSize) {
    var data = [];
    for (var i = 0; i < dataSize; i++) {
        data[i] = [i, Math.sin(i / dataSize * 30) * 10.0];
    }
    return data;
}

function createChart(div, chartData) {
    return $.plot('#' + div, [chartData], {
        lines: {
            lineWidth: 1
        },
        series: {
            shadowSize: 0 // Drawing is faster without shadows
        }
    });
}

function setChartPosition(div, chart, x, y) {
    var element = $('#' + div);
    var elementStyle = element[0].style;
    elementStyle.left = x + 'px';
    if (y) {
        elementStyle.top = y + 'px';
    }
}

function setChartSize(div, chart, x, y) {
    var element = $('#' + div);
    var elementStyle = element[0].style;
    elementStyle.width = x + 'px';
    elementStyle.height = y + 'px';

}