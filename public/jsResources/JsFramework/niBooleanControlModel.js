//****************************************
// Boolean Control Model
// National Instruments Copyright 2014
//****************************************
NationalInstruments.HtmlVI.BooleanControlModelClickModeEnum = Object.freeze({
    PRESS:      'Press',
    RELEASE:    'Release'
});

NationalInstruments.HtmlVI.BooleanControlModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualModel.call(this, id);
    this.value = false;
    this.contentVisible = true;
    this.content = 'Button';
    this.clickMode = NationalInstruments.HtmlVI.BooleanControlModelClickModeEnum.RELEASE;
    this.momentary = false;

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.booleanControlModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.BooleanControlModel.prototype;
        proto.booleanControlModelMethods = function () {
        };

        proto.getValue = function () {
            return this.value;
        };

        proto.setValue = function (value) {
            this.value = value;
        };

        proto.getContent = function () {
            return this.content;
        };

        proto.setContent = function (content) {
            this.content = content;
        };

        proto.getContentVisible = function () {
            return this.contentVisible;
        };

        proto.setContentVisible = function (contentVisible) {
            this.contentVisible = contentVisible;
        };

        proto.getClickMode = function () {
            return this.clickMode;
        };

        proto.setClickMode = function (clickMode) {
            this.clickMode = clickMode;
        };

        proto.getMomentary = function () {
            return this.momentary;
        };

        proto.setMomentary = function (momentary) {
            this.momentary = momentary;
        };

        proto.controlChanged = function () {
            if (this.rootOwner instanceof Object) {
                var propertyChange = { 'value': this.getValue() };
                this.rootOwner.controlChanged(this.getId(), this.getKind(), propertyChange);
            }
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.BooleanControlModel, NationalInstruments.HtmlVI.VisualModel);