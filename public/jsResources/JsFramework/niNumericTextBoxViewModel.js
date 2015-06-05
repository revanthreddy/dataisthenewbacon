//****************************************
// Numeric TextBox View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.NumericTextBoxViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.NumericControlViewModel.call(this, element, model);

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.numericTextBoxViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.NumericTextBoxViewModel.prototype;
        proto.numericTextBoxViewModelMethods = function () {
        };

        proto.instantiate = undefined;
        proto.bindToView = function () {
            var that = this;
            NationalInstruments.HtmlVI.NumericControlViewModel.prototype.instantiate.call(this);
            if (this.model instanceof Object) {
                var id = '#' + this.model.getId();
                $(id).on('value-changed', function (event) {
                    that.model.setValue(parseFloat(event.originalEvent.detail.value));
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
            var viewConfig = NationalInstruments.HtmlVI.NumericControlViewModel.prototype.modelPropertyChanged.call(this, changes);
            var digitsChanged = false;
            var n = changes.length;
            for (var i = 0; i < n; i++) {
                switch (changes[i]) {
                    case 'decimalDigits':
                    case 'precisionDigits':
                        digitsChanged = true;
                        break;
                    default:
                        break;
                }
            }

            if (digitsChanged === true) {
                if (this.model.getDecimalDigits() >= 0) {
                    viewConfig.properties.decimalDigits = this.model.getDecimalDigits();
                }
                else {
                    viewConfig.properties.digits = this.model.getPrecisionDigits();
                }
            }
            
            this.applyElementChanges(viewConfig);
        };

        proto.updateModelSettingsFromElement = function (element) {
            var model = this.getModel();
            NationalInstruments.HtmlVI.NumericControlViewModel.prototype.updateModelSettingsFromElement.call(this, element);
            model.decimalDigits = element.decimalDigits;
            model.precisionDigits = element.precisionDigits;

        };

        proto.applyModelSettings = function (settings) {
            var element = this.element;
            NationalInstruments.HtmlVI.NumericControlViewModel.prototype.applyModelSettings.call(this, settings);
            if (settings.decimalDigits !== undefined) {
                element.decimalDigits = settings.decimalDigits;
            }
            if (settings.precisionDigits !== undefined) {
                element.precisionDigits = settings.precisionDigits;
            }
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.NumericTextBoxViewModel, NationalInstruments.HtmlVI.NumericControlViewModel);
NationalInstruments.HtmlVI.Elements.NIElement.prototype.addProperty(NationalInstruments.HtmlVI.Elements.NumericTextBox.prototype, { propertyName: 'bindingInfo', defaultValue: '{}' });
