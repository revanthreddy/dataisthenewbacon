//****************************************
// Custom Element Registration
// National Instruments Copyright 2014
//****************************************

(function () {
    'use strict';
    var toReg, toRegProto;
    for (toReg in NationalInstruments.HtmlVI.Elements) {
        if (NationalInstruments.HtmlVI.Elements.hasOwnProperty(toReg)) {
            toRegProto = NationalInstruments.HtmlVI.Elements[toReg].prototype;

            if (toRegProto.elementInfo !== undefined) {
                window[toRegProto.elementInfo.prototypeName] = document.registerElement(toRegProto.elementInfo.tagName, {
                    prototype: Object.create(toRegProto)
                });
            }
        }
    }
}());
