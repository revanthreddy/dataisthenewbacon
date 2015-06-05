//****************************************
// Boolean Switch View Model
// National Instruments Copyright 2015
//****************************************

NationalInstruments.HtmlVI.BooleanSwitchViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualViewModel.call(this, element, model);
    this.checkBoxElement = null;
    this.roundOffLabel = null;
    this.roundOnLabel = null;

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.booleanSwitchViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.BooleanSwitchViewModel.prototype;
        proto.booleanSwitchViewModelMethods = function () {
        };

        proto.createViewParams = function () {
            var params = NationalInstruments.HtmlVI.VisualViewModel.prototype.createViewParams.call(this);
            params.checked = this.model.getValue();
            params.onLabel = this.model.getTrueContent();
            params.offLabel = this.model.getFalseContent();
            params.orientation = this.model.getOrientation().toLowerCase();
            return params;
        };

        proto.bindToSlider = function (id, params) {
            var that = this;
            $(id).jqxSwitchButton(params);
            
            // TODO: Remove undocumented API call, need way to prevent default toggles mraj
            //$(id).jqxSwitchButton('_removeEventHandles');
            $(id).bind('change', function (event) {
                if (that.getSuppressChangeEvents() === false) {
                    var checked = event.args.check;
                    that.model.setValue(checked);
                    that.model.controlChanged();
                }
            });
        };

        proto.bindToPower = function (id, params) {
            var that = this;

            this.element.setAttribute('class', 'ni_power_switch');

            this.checkBoxElement = document.createElement('input');
            this.checkBoxElement.setAttribute('type', 'checkbox');
            this.checkBoxElement.checked = params.checked;
            this.element.appendChild(this.checkBoxElement);

            var labelElement = document.createElement('label');
            this.element.appendChild(labelElement);

            var iElement = document.createElement('i');
            this.element.appendChild(iElement);

            $(id).bind('click', function () {
                if (that.getSuppressChangeEvents() === false) {
                    var val = !that.model.getValue();
                    that.model.setValue(val);
                    that.model.controlChanged();
                }
            });
        };

        proto.bindToRound = function (id, params) {
            var that = this;

            this.element.setAttribute('class', 'ni_round_switch');

            // Add off and on label
            var divElement = document.createElement('div');
            this.roundOffLabel = document.createElement('label');
            this.roundOffLabel.setAttribute('class', 'ni_round_switch_off_label');
            this.roundOffLabel.innerText = params.offLabel;
            divElement.appendChild(this.roundOffLabel);
            this.roundOnLabel = document.createElement('label');
            this.roundOnLabel.setAttribute('class', 'ni_round_switch_on_label');
            this.roundOnLabel.innerText = params.onLabel;
            divElement.appendChild(this.roundOnLabel);
            this.element.appendChild(divElement);

            // Add the checkbox
            this.checkBoxElement = document.createElement('input');
            this.checkBoxElement.setAttribute('type', 'checkbox');
            this.checkBoxElement.checked = params.checked;
            this.element.appendChild(this.checkBoxElement);

            // Add the label representing the knob
            var labelElement = document.createElement('label');
            labelElement.setAttribute('class', 'ni_round_switch_knob');
            this.element.appendChild(labelElement);

            $(id).bind('click', function () {
                if (that.getSuppressChangeEvents() === false) {
                    var val = !that.model.getValue();
                    that.model.setValue(val);
                    that.model.controlChanged();
                }
            });
        };

        proto.instantiate = function () {
            NationalInstruments.HtmlVI.VisualViewModel.prototype.instantiate.call(this);
            var errorMessage = '';
            if (this.model instanceof Object) {
                var params = this.createViewParams();
                var id = '#' + this.model.getId();
                if (this.model.getContentVisible() === false) {
                    params.onLabel = '';
                    params.offLabel = '';
                }

                switch (this.model.getShape()) {
                    case NationalInstruments.HtmlVI.BooleanSwitchModelShapeEnum.ROUND:
                        this.bindToRound(id, params);
                        break;
                    case NationalInstruments.HtmlVI.BooleanSwitchModelShapeEnum.POWER:
                        this.bindToPower(id, params);
                        break;
                    case NationalInstruments.HtmlVI.BooleanSwitchModelShapeEnum.SLIDER:
                        this.bindToSlider(id, params);
                        break;
                    default:
                        errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNKNOWN_TYPE, this.model.getShape());
                        throw new Error(errorMessage);
                }
            }
            else {
                errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNABLE_TO_CREATE_CONTROL,
                    this.model.getId(), this.model.getKind());
                throw new Error(errorMessage);
            }
        };

        proto.modelPropertyChanged = function (changes) {
            var viewConfig = NationalInstruments.HtmlVI.VisualViewModel.prototype.modelPropertyChanged.call(this, changes);
            var n = changes.length;
            for (var i = 0; i < n; i++) {
                switch (changes[i]) {
                    case 'shape':
                        break;
                    case 'orientation':
                        // TODO: Changing the orientation messes with the DOM. May require jqWidget fix mraj
                        viewConfig.widget.orientation = this.model.getOrientation().toLowerCase();
                        break;
                    case 'trueContent':
                        viewConfig.other.onLabel = this.model.getTrueContent();
                        break;
                    case 'falseContent':
                        viewConfig.other.offLabel = this.model.getFalseContent();
                        break;
                    case 'contentVisible':
                        viewConfig.other.onLabel = '';
                        viewConfig.other.offLabel = '';
                        break;
                    case 'value':
                        viewConfig.widget.checked = this.model.getValue();
                        break;
                    default:
                        break;
                }
            }

            if (!$.isEmptyObject(viewConfig)) {
                switch (this.model.getShape()) {
                    case NationalInstruments.HtmlVI.BooleanSwitchModelShapeEnum.ROUND:
                        if ((this.roundOffLabel instanceof Object) && viewConfig.other.hasOwnProperty('offLabel')) {
                            this.roundOffLabel.innerText = viewConfig.other.offLabel;
                        }
                        if ((this.roundOnLabel instanceof Object) && viewConfig.other.hasOwnProperty('onLabel')) {
                            this.roundOnLabel.innerText = viewConfig.other.onLabel;
                        }
                        if ((this.checkBoxElement instanceof Object) && viewConfig.widget.hasOwnProperty('checked')) {
                            this.checkBoxElement.checked = viewConfig.widget.checked;
                        }
                        break;
                    case NationalInstruments.HtmlVI.BooleanSwitchModelShapeEnum.POWER:
                        if ((this.checkBoxElement instanceof Object) && viewConfig.widget.hasOwnProperty('checked')) {
                            this.checkBoxElement.checked = viewConfig.widget.checked;
                        }
                        break;
                    case NationalInstruments.HtmlVI.BooleanSwitchModelShapeEnum.SLIDER:
                        $('#' + this.model.getId()).jqxSwitchButton(viewConfig.widget);
                        break;
                    default:
                        var errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNKNOWN_TYPE, this.model.getShape());
                        throw new Error(errorMessage);
                }
            }
            
            this.applyElementChanges(viewConfig);
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.BooleanSwitchViewModel, NationalInstruments.HtmlVI.VisualViewModel);