//****************************************
// Support functions
// National Instruments Copyright 2014
//****************************************

// National Instruments global namespace
var NationalInstruments = {};

// Namespace for HtmlVI feature
NationalInstruments.HtmlVI = {};

NationalInstruments.HtmlVI.ControlKindEnum = Object.freeze({
    NI_GAUGE:               'niGauge',
    NI_BOOLEAN_BUTTON:      'niBooleanButton',
    NI_BOOLEAN_LED:         'niBooleanLED',
    NI_CHART:               'niChart',
    NI_CARTESIANGRAPH:      'niCartesianGraph',
    NI_NUMERIC_TEXTBOX:     'niNumericTextBox',
    NI_SLIDER:              'niSlider',
    NI_CARTESIANAXIS:       'niCartesianAxis',
    NI_CARTESIANPLOT:       'niCartesianPlot',
    NI_PLOTRENDERER:        'niPlotRenderer',
    NI_TEXT:                'niText',
    NI_IMAGE:               'niImage',
    NI_CURSOR:              'niCursor',
    NI_STRING_CONTROL:      'niStringControl',
    NI_CHECK_BOX:           'niCheckBox',
    NI_RADIO_BUTTON:        'niRadioButton',
    NI_BOOLEAN_SWITCH:      'niBooleanSwitch',
    NI_TAB_CONTROL:         'niTabControl',
    NI_TAB_ITEM:            'niTabItem',
    NI_LAYOUT_PANEL:        'niLayoutPanel',
    NI_LABEL:               'niLabel',
    NI_HYPERLINK:           'niHyperlink',
    NI_LINEAR_PROGRESSBAR:  'niLinearProgressBar',
    NI_CLUSTER:             'niCluster',
    NI_DROPDOWN:            'niDropDown',
    NI_TIME_STAMP_TEXT_BOX: 'niTimeStampTextBox'
});

NationalInstruments.HtmlVI.inheritFromParent = function(childType, parentType) {
    'use strict';
    var prototype = Object.create(parentType.prototype);
    prototype.constructor = childType;
    childType.prototype = prototype;
};

NationalInstruments.HtmlVI.replaceStrings = function () {
    'use strict';
    if (arguments.length === 0) {
        return '';
    }
    if (arguments.length === 1) {
        return arguments[0];
    }
    var source = arguments[0];
    for (var index = 1; index < arguments.length; index++) {
        source = source.replace('%' + index, arguments[index]);
    }
    return source;
};
