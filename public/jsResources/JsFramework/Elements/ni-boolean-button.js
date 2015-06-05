//****************************************
// Boolean Button Prototype
// DOM Registration: HTMLNIBooleanButton
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.Elements.BooleanButton = function () {
    'use strict';
};

(function (child, parent) {
    'use strict';
    NationalInstruments.HtmlVI.inheritFromParent(child, parent);
    var proto = child.prototype;

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
            widgetSettings.toggled = this.value;

            childElement = document.createElement('input');
            childElement.type = 'button';
            childElement.value = this.content;
            childElement.style.width = '100%';
            childElement.style.height = '100%';

            this.appendChild(childElement);

            jqref = $(childElement);
            jqref.jqxToggleButton(widgetSettings);
            jqref.jqxToggleButton('_removeHandlers');
        }
    };

    proto.propertyUpdated = function (propertyName) {
        parent.prototype.propertyUpdated.call(this, propertyName);

        var childElement = this.firstElementChild,
            jqref = $(childElement);

        switch (propertyName) {
        case 'content':
            childElement.value = this.content;
            break;
        case 'contentVisible':
            childElement.value = this.contentVisible ? this.content : '';
            break;
        case 'value':
            jqref.jqxToggleButton({
                toggled: this.value
            });
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

    proto.defineElementInfo(proto, 'ni-boolean-button', 'HTMLNIBooleanButton');

}(NationalInstruments.HtmlVI.Elements.BooleanButton, NationalInstruments.HtmlVI.Elements.BooleanControl));
