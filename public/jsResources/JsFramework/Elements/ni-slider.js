/*jslint nomen: true, devel:true*/
/*global NationalInstruments, $*/
//****************************************
//Numeric TextBox Prototype
// DOM Registration: HTMLSlider
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.Elements.Slider = function () {
    'use strict';
};

(function (child, parent) {
    'use strict';
    NationalInstruments.HtmlVI.inheritFromParent(child, parent);
    var proto = child.prototype;

    console.log('Setup Slider');
    
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
            jqref,
            that = this;
        
        if (firstCall === true) {
            widgetSettings = JSON.parse(this.configuration);
            widgetSettings.step = this.interval;
            widgetSettings.orientation = this.orientation;
            childElement = document.createElement('div');
            childElement.value = this.value;
            childElement.style.width = '100%';
            childElement.style.height = '100%';

            this.appendChild(childElement);

            jqref = $(childElement);
            jqref.jqxSlider(widgetSettings);
            jqref.on('slideEnd', function (event) {
                that.value = parseFloat(event.args.value);
            });
        }
    };
    
    proto.propertyUpdated = function (propertyName) {
        parent.prototype.propertyUpdated.call(this, propertyName);
        
        var childElement = this.firstElementChild,
            jqref = $(childElement);
        
        switch (propertyName) {
            case 'value':
                jqref.jqxSlider({ value: this.value });
                break;
            case 'minimum':
                jqref.jqxSlider({ minimum: this.minimum });
                break;
            case 'maximum':
                jqref.jqxSlider({ maximum: this.maximum });
                break;
            case 'interval':
                jqref.jqxSlider({ step: this.interval });
                break;
            case 'orientation':
                jqref.jqxSlider({orientation: this.orientation});
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
    
    proto.defineElementInfo(proto, 'ni-slider', 'HTMLNISlider');

}(NationalInstruments.HtmlVI.Elements.Slider, NationalInstruments.HtmlVI.Elements.LinearNumericPointer));
