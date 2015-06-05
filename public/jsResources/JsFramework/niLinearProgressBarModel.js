//****************************************
// Linear Progress Bar Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.LinearProgressBarModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.ProgressBarModel.call(this, id);
    
    // NOTE:
    // The C# Model exposes an IsSegmented property here which is non-configurable.
    // In addition, jqxWidgets does not support something like that property at the present time.    
    // We may also want to expose the animationDuration property in here an in the associated C# ViewModel

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.linearProgressBarModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.LinearProgressBarModel.prototype;
        proto.linearProgressBarModelMethods = function () {
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.LinearProgressBarModel, NationalInstruments.HtmlVI.ProgressBarModel);