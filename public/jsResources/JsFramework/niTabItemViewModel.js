//****************************************
// TabItem View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.TabItemViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualComponentViewModel.call(this, element, model);

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.TabItemViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.TabItemViewModel.prototype;
        proto.TabItemViewModelMethods = function () {
        };

        proto.getViewConfig = function()
        {
            var tab = {};

            tab.header = this.model.getHeader();

            return tab;
        };

        proto.instantiate = function () {
            NationalInstruments.HtmlVI.VisualComponentViewModel.prototype.instantiate.call(this);
            if (this.model instanceof Object) {
                var ownerId = this.model.getOwner().getId();
                if (this.model.addToExisting === true) {
                    $('#' + ownerId).jqxTabs('addAt', this.model.tabIndex, this.model.header, '<div id=' + this.model.getId() + '></div>');
                    delete this.model.addToExisting;
                }
                else {
                    if (document.getElementById(this.model.getId() + '_li') === null) {
                        var li = document.createElement('li');
                        li.id = this.model.getId() + '_li';
                        var txt = document.createTextNode(this.model.header);
                        li.appendChild(txt);
                        $('#' + ownerId + '_ul').append(li);
                        var div = document.createElement('div');
                        div.id = this.model.getId();
                        $('#' + ownerId).append(div);
                    }
                }
                this.addChildren();
            }
        };

        proto.addChildren = function () {
            for (var i = 0; i < this.model.getChildren().length; i++) {
                var childSettings = this.model.getChildren()[i];
                this.model.getRoot().addFrontPanelControlToParent(this, childSettings);
            }
        };

        proto.modelPropertyChanged = function (changes, splices) {
            var viewConfig = NationalInstruments.HtmlVI.VisualComponentViewModel.prototype.modelPropertyChanged.call(this, changes);
            var n = changes.length;
            var i, j, k;
            for (i = 0; i < n; i++) {
                switch (changes[i]) {
                    case 'header':
                        if (this.model.getHeader() !== null) {
                            viewConfig.other.header = this.model.getHeader();
                            $('#' + this.model.getOwner().getId()).jqxTabs('setTitleAt', parseInt(this.model.getTabIndex(), 10), this.model.getHeader());
                        }
                        break;
                    case 'tabIndex':
                        break;
                    case 'children':
                        for (k = 0; k < splices.length; k++) {
                            var splice = splices[k];
                            for (j = 0; j < splice.removed.length; j++) {
                                $('#' + this.model.getId()).remove(splice.removed[j].id);
                            }
                            for (j = splice.index; j < splice.index + splice.addedCount; j++) {
                                var childModel = this.model.getChildren()[j];
                                var childId = childModel.getId();
                                var domType = childModel.getDOMType();
                                var childElement = document.createElement(domType);
                                childElement.id = childId;
                                var viewModel = this.model.getRoot().findViewModel(childId);
                                if (childElement !== null && viewModel !== null) {
                                    $('#' + this.model.getId()).append(childElement);
                                    if (viewModel.instantiate !== undefined) {
                                        viewModel.instantiate();
                                    }
                                }
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        };

        proto.observe = function () {
            var that = this;
            NationalInstruments.HtmlVI.VisualViewModel.prototype.observe.call(this);
            this.childrenObserver = new ArrayObserver(this.model.children);
            this.childrenObserver.open(function (splices) {
                that.modelPropertyChanged(['children'], splices);
            });
        };
    }
};

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.TabItemViewModel, NationalInstruments.HtmlVI.VisualComponentViewModel);