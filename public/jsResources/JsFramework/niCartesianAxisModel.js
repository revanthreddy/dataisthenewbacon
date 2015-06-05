//****************************************
// Cartesian Axis Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.CartesianAxisModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualComponentModel.call(this, id);
    this.max = 0;
    this.min = 0;
    this.axisposition = 'left';
    this.showLabel = true;
    this.axisLabel = '';
    this.mode = 'linear';
    this.autoScale = false;

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.cartesianAxisModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.CartesianAxisModel.prototype;
        proto.cartesianAxisModelMethods = function () {
        };

        proto.setAutoScale = function (auto) {
            this.autoScale = auto;
        };

        proto.getAutoScale = function () {
            return this.autoScale;
        };

        proto.setMaximum = function (max) {
            this.max = max;
        };

        proto.getMaximum = function () {
            return this.max;
        };

        proto.setMinimum = function (min) {
            this.min = min;
        };

        proto.getMinimum = function () {
            return this.min;
        };

        proto.setAxisPosition = function (pos) {
            this.axisposition = pos;
        };

        proto.getAxisPosition = function () {
            return this.axisposition;
        };

        proto.setShowLabel = function (show) {
            this.showLabel = show;
        };

        proto.getShowLabel = function () {
            return this.showLabel;
        };

        proto.setAxisLabel = function (label) {
            this.axisLabel = label;
        };

        proto.getAxisLabel = function () {
            return this.axisLabel;
        };

        proto.setMode = function (mode) {
            this.mode = mode;
        };

        proto.getMode = function () {
            return this.mode;
        };

        proto.setProperty = function (name, settings) {
            switch (name) {
                case 'logScale':
                    if (settings.logScale === 'true' || settings.logScale === true)
                    {
                        this.setMode('log');
                    }
                    else
                    {
                        this.setMode('linear');
                    }
                    delete settings.logScale;
                    break;
                case 'show':
                    // TODO
                    break;
                case 'axisId':
                    break;
                default:
                    NationalInstruments.HtmlVI.VisualComponentModel.prototype.setProperty.call(this, name, settings);
                    break;
            }
        };

        proto.updateModelFromDataSource = function (settings) {
            // Update the model
            NationalInstruments.HtmlVI.VisualComponentModel.prototype.updateModelFromDataSource.call(this, settings);
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.CartesianAxisModel, NationalInstruments.HtmlVI.VisualComponentModel);