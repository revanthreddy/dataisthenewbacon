/*jslint nomen: true, devel:true*/
/*global NationalInstruments, $*/
//****************************************
//Numeric TextBox Prototype
// DOM Registration: HTMLGauge
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.Elements.Gauge = function () {
    'use strict';
};

(function (child, parent) {
    'use strict';
    NationalInstruments.HtmlVI.inheritFromParent(child, parent);
    var proto = child.prototype;

    console.log('Setup Gauge');
    
    //Methods
    proto.addAllProperties = function (targetPrototype) {
        parent.prototype.addAllProperties.call(this, targetPrototype);
    };
    
    proto.createdCallback = function () {
        parent.prototype.createdCallback.call(this);
        // Advanced use only
    };
    
    proto.attachedCallback = function () {
        var firstCall = parent.prototype.attachedCallback.call(this),
            widgetSettings,
            childElement,
            jqref;
        
        if (firstCall === true) {
            widgetSettings = JSON.parse(this.configuration);
            widgetSettings.max = this.maximum;
            widgetSettings.min = this.minimum;
            var dd = this.decimalDigits;
            var pd = this.precisionDigits;
            // Update the model
            var labels = {
                interval: 1,
                visible: true,
                distance: '30%',
                formatValue: function (value) {
                    if (dd >= 0) {
                        return parseFloat(value).toFixed(dd);
                    }
                    else {
                        return parseFloat(value).toPrecision(pd);
                    }
                }
            };
            var ticksMajor = {
                interval: 1,
                visible: true,
                size: '10%'
            };
            var ticksMinor = {
                interval: 0.2,
                visible: true,
                size: '5%'
            };
            labels.interval = this.interval;
            labels.visible = this.labelsVisible;
            widgetSettings.labels = labels;
            ticksMajor.interval = this.interval;
            ticksMajor.visible = this.majorTicksVisible;
            widgetSettings.ticksMajor = ticksMajor;
            ticksMinor.visible = this.minorTicksVisible;
            widgetSettings.ticksMinor = ticksMinor;

            childElement = document.createElement('div');
            childElement.value = this.value;
            childElement.style.width = '100%';
            childElement.style.height = '100%';

            this.appendChild(childElement);

            jqref = $(childElement);
            jqref.jqxGauge(widgetSettings);
        }
    };
    
    proto.propertyUpdated = function (propertyName) {
        parent.prototype.propertyUpdated.call(this, propertyName);
        
        var childElement = this.firstElementChild,
            labels,
            ticksMajor,
            ticksMinor,
            jqref = $(childElement);

        switch (propertyName) {
            case 'startAngle':
                jqref.jqxGauge({startAngle: this.startAngle});
                break;
            case 'endAngle':
                jqref.jqxGauge({endAngle: this.endAngle});
                break;
            case 'maximum':
                jqref.jqxGauge({ max: this.maximum });
                break;
            case 'minimum':
                jqref.jqxGauge({ min: this.minimum });
                break;
            case 'value':
                jqref.jqxGauge({ value: this.value });
                break;
            case 'interval':
                labels = jqref.jqxGauge('labels');
                ticksMajor = jqref.jqxGauge('ticksMajor');
                labels.interval = this.interval;
                ticksMajor.interval = this.interval;
                jqref.jqxGauge({ labels: labels, ticksMajor: ticksMajor });
                break;
            case 'labelsVisible':
                labels = jqref.jqxGauge('labels');
                labels.labelsVisible = this.labelsVisible;
                jqref.jqxGauge({ labels: labels });
                break;
            case 'majorTicksVisible':
                ticksMajor = jqref.jqxGauge('ticksMajor');
                ticksMajor.majorTicksVisible = this.majorTicksVisible;
                jqref.jqxGauge({ ticksMajor: ticksMajor });
                break;
            case 'minorTicksVisible':
                ticksMinor = jqref.jqxGauge('ticksMinor');
                ticksMinor.minorTicksVisible = this.minorTicksVisible;
                jqref.jqxGauge({ ticksMinor: ticksMinor });
                break;
            default:
                break;
        }
    };
    
    proto.attributeChangedCallback = function (attrName, oldVal, newVal) {
        parent.prototype.attributeChangedCallback.call(this, attrName, oldVal, newVal);
        // Advanced use only
    };
    
    proto.detachedCallback = function () {
        parent.prototype.detachedCallback.call(this);
        // Usually unused
    };
    
    proto.defineElementInfo(proto, 'ni-gauge', 'HTMLNIGauge');

}(NationalInstruments.HtmlVI.Elements.Gauge, NationalInstruments.HtmlVI.Elements.RadialNumericPointer));
