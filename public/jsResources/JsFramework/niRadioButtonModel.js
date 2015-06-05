//****************************************
// Radio Button Model
// National Instruments Copyright 2015
//****************************************

NationalInstruments.HtmlVI.RadioButtonModel = function (id) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.BooleanControlModel.call(this, id);
    this.groupName = '';

    // Prevent Closing on Constructor Properties
    id = undefined;

    // Methods
    if (typeof this.radioButtonModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.RadioButtonModel.prototype;
        proto.radioButtonModelMethods = function () {
        };

        proto.getDOMType = function () {
            return 'div';
        };

        proto.setGroupName = function (groupName) {
            this.groupName = groupName;
        };

        proto.getGroupName = function () {
            return this.groupName;
        };

        proto.setProperty = function (name, settings) {
            switch (name) {
                case 'groupName':
                    this.setGroupName(settings.groupName);
                    break;
                default:
                    NationalInstruments.HtmlVI.BooleanControlModel.prototype.setProperty.call(this, name, settings);
                    break;
            }
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.RadioButtonModel, NationalInstruments.HtmlVI.BooleanControlModel);