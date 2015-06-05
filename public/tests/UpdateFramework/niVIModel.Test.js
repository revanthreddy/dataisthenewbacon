//******************************************
// Tests for VI model classes
// National Instruments Copyright 2014
//******************************************
describe('A VIModel', function () {
    'use strict';
    var frontPanelControlId = 'id45';
    var frontPanelControlKind = NationalInstruments.HtmlVI.ControlKindEnum.NI_LINEAR_PROGRESSBAR;
    var data = { value: 1 };
    var frontPanelControl;
    var frontPanelControls;
    var viModel;
    var viName = 'viName';
    var viStatus = 'idle';
    var settings;
    var updateMessage;

    var filedBindingInfo = { value: 'field1' };
    var clusterFieldName = '%66ield1';
    var clusterRuntimeName = 'di_22';

    var clusterId = 'id55';
    var clusterSettings;
    var clusterBindingInfo = { value: { runtimeName: 'di_22', IO: 'I' } };

    var frontPanelCanvas = document.createElement('section');
    var htmlTagCanvasId = 'FrontPanelCanvas';
    frontPanelCanvas.id = htmlTagCanvasId;

    if (document.body === null) {
        var body = document.createElement('body');
        document.body = body;
    }

    document.body.appendChild(frontPanelCanvas);

    beforeEach(function () {
        var el = document.createElement('div');
        el.style.position = 'absolute';
        el.style.left = '100px';
        el.style.top = '200px';
        el.style.width = '300px';
        el.style.height = '400px';
        el.id = frontPanelControlId;
        frontPanelCanvas.appendChild(el);

        var clusterEl = document.createElement('div');
        clusterEl.style.position = 'absolute';
        clusterEl.style.left = '10px';
        clusterEl.style.top = '20px';
        clusterEl.style.width = '600px';
        clusterEl.style.height = '800px';
        clusterEl.id = clusterId;
        frontPanelCanvas.appendChild(clusterEl);
        settings = {
            id: frontPanelControlId,
            bindingInfo: filedBindingInfo,
            kind: frontPanelControlKind,
            configuration: {}
        };
        clusterSettings = {
            id: clusterId,
            bindingInfo : clusterBindingInfo,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_CLUSTER,
            configuration: {}
        };
        frontPanelControls = undefined;
        viModel = new NationalInstruments.HtmlVI.VIModel(viName);
        updateMessage = new NationalInstruments.HtmlVI.UpdateMessage();
        updateMessage.initAsPropertyUpdateMessage(viName, frontPanelControlId, frontPanelControlKind, data);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(viModel).toBeDefined();
    });

    it('allows to set and get the name property', function () {
        viModel.setName(viName+'2');
        expect(viModel.getName()).toEqual(viName + '2');
    });

    it('allows to set and get the status property', function () {
        viModel.setStatus(viStatus);
        expect(viModel.getStatus()).toEqual(viStatus);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the viModelMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        viModel.viModelMethods();
    });

    it('allows to call the modelControlFactory method', function () {
        var modelControl = viModel.modelControlFactory(frontPanelControlId, frontPanelControlKind);
        expect(modelControl).toEqual(jasmine.any(NationalInstruments.HtmlVI.ProgressBarModel));
    });

    it('allows to call the visualModelControlFactory method', function () {
        var modelControl = viModel.modelControlFactory(frontPanelControlId, frontPanelControlKind);
        expect(modelControl).toEqual(jasmine.any(NationalInstruments.HtmlVI.ProgressBarModel));
        modelControl.setKind(frontPanelControlKind);
        var visualModelControl = viModel.viewModelControlFactory('', modelControl);
        expect(visualModelControl).toEqual(jasmine.any(NationalInstruments.HtmlVI.ProgressBarViewModel));
    });

    it('allows to call the addFrontPanelControl method', function () {
        viModel.addFrontPanelControl(settings);
        frontPanelControls = viModel.getRootModelControls();
        expect(frontPanelControls[frontPanelControlId]).toBeDefined();
        viModel.removeFrontPanelControl(frontPanelControlId);
        expect(frontPanelControls[frontPanelControlId]).toBeUndefined();
    });

    it('allows to call the removeFrontPanelControl method', function () {
        viModel.addFrontPanelControl(settings);
        frontPanelControls = viModel.getRootModelControls();
        expect(frontPanelControls[frontPanelControlId]).toBeDefined();
        viModel.removeFrontPanelControl(frontPanelControlId);
        expect(frontPanelControls[frontPanelControlId]).toBeUndefined();
    });

    it('allows to call the getRootModelControls method', function () {
        frontPanelControls = viModel.getRootModelControls();
        expect(frontPanelControls[frontPanelControlId]).toBeUndefined();
    });

    it('allows to call the getCompleteBindingInfo', function () {
        viModel.addFrontPanelControl(settings);

        viModel.addFrontPanelControl(clusterSettings);
        frontPanelControls = viModel.getRootModelControls();
        expect(frontPanelControls[clusterId]).toBeDefined();
        frontPanelControls[clusterId].addChild(frontPanelControls[frontPanelControlId]);
        frontPanelControls[frontPanelControlId].setOwner(frontPanelControls[clusterId]);
        expect(frontPanelControls[clusterId].children.length).toEqual(1);
        var allBindingInfo = viModel.getCompleteBindingInfo(frontPanelControls[frontPanelControlId], filedBindingInfo);
        expect(allBindingInfo.value.fieldName).toEqual(clusterFieldName);
        expect(allBindingInfo.value.runtimeName).toEqual(clusterRuntimeName);

    });
    it('throws an exception when processUpdateMessage method is called with invalid parameters', function () {
        expect(viModel.processUpdateMessage).toThrow();

        try {
            updateMessage.setKind('UNKNOWN');
            viModel.processUpdateMessage(updateMessage);
            expect(false).toEqual(true); // We shouldn't hit this line, an exception should have been thrown.
        }
        catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('allows to call the processUpdateMessage method with a property update', function () {
        viModel.addFrontPanelControl(settings);
        frontPanelControls = viModel.getRootModelControls();
        expect(frontPanelControls[frontPanelControlId]).toBeDefined();
        frontPanelControl = frontPanelControls[frontPanelControlId];
        frontPanelControl.updateModelFromDataSource = function (settings) {
            expect(settings).toEqual(data);
        };
        viModel.processUpdateMessage(updateMessage);
        viModel.removeFrontPanelControl(frontPanelControlId);
        expect(frontPanelControls[frontPanelControlId]).toBeUndefined();
    });

    it('allows to call the printToConsole method', function () {
        viModel.addFrontPanelControl(settings);
        frontPanelControls = viModel.getRootModelControls();
        spyOn(console, 'log');
        viModel.printToConsole('');
        expect(console.log).toHaveBeenCalledWith('name: ' + viName);
        viModel.removeFrontPanelControl(frontPanelControlId);
        expect(frontPanelControls[frontPanelControlId]).toBeUndefined();
    });
});

