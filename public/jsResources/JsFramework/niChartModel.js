//****************************************
// Chart Graph Model
// National Instruments Copyright 2014
//****************************************

/*global HistoryBuffer: false*/

NationalInstruments.HtmlVI.ChartModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.CartesianGraphModel.call(this, id);
    this.bufferSize = 1024;
    this.historyBuffer = new HistoryBuffer(this.bufferSize, 1);

    // Prevent Closing on Constructor Properties
    id = undefined;

    function ensureHistoryBufferWidth(buffer, width) {
        if (buffer.width !== width) {
            buffer.buffer.empty();
            buffer.width = width;
            buffer.count = 0;
        }
    }

    function arrayColumn(array2d, index) {
        var column = [];
        for (var j = 0; j < array2d.length; j++) {
            column.push(array2d[j][index]);
        }

        return column;
    }

    // Methods
    if (typeof this.chartModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.ChartModel.prototype;
        proto.chartModelMethods = function () {};

        proto.setSize = function (width, height) {
            if (width === 0) {
                width = 1; // flot doesn't like 0 as a dimension
            }
            if (height === 0) {
                height = 1; // flot doesn't like 0 as a dimension
            }
            this.setWidth(width);
            this.setHeight(height);
        };

        proto.getHistorySize = function () {
            return this.bufferSize;
        };

        proto.setProperty = function(name, settings) {
            switch (name) {
            case 'bufferSize':
                this.bufferSize = settings.bufferSize;
                this.historyBuffer.setCapacity(this.bufferSize);
                break;
            default:
                NationalInstruments.HtmlVI.CartesianGraphModel.prototype.setProperty.call(this, name, settings);
                break;
            }
        };

        proto.updateModelFromDataSource = function (settings) {
            // Update the model. Once we have comprehensive type information turn this into a more efficient (table driven ?) function
            if (settings.hasOwnProperty('value')) {
                var value = settings.value;

                if (typeof value === 'number') {
                    ensureHistoryBufferWidth(this.historyBuffer, 1);
                    this.historyBuffer.push(value);
                } else if (typeof value === 'string') {

                    try {
                        var arrValue = JSON.parse(value);

                        if (arrValue.length > 0) {
                            if (typeof arrValue[0] === 'number') {
                                ensureHistoryBufferWidth(this.historyBuffer, 1);
                                this.historyBuffer.appendArray(arrValue);
                            } else if (arrValue[0] instanceof Array) {
                                ensureHistoryBufferWidth(this.historyBuffer, arrValue.length);
                                for (var i = 0; i < arrValue[0].length; i++) {
                                    this.historyBuffer.push(arrayColumn(arrValue, i));
                                }
                            }
                        }
                    } catch (e) {
                        // invalid JSON ... do nothing
                    }
                }
                if (Object.keys(settings).length === 1) {
                    return;
                } else {
                    delete settings.value; // we alredy dealed with value
                }
            }

            NationalInstruments.HtmlVI.GraphBaseModel.prototype.updateModelFromDataSource.call(this, settings);
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.ChartModel, NationalInstruments.HtmlVI.CartesianGraphModel);