//****************************************
// String Control View Model
// National Instruments Copyright 2015
//****************************************

NationalInstruments.HtmlVI.StringControlViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualViewModel.call(this, element, model);

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.stringControlViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.StringControlViewModel.prototype;
        proto.stringControlViewModelMethods = function () {
        };

        proto.instantiate = undefined;
        proto.bindToView = function () {
            NationalInstruments.HtmlVI.VisualViewModel.prototype.instantiate.call(this);
            if (this.model instanceof Object) {
                var id = '#' + this.model.getId();
                var that = this;

                $(id).on('text-changed', function (evt) {
                    that.model.setText(evt.originalEvent.detail.text);
                    that.model.controlChanged();
                });
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
                    case 'readOnly':
                        viewConfig.properties.readOnly = this.model.getReadOnly();
                        break;
                    case 'text':
                        viewConfig.properties.textNonSignaling = this.model.getText();
                        break;
                    default:
                        break;
                }
            }

            if (!$.isEmptyObject(viewConfig.widget)) {
                viewConfig.properties.configuration = JSON.stringify(viewConfig.widget);
            }

            this.applyElementChanges(viewConfig);
        };

        proto.updateModelSettingsFromElement = function (element) {
            var model = this.getModel();
            NationalInstruments.HtmlVI.VisualViewModel.prototype.updateModelSettingsFromElement.call(this, element);
            model.text = element.text;
        };

        proto.applyModelSettings = function (settings) {
            var element = this.element;
            NationalInstruments.HtmlVI.VisualViewModel.prototype.applyModelSettings.call(this, settings);
            if (settings.text !== undefined) {
                element.textNonSignaling = settings.text;
            }
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.StringControlViewModel, NationalInstruments.HtmlVI.VisualViewModel);
NationalInstruments.HtmlVI.Elements.NIElement.prototype.addProperty(NationalInstruments.HtmlVI.Elements.StringControl.prototype, { propertyName: 'bindingInfo', defaultValue: '{}' });
