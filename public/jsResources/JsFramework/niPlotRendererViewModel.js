//****************************************
// PlotRenderer View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.PlotRendererViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualComponentViewModel.call(this, element, model);

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.PlotRendererViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.PlotRendererViewModel.prototype;
        proto.PlotRendererViewModelMethods = function () {
        };

        proto.getViewConfig = function()
        {
            var viewConfig = {};
            viewConfig.lineWidth = this.model.getLineWidth();
            //viewConfig.pointShape = this.model.getPointShape();
            //viewConfig.pointSize = this.model.getPointSize();
            //viewConfig.pointColor = this.model.getPointColor();
            viewConfig.color = this.model.getLineStroke();

            return viewConfig;
        };

        proto.modelPropertyChanged = function (configuration) {
            var viewConfig = NationalInstruments.HtmlVI.VisualComponentViewModel.prototype.modelPropertyChanged.call(this, configuration);
            var n = configuration.length;
            for (var i = 0; i < n; i++) {
                switch (configuration[i]) {
                    case 'lineWidth':
                        if (this.model.getLineWidth() !== null) {
                            viewConfig.other.lineWidth = this.model.getLineWidth();
                        }
                        break;
                    case 'pointShape':
                        if (this.model.getPointShape() !== null) {
                            viewConfig.other.pointShape = this.model.getPointShape();
                        }
                        break;
                    case 'pointSize':
                        if (this.model.getPointSize() !== null) {
                            viewConfig.other.pointSize = this.model.getPointSize();
                        }
                        break;
                    case 'pointColor':
                        if (this.model.getPointColor() !== null) {
                            viewConfig.other.pointColor = this.model.getPointColor();
                        }
                        break;
                    case 'lineStroke':
                        if (this.model.getLineStroke() !== null) {
                            viewConfig.other.color = this.model.getLineStroke();
                        }
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

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.PlotRendererViewModel, NationalInstruments.HtmlVI.VisualComponentViewModel);