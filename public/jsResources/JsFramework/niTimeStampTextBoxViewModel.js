//****************************************
// Time Stamp Text Box View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.TimeStampTextBoxViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.NumericControlViewModel.call(this, element, model);

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.timeStampTextBoxViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.TimeStampTextBoxViewModel.prototype;
        proto.timeStampTextBoxViewModelMethods = function () {
        };

        proto.instantiate = undefined;
        
        proto.bindToView = function () {
            NationalInstruments.HtmlVI.NumericControlViewModel.prototype.instantiate.call(this);
            if (this.model instanceof Object) {
                var id = '#' + this.model.getId();
                var that = this;
                this.enableResizeHack();

                $(id).on('value-changed', function (event) {
                    if (that.getSuppressChangeEvents() === false) {
                        that.model.setValue(event.originalEvent.detail.value);
                        that.model.controlChanged();
                    }
                });
            }
        };

        proto.modelPropertyChanged = function (changes) {
            var viewConfig = NationalInstruments.HtmlVI.NumericControlViewModel.prototype.modelPropertyChanged.call(this, changes);
            var n = changes.length;
            for (var i = 0; i < n; i++) {
                switch (changes[i]) {
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
            NationalInstruments.HtmlVI.NumericControlViewModel.prototype.updateModelSettingsFromElement.call(this, element);
        };

        proto.applyModelSettings = function (settings) {
            NationalInstruments.HtmlVI.NumericControlViewModel.prototype.applyModelSettings.call(this, settings);
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.TimeStampTextBoxViewModel, NationalInstruments.HtmlVI.NumericControlViewModel);
NationalInstruments.HtmlVI.Elements.NIElement.prototype.addProperty(NationalInstruments.HtmlVI.Elements.TimeStampTextBox.prototype, { propertyName: 'bindingInfo', defaultValue: '{}' });
