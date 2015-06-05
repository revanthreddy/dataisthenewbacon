//****************************************
// Boolean Button View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.BooleanButtonViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.BooleanControlViewModel.call(this, element, model);
    
    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.booleanButtonViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.BooleanButtonViewModel.prototype;
        proto.booleanButtonViewModelMethods = function () {
        };

        proto.instantiate = undefined;
        proto.bindToView = function () {
            NationalInstruments.HtmlVI.BooleanControlViewModel.prototype.instantiate.call(this);
            if (this.model instanceof Object) {
                
                var id = '#' +this.model.getId();
                var that = this;
                
                $(id).on('value-changed', function (evt) {
                        that.model.setValue(evt.originalEvent.detail.value);
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
            var viewConfig = NationalInstruments.HtmlVI.BooleanControlViewModel.prototype.modelPropertyChanged.call(this, changes);

            // TODO When boolean custom elements are finished all the following property checks can be moved in BooleanControl and shared instead mraj
            var n = changes.length;
            for (var i = 0; i < n; i++) {
                switch (changes[i]) {
                    case 'content':
                        viewConfig.properties.content = this.model.getContent();
                        break;
                    case 'contentVisible':
                        viewConfig.properties.contentVisible = this.model.getContentVisible();
                        break;
                    case 'value':
                        viewConfig.properties.value = this.model.getValue(); 
                        break;
                    case 'clickMode':
                        viewConfig.properties.clickMode = this.model.getClickMode();
                        break;
                    case 'momentary':
                        viewConfig.properties.momentary = this.model.getMomentary();
                        break;
                }
            }
            
            // Assume only thing left in viewConfig.widget is configuration properties
            // TODO when using all custom elements need to retarget config to viewConfig.properties.configuration mraj
            if (!$.isEmptyObject(viewConfig.widget)) {
                viewConfig.properties.configuration = JSON.stringify(viewConfig.widget);
            }
            
            this.applyElementChanges(viewConfig);
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.BooleanButtonViewModel, NationalInstruments.HtmlVI.BooleanControlViewModel);
NationalInstruments.HtmlVI.Elements.NIElement.prototype.addProperty(NationalInstruments.HtmlVI.Elements.BooleanButton.prototype, { propertyName: 'bindingInfo', defaultValue: '{}' });
