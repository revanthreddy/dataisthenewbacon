//****************************************
// Visual Component Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.VisualComponentModel = function (id) {
    'use strict';
    // Properties
    this.id = id;
    this.owner = null;
    this.rootOwner = null;
    this.kind = '';
    this.visible = true;
    this.configuration = null;
    this.labelId = '';

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.VisualComponentModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.VisualComponentModel.prototype;
        proto.VisualComponentModelMethods = function () {
        };

        proto.setId = function (id) {
            this.id = id;
        };

        proto.getId = function () {
            return this.id;
        };

        proto.setOwner = function (fp) {
            this.owner = fp;
            this.rootOwner = this.getRoot();
        };

        proto.getOwner = function () {
            return this.owner;
        };

        proto.isNested = function () {
            return this.getOwner() !== this.getRoot() &&
                       (this.getOwner().getKind() === 'niCluster' || this.getOwner().getKind() === 'niArray');
        };

        proto.getRoot = function () {
            var owner = this.getOwner();
            while (owner !== null && owner.getOwner() !== null) {
                owner = owner.getOwner();
            }

            return owner;
        };

        proto.setKind = function (kind) {
            this.kind = kind;
        };

        proto.getKind = function () {
            return this.kind;
        };

        proto.setConfiguration = function (configuration) {
            this.configuration = configuration;
        };

        proto.getConfiguration = function () {
            return this.configuration;
        };

        proto.setVisible = function (visible) {
            this.visible = visible;
        };

        proto.getVisible = function () {
            return this.visible;
        };

        proto.setProperty = function () {
        };

        proto.setLabelId = function (labelId) {
            this.labelId = labelId;
        };

        proto.getLabelId = function () {
            return this.labelId;
        };

        proto.initializeModel = function (settings) {
            for (var name in settings) {
                if (settings.hasOwnProperty(name)) {
                    this.setProperty(name, settings);
                    // this can remove properties that are handled in derived classes
                    if (settings.hasOwnProperty(name)) {
                        this[name] = settings[name];
                    }
                }
            }
        };

        proto.updateModelFromDataSource = function (settings) {
            // Update the model
            for (var name in settings) {
                if (settings.hasOwnProperty(name)) {
                    this.setProperty(name, settings);
                    // this can remove properties that are handled in derived classes
                    if (settings.hasOwnProperty(name)) {
                        this[name] = settings[name];
                    }
                }
            }
        };

        proto.printToConsole = function (space) {
            for (var name in this) {
                if (this.hasOwnProperty(name)) {
                    console.log(space + name + ': ' + this[name]);
                }
            }
        };
    }
};
