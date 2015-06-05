//****************************************
// String Control Prototype
// DOM Registration: No
// National Instruments Copyright 2015
//****************************************

NationalInstruments.HtmlVI.Elements.StringControl = function () {
    'use strict';
};

(function (child, parent) {
    'use strict';
    NationalInstruments.HtmlVI.inheritFromParent(child, parent);
    var proto = child.prototype;

    // Private static methods
    var updateBorder = function (customElement, childElement) {
        if (customElement.readOnly === true) {
            childElement.style.borderWidth = 'thin';
            childElement.style.borderStyle = 'solid';
        } else {
            childElement.style.borderWidth = 'medium';
            childElement.style.borderStyle = 'double';
        }
    };

    //Methods
    proto.addAllProperties = function (targetPrototype) {
        parent.prototype.addAllProperties.call(this, targetPrototype);

        proto.addProperty(targetPrototype, {
            propertyName: 'text',
            defaultValue: '',
            fireEvent: true,
            addNonSignalingProperty: true
        });
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
            widgetSettings.disabled = this.readOnly;

            childElement = document.createElement('input');
            childElement.style.width = '100%';
            childElement.style.height = '100%';
            updateBorder(this, childElement);

            this.appendChild(childElement);

            jqref = $(childElement);
            jqref.jqxInput(widgetSettings);
            jqref.jqxInput('val', this.text);
            jqref.on('change', function () {
                that.text = jqref.val();
            });
        }
    };

    proto.propertyUpdated = function (propertyName) {
        parent.prototype.propertyUpdated.call(this, propertyName);

        var childElement = this.firstElementChild,
            jqref = $(childElement);

        switch (propertyName) {
            case 'readOnly':
                updateBorder(this, childElement);
                jqref.jqxInput({disabled: this.readOnly});
                break;
            case 'text':
                jqref.jqxInput('val', this.text);
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

    proto.defineElementInfo(proto, 'ni-string-control', 'HTMLNIStringControl');
}(NationalInstruments.HtmlVI.Elements.StringControl, NationalInstruments.HtmlVI.Elements.Visual));
