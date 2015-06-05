/*jslint nomen: true, devel:true*/
/*global NationalInstruments, $*/
//****************************************
//Numeric TextBox Prototype
// DOM Registration: HTMLNumericTextBox
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.Elements.NumericTextBox = function () {
    'use strict';
};

(function (child, parent) {
    'use strict';
    NationalInstruments.HtmlVI.inheritFromParent(child, parent);
    var proto = child.prototype;

    console.log('Setup NumericTextBox');
    
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
            widgetSettings.max = this.maximum;
            widgetSettings.min = this.minimum;

            childElement = document.createElement('div');
            childElement.value = this.value;
            childElement.style.width = '100%';
            childElement.style.height = '100%';

            this.appendChild(childElement);

            jqref = $(childElement);
            jqref.jqxNumberInput(widgetSettings);
            jqref.on('change', function (event) {
                that.value = parseFloat(event.args.value);
            });

        }
    };
    
    proto.propertyUpdated = function (propertyName) {
        parent.prototype.propertyUpdated.call(this, propertyName);
        
        var childElement = this.firstElementChild,
            jqref = $(childElement);
        
        switch (propertyName) {
        case 'maximum':
            jqref.jqxNumberInput({max: this.maximum});
            break;
        case 'minimum':
            jqref.jqxNumberInput({min: this.minimum});
            break;
        case 'interval':
            // jqref.jqxNumberInput({interval: this.interval});
            break;
        case 'decimalDigits':
            jqref.jqxNumberInput({decimalDigits: this.decimalDigits});
            break;
        case 'precisionDigits':
            jqref.jqxNumberInput({precisionDigits: this.precisionDigits});
            break;
        case 'value':
            jqref.jqxNumberInput({value: this.value});
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
    
    proto.defineElementInfo(proto, 'ni-numeric-text-box', 'HTMLNINumericTextBox');

}(NationalInstruments.HtmlVI.Elements.NumericTextBox, NationalInstruments.HtmlVI.Elements.NumericControl));
