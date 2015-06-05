/*jslint nomen: true, devel:true*/
/*global NationalInstruments*/
//****************************************
// Boolean Control Prototype
// DOM Registration: No
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.Elements.LinearNumericPointer = function () {
    'use strict';
};

(function (child, parent) {
    'use strict';
    NationalInstruments.HtmlVI.inheritFromParent(child, parent);
    var proto = child.prototype;
    
    console.log('Setup LinearNumericPointer');
    
    //Private Static Methods
    
    //Methods
    proto.addAllProperties = function (targetPrototype) {
        parent.prototype.addAllProperties.call(this, targetPrototype);
        
        proto.addProperty(targetPrototype, {
            propertyName: 'orientation',
            defaultValue: 'horizontal',
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
    };

}(NationalInstruments.HtmlVI.Elements.LinearNumericPointer, NationalInstruments.HtmlVI.Elements.NumericPointer));
