//****************************************
// Visual Component Prototype
// DOM Registration: No
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.Elements.VisualComponent = function () {
    'use strict';
};

(function (child, parent) {
    'use strict';
    NationalInstruments.HtmlVI.inheritFromParent(child, parent);
    var proto = child.prototype;

    // Methods
    proto.addAllProperties = function (targetPrototype) {
        parent.prototype.addAllProperties.call(this, targetPrototype);

        proto.addProperty(targetPrototype, {
            propertyName: 'configuration',
            defaultValue: '{}'
        });

        proto.addProperty(targetPrototype, {
            propertyName: 'labelId',
            defaultValue: ''
        });

        proto.addProperty(targetPrototype, {
            propertyName: 'visible',
            defaultValue: false
        });
    };

    proto.createdCallback = function () {
        parent.prototype.createdCallback.call(this);
        // Advanced use only
    };

    proto.attachedCallback = function () {
        var firstCall = parent.prototype.attachedCallback.call(this);

        return firstCall;
    };

    proto.propertyUpdated = function (propertyName) {
        parent.prototype.propertyUpdated.call(this, propertyName);
    };

    proto.attributeChangedCallback = function (attrName, oldVal, newVal) {
        parent.prototype.attributeChangedCallback.call(this, attrName, oldVal, newVal);
        // Advanced use only
    };

    proto.detachedCallback = function () {
        parent.prototype.detachedCallback.call(this);
        // Usually unused
    };

}(NationalInstruments.HtmlVI.Elements.VisualComponent, NationalInstruments.HtmlVI.Elements.NIElement));
