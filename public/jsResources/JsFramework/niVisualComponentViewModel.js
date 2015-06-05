//****************************************
// Visual Component View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.VisualComponentViewModel = function (element, model) {
    'use strict';
    // Properties
    this.element = element;
    this.model = model;
    this.owner = null;
    this.observer = null;
    this.needsResizeHack = false;
    
    // Prevent Closing on Constructor Properties
    element = model = undefined;
    
    // Methods
    if (typeof this.visualComponentViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.VisualComponentViewModel.prototype;
        proto.visualComponentViewModelMethods = function () {
        };

        proto.instantiate = function() {
        };

        proto.createViewParams = function () {
            var params = {};
            var config = this.model.getConfiguration();
            for (var attr in config) {
                if (config.hasOwnProperty(attr)) {
                    params[attr] = config[attr];
                }
            }

            return params;
        };

        proto.setOwner = function(owner) {
            this.owner = owner;
        };

        proto.getOwner = function() {
            return this.owner;
        };

        proto.getModel = function() {
            return this.model;
        };

        proto.getViewConfig = function() {
        };

        proto.notifyComponentChanged = function(viewConfig) {
            this.owner.componentChanged(this, viewConfig);
        };

        proto.modelPropertyChanged = function (changes) {
            // Use the viewConfig object to store changes that will be propagated to the DOM Element associated with view model
            // Parameter behaviors:
            // properties: Add properties to this object whose name is a property on the DOM Element and value is the new value for the DOM Element property
            // widget: Add parameter modifications that are targeted to the widget framework (i.e. jqWidget specific parameters, viewConfig.widget['toggled'] = true)
            // cssClasses.toAdd: Append string names to this array of css classes to add to the element
            // cssClasses.toRemove: Append string names to this array of css classes to remove from the element
            // cssStyles: Add properties to this object whose values are the css style to update. (i.e. viewConfig.cssStyle['border'] = 0; Reference the Element.css property for a list of styles to set)
            // attributes: Add properties to this object whose name is a DOM attribute and whose string value is the string value to update the element DOM attribute (i.e. viewConfig.attributes['data-mydata'] = "hello"  )
            // other: Add property value pairs that do not correspond to the above or that need to be handled on a control by control basis
            var viewConfig = Object.freeze({
                properties: {},
                widget: {},
                cssClasses: Object.freeze({
                    toAdd: [],
                    toRemove: []
                }),
                cssStyles: {},
                attributes: {},
                other: {}
            });
            var n = changes.length;
            for (var i = 0; i < n; i++) {
                switch (changes[i]) {
                    case 'configuration':
                        var config = this.model.getConfiguration();
                        for (var attr in config) {
                            if (config.hasOwnProperty(attr)) {
                                viewConfig.widget[attr] = config[attr];
                            }
                        }
                        break;
                    case 'visible':
                        // APD TODO
                        break;
                    default:
                        break;
                }
            }

            return viewConfig;
        };
        
        proto.enableResizeHack = function() {
            this.needsResizeHack = true;
        };
        
        // Applies changes to the DOM Element
        // viewConfig: applies 'cssClasses', 'cssStyles', and 'attributes' to DOM elements. 'widget' and 'other' properties are not utilized.
        // TODO can we batch calls to this function and only update in requestAnimationFrame? mraj
        proto.applyElementChanges = function (viewConfig) {
            var i, newStyle, newAttr, newProp, errorMessage;
            
            for(i = 0; i < viewConfig.cssClasses.toAdd.length; i++) {
                if( typeof viewConfig.cssClasses.toAdd[i] !== 'string' ) {
                    errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.VIEWCONFIG_EXPECTS_STRING,
                    'css classes to add', typeof viewConfig.cssClasses.toAdd[i]);
                    throw new Error(errorMessage);
                }
                else {
                    this.element.classList.add(viewConfig.cssClasses.toAdd[i]);
                }
            }
            
            for(i = 0; i < viewConfig.cssClasses.toRemove.length; i++) {
                if( typeof viewConfig.cssClasses.toRemove[i] !== 'string' ) {
                    errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.VIEWCONFIG_EXPECTS_STRING,
                    'css classes to remove', typeof viewConfig.cssClasses.toRemove[i]);
                    throw new Error(errorMessage);
                }
                else {
                    this.element.classList.remove(viewConfig.cssClasses.toRemove[i]);
                }
            }
            
            for( newStyle in viewConfig.cssStyles ) {
                if(viewConfig.cssStyles.hasOwnProperty(newStyle)) {
                    if( typeof this.element.style[newStyle] === 'undefined') {
                        errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.PROPERTY_DOES_NOT_EXIST,
                        newStyle, 'element style');
                        throw new Error(errorMessage);
                    }
                    else {
                        this.element.style[newStyle] = viewConfig.cssStyles[newStyle];
                    }
                    
                    if (this.needsResizeHack === true) {
                        this.element.dispatchEvent(new CustomEvent('resizeEventHack'));                        
                    }
                }
            }
            
            for( newAttr in viewConfig.attributes ) {
                if(viewConfig.attributes.hasOwnProperty(newAttr)) {
                    if(typeof viewConfig.attributes[newAttr] !== 'string' ) {
                        errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.VIEWCONFIG_EXPECTS_STRING,
                        'element attributes', typeof viewConfig.attributes[newAttr]);
                        throw new Error(errorMessage);
                    }
                    else {
                        this.element.setAttribute(newAttr, viewConfig.attributes[newAttr]);
                    }
                }
            }
            
            for( newProp in viewConfig.properties ) {
                if(viewConfig.properties.hasOwnProperty(newProp)) {
                    
                    var newPropType = typeof viewConfig.properties[newProp];
                    
                    // Assuming properties are numeric, string, or boolean (only types supported by custom elements so far, but this may need to change)
                    if(newPropType !== 'number' && newPropType !== 'boolean' && newPropType !== 'string') {
                        throw new Error('Property must be either a string, number, or boolean value'); // TODO make exception mraj
                    }
                    else {
                        this.element[newProp] = viewConfig.properties[newProp];
                    }
                }
            }
        };
        
        proto.observe = function () {
            var that = this;
            if (this.observer === undefined || this.observer === null) {
                this.observer = new ObjectObserver(this.model);
                this.observer.open(function (added, removed, changed) {
                    var changes = Object.keys(changed);
                    that.modelPropertyChanged(changes);
                });
            }
        };

        proto.unobserve = function () {
            this.observer.close();
        };

        proto.printToConsole = function (space) {
            for (var name in this) {
                if (this.hasOwnProperty(name)) {
                    console.log(space + name + ': ' + this[name]);
                }
            }
        };

        proto.controlChanged = function () {
        };

        proto.updateModelSettingsFromElement = function (element) {
            var model = this.getModel();
            model.id = element.id;
            //settings.kind // handled by child class
            model.visible = element.visible;
            model.configuration = JSON.parse(element.configuration);
            model.labelId = element.labelId;
            model.bindingInfo = JSON.parse(element.bindingInfo);
        };

        proto.applyModelSettings = function (settings) {
            var element = this.element;
            if (settings.id !== undefined) {
                element.id = settings.id;
            }
            if (settings.visible !== undefined) {
                element.visible = settings.visible;
            }
            if (settings.configuration !== undefined) {
                element.configuration = JSON.stringify(settings.configuration);
            }
            if (settings.labelId !== undefined) {
                element.labelId = settings.labelId;
            }
            if (settings.bindingInfo) {
                element.bindingInfo = JSON.stringify(settings.bindingInfo);
            }
        };
    }
};

//////////////////////////
// Add Element Extensions
//////////////////////////
(function (child) {
    'use strict';
    var proto = child.prototype;
    
    // after the element is added to the page
    proto.attachedCallback = (function (orig) {
        return function attachedCallbackVisualComponentViewModel() {
            var firstCall = orig.apply(this, arguments);

            // Register with the View Model service on first call
            if (firstCall === true) {
                
                // TODO viName should not be hard coded, should maybe look-up in the DOM section tag? mraj
                var viName = 'Function.gvi';
                var viModel = NationalInstruments.HtmlVI.viModelsService.getVI(viName);

                if(viModel === null) {
                    viModel = NationalInstruments.HtmlVI.viModelsService.addVI(viName);
                }
                var viewModel = viModel.findViewModel(this.id);
                if (viewModel === undefined) {
                    viModel.addFrontPanelControl({id: this.id, tagName: this.elementInfo.tagName, element: this});
                    viewModel = viModel.findViewModel(this.id);
                }
                viewModel.updateModelSettingsFromElement(this);
                viewModel.bindToView();
            }
            
            return firstCall;
        };
    }(child.prototype.attachedCallback));
    
    
}(NationalInstruments.HtmlVI.Elements.VisualComponent));

