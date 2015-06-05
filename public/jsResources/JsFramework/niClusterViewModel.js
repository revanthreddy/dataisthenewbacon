//****************************************
// Cluster View Model
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.ClusterViewModel = function (element, model) {
    'use strict';
    // Properties
    NationalInstruments.HtmlVI.VisualViewModel.call(this, element, model);

    // Prevent Closing on Constructor Properties
    element = model = undefined;

    // Methods
    if (typeof this.clusterViewModelMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.ClusterViewModel.prototype;
        proto.clusterViewModelMethods = function () {
        };

        proto.getViewConfig = function()
        {
            var cluster = {};

            return cluster;
        };

        proto.instantiate = function () {
            NationalInstruments.HtmlVI.VisualViewModel.prototype.instantiate.call(this);
            if (this.model instanceof Object) {
                this.element.style.border = 'thick solid #C5C5C5';
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
            NationalInstruments.HtmlVI.VisualViewModel.prototype.modelPropertyChanged.call(this, changes);
            var n = changes.length;
            var i, j, k;
            for (i = 0; i < n; i++) {
                switch (changes[i]) {
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

NationalInstruments.HtmlVI.inheritFromParent(NationalInstruments.HtmlVI.ClusterViewModel, NationalInstruments.HtmlVI.VisualViewModel);