//****************************************
// Boolean Button View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.BooleanLEDViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.BooleanControlViewModel.call(this, element, model);

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.BooleanLEDViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.BooleanLEDViewModel.prototype;
        proto.BooleanLEDViewModelMethods = function () {
        };

        proto.instantiate = function () {
            NationalInstruments.HtmlVI.BooleanControlViewModel.prototype.instantiate.call(this);
            if (this.model instanceof Object) {
                var params = this.createViewParams();
                var id = '#' + this.model.getId();
                $(id).attr('type', 'button');
                if (this.model.getShape() === NationalInstruments.HtmlVI.BooleanLEDModelShapeEnum.ROUND) {
                    $(id).css('borderRadius', parseInt(this.model.getWidth()) / 2);
                }
                else {
                    $(id).css('borderRadius', 0);
                }
                if (this.model.getContentVisible() === true) {
                    $(id).attr('value', this.model.getValue() ? this.model.getTrueContent() : this.model.getFalseContent());
                }
                else {
                    $(id).attr('value', '');
                }
                $(id).jqxToggleButton(params);
                
                $(id).jqxToggleButton('_removeHandlers');
                
                if(this.model.getValue() === true) {
                    $(id).jqxToggleButton('check');
                }
                else {
                    $(id).jqxToggleButton('unCheck');
                }
                
                proto.bindMechanicalAction.call(this);
            }
            else {
                var errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNABLE_TO_CREATE_CONTROL,
                    this.model.getId(), this.model.getKind());
                throw new Error(errorMessage);
            }
        };

        proto.createViewParams = function () {
            var params = NationalInstruments.HtmlVI.BooleanControlViewModel.prototype.createViewParams.call(this);
            // Do not use params.template, the template css breaks toggle styling in jqx toggle buttons
            params.theme = 'fresh';
            params.toggled = this.model.getValue();
            return params;
        };

        proto.modelPropertyChanged = function (changes) {
            var viewConfig = NationalInstruments.HtmlVI.BooleanControlViewModel.prototype.modelPropertyChanged.call(this, changes);
            var n = changes.length;
            for (var i = 0; i < n; i++) {
                switch (changes[i]) {
                    case 'shape':
                        if (this.model.getShape() === NationalInstruments.HtmlVI.BooleanLEDModelShapeEnum.ROUND) {
                            viewConfig.cssStyles.borderRadius = parseInt(this.model.getWidth()) / 2;
                        }
                        else {
                            viewConfig.cssStyles.borderRadius = 0;
                        }
                        break;
                    case 'trueContent':
                        if (this.model.getValue() === true) {
                            viewConfig.attributes.value = this.model.getTrueContent();
                        }
                        break;
                    case 'falseContent':
                        if (this.model.getValue() === false) {
                            viewConfig.attributes.value = this.model.getFalseContent();
                        }
                        break;
                    case 'contentVisible':
                        if (this.model.getContentVisible() === false) {
                            viewConfig.attributes.value = '';
                        }
                        else {
                            viewConfig.attributes.value = this.model.getValue() ? this.model.getTrueContent() : this.model.getFalseContent();
                        }
                        break;
                    case 'value':
                        viewConfig.widget.toggled = this.model.getValue();
                        if (this.model.getContentVisible() === true) {
                            viewConfig.attributes.value = this.model.getValue() ? this.model.getTrueContent() : this.model.getFalseContent();
                        }
                        break;
                    case 'clickMode':
                        proto.bindMechanicalAction.call(this);
                        break;
                    case 'momentary':
                        proto.bindMechanicalAction.call(this);
                        break;
                    default:
                        break;
                }
            }

            if (!$.isEmptyObject(viewConfig.widget)) {
                $('#' + this.model.getId()).jqxToggleButton(viewConfig.widget);
            }
            
            this.applyElementChanges(viewConfig);
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.BooleanLEDViewModel, NationalInstruments.HtmlVI.BooleanControlViewModel);