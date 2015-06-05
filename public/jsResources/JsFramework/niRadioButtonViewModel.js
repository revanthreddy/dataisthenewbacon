//****************************************
// RadioButton View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.RadioButtonViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.BooleanControlViewModel.call(this, element, model);
    this.textHtmlNode = null;

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.radioButtonViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.RadioButtonViewModel.prototype;
        proto.radioButtonViewModelMethods = function () {
        };

        proto.createViewParams = function () {
            var params = NationalInstruments.HtmlVI.BooleanControlViewModel.prototype.createViewParams.call(this);
            params.checked = this.model.getValue();
            params.groupName = this.model.getGroupName();
            return params;
        };

        proto.updateTextProperties = function (content, contentVisible) {
            if (this.textHtmlNode instanceof Object) {
                if (!contentVisible) {
                    content = '';
                }

                this.textHtmlNode.nodeValue = content;
            }
        };

        proto.instantiate = function () {
            NationalInstruments.HtmlVI.BooleanControlViewModel.prototype.instantiate.call(this);
            if (this.model instanceof Object) {
                var params = this.createViewParams();

                var textParent = document.createElement('span');
                this.textHtmlNode = document.createTextNode('');
                textParent.appendChild(this.textHtmlNode);
                this.element.appendChild(textParent);
                textParent.style.margin = '0px';
                this.element.style.margin = '0px';
                this.updateTextProperties(this.model.getContent(), this.model.getContentVisible());

                var id = '#' + this.model.getId();
                $(id).jqxRadioButton(params);
                
                // TODO: Remove undocumented API call, need way to prevent default user interaction mraj
                $(id).jqxRadioButton('_removeHandlers');
                
                if(this.model.getValue() === true) {
                    $(id).jqxRadioButton('check');
                }
                else {
                    $(id).jqxRadioButton('uncheck');
                }
                
                proto.bindMechanicalAction.call(this);
                
            }
            else {
                var errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNABLE_TO_CREATE_CONTROL,
                    this.model.getId(), this.model.getKind());
                throw new Error(errorMessage);
            }
        };

        proto.modelPropertyChanged = function (changes) {
            var viewConfig = NationalInstruments.HtmlVI.BooleanControlViewModel.prototype.modelPropertyChanged.call(this, changes);
            var n = changes.length;
            for (var i = 0; i < n; i++) {
                switch (changes[i]) {
                    case 'value':
                        viewConfig.widget.checked = this.model.getValue();
                        break;
                    case 'content':
                        viewConfig.other.content = this.model.getContent();
                        break;
                    case 'contentVisible':
                        viewConfig.other.content = this.model.getContent();
                        break;
                    case 'groupName':
                        viewConfig.widget.groupName = this.model.getGroupName();
                        break;
                    case 'clickMode':
                        proto.bindMechanicalAction.call(this);
                        break;
                    case 'momentary':
                        proto.bindMechanicalAction.call(this);
                        break;
                }
            }

            
            if(!$.isEmptyObject(viewConfig.other)) {
                if (this.model.getContentVisible() === true) {
                    this.textHtmlNode.nodeValue = viewConfig.other.content;
                }
                else {
                    this.textHtmlNode.nodeValue = '';                    
                }
            }
            
            if (!$.isEmptyObject(viewConfig.widget)) {
                $('#' + this.model.getId()).jqxRadioButton(viewConfig.widget);
            }
            
            this.applyElementChanges(viewConfig);
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.RadioButtonViewModel, NationalInstruments.HtmlVI.BooleanControlViewModel);