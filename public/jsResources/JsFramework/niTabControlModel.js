//****************************************
// Boolean Button Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.TabControlModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualModel.call(this, id);
    this.selectedIndex = 0;
    this.placement = 'top';
    this.tabs = [];

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.tabControlModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.TabControlModel.prototype;
        proto.tabControlModelMethods = function () {
        };

        proto.getSelectedIndex = function () {
            return this.selectedIndex;
        };

        proto.setSelectedIndex = function (selectedIndex) {
            this.selectedIndex = selectedIndex;
        };

        proto.getPlacement = function () {
            return this.placement;
        };

        proto.setPlacement = function (placement) {
            this.placement = placement;
        };

        proto.setTabs = function (tabs) {
            this.tabs.length = 0;
            for (var i = 0; i < tabs.length; i++) {
                this.tabs.push(tabs[i]);
            }
        };

        proto.getTabs = function () {
            return this.tabs;
        };

        proto.setProperty = function (name, settings) {
            switch (name) {
                case 'tabs':
                    this.setTabs(settings.tabs);
                    delete settings.tabs;
                    break;
                default:
                    NationalInstruments.HtmlVI.VisualModel.prototype.setProperty.call(this, name, settings);
                    break;
            }
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.TabControlModel, NationalInstruments.HtmlVI.VisualModel);