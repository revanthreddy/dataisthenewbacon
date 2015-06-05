//****************************************
// Cartesian Graph Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.CartesianGraphModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.GraphBaseModel.call(this, id);
    this.axes = [];
    this.plots = [];
    this.cursors = [];
    this.value = [];

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.cartesianGraphModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.CartesianGraphModel.prototype;
        proto.cartesianGraphModelMethods = function () {
        };

        proto.setValue = function (data) {
            this.value = data;
        };

        proto.getValue = function () {
            return this.value;
        };

        proto.setAxes = function (axes) {
            this.axes.length = 0;
            for (var i = 0; i < axes.length; i++) {
                var axisIn = axes[i];
                var axis = this.getRoot().addFrontPanelControlToParent({model: this.getRoot()}, axisIn);
                this.axes.push(axis);
            }
        };

        proto.getAxes = function () {
            return this.axes;
        };

        proto.setPlots = function (plots) {
            this.plots.length = 0;
            for (var i = 0; i < plots.length; i++) {
                var plotIn = plots[i];
                var plot = this.getRoot().addFrontPanelControlToParent({model: this.getRoot()}, plotIn);
                this.plots.push(plot);
            }
        };

        proto.getPlots = function () {
            return this.plots;
        };

        proto.getCursors = function () {
            return this.cursors;
        };

        proto.setCursors = function (cursors) {
            this.cursors.length = 0;
            for (var i = 0; i < cursors.length; i++) {
                var cursorIn = cursors[i];
                var cursor = this.getRoot().addFrontPanelControlToParent({model: this.getRoot()}, cursorIn);
                this.cursors.push(cursor);
            }
        };

        proto.setProperty = function (name, settings) {
            switch (name) {
                case 'axes':
                    this.setAxes(settings.axes);
                    delete settings.axes;
                    break;
                case 'plots':
                    this.setPlots(settings.plots);
                    delete settings.plots;
                    break;
                case 'cursors':
                    this.setCursors(settings.cursors);
                    delete settings.cursors;
                    break;
                case 'value':
                    var dataValuesArray = [];
                    var sourceValuesArray = JSON.parse(settings.value);
                    if (sourceValuesArray.length > 0) {
                        var i,
                            coordinatesArray;

                        if (sourceValuesArray[0] instanceof Object) { // Complex number
                            for (i = 0; i < sourceValuesArray.length; i++) {
                                coordinatesArray = [];
                                coordinatesArray.push(i);
                                coordinatesArray.push(sourceValuesArray[i].real);
                                dataValuesArray.push(coordinatesArray);
                            }
                        }
                        else {
                            for (i = 0; i < sourceValuesArray.length; i++) {
                                coordinatesArray = [];
                                coordinatesArray.push(i);
                                coordinatesArray.push(sourceValuesArray[i]);
                                dataValuesArray.push(coordinatesArray);
                            }
                        }
                        this.setValue(dataValuesArray);
                    }
                    delete settings.value;
                    break;
                default:
                    NationalInstruments.HtmlVI.GraphBaseModel.prototype.setProperty.call(this, name, settings);
                    break;
            }
        };

        proto.updateModelFromDataSource = function (settings) {
            // Update the model
            NationalInstruments.HtmlVI.GraphBaseModel.prototype.updateModelFromDataSource.call(this, settings);
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.CartesianGraphModel, NationalInstruments.HtmlVI.GraphBaseModel);
