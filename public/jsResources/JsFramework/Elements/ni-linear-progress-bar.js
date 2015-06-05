/*jslint nomen: true, devel:true*/
/*global NationalInstruments, $*/
//****************************************
// Linear Progress Bar Prototype
// DOM Registration: HTMLLinearProgressBar
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.Elements.LinearProgressBar = function () {
    'use strict';
};

(function (child, parent) {
    'use strict';
    NationalInstruments.HtmlVI.inheritFromParent(child, parent);
    var proto = child.prototype;

    console.log('Setup LinearProgressBar');
    
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
            widgetSettings.orientation = this.orientation;

            childElement = document.createElement('div');
            childElement.value = this.value;
            childElement.style.width = '100%';
            childElement.style.height = '100%';

            this.appendChild(childElement);

            jqref = $(childElement);
            jqref.jqxProgressBar(widgetSettings);
        }
    };
    
    proto.propertyUpdated = function (propertyName) {
        parent.prototype.propertyUpdated.call(this, propertyName);
        
        var childElement = this.firstElementChild,
            jqref = $(childElement);
        
        switch (propertyName) {
        case 'maximum':
            jqref.jqxProgressBar({ max: this.maximum });
            break;
        case 'minimum':
            jqref.jqxProgressBar({ min: this.minimum });
            break;
        case 'orientation':
            jqref.jqxProgressBar({ orientation: this.orientation });
            break;
        case 'value':
            jqref.jqxProgressBar({ value: this.value });
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
    
    proto.defineElementInfo(proto, 'ni-linear-progress-bar', 'HTMLNILinearProgressBar');

}(NationalInstruments.HtmlVI.Elements.LinearProgressBar, NationalInstruments.HtmlVI.Elements.ProgressBar));
