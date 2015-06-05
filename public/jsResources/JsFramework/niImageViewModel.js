//****************************************
// Image View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.ImageViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualViewModel.call(this, element, model);

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.imageViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.ImageViewModel.prototype;
        proto.imageViewModelMethods = function () {
        };

        proto.createViewParams = function () {
            var params = NationalInstruments.HtmlVI.VisualViewModel.prototype.createViewParams.call(this);
            params.source = this.model.getSource();
            params.alternate = this.model.getAlternate();
            return params;
        };

        proto.updateImageProperties = function (params) {
            for (var attr in params) {
                if (params.hasOwnProperty(attr)) {
                    switch (attr) {
                        case 'source':
                            this.element.src = params.source;
                            break;
                        case 'alternate':
                            this.element.alt = params.alternate;
                            break;
                        default:
                            break;
                    }
                }
            }
        };

        proto.instantiate = function () {
            NationalInstruments.HtmlVI.VisualViewModel.prototype.instantiate.call(this);
            if (this.model instanceof Object) {
                var params = this.createViewParams();
                this.updateImageProperties(params);
            }
            else {
                var errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNABLE_TO_CREATE_CONTROL,
                    this.model.getId(), this.model.getKind());
                throw new Error(errorMessage);
            }
        };

        proto.modelPropertyChanged = function (changes) {
            var viewConfig = NationalInstruments.HtmlVI.VisualViewModel.prototype.modelPropertyChanged.call(this, changes);
            var n = changes.length;
            for (var i = 0; i < n; i++) {
                switch (changes[i]) {
                    case 'source':
                        viewConfig.attributes.src = this.model.getSource();
                        break;
                    case 'alternate':
                        viewConfig.attributes.alt = this.model.getAlternate();
                        break;
                    default:
                        break;
                }
            }

            this.applyElementChanges(viewConfig);
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.ImageViewModel, NationalInstruments.HtmlVI.VisualViewModel);