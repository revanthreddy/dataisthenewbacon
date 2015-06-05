//****************************************
// Tab Item Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.TabItemModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualComponentModel.call(this, id);
    this.header = 0;
    this.tabIndex = 0;
    this.children = [];

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.tabItemModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.TabItemModel.prototype;
        proto.tabItemModelMethods = function () {
        };

        proto.setHeader = function (header) {
            this.header = header;
        };

        proto.getHeader = function () {
            return this.header;
        };

        proto.setTabIndex = function (tabIndex) {
            this.tabIndex = tabIndex;
        };

        proto.getTabIndex = function () {
            return this.tabIndex;
        };

        proto.setChildren = function (children) {
            this.children.length = 0;
            for (var i = 0; i < children.length; i++) {
                this.children.push(children[i]);
            }
        };

        proto.getChildren = function () {
            return this.children;
        };

        proto.addChild = function (child) {
            this.children.push(child);
        };

        proto.removeChild = function(child) {
            for (var i = this.children.length - 1; i >= 0; i--)
            {
                if (this.children[i].getId() === child.getId())
                {
                    this.children.splice(i, 1);
                    break;
                }
            }
        };

        proto.setProperty = function (name, settings) {
            switch (name) {
                case 'children':
                    this.setChildren(settings.children);
                    delete settings.children;
                    break;
                case 'tabIndex':
                    break;
                case 'tabId':
                    break;
                default:
                    NationalInstruments.HtmlVI.VisualComponentModel.prototype.setProperty.call(this, name, settings);
                    break;
            }
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.TabItemModel, NationalInstruments.HtmlVI.VisualComponentModel);