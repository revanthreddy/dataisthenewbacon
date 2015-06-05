//****************************************
// Boolean Control Prototype
// DOM Registration: No
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.Elements.BooleanControl = function () {
    'use strict';
};

(function (child, parent) {
    'use strict';
    NationalInstruments.HtmlVI.inheritFromParent(child, parent);
    var proto = child.prototype,
        bindMechanicalAction,
        unbindMechanicalAction;

    //Private Static Methods
    unbindMechanicalAction = function (target) {
        var id = target.id;
        NationalInstruments.HtmlVI.UIActivityService.unregister(id);
    };

    bindMechanicalAction = function (target) {
        var onPress = target.clickMode === 'Press',
            isMomentary = target.momentary,
            id = target.id,
            element = target,
            that = target;

        if (isMomentary === true && onPress === true) {
            console.error('Invalid configuration, cannot have momentary true and click mode "Press", instead using when released configuration');
            isMomentary = false;
            onPress = false;
        }

        if (isMomentary === false && onPress === false) { //When Released
            NationalInstruments.HtmlVI.UIActivityService.register({
                element: element,
                id: id,
                up: function (evt) {
                    if (element.contains(evt.target)) {
                        that.value = !that.value;
                    }
                }
            });
        } else if (isMomentary === false && onPress === true) { //When Pressed
            NationalInstruments.HtmlVI.UIActivityService.register({
                element: element,
                id: id,
                down: function () {
                    that.value = !that.value;
                }
            });
        } else if (isMomentary === true && onPress === false) { //Until Released
            NationalInstruments.HtmlVI.UIActivityService.register({
                element: element,
                id: id,
                up: function () {
                    that.value = !that.value;
                },
                down: function () {
                    that.value = !that.value;
                },
                cancelled: function () {
                    that.value = !that.value;
                }
            });
        }
    };


    //Methods
    proto.addAllProperties = function (targetPrototype) {
        parent.prototype.addAllProperties.call(this, targetPrototype);

        proto.addProperty(targetPrototype, {
            propertyName: 'value',
            defaultValue: false,
            fireEvent: true,
            addNonSignalingProperty: true
        });

        proto.addProperty(targetPrototype, {
            propertyName: 'contentVisible',
            defaultValue: false
        });

        proto.addProperty(targetPrototype, {
            propertyName: 'content',
            defaultValue: 'Button'
        });

        proto.addProperty(targetPrototype, {
            propertyName: 'clickMode',
            defaultValue: 'Release'
        });

        proto.addProperty(targetPrototype, {
            propertyName: 'momentary',
            defaultValue: false
        });
    };

    proto.createdCallback = function () {
        parent.prototype.createdCallback.call(this);
        // Advanced use only
    };

    proto.attachedCallback = function () {
        var firstCall = parent.prototype.attachedCallback.call(this);

        bindMechanicalAction(this);

        return firstCall;
    };

    proto.propertyUpdated = function (propertyName) {
        parent.prototype.propertyUpdated.call(this, propertyName);

        switch (propertyName) {
        case 'clickMode':
            bindMechanicalAction(this);
            break;
        case 'momentary':
            bindMechanicalAction(this);
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

        unbindMechanicalAction(this);
    };

}(NationalInstruments.HtmlVI.Elements.BooleanControl, NationalInstruments.HtmlVI.Elements.Visual));
