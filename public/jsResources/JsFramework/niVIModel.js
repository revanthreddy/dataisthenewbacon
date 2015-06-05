//****************************************
// VI Model
// National Instruments Copyright 2014
//****************************************

//****************************************
// VI Model
//****************************************
NationalInstruments.HtmlVI.VIModel = function (name) {
    'use strict';
    // Properties
    this.name = name;
    this.status = 'idle';
    this.modelControls = [];
    this.viewModelControls = [];
    this.horizontalGuidelines = [];
    this.verticalGuidelines = [];
    this.id = 'FrontPanelCanvas';

    // Prevent Closing on Constructor Properties
    name = undefined;

    // Methods
    if (typeof this.viModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.VIModel.prototype;
        proto.viModelMethods = function () {
        };

        proto.setName = function (name) {
            this.name = name;
        };

        proto.getName = function () {
            return this.name;
        };

        proto.getId = function () {
            return this.id;
        };

        proto.getOwner = function() {
            return null;
        };

        proto.setStatus = function (status) {
            this.status = status;
        };

        proto.getStatus = function () {
            return this.status;
        };

        proto.setGuideline = function(data) {
            var id = data.id;
            var horizontal = data.horizontal;
            var percentage = data.percentage;
            var startMargin = data.startMargin;
            var endMargin = data.endMargin;
            if (horizontal) {
                this.horizontalGuidelines[id] = new NationalInstruments.HtmlVI.GuidelineModel(id, horizontal, percentage, startMargin, endMargin);
            }
            else {
                this.verticalGuidelines[id] = new NationalInstruments.HtmlVI.GuidelineModel(id, horizontal, percentage, startMargin, endMargin);
            }
        };

        proto.getGuideline = function(id, isHorizontalCollection) {
            if (isHorizontalCollection) {
                return this.horizontalGuidelines[id];
            }
            else {
                return this.verticalGuidelines[id];
            }
        };

        proto.clearGuidelines = function() {
            this.verticalGuidelines = [];
            this.horizontalGuidelines = [];
        };

        proto.modelControlFactory = function (id, kind) {
            var control = null;
            switch (kind) {
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_GAUGE: {
                    control = new NationalInstruments.HtmlVI.GaugeModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_SLIDER: {
                    control = new NationalInstruments.HtmlVI.SliderModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_NUMERIC_TEXTBOX: {
                    control = new NationalInstruments.HtmlVI.NumericTextBoxModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_CHART: {
                    control = new NationalInstruments.HtmlVI.ChartModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANGRAPH: {
                    control = new NationalInstruments.HtmlVI.CartesianGraphModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANAXIS: {
                    control = new NationalInstruments.HtmlVI.CartesianAxisModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANPLOT: {
                    control = new NationalInstruments.HtmlVI.CartesianPlotModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_PLOTRENDERER: {
                    control = new NationalInstruments.HtmlVI.PlotRendererModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON: {
                    control = new NationalInstruments.HtmlVI.BooleanButtonModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_LED: {
                    control = new NationalInstruments.HtmlVI.BooleanLEDModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_TEXT: {
                    control = new NationalInstruments.HtmlVI.TextModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_IMAGE: {
                    control = new NationalInstruments.HtmlVI.ImageModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_CURSOR: {
                    control = new NationalInstruments.HtmlVI.CursorModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_STRING_CONTROL: {
                    control = new NationalInstruments.HtmlVI.StringControlModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_CHECK_BOX: {
                    control = new NationalInstruments.HtmlVI.CheckBoxModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_RADIO_BUTTON: {
                    control = new NationalInstruments.HtmlVI.RadioButtonModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_SWITCH: {
                    control = new NationalInstruments.HtmlVI.BooleanSwitchModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_TAB_CONTROL: {
                    control = new NationalInstruments.HtmlVI.TabControlModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_TAB_ITEM: {
                    control = new NationalInstruments.HtmlVI.TabItemModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_LABEL: {
                    control = new NationalInstruments.HtmlVI.LabelModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_HYPERLINK: {
                    control = new NationalInstruments.HtmlVI.HyperlinkModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_LINEAR_PROGRESSBAR: {
                    control = new NationalInstruments.HtmlVI.LinearProgressBarModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_CLUSTER: {
                    control = new NationalInstruments.HtmlVI.ClusterModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_DROPDOWN: {
                    control = new NationalInstruments.HtmlVI.DropDownModel(id);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_TIME_STAMP_TEXT_BOX: {
                    control = new NationalInstruments.HtmlVI.TimeStampTextBoxModel(id);
                    break;
                }
                default: {
                    // Nothing to do here, returned control will be null.
                    break;
                }
            }
            return control;
        };

        proto.viewModelControlFactory = function (element, model) {
            var control = null;
            switch (model.getKind()) {
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_GAUGE: {
                    control = new NationalInstruments.HtmlVI.GaugeViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_SLIDER: {
                    control = new NationalInstruments.HtmlVI.SliderViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_NUMERIC_TEXTBOX: {
                    control = new NationalInstruments.HtmlVI.NumericTextBoxViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_CHART: {
                    control = new NationalInstruments.HtmlVI.ChartViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANGRAPH: {
                    control = new NationalInstruments.HtmlVI.CartesianGraphViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANAXIS: {
                    control = new NationalInstruments.HtmlVI.CartesianAxisViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANPLOT: {
                    control = new NationalInstruments.HtmlVI.CartesianPlotViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_PLOTRENDERER: {
                    control = new NationalInstruments.HtmlVI.PlotRendererViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON: {
                    control = new NationalInstruments.HtmlVI.BooleanButtonViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_LED: {
                    control = new NationalInstruments.HtmlVI.BooleanLEDViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_TEXT: {
                    control = new NationalInstruments.HtmlVI.TextViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_IMAGE: {
                    control = new NationalInstruments.HtmlVI.ImageViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_CURSOR: {
                    control = new NationalInstruments.HtmlVI.CursorViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_STRING_CONTROL: {
                    control = new NationalInstruments.HtmlVI.StringControlViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_CHECK_BOX: {
                    control = new NationalInstruments.HtmlVI.CheckBoxViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_RADIO_BUTTON: {
                    control = new NationalInstruments.HtmlVI.RadioButtonViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_SWITCH: {
                    control = new NationalInstruments.HtmlVI.BooleanSwitchViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_TAB_CONTROL: {
                    control = new NationalInstruments.HtmlVI.TabControlViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_TAB_ITEM: {
                    control = new NationalInstruments.HtmlVI.TabItemViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_LABEL: {
                    control = new NationalInstruments.HtmlVI.LabelViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_HYPERLINK: {
                    control = new NationalInstruments.HtmlVI.HyperlinkViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_LINEAR_PROGRESSBAR: {
                    control = new NationalInstruments.HtmlVI.LinearProgressBarViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_CLUSTER: {
                    control = new NationalInstruments.HtmlVI.ClusterViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_DROPDOWN: {
                    control = new NationalInstruments.HtmlVI.DropDownViewModel(element, model);
                    break;
                }
                case NationalInstruments.HtmlVI.ControlKindEnum.NI_TIME_STAMP_TEXT_BOX: {
                    control = new NationalInstruments.HtmlVI.TimeStampTextBoxViewModel(element, model);
                    break;
                }
                default: {
                    // Nothing to do here, returned control will be null.
                    break;
                }
            }
            return control;
        };

        proto.tagNameToKind = function (tagName) {
            var kind = '';
            switch (tagName) {
                case 'ni-gauge': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_GAUGE;
                    break;
                }
                case 'ni-slider': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_SLIDER;
                    break;
                }
                case 'ni-numeric-text-box': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_NUMERIC_TEXTBOX;
                    break;
                }
                case 'ni-linear-progress-bar': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_LINEAR_PROGRESSBAR;
                    break;
                }
                case 'ni-chart': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_CHART;
                    break;
                }
                case 'ni-cartesian-graph': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIANGRAPH;
                    break;
                }
                case 'ni-boolean-button': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON;
                    break;
                }
                case 'ni-boolean-led': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_LED;
                    break;
                }
                case 'ni-text': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_TEXT;
                    break;
                }
                case 'ni-image': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_IMAGE;
                    break;
                }
                case 'ni-string-control': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_STRING_CONTROL;
                    break;
                }
                case 'ni-checkbox': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_CHECK_BOX;
                    break;
                }
                case 'ni-radio-button': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_RADIO_BUTTON;
                    break;
                }
                case 'ni-boolean-switch': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_SWITCH;
                    break;
                }
                case 'ni-tab-control': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_TAB_CONTROL;
                    break;
                }
                case 'ni-label': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_LABEL;
                    break;
                }
                case 'ni-hyperlink': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_HYPERLINK;
                    break;
                }
                case 'ni-linear-progressbar': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_LINEAR_PROGRESSBAR;
                    break;
                }
                case 'ni-cluster': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_CLUSTER;
                    break;
                }
                case 'ni-dropdown': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_DROPDOWN;
                    break;
                }
                case 'ni-time-stamp-text-box': {
                    kind = NationalInstruments.HtmlVI.ControlKindEnum.NI_TIME_STAMP_TEXT_BOX;
                    break;
                }
                default: {
                    // Nothing to do here, returned control will be null.
                    break;
                }
            }
            return kind;
        };

        /// add an element to the page dynamically
        proto.createElement = function (id, parentId, domType, settings) {
            var parentViewModel;
            
            if(typeof id !== 'string' || typeof parentId !== 'string' || typeof domType !== 'string' || typeof settings !== 'object') {
                throw new Error('Cannot create element from given parameters'); // TODO mraj make exception
            }
            
            if (parentId === this.id) {
                parentViewModel = { model: this };
            }
            else {
                parentViewModel = this.viewModelControls[parentId];
            }
            // Get the section in the html page that will be used as the parent of the controls
            var parentElement = document.getElementById(parentViewModel.model.getId());
            // Create the visual model
            var element = document.createElement(domType);
            settings.id = id;
            settings.element = element;
            this.addFrontPanelControl(settings);
            var viewModel = this.findViewModel(id);

            element.id = id;
            element.style.position = 'absolute';

            if (typeof viewModel.applyModelSettings !== 'function') {
                element.style.left = settings.left + 'px';
                element.style.top = settings.top + 'px';
                element.style.width = settings.width + 'px';
                element.style.height = settings.height + 'px';
            }
            else {
                viewModel.applyModelSettings(settings);
            }
            
            parentElement.appendChild(element); //Upgrades happen asynchronously
            viewModel.observe();
        };

        proto.addFrontPanelControlToId = function (id, settings) {
            var viewModel;
            var errorMessage = '';
            if (id === this.id) {
                viewModel = { model: this };
            }
            else {
                viewModel = this.viewModelControls[id];
            }
            if (this.modelControls[settings.id] !== undefined || this.viewModelControls[settings.id] !== undefined) {
                errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNABLE_TO_ADD_FRONT_PANEL_CONTROL_AS_ID_ALREADY_EXISTS, id);
                throw new Error(errorMessage);
            }
            return this.addFrontPanelControlToParent(viewModel, settings);
        };

        proto.addFrontPanelControl = function (settings) {
            var id = settings.id;
            var errorMessage = '';
            
            if(this.modelControls[id] !== undefined || this.viewModelControls[id] !== undefined ) {
                errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNABLE_TO_ADD_FRONT_PANEL_CONTROL_AS_ID_ALREADY_EXISTS, id);
                throw new Error(errorMessage);
            }
            if (settings.kind === undefined && settings.tagName !== undefined) {
                settings.kind = this.tagNameToKind(settings.tagName);
                delete settings.tagName;
            }
            
            return this.addFrontPanelControlToParent({ model: this }, settings);
        };
        
        
        // TODO Remove when migrated to custom elements to let errors through mraj
        proto.addFrontPanelControl = (function (orig) {
            return function addFrontPanelControlTemporaryInterceptor(settings) {
                //jshint unused:false
                try {
                    orig.apply(this, arguments);
                } catch (e) {
                    console.error(e.message);
                }
            };
        }(proto.addFrontPanelControl));


        // TODO Remove when migrated to custom elements to let errors through mraj
        proto.addFrontPanelControToId = (function (orig) {
            return function addFrontPanelControlToIdTemporaryInterceptor(settings) {
                //jshint unused:false
                try {
                    orig.apply(this, arguments);
                } catch (e) {
                    console.error(e.message);
                }
            };
        }(proto.addFrontPanelControlToId));


        proto.addFrontPanelControlToParent = function (parentViewModel, settings) {
            var id = settings.id;
            var position, left, top, width, height;
            var errorMessage = '';
            
            // delete settings.id;
            // Create the model
            var modelControl = this.modelControlFactory(id, settings.kind);
            modelControl.setOwner(parentViewModel.model);
            // Initialize common properties
            if (modelControl instanceof NationalInstruments.HtmlVI.VisualComponentModel) {
                modelControl.initializeModel(settings);
            }
            else {
                errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNABLE_TO_ADD_FRONT_PANEL_CONTROL_TO_VI_MODEL_UNKNOWN_TYPE,
                    id, settings.kind);
                throw new Error(errorMessage);
            }

            this.modelControls[id] = modelControl;

            var element = null;
            if (modelControl instanceof NationalInstruments.HtmlVI.VisualModel) {
                if (settings.element === undefined) {
                    element = document.getElementById(id);
                }
                else {
                    element = settings.element;
                }
                if (element !== null) {
                    modelControl.setLeft(element.style.left);
                    modelControl.setTop(element.style.top);
                    modelControl.setWidth(element.style.width);
                    modelControl.setHeight(element.style.height);
                }
            }

            var viewModelControl = this.viewModelControlFactory(element, modelControl);

            if (viewModelControl instanceof NationalInstruments.HtmlVI.VisualComponentViewModel && viewModelControl.instantiate !== undefined) {
                if (element !== null) {
                    // jqWidgets stomp the style so save it and restore after the instantiate
                    position = element.style.position;
                    left = element.style.left;
                    top = element.style.top;
                    width = element.style.width;
                    height = element.style.height;
                }
                viewModelControl.instantiate();
                if (element !== null) {
                    element.style.position = position;
                    element.style.left = left;
                    element.style.top = top;
                    element.style.width = width;
                    element.style.height = height;
                }
            }
            //else {
            //    errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNABLE_TO_CREATE_CONTROL,
            //        modelControl.getId(), modelControl.getKind());
            //    throw new Error(errorMessage);
            //}

            viewModelControl.observe();
            this.viewModelControls[id] = viewModelControl;
            return modelControl;
        };

        proto.removeChild = function (model) {
            var parentElement = document.getElementById(this.getId());
            var childElement = document.getElementById(model.getId());
            if (parentElement !== null && childElement !== null) {
                parentElement.removeChild(childElement);
            }
        };

        proto.addChild = function (model) {
            var parentElement = document.getElementById(this.getId());
            var childElement = document.getElementById(model.getId());
            if (parentElement !== null && childElement !== null) {
                parentElement.appendChild(childElement);
            }
        };

        proto.removeFrontPanelControl = function (id) {
            var viewModelControl = this.viewModelControls[id];
            if (viewModelControl !== undefined && viewModelControl !== null) {
                viewModelControl.unobserve();
            }
            delete this.modelControls[id];
            var element = document.getElementById(id);
            if (element instanceof Object) {
                element.parentNode.removeChild(element);
            }
            delete this.viewModelControls[id];
        };

        proto.getRootModelControls = function () {
            return this.modelControls;
        };

        proto.findViewModel = function (id) {
            return this.viewModelControls[id];
        };

        proto.findModel = function (id) {
            return this.modelControls[id];
        };

        proto.processUpdateMessage = function (updateMessage) {
            var errorMessage = '';
            switch (updateMessage.getMessageType()) {
                case NationalInstruments.HtmlVI.UpdateMessageTypeEnum.PROPERTY_UPDATE: {
                    var frontPanelControlId = updateMessage.getRootControlId();
                    var frontPanelControlKind = updateMessage.getRootControlKind();
                    var modelControl = this.modelControls[frontPanelControlId];
                    if (modelControl instanceof NationalInstruments.HtmlVI.VisualComponentModel) {
                        if (modelControl.getKind() === frontPanelControlKind) {
                            modelControl.updateModelFromDataSource(updateMessage.getData());
                            Platform.performMicrotaskCheckpoint();
                        }
                        else {
                            errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.FRONT_PANEL_CONTROL_MISTMATCH,
                                frontPanelControlId, modelControl.getKind(), frontPanelControlKind);
                            throw new Error(errorMessage);
                        }
                    }
                    else {
                        errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.FRONT_PANEL_CONTROL_NOT_FOUND,
                            frontPanelControlId, frontPanelControlKind);
                        throw new Error(errorMessage);
                    }
                    break;
                }
                case NationalInstruments.HtmlVI.UpdateMessageTypeEnum.VI_STATE_UPDATE: {
                    //TO_DO: 10/3/2014 Carlos Gonzalez. Process VI State Updates
                    console.log('TO_DO: Process VI State Updates.');
                    break;
                }
                case NationalInstruments.HtmlVI.UpdateMessageTypeEnum.EVENT_UPDATE: {
                    //TO_DO: 10/3/2014 Carlos Gonzalez. Process Control Event Updates
                    console.log('TO_DO: Process Control Event Updates.');
                    break;
                }
                default: {
                    errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNABLE_TO_PROCESS_UPDATE_MESSAGE_UNKNOWN_TYPE,
                        updateMessage.getMessageType());
                    throw new Error(errorMessage);
                }
            }
        };
       
        proto.encodeVireoPath = function (str) {
            var nonId = [' ', '!', '"', '#', '%', '&', '\'', '(', ')', ',', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '`', '{', '|', '}', '~'];
            var encoded = '';
            for (var i = 0; i < str.length; i++) {
                var codePoint = str.charCodeAt(i);
                var ch = str.charAt(i);
                if (codePoint <= 0x7F) {
                    if (i === 0 || codePoint <= 0x1F || nonId.indexOf(ch) > -1) {
                        encoded += '%' + codePoint.toString(16).toUpperCase();
                        continue;
                    }
                }
                encoded += ch;
            }
            return encoded;
        };

        proto.itemPath = function (modelControl, property) {
            var result = [];
            var path = '';

            while (modelControl.isNested()) {
                if (Object.keys(modelControl.bindingInfo).length <= 0) {
                    break;
                }
                var key = property;
                if (path) {
                    key = 'value';
                    path = '.' + path;
                }
                path = this.encodeVireoPath(modelControl.bindingInfo[key]) + path;
                modelControl = modelControl.getOwner();
            }
            result.push(path);
            result.push(modelControl);
            return result;
        };


        proto.getCompleteBindingInfo = function (modelControl, bindingInfo) {
            if (modelControl.isNested()) {
                var completeBindingInfo = {};
                for (var bindingProperty in bindingInfo) {
                    if (modelControl.hasOwnProperty(bindingProperty)) {
                        var pathInfo = this.itemPath(modelControl, bindingProperty);
                        var clusterbindingInfo = pathInfo[1].bindingInfo;
                        var clusterBinding = clusterbindingInfo.value;

                        var temp = {};
                        for (var k in clusterBinding) {
                            if (clusterBinding.hasOwnProperty(k)) {
                                temp[k] = clusterBinding[k];
                            }
                        }
                        if (pathInfo[0]) {
                            temp.fieldName = pathInfo[0];
                        }
                        completeBindingInfo[bindingProperty] = temp;
                    }
                }
                return completeBindingInfo;
            }
            return bindingInfo;
        };

        proto.controlChanged = function (id, kind, data) {
            var bindingInfo = {};
            var modelControl = this.modelControls[id];
     
            var updateMessage = new NationalInstruments.HtmlVI.UpdateMessage();
            updateMessage.initAsPropertyUpdateMessage(this.getName(), id, kind, data);

            for (var changedProperty in data) {
                if (data.hasOwnProperty(changedProperty)) {
                    if (modelControl.hasOwnProperty('bindingInfo') &&
                        modelControl.bindingInfo.hasOwnProperty(changedProperty)) {
                        bindingInfo[changedProperty] = modelControl.bindingInfo[changedProperty];
                    }
                }
            }
            bindingInfo = this.getCompleteBindingInfo(modelControl, bindingInfo);
            if (Object.keys(bindingInfo).length > 0) {
                updateMessage.bindingItem = bindingInfo;
            }

            NationalInstruments.HtmlVI.updateService.sendMessageToListeners(updateMessage);
        };

        proto.printToConsole = function (space) {
            var length = 0;
            console.log(space + '---------------------------------------');
            console.log(space + 'name: ' + this.getName());
            console.log(space + 'status: ' + this.getStatus());
            length = Object.keys(this.modelControls);
            console.log(space + 'Front Panel Model Controls length: ' + length);
            length = Object.keys(this.viewModelControls);
            console.log(space + 'Front Panel View Model Controls length: ' + length);
        };
    }
};



