//****************************************
// Tab Item Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.ClusterModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualModel.call(this, id);
    this.children = [];

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.clusterModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.ClusterModel.prototype;
        proto.clusterModelMethods = function () {
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
                case 'value':
                    var clusterData = settings.value;
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        for (var property in child.bindingInfo) {
                            if (child.bindingInfo.hasOwnProperty(property)) {
                                var childBindingProperty = child.bindingInfo[property];
                                if (!clusterData.hasOwnProperty(childBindingProperty)) {
                                    continue;
                                }
                                var set = {};
                                set[property] = clusterData[childBindingProperty];

                                var childModel = this.getRoot().getRootModelControls()[child.id];
                                childModel.updateModelFromDataSource(set);
                            }
                        }
                    }
                    break;
                default:
                    NationalInstruments.HtmlVI.VisualModel.prototype.setProperty.call(this, name, settings);
                    break;
            }
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.ClusterModel, NationalInstruments.HtmlVI.VisualModel);