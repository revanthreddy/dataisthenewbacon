//****************************************
// Text View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.HyperlinkViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualViewModel.call(this, element, model);
    this.textHtmlNode = null;

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.hyperlinkViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.HyperlinkViewModel.prototype;
        proto.hyperlinkViewModelMethods = function () {
        };

        proto.createViewParams = function () {
            var params = NationalInstruments.HtmlVI.VisualViewModel.prototype.createViewParams.call(this);
            params.href = this.model.getHRef();
            params.content = this.model.getContent();
            params.foreground = this.model.getForeground();
            params.fontSize = this.model.getFontSize();
            params.fontFamily = this.model.getFontFamily();
            return params;
        };

        proto.updateProperties = function (params) {
            for (var attr in params) {
                if (params.hasOwnProperty(attr)) {
                    switch (attr) {
                        case 'href':
                            this.element.setAttribute('href', params.href);
                            break;
                        case 'content':
                            if (this.textHtmlNode instanceof Object) {
                                this.textHtmlNode.nodeValue = params.content;
                            }
                            break;
                        case 'foreground':
                            this.element.style.color = params.foreground;
                            break;
                        case 'fontSize':
                            this.element.style.fontSize = params.fontSize;
                            break;
                        case 'fontFamily':
                            this.element.style.fontFamily = params.fontFamily;
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
                this.textHtmlNode = document.createTextNode('');
                this.element.appendChild(this.textHtmlNode);
                this.element.style.margin = '0px';
                this.updateProperties(params);
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
                    case 'href':
                        viewConfig.attributes.href = this.model.getHRef();
                        break;
                    case 'content':
                        viewConfig.other.content = this.model.getContent();
                        break;
                    case 'foreground':
                        viewConfig.cssStyles.color = this.model.getForeground();
                        break;
                    case 'fontSize':
                        viewConfig.cssStyles.fontSize = this.model.getFontSize();
                        break;
                    case 'fontFamily':
                        viewConfig.cssStyles.fontFamily = this.model.getFontFamily();
                        break;
                    default:
                        break;
                }
            }
            
            if (!$.isEmptyObject(viewConfig.other)) {
                if (this.textHtmlNode instanceof Object) {
                    this.textHtmlNode.nodeValue = viewConfig.other.content;
                }
            }
            
            this.applyElementChanges(viewConfig);
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.HyperlinkViewModel, NationalInstruments.HtmlVI.VisualViewModel);