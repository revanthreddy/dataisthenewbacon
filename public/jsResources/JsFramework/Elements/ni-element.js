//****************************************
// Custom Element Prototype
// DOM Registration: No
// National Instruments Copyright 2014
//****************************************

// Namespace for HtmlVI Elements feature
NationalInstruments.HtmlVI.Elements = NationalInstruments.HtmlVI.Elements || {};

NationalInstruments.HtmlVI.Elements.NIElement = function () {
    'use strict';
    // Intentionally left empty
};

(function (child, parent) {
    'use strict';
    NationalInstruments.HtmlVI.inheritFromParent(child, parent);
    var attributeTable, proto = child.prototype;

    // Static Private Properties
    attributeTable = (function () {
        var attrs = {},
            addAttributeConfig = function (tagName, attributeName, attributeConfig) {
                if (attrs[tagName] === undefined) {
                    attrs[tagName] = {};
                }

                attrs[tagName][attributeName] = attributeConfig;
            },
            getAttributeConfig = function (tagName, attributeName) {
                if (attrs[tagName] === undefined) {
                    return undefined;
                } else {
                    return attrs[tagName][attributeName];
                }
            },
            getAttributeList = function (tagName) {
                return attrs[tagName];
            };

        return {
            addAttributeConfig: addAttributeConfig,
            getAttributeConfig: getAttributeConfig,
            getAttributeList: getAttributeList
        };
    }());


    ///////////////////////////////////////////////////////////////////////////
    // Extended Methods (extend in children)
    ///////////////////////////////////////////////////////////////////////////


    // In addAllProperties place all properties managed by the addProperty method
    proto.addAllProperties = function (targetPrototype) {
        //jshint unused:false

        // Example usage:
        //proto.addProperty(targetPrototype, {
        //    propertyName: 'myProp',
        //    defaultValue: 'Default Value',
        //    fireEvent: true,
        //    addNonSignalingProperty: true
        //});
    };


    // In createdCallback place properties NOT managed by the addProperty method (Do Not Manipulate DOM Here) (Advanced use only)
    proto.createdCallback = function () {
        var attrList, currAttrName, currAttrConfig, currAttrValue;

        // First call flag used by the attached callback
        this._attachedCallbackFirstCall = true;

        // Initialize private properties based on existing attribute values or default values
        attrList = attributeTable.getAttributeList(this.elementInfo.tagName);

        for (currAttrName in attrList) {
            if (attrList.hasOwnProperty(currAttrName)) {
                currAttrConfig = attrList[currAttrName];

                if (this[currAttrConfig.privatePropertyName] !== undefined) {
                    throw new Error('Cannot add owned property ' + currAttrConfig.privatePropertyName + ' because it already exists on the object');  //TODO mraj Make exception
                }

                currAttrValue = this.getAttributeTyped(currAttrName, currAttrConfig.defaultValueType);

                // Set the private property value before updating attribute (attribute update references the private property)
                Object.defineProperty(this, currAttrConfig.privatePropertyName, {
                    configurable: false,
                    enumerable: false,
                    writable: true,
                    value: currAttrValue === undefined ? currAttrConfig.defaultValue : currAttrValue
                });

                if (currAttrValue === undefined) {
                    this.setAttributeTyped(currAttrName, currAttrConfig.defaultValue);
                }
            }
        }

    };


    // In attachedCallback manipulate the DOM for the element (insert and create dom for view)
    proto.attachedCallback = function () {
        // Example usage:
        // // In child calls the parent attachedCallback returns the firstCall value
        // if (firstCall === true) {
        //     this.textContent = this.myProp;
        // }

        if (this._attachedCallbackFirstCall === true) {
            this._attachedCallbackFirstCall = false;
            return true;
        } else {
            return false;
        }

    };


    // In propertyUpdated respond to property changes by updating the DOM (only fired for properties and attributes managed by addProperty)
    // Only fires for property updates after the first call to attachedCallback (after the DOM has been configured)
    proto.propertyUpdated = function (propertyName) {
        //jshint unused:false

        // Example usage:
        //switch (propertyName) {
        //case 'myProp':
        //    this.textContent = this.myProp;
        //    break;
        //default:
        //    break;
        //}
    };


    // In attributeChangedCallback handle attribute changes for attributes NOT managed by the addProperty method (Advanced use only)
    proto.attributeChangedCallback = function (attrName, oldVal, newVal) {
        var typedNewValue, typedOldValue, attrConfig, currVal;

        // TODO Found a case in DevTools where the current value of the attribute is not equivalent to the new value when doing Edit as HTML and removing an attribute
        // Possibly a bug in Chrome DevTools? Not 100% sure. If can reproduce in normal code (outside of DevTools) need to analyze further mraj
        currVal = this.getAttribute(attrName);
        if (currVal !== newVal) {
            console.error('ATTRIBUTE CHANGED CALLBACK FOR ATTRIBUTE ' + attrName + ' NEW VALUE (' + newVal + ') NOT EQUAL TO CURRENT VALUE (' + currVal + ') SO IGNORING NEW VALUE');
            newVal = currVal;
        }

        // Lookup in synced attribute table
        attrConfig = attributeTable.getAttributeConfig(this.elementInfo.tagName, attrName);

        // Verify attribute is a synced attribute we are managing
        if (attrConfig !== undefined) {
            typedNewValue = this.attributeStringToTypedValue(attrName, attrConfig.defaultValueType, newVal);

            // If new attribute type is incorrect then revert, otherwise perform property update
            if (typedNewValue === undefined) {
                typedOldValue = this.attributeStringToTypedValue(attrName, attrConfig.defaultValueType, oldVal);

                // If reverting and the old type is invalid then force to default
                if (typedOldValue === undefined) {
                    this.setAttributeTyped(attrName, attrConfig.defaultValue);
                } else {
                    this.setAttribute(attrName, oldVal);
                }

            } else {
                this[attrConfig.propertyName] = typedNewValue;
            }
        }
    };


    // In detachedCallback respond to the element being removed from the DOM (usually no action needed)
    proto.detachedCallback = function () {
        // Example usage:
        // No action needed
    };

    ///////////////////////////////////////////////////////////////////////////
    // Utility Methods (intended to be used, but not extended by children)
    ///////////////////////////////////////////////////////////////////////////

    // Adds the element info to the prototype and invokes the addAllProperty chain to construct element prototype
    proto.defineElementInfo = function (targetPrototype, tagName, tagPrototypeName) {
        if (targetPrototype.elementInfo !== undefined) {
            throw new Error('elementInfo has already been defined for element'); //TODO create exception mraj
        }

        Object.defineProperty(targetPrototype, 'elementInfo', {
            value: Object.freeze({
                tagName: tagName,
                prototypeName: tagPrototypeName
            }),
            writable: false,
            configurable: false,
            enumerable: false
        });

        targetPrototype.addAllProperties(targetPrototype);
    };

    // Returns the interpreted value of the string or undefined if no value can be matched (implies use default value for attribute if undefined is returned)
    // NOTE: This function should not rely on attribute specific state (i.e. so can be used by attributes not managed by attributeTable)
    proto.attributeStringToTypedValue = function (attributeName, type, str) {
        if (type === 'boolean') {
            if (str === '' || str === attributeName || str === 'true') {
                return true;
            } else {
                return false;
            }
        } else if (type === 'number') {
            if (str === null || str === undefined || (isNaN(str) && str !== 'NaN')) {
                return undefined;
            } else {
                return parseFloat(str);
            }
        } else if (type === 'string') {
            if (str === null || str === undefined) {
                return undefined;
            } else {
                return str;
            }
        } else {
            throw new Error('Unsupported attribute type'); //TODO create exception mraj
        }
    };

    // Returns a string for the value or undefined if the new value results in attribute removal (attribute removal implies false for boolean values)
    // NOTE: This function should not rely on attribute specific state (i.e. so can be used by attributes not managed by attributeTable)
    proto.typedValueToAttributeString = function (value) {
        var type = typeof value;

        if (type === 'boolean') {
            if (value) {
                return '';
            } else {
                return undefined;
            }
        } else if (type === 'number' || type === 'string') {
            return value.toString();
        } else {
            throw new Error('Unsupported attribute type'); //TODO create exception mraj
        }
    };

    // Gets the typed representation of the attribute specified
    // NOTE: This function should not rely on attribute specific state (i.e. so can be used by attributes not managed by attributeTable)
    proto.getAttributeTyped = function (attributeName, type) {
        return this.attributeStringToTypedValue(attributeName, type, this.getAttribute(attributeName));
    };

    // Sets the attribute string to the provided value in a type-aware manner
    // NOTE: This function should not rely on attribute specific state (i.e. so can be used by attributes not managed by attributeTable)
    proto.setAttributeTyped = function (attributeName, value) {
        var str, currVal = this.getAttributeTyped(attributeName, typeof value);

        if (value !== currVal) {
            str = this.typedValueToAttributeString(value);

            if (str === undefined) {
                this.removeAttribute(attributeName);
            } else {
                this.setAttribute(attributeName, str);
            }
        }
    };

    // Adds a managed property to the target prototype
    // TODO Properties added with addProperty are not discoverable using for-in loops and Object.hasOwnProperty since the properties are added to the prototype and not the instance mraj
    proto.addProperty = function (targetPrototype, config) {
        config = config || {};
        var propertyName = config.propertyName,
            defaultValue = config.defaultValue,
            defaultValueType = typeof defaultValue,
            fireEvent = config.fireEvent || false,
            addQuietProperty = config.addNonSignalingProperty || false,
            attributeName,
            fireEventName,
            privatePropertyName,
            quietPropertyName,
            updatePropertyAction;

        if (typeof propertyName !== 'string' || /^[a-z][a-zA-Z]*$/.test(propertyName) === false) {
            throw new Error('A property name is required and must be an ascii alpha camel-case string'); //TODO mraj Make exception
        }
        if (defaultValueType !== 'string' && defaultValueType !== 'number' && defaultValueType !== 'boolean') {
            throw new Error('A default value is required and must be string, numeric, or boolean'); //TODO mraj Make exception
        }
        if (typeof fireEvent !== 'boolean') {
            throw new Error('Specifiying if the property fires events is optional but must be a boolean if specified'); //TODO mraj Make exception
        }
        if (typeof addQuietProperty !== 'boolean') {
            throw new Error('Specifiying if the property adds a non-signaling property is optional but must be a boolean if specified'); //TODO mraj Make exception
        }

        // The default value of boolean types is always false
        // This is because lack of a boolean attribute implies initialize to false while for other types lack of an attribute implies initialize to default
        if (defaultValueType === 'boolean' && defaultValue !== false) {
            throw new Error('Boolean property ' + propertyName + ' must have a default value of false');  //TODO mraj Make exception
        }

        // Determine property names and make sure to not clobber existing properties on the prototype chain ( do not check attribute or event names)
        attributeName = propertyName.split(/(?=[A-Z])/).join('-').toLowerCase();
        // Include a '-' character to avoid collisions with DOM events
        fireEventName = attributeName + '-changed';
        // TODO Using WeakMaps we could have actual private properties https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Contributor_s_Guide/Private_Properties#Using_WeakMaps mraj
        privatePropertyName = '_' + propertyName;
        quietPropertyName = propertyName + 'NonSignaling';

        if (targetPrototype[propertyName] !== undefined) {
            throw new Error('Cannot add property ' + propertyName + ' because it already exists on the object prototype');  //TODO mraj Make exception
        }
        if (targetPrototype[privatePropertyName] !== undefined) {
            throw new Error('Cannot add property ' + propertyName + ' because the calculated private property named ' + privatePropertyName + ' already exists on the object prototype');  //TODO mraj Make exception
        }
        if (targetPrototype[quietPropertyName] !== undefined) {
            throw new Error('Cannot add property ' + propertyName + ' because the calculated non-signaling property named ' + quietPropertyName + ' already exists on the object prototype');  //TODO mraj Make exception
        }

        // Add to synchronized attributes table to respond to attribute value changes
        attributeTable.addAttributeConfig(targetPrototype.elementInfo.tagName, attributeName, {
            defaultValue: defaultValue,
            defaultValueType: defaultValueType,
            privatePropertyName: privatePropertyName,
            propertyName: propertyName
        });

        // Actions to perform on a property set or as a result of valid changes to an attribute (valid changes to an attribute result in a property set)
        updatePropertyAction = function (beQuiet, value) {
            var valuePackaged, cancelled = false;

            // Check if unchanged
            if (this[privatePropertyName] === value) {
                return;
            }

            // Check if correct type
            if (defaultValueType !== typeof value) {
                throw new Error('Property ' + propertyName + ' expects a value of type ' + defaultValueType);
            }

            // Fire event to notify of change if necessary
            if (beQuiet === false && fireEvent === true) {
                valuePackaged = {};
                valuePackaged[propertyName] = value;

                cancelled = (false === this.dispatchEvent(new CustomEvent(fireEventName, {
                    bubbles: true,
                    cancelable: true,
                    detail: valuePackaged
                })));

                // If change is rejected then revert
                // TODO: If rejected after an attribute change this will not restore the exact attribute string from before the property change. Instead it restores the property value typed equivalent. mraj
                if (cancelled === true) {
                    this.setAttributeTyped(attributeName, this[privatePropertyName]); // Just in-case event fired as a result of an attribute change
                    return;
                }
            }

            // Update property and attribute
            this[privatePropertyName] = value;
            this.setAttributeTyped(attributeName, this[privatePropertyName]);

            // Call update properties only if DOM has been applied TODO: Feels wrong, maybe should always fire changes even if attached not called yet? mraj
            if (this._attachedCallbackFirstCall === false) {
                this.propertyUpdated(propertyName);
            }
        };

        // The following property accessors are bound to the target prototype
        // The private property used in the property accessor are bound to the current object instance (i.e. 'this' is bound to the new instance)
        Object.defineProperty(targetPrototype, propertyName, {
            configurable: false,
            enumerable: true,
            get: function () {
                return this[privatePropertyName];
            },
            set: function (value) {
                updatePropertyAction.call(this, false, value);
            }
        });

        if (fireEvent === true && addQuietProperty === true) {
            Object.defineProperty(targetPrototype, quietPropertyName, {
                configurable: false,
                enumerable: false,
                get: function () {
                    return this[privatePropertyName];
                },
                set: function (value) {
                    updatePropertyAction.call(this, true, value);
                }
            });
        }
    };

}(NationalInstruments.HtmlVI.Elements.NIElement, window.HTMLElement));
