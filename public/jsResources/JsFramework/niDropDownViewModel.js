//****************************************
// DropDown View Model
// National Instruments Copyright 2015
//****************************************

NationalInstruments.HtmlVI.DropDownViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualViewModel.call(this, element, model);

    // Methods
    if (typeof this.dropDownViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.DropDownViewModel.prototype;
        proto.dropDownViewModelMethods = function () {
        };

        proto.createViewParams = function () {
            var params = NationalInstruments.HtmlVI.VisualViewModel.prototype.createViewParams.call(this);
            params.source = this.model.getSource();
            params.width = this.model.getWidth();
            params.height = this.model.getHeight();
            params.selectedIndex = this.model.getSelectedIndex();
            params.disabled = false;
            params.autoDropDownHeight = true;
            return params;
        };

        proto.instantiate = function () {
            var that = this;
            NationalInstruments.HtmlVI.VisualViewModel.prototype.instantiate.call(this);
            if (this.model instanceof Object) {
                var params = this.createViewParams();
                var id = '#' + this.model.getId();
                $(id).jqxDropDownList(params);
                $(id).bind('select', function (event) {
                    if (that.getSuppressChangeEvents() === false) {
                        that.model.setSelectedIndex(event.args.index);
                        that.model.controlChanged();
                    }
                });
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
                    case 'source':
                        viewConfig.widget.source = this.model.getSource();
                        break;
                    default:
                        break;
                }
            }

            if ($.isEmptyObject(viewConfig)) {
                return;
            }

            this.setSuppressChangeEvents(true);
            $('#' + this.model.getId()).jqxDropDownList(viewConfig.widget);
            this.setSuppressChangeEvents(false);
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.DropDownViewModel, NationalInstruments.HtmlVI.VisualViewModel);
