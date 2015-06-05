//****************************************
// Cursor View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.CursorViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualComponentViewModel.call(this, element, model);

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.CursorViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.CursorViewModel.prototype;
        proto.CursorViewModelMethods = function () {
        };

        proto.getViewConfig = function()
        {
            var cursor = {};
            cursor.name = this.model.getCursorLabel();


            cursor.showLabel = this.model.getShowLabel();
            cursor.color = this.model.getCursorColor();
            cursor.snapToPlot = this.model.getSnapToData();
            cursor.symbol = this.model.getTargetShape();
            if (this.model.getCrosshairStyle() === 'both') {
                cursor.mode = 'xy';
            }
            else if (this.model.getCrosshairStyle() === 'horizontal') {
                cursor.mode = 'y';
            }
            else if (this.model.getCrosshairStyle() === 'vertical') {
                cursor.mode = 'x';
            }
            else {
                cursor.mode = null;
            }

            cursor.showValuesRelativeToSeries = this.model.getShowValue() ? 0: null;

            cursor.position = this.model.getPosition();

            return cursor;
        };

        proto.modelPropertyChanged = function (changes) {
            var viewConfig = NationalInstruments.HtmlVI.VisualComponentViewModel.prototype.modelPropertyChanged.call(this, changes);
            var n = changes.length;
            for (var i = 0; i < n; i++) {
                switch (changes[i]) {
                    case 'cursorLabel':
                        if (this.model.getCursorLabel() !== null) {
                            viewConfig.other.name = this.model.getCursorLabel();
                        }
                        break;
                    case 'targetShape':
                        if (this.model.getTargetShape() !== null) {
                            viewConfig.other.symbol = this.model.getTargetShape();
                        }
                        break;
                    case 'cursorColor':
                        if (this.model.getCursorColor() !== null) {
                            viewConfig.other.color = this.model.getCursorColor();
                        }
                        break;
                    case 'crosshairStyle':
                        if (this.model.getCrosshairStyle() !== null) {
                            if (this.model.getCrosshairStyle() === 'both') {
                                viewConfig.other.mode = 'xy';
                            }
                            else if (this.model.getCrosshairStyle() === 'horizontal') {
                                viewConfig.other.mode = 'x';
                            }
                            else if (this.model.getCrosshairStyle() === 'vertical') {
                                viewConfig.other.mode = 'y';
                            }
                            else {
                                viewConfig.other.mode = '';
                            }
                        }
                        break;
                    case 'show':
                        break;
                    case 'showLabel':
                        viewConfig.other.showLabel = this.model.getShowLabel();
                        break;
                    case 'showValue':
                        viewConfig.other.showValuesRelativeToSeries = this.model.getShowValue() ? 0 : null;
                        break;
                    case 'snapToData':
                        viewConfig.other.snapToPlot = this.model.getSnapToData();
                        break;
                    default:
                        break;
                }
            }

            if ($.isEmptyObject(viewConfig.other)) {
                return;
            }

            this.notifyComponentChanged(viewConfig);
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.CursorViewModel, NationalInstruments.HtmlVI.VisualComponentViewModel);