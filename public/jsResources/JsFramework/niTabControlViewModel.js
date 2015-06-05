//****************************************
// Boolean Button View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.TabControlViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualViewModel.call(this, element, model);
    this.tabs = [];

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.tabControlViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.TabControlViewModel.prototype;
        proto.tabControlViewModelMethods = function () {
        };

        proto.instantiate = function () {
            var i;
            var viewModel;
            var that = this;
            NationalInstruments.HtmlVI.VisualViewModel.prototype.instantiate.call(this);
            if (this.model instanceof Object) {
                var tabs = this.model.getTabs();
                var params = this.createViewParams();
                var id = '#' + this.model.getId();
                // create the dom elements if necessary
                if (document.getElementById(this.model.getId() + '_ul') === null) {
                    var ul = document.createElement('ul');
                    ul.id = this.model.getId() + '_ul';
                    $(id).append(ul);
                }

                for (i = 0; i < tabs.length; i++) {
                    this.model.getRoot().addFrontPanelControlToParent(this, tabs[i]);
                    viewModel = this.model.getRoot().findViewModel(tabs[i].id);
                    viewModel.setOwner(this);
                }

                $(id).jqxTabs(params);
                $(id).on('selected', function () { // click on tabs
                    if (that.getSuppressChangeEvents() === false) {
                        var val = $(id).jqxTabs('selectedItem'); // change selected index
                        that.model.setSelectedIndex(val);
                    }
                }); 
            }
            else {
                var errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNABLE_TO_CREATE_CONTROL,
                    this.model.getId(), this.model.getKind());
                throw new Error(errorMessage);
            }
        };

        proto.modelPropertyChanged = function (changes, splices) {
            var tabsChanged = false;
            var viewModel;
            var viewConfig = NationalInstruments.HtmlVI.VisualViewModel.prototype.modelPropertyChanged.call(this, changes);
            var n = changes.length;
            var i, j, k;
            for (i = 0; i < n; i++) {
                switch (changes[i]) {
                    case 'selectedIndex':
                        viewConfig.widget.selectedItem = this.model.getSelectedIndex();
                        break;
                    case 'placement':
                        viewConfig.widget.position = this.model.getPlacement();
                        break;
                    case 'tabs':
                        for (k = 0; k < splices.length; k++) {
                            var splice = splices[k];
                            for (j = splice.removed.length - 1; j >= 0; j--) {
                                viewModel = this.model.getRoot().findViewModel(splice.removed[j].id);
                                viewModel.setOwner(null);
                                $('#' + this.model.getId()).jqxTabs('removeAt', j);
                            }
                            var tabs = this.model.getTabs();
                            for (j = splice.index; j < splice.index + splice.addedCount; j++) {
                                tabs[j].addToExisting = true;
                                this.model.getRoot().addFrontPanelControlToParent(this, tabs[j]);
                                viewModel = this.model.getRoot().findViewModel(tabs[j].id);
                                viewModel.setOwner(this);
                            }
                            tabsChanged = true;
                        }
                        break;
                }
            }

            if (!$.isEmptyObject(viewConfig.widget) || tabsChanged === true) {
                $('#' + this.model.getId()).jqxTabs(viewConfig.widget);
            }
        };

        proto.updateTabConfig = function () {
        };

        proto.observe = function () {
            var that = this;
            NationalInstruments.HtmlVI.VisualViewModel.prototype.observe.call(this);
            this.tabsObserver = new ArrayObserver(this.model.tabs);
            this.tabsObserver.open(function (splices) {
                that.modelPropertyChanged(['tabs'], splices);
            });
        };
        
        proto.componentChanged = function () {
            this.updateTabConfig();
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.TabControlViewModel, NationalInstruments.HtmlVI.VisualViewModel);