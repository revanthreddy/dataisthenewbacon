//****************************************
// Boolean Control View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.BooleanControlViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualViewModel.call(this, element, model);

    // Prevent Closing on Constructor Properties
    element = model = undefined;
  
    // Methods
    if (typeof this.booleanControlViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.BooleanControlViewModel.prototype;
        proto.booleanControlViewModelMethods = function () {
        };

        proto.unbindMechanicalAction = function () {
            var id = this.model.getId();
            NationalInstruments.HtmlVI.UIActivityService.unregister(id);
        };

        proto.bindMechanicalAction = function () {
            var onPress = (this.model.getClickMode() === NationalInstruments.HtmlVI.BooleanControlModelClickModeEnum.PRESS);
            var isMomentary = (this.model.getMomentary() === true);
            var id = this.model.getId();
            var element = document.getElementById(id);
            var that = this;

            if (isMomentary === false && onPress === false) { //When Released
                NationalInstruments.HtmlVI.UIActivityService.register({
                    element: element,
                    id: id,
                    up: function (evt) {
                        if (that.getSuppressChangeEvents() === false && element.contains(evt.target)) {
                            var val = !that.model.getValue();
                            that.model.setValue(val);
                            that.model.controlChanged();
                        }
                    }
                });
            }
            else if (isMomentary === false && onPress === true) { //When Pressed
                NationalInstruments.HtmlVI.UIActivityService.register({
                    element: element,
                    id: id,
                    down: function () {
                        if (that.getSuppressChangeEvents() === false) {
                            var val = !that.model.getValue();
                            that.model.setValue(val);
                            that.model.controlChanged();
                        }
                    }
                });
            }
            else if (isMomentary === true && onPress === false) { //Until Released
                NationalInstruments.HtmlVI.UIActivityService.register({
                    element: element,
                    id: id,
                    up: function () {
                        if (that.getSuppressChangeEvents() === false) {
                            var val = !that.model.getValue();
                            that.model.setValue(val);
                            that.model.controlChanged();
                        }
                    },
                    down: function () {
                        if (that.getSuppressChangeEvents() === false) {
                            var val = !that.model.getValue();
                            that.model.setValue(val);
                            that.model.controlChanged();
                        }
                    },
                    cancelled: function () {
                        if (that.getSuppressChangeEvents() === false) {
                            var val = !that.model.getValue();
                            that.model.setValue(val);
                            that.model.controlChanged();
                        }
                    }
                });
            }
        };

        proto.instantiate = function () {
            NationalInstruments.HtmlVI.VisualViewModel.prototype.instantiate.call(this);
        };

        proto.createViewParams = function () {
            var params = NationalInstruments.HtmlVI.VisualViewModel.prototype.createViewParams.call(this);

            return params;
        };

        proto.modelPropertyChanged = function (changes) {
            var viewConfig = NationalInstruments.HtmlVI.VisualViewModel.prototype.modelPropertyChanged.call(this, changes);

            return viewConfig;
        };


        proto.updateModelSettingsFromElement = function (element) {
            var model = this.getModel();
            NationalInstruments.HtmlVI.VisualViewModel.prototype.updateModelSettingsFromElement.call(this, element);
            model.value = element.value;
            model.contentVisible = element.contentVisible;
            model.content = element.content;
            model.clickMode = element.clickMode;
            model.momentary = element.momentary;
        };

        proto.applyModelSettings = function (settings) {
            var element = this.element;
            NationalInstruments.HtmlVI.VisualViewModel.prototype.applyModelSettings.call(this, settings);
            if (settings.value !== undefined) {
                element.valueNonSignaling = settings.value;
            }
            if (settings.contentVisible !== undefined) {
                element.contentVisible = settings.contentVisible;
            }
            if (settings.content !== undefined) {
                element.content = settings.content;
            }
            if (settings.clickMode !== undefined) {
                element.clickMode = settings.clickMode;
            }
            if (settings.momentary !== undefined) {
                element.momentary = settings.momentary;
            }
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.BooleanControlViewModel, NationalInstruments.HtmlVI.VisualViewModel);
