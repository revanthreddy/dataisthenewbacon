//****************************************
// Visual View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.VisualViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualComponentViewModel.call(this, element, model);
    this.suppressChangeEvents = false;

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.visualViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.VisualViewModel.prototype;
        proto.visualViewModelMethods = function () {
        };

        proto.setSuppressChangeEvents = function (suppress) {
            this.suppressChangeEvents = suppress;
        };

        proto.getSuppressChangeEvents = function () {
            return this.suppressChangeEvents;
        };

        proto.createViewParams = function () {
            var params = NationalInstruments.HtmlVI.VisualComponentViewModel.prototype.createViewParams.call(this);
            var config = this.model.getConfiguration();
            for (var attr in config) {
                if (config.hasOwnProperty(attr)) {
                    params[attr] = config[attr];
                }
            }

            return params;
        };

        proto.modelPropertyChanged = function (changes) {
            var viewConfig = NationalInstruments.HtmlVI.VisualComponentViewModel.prototype.modelPropertyChanged.call(this, changes);
            var n = changes.length;
            for (var i = 0; i < n; i++) {
                switch (changes[i]) {
                    case NationalInstruments.HtmlVI.GuidelinePositions.LEFT:
                    case NationalInstruments.HtmlVI.GuidelinePositions.RIGHT:
                    case NationalInstruments.HtmlVI.GuidelinePositions.TOP:
                    case NationalInstruments.HtmlVI.GuidelinePositions.BOTTOM:
                        this.updatePosition();
                        this.updateSize();

                        viewConfig.cssStyles.width = this.model.getWidth();
                        viewConfig.cssStyles.height = this.model.getHeight();
                        break;
                    case 'top':
                    case 'left':
                        this.updatePosition();
                        break;
                    case 'width':
                    case 'height':
                    case 'right':
                    case 'bottom':
                        this.updateSize(); // Computes model width and height even if not set on element.
                        viewConfig.cssStyles.width = this.model.getWidth();
                        viewConfig.cssStyles.height = this.model.getHeight();
                        break;
                    default:
                        break;
                }
            }

            return viewConfig;
        };

        proto.hasGuideline = function (which) {
            return this.model[which] !== '' && this.model[which] !== undefined;
        };

        proto.getGuidelinePosition = function (guideline, standard) {
            var widthOrHeight = 0;
            if (this.hasGuideline(guideline)) {
                var horizontal = (guideline === NationalInstruments.HtmlVI.GuidelinePositions.LEFT ||
                                  guideline === NationalInstruments.HtmlVI.GuidelinePositions.RIGHT);
                var guide = this.model.owner.getGuideline(this.model[guideline], horizontal);
                if (guide !== undefined) {
                    if (guide.getPercentage() !== 0 && guide.getPercentage() !== 1) {
                        if (standard) {
                            return guide.getPercentage() * 100 + '%';
                        }
                        else {
                            return (1 - guide.getPercentage()) * 100 + '%';
                        }
                    }
                    else if (guide.getStartMargin() !== 0) {
                        if (standard) {
                            return guide.getStartMargin() + 'px';
                        }
                        else {
                            widthOrHeight = horizontal ? $(window).width() : $(window).height();
                            return widthOrHeight - guide.startMargin + 'px';
                        }
                    }
                    else {
                        if (standard) {
                            widthOrHeight = horizontal ? $(window).width() : $(window).height();
                            return widthOrHeight - guide.endMargin + 'px';
                        }
                        else {
                            return guide.endMargin + 'px';
                        }
                    }
                }
            }
        };

        proto.setModelToGuideline = function (guideline) {
            if (guideline === NationalInstruments.HtmlVI.GuidelinePositions.TOP) {
                this.model.setTop(this.getGuidelinePosition(guideline, true) || this.model.getTop());
            }
            else if (guideline === NationalInstruments.HtmlVI.GuidelinePositions.BOTTOM) {
                this.model.setBottom(this.getGuidelinePosition(guideline, false) || this.model.getBottom());
            }

            if (guideline === NationalInstruments.HtmlVI.GuidelinePositions.LEFT) {
                this.model.setLeft(this.getGuidelinePosition(guideline, true) || this.model.getLeft());
            }
            else if (guideline === NationalInstruments.HtmlVI.GuidelinePositions.RIGHT) {
                this.model.setRight(this.getGuidelinePosition(guideline, false) || this.model.getRight());
            }
        };

        proto.updatePosition = function () {
            if (this.hasGuideline(NationalInstruments.HtmlVI.GuidelinePositions.LEFT)) {
                this.setModelToGuideline(NationalInstruments.HtmlVI.GuidelinePositions.LEFT);
            }
            if (this.hasGuideline(NationalInstruments.HtmlVI.GuidelinePositions.TOP)) {
                this.setModelToGuideline(NationalInstruments.HtmlVI.GuidelinePositions.TOP);
            }

            this.element.style.left = this.model.getLeft();
            this.element.style.top = this.model.getTop();
        };

        proto.updateSize = function () {
            // First, check to see if we have a right guideline, and if so, sync the model 
            // then set the right attribute. In order for the control to actually be the correct size,
            // we need to set right and let the browser set the width on its own (auto). However,
            // many of our widgets need our model to have a width and a height, so let's calculate it.
            if (this.hasGuideline(NationalInstruments.HtmlVI.GuidelinePositions.RIGHT)) {
                this.setModelToGuideline(NationalInstruments.HtmlVI.GuidelinePositions.RIGHT);
                this.element.style.width = 'auto';
                this.element.style.right = this.model.getRight();
                this.model.setWidth(this.element.clientWidth);
            }

                // Otherwise, we're good just setting the width
            else {
                this.element.style.width = this.model.getWidth();
            }

            // Bottom guidelines are similar to right guidelines except with height
            if (this.hasGuideline(NationalInstruments.HtmlVI.GuidelinePositions.BOTTOM)) {
                this.setModelToGuideline(NationalInstruments.HtmlVI.GuidelinePositions.BOTTOM);
                this.element.style.height = 'auto';
                this.element.style.bottom = this.model.getBottom();
                this.model.setHeight(this.element.clientHeight);
            }
            else {
                this.element.style.height = this.model.getHeight();
            }
        };

        proto.instantiate = function () {
            var that = this;

            NationalInstruments.HtmlVI.VisualComponentViewModel.prototype.instantiate.call(this);
            if (this.element !== null) {
                // TODO sschwahn: DO this ONLY if we have guidelines.
                $(window).resize(function () {
                    that.updatePosition();
                    that.updateSize();
                });
            }
        };

        proto.updateModelSettingsFromElement = function (element) {
            var model = this.getModel();
            NationalInstruments.HtmlVI.VisualComponentViewModel.prototype.updateModelSettingsFromElement.call(this, element);

            model.top = element.style.top;
            model.left = element.style.left;
            model.right = element.style.right;
            model.bottom = element.style.bottom;
            model.width = element.style.width;
            model.height = element.style.height;
            model.readOnly = element.readOnly;
            model.foreground = element.style.color;
            model.fontSize = element.style.fontSize;
            model.fontFamily = element.style.fontFamily;
            model.leftGuideline = element.leftGuideline;
            model.rightGuideline = element.rightGuideline;
            model.topGuideline = element.topGuideline;
            model.bottomGuideline = element.bottomGuideline;
        };

        proto.applyModelSettings = function (settings) {
            var element = this.element;
            NationalInstruments.HtmlVI.VisualComponentViewModel.prototype.applyModelSettings.call(this, settings);

            if (settings.top !== undefined) {
                element.style.top = settings.top;
            }
            if (settings.left !== undefined) {
                element.style.left = settings.left;
            }
            if (settings.right !== undefined) {
                element.style.right = settings.right;
            }
            if (settings.bottom !== undefined) {
                element.style.bottom = settings.bottom;
            }
            if (settings.width !== undefined) {
                element.style.width = settings.width;
            }
            if (settings.height !== undefined) {
                element.style.height = settings.height;
            }
            if (settings.readOnly !== undefined) {
                element.readOnly = settings.readOnly;
            }
            if (settings.foreground !== undefined) {
                element.style.color = settings.foreground;
            }
            if (settings.fontSize !== undefined) {
                element.style.fontSize = settings.fontSize;
            }
            if (settings.fontFamily !== undefined) {
                element.style.fontFamily = settings.fontFamily;
            }
            if (settings.leftGuideline !== undefined) {
                element.leftGuideline = settings.leftGuideline;
            }
            if (settings.rightGuideline !== undefined) {
                element.rightGuideline = settings.rightGuideline;
            }
            if (settings.topGuideline !== undefined) {
                element.topGuideline = settings.topGuideline;
            }
            if (settings.bottomGuideline !== undefined) {
                element.bottomGuideline = settings.bottomGuideline;
            }
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.VisualViewModel, NationalInstruments.HtmlVI.VisualComponentViewModel);
