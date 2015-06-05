//****************************************
// Time Stamp Text Box Prototype
// DOM Registration: No
// National Instruments Copyright 2015
//****************************************

NationalInstruments.HtmlVI.Elements.TimeStampTextBox = function () {
    'use strict';
};

(function (child, parent) {
    'use strict';
    NationalInstruments.HtmlVI.inheritFromParent(child, parent);
    var proto = child.prototype;

    // Private static methods
    var secondsSince1904ToJsDate = function (secondsSince1904) {
        var startDate = new Date(Date.UTC(1904, 0, 1)); // January 1, 1904
        var msSince1904 = secondsSince1904 * 1000;
        var jsMs = startDate.getTime() + msSince1904;
        var jsDate = new Date(jsMs);
        return jsDate;
    };

    var jsDateToSecondsSince1904 = function (jsDate) {
        var startDate = new Date(Date.UTC(1904, 0, 1)); // January 1, 1904
        var msSinceStartDate = jsDate - startDate;
        var secondsSinceStartDate = msSinceStartDate / 1000;
        return secondsSinceStartDate;
    };
    
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
            widgetSettings.disabled = this.readOnly;

            childElement = document.createElement('div');
            childElement.style.width = '100%';
            childElement.style.height = '100%';

            this.appendChild(childElement);

            jqref = $(childElement);
            jqref.jqxDateTimeInput(widgetSettings);
            jqref.jqxDateTimeInput('setDate', secondsSince1904ToJsDate(this.value));
            // Note: event name changes from valuechanged to valueChanged in different versions of jqwidgets
            // http://www.jqwidgets.com/community/topic/cannot-bind-to-events/
            jqref.on('valuechanged', function (event) {
                that.value = jsDateToSecondsSince1904(event.args.date);
            });
            
            // This is triggered by the container resizing.
            // Triggered in the view model, though ideally, it
            // could be anywhere
            // Without this, the jqwidget ignores the size we give it on drop and sets it to 0 width
            $(this).on('resizeEventHack', function () {
                var resizeParams = {
                    'width': that.style.width,
                    'height': that.style.height
                };
                jqref.jqxDateTimeInput(resizeParams);
            });
        }
    };

    proto.propertyUpdated = function (propertyName) {
        parent.prototype.propertyUpdated.call(this, propertyName);

        var childElement = this.firstElementChild,
            jqref = $(childElement);

        switch (propertyName) {
            case 'value':
                jqref.jqxDateTimeInput('setDate', secondsSince1904ToJsDate(this.value));
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

    proto.defineElementInfo(proto, 'ni-time-stamp-text-box', 'HTMLNITimeStampTextBox');
}(NationalInstruments.HtmlVI.Elements.TimeStampTextBox, NationalInstruments.HtmlVI.Elements.NumericControl));
