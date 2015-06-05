//****************************************
// DropDown Model
// National Instruments Copyright 2015
//****************************************

NationalInstruments.HtmlVI.DropDownModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualModel.call(this, id);
    this.source = [];
    this.selectedIndex = -1;

    // Methods
    if (typeof this.dropDownModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.DropDownModel.prototype;
        proto.dropDownModelMethods = function () {
        };

        proto.setSource = function (source) {
            this.source = source;
        };

        proto.getSource = function () {
            return this.source;
        };

        proto.getSelectedIndex = function () {
            return this.selectedIndex;
        };

        proto.setSelectedIndex = function (index) {
            this.selectedIndex = index;
        };

        proto.getSelectedText = function () {
            return this.source[this.selectedIndex];
        };

        proto.controlChanged = function () {
            if (this.rootOwner instanceof Object) {
                var propertyChange = { 'selectedIndex': this.getSelectedIndex() };
                this.rootOwner.controlChanged(this.getId(), this.getKind(), propertyChange);
            }
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.DropDownModel, NationalInstruments.HtmlVI.VisualModel);
