//****************************************
// Cartesian Plot Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.CartesianPlotModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualComponentModel.call(this, id);
    this.xaxis = null;
    this.yaxis = null;
    this.renderer = null;

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.cartesianPlotModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.CartesianPlotModel.prototype;
        proto.cartesianPlotModelMethods = function () {
        };

        proto.setXAxis = function (xaxis) {
            this.xaxis = xaxis;
        };

        proto.getXAxis = function () {
            return this.xaxis;
        };

        proto.setYAxis = function (yaxis) {
            this.yaxis = yaxis;
        };

        proto.getYAxis = function () {
            return this.yaxis;
        };

        proto.setRenderer = function (renderer) {
            this.renderer = renderer;
        };

        proto.getRenderer = function () {
            return this.renderer;
        };

        proto.setProperty = function (name, settings) {
            switch (name) {
                case 'renderer':
                    var rendererIn = settings.renderer;
                    var renderer = this.getRoot().addFrontPanelControlToParent({model: this.getRoot()}, rendererIn);
                    this.setRenderer(renderer);
                    delete settings.renderer;
                    break;
                case 'plotId':
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

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.CartesianPlotModel, NationalInstruments.HtmlVI.VisualComponentModel);