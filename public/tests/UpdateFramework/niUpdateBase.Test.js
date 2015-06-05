//******************************************
// Tests for Base classes for Update Service
// National Instruments Copyright 2014
//******************************************

describe('An UpdateMessage', function () {
    'use strict';
    var updateMessage;
    var messageType = NationalInstruments.HtmlVI.UpdateMessageTypeEnum.PROPERTY_UPDATE;
    var viName = 'vi';
    var frontPanelControlId = 'id109';
    var frontPanelControlKind = NationalInstruments.HtmlVI.ControlKindEnum.NI_GAUGE;
    var data = {value: 1};

    beforeEach(function () {
        updateMessage = new NationalInstruments.HtmlVI.UpdateMessage();
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(updateMessage).toBeDefined();
    });

    it('allows to set and get the messageType property', function () {
        updateMessage.setMessageType(messageType);
        expect(updateMessage.getMessageType()).toEqual(messageType);
    });

    it('allows to set and get the viName property', function () {
        updateMessage.setViName(viName);
        expect(updateMessage.getViName()).toEqual(viName);
    });

    it('allows to set and get the frontPanelControlId property', function () {
        updateMessage.setFrontPanelControlId(frontPanelControlId);
        expect(updateMessage.getRootControlId()).toEqual(frontPanelControlId);
    });

    it('allows to set and get the frontPanelControlKind property', function () {
        updateMessage.setFrontPanelControlKind(frontPanelControlKind);
        expect(updateMessage.getRootControlKind()).toEqual(frontPanelControlKind);
    });

    it('allows to set and get the data property', function () {
        updateMessage.setData(data);
        expect(updateMessage.getData()).toEqual(data);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the updateMessageMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        updateMessage.updateMessageMethods();
    });

    it('allows to call the initAsPropertyUpdateMessage method', function () {
        updateMessage.initAsPropertyUpdateMessage(viName, frontPanelControlId, frontPanelControlKind, data);
        expect(updateMessage.getMessageType()).toEqual(NationalInstruments.HtmlVI.UpdateMessageTypeEnum.PROPERTY_UPDATE);
        expect(updateMessage.getViName()).toEqual(viName);
        expect(updateMessage.getRootControlId()).toEqual(frontPanelControlId);
        expect(updateMessage.getRootControlKind()).toEqual(frontPanelControlKind);
        expect(updateMessage.getData()).toEqual(data);
    });

    it('allows to call the initAsVIStateUpdateMessage method', function () {
        updateMessage.initAsVIStateUpdateMessage(viName, data);
        expect(updateMessage.getMessageType()).toEqual(NationalInstruments.HtmlVI.UpdateMessageTypeEnum.VI_STATE_UPDATE);
        expect(updateMessage.getViName()).toEqual(viName);
        expect(updateMessage.getRootControlId()).toEqual('');
        expect(updateMessage.getRootControlKind()).toEqual('');
        expect(updateMessage.getData()).toEqual(data);
    });

    it('allows to call the initAsEventUpdateMessage method', function () {
        updateMessage.initAsEventUpdateMessage(viName, frontPanelControlId, frontPanelControlKind, data);
        expect(updateMessage.getMessageType()).toEqual(NationalInstruments.HtmlVI.UpdateMessageTypeEnum.EVENT_UPDATE);
        expect(updateMessage.getViName()).toEqual(viName);
        expect(updateMessage.getRootControlId()).toEqual(frontPanelControlId);
        expect(updateMessage.getRootControlKind()).toEqual(frontPanelControlKind);
        expect(updateMessage.getData()).toEqual(data);
    });

    it('allows to call the printToConsole method', function () {
        updateMessage.initAsPropertyUpdateMessage(viName, frontPanelControlId, frontPanelControlKind, data);
        spyOn(console, 'log');
        updateMessage.printToConsole('');
        expect(console.log).toHaveBeenCalledWith('messageType: PROPERTY_UPDATE');
        expect(console.log).toHaveBeenCalledWith('viName: vi');
        expect(console.log).toHaveBeenCalledWith('frontPanelControlId: id109');
        expect(console.log).toHaveBeenCalledWith('frontPanelControlKind: niGauge');
        expect(console.log).toHaveBeenCalledWith('data: {"value":1}');
        expect(console.log.calls.count()).toEqual(Object.keys(updateMessage).length);
    });
});

describe('An UpdateMessageStream', function () {
    'use strict';
    var updateMessage;
    var updateMessageStream;
    var viName = 'vi';
    var frontPanelControlId = 'id109';
    var frontPanelControlKind = NationalInstruments.HtmlVI.ControlKindEnum.NI_GAUGE;
    var data = { value: 1 };
    var messages;

    beforeEach(function () {
        messages = undefined;
        updateMessage = undefined;
        updateMessageStream = new NationalInstruments.HtmlVI.UpdateMessageStream();
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(updateMessageStream).toBeDefined();
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the updateMessageStreamMethods method', function () {
        // This function is used as a flag to indicate that the methods have been already initialized in the prototype.
        // This function does nothing. It is called here for purpose of completing our testing coverage.
        updateMessageStream.updateMessageStreamMethods();
    });

    it('allows to call the getMessages method', function () {
        updateMessageStream.addPropertyUpdateMessage(viName, frontPanelControlId, frontPanelControlKind, data);
        messages = updateMessageStream.getMessages();
        expect(messages.length).toEqual(1);
    });

    it('allows to call the clear method', function () {
        updateMessageStream.addPropertyUpdateMessage(viName, frontPanelControlId, frontPanelControlKind, data);
        messages = updateMessageStream.getMessages();
        expect(messages.length).toEqual(1);
        updateMessageStream.clear();
        messages = updateMessageStream.getMessages();
        expect(messages.length).toEqual(0);
    });

    it('allows to call the addPropertyUpdateMessage method', function () {
        updateMessageStream.addPropertyUpdateMessage(viName, frontPanelControlId, frontPanelControlKind, data);
        messages = updateMessageStream.getMessages();
        updateMessage = messages[0];
        expect(updateMessage.getMessageType()).toEqual(NationalInstruments.HtmlVI.UpdateMessageTypeEnum.PROPERTY_UPDATE);
        expect(updateMessage.getViName()).toEqual(viName);
        expect(updateMessage.getRootControlId()).toEqual(frontPanelControlId);
        expect(updateMessage.getRootControlKind()).toEqual(frontPanelControlKind);
        expect(updateMessage.getData()).toEqual(data);
    });

    it('allows to call the addVIStateUpdateMessage method', function () {
        updateMessageStream.addVIStateUpdateMessage(viName, data);
        messages = updateMessageStream.getMessages();
        updateMessage = messages[0];
        expect(updateMessage.getMessageType()).toEqual(NationalInstruments.HtmlVI.UpdateMessageTypeEnum.VI_STATE_UPDATE);
        expect(updateMessage.getViName()).toEqual(viName);
        expect(updateMessage.getRootControlId()).toEqual('');
        expect(updateMessage.getRootControlKind()).toEqual('');
        expect(updateMessage.getData()).toEqual(data);
    });

    it('allows to call the addEventUpdateMessage method', function () {
        updateMessageStream.addEventUpdateMessage(viName, frontPanelControlId, frontPanelControlKind, data);
        messages = updateMessageStream.getMessages();
        updateMessage = messages[0];
        expect(updateMessage.getMessageType()).toEqual(NationalInstruments.HtmlVI.UpdateMessageTypeEnum.EVENT_UPDATE);
        expect(updateMessage.getViName()).toEqual(viName);
        expect(updateMessage.getRootControlId()).toEqual(frontPanelControlId);
        expect(updateMessage.getRootControlKind()).toEqual(frontPanelControlKind);
        expect(updateMessage.getData()).toEqual(data);
    });

    it('allows to call the toJSON method', function () {
        updateMessageStream.addEventUpdateMessage(viName, frontPanelControlId, frontPanelControlKind, data);
        var jsonString = updateMessageStream.toJSON();
        expect(jsonString).toEqual('[{"messageType":"EVENT_UPDATE","viName":"vi","frontPanelControlId":"id109","frontPanelControlKind":"niGauge","data":{"value":1}}]');
    });

    it('allows to call the fromJSON method', function () {
        updateMessageStream.fromJSON('[{"messageType":"EVENT_UPDATE","viName":"vi","frontPanelControlId":"id109","frontPanelControlKind":"niGauge","data":{"value":1}}]');
        messages = updateMessageStream.getMessages();
        expect(messages.length).toEqual(1);
        updateMessage = messages[0];
        expect(updateMessage.getMessageType()).toEqual(NationalInstruments.HtmlVI.UpdateMessageTypeEnum.EVENT_UPDATE);
        expect(updateMessage.getViName()).toEqual(viName);
        expect(updateMessage.getRootControlId()).toEqual(frontPanelControlId);
        expect(updateMessage.getRootControlKind()).toEqual(frontPanelControlKind);
        expect(updateMessage.getData()).toEqual(data);
    });

    it('allows to call the printToConsole method', function () {
        updateMessageStream.addEventUpdateMessage(viName, frontPanelControlId, frontPanelControlKind, data);
        spyOn(console, 'log');
        updateMessageStream.printToConsole('test','');
        expect(console.log).toHaveBeenCalledWith('******** Printing update messages');
    });

    it('allows to call the processMessages method', function () {
        var processMessage = function (message) {
            expect(message.getMessageType()).toEqual(NationalInstruments.HtmlVI.UpdateMessageTypeEnum.EVENT_UPDATE);
            expect(message.getViName()).toEqual(viName);
            expect(message.getRootControlId()).toEqual(frontPanelControlId);
            expect(message.getRootControlKind()).toEqual(frontPanelControlKind);
            expect(message.getData()).toEqual(data);
        };
        updateMessageStream.addEventUpdateMessage(viName, frontPanelControlId, frontPanelControlKind, data);
        updateMessageStream.processMessages(processMessage);
    });
});

describe('An UpdateMessageDispatcher', function () {
    'use strict';
    var updateMessage;
    var updateMessageStream;
    var updateMessageDispatcher;
    var viName = 'vi';
    var frontPanelControlId = 'id109';
    var frontPanelControlKind = NationalInstruments.HtmlVI.ControlKindEnum.NI_GAUGE;
    var data = { value: 1 };
    var messages;

    beforeEach(function () {
        messages = undefined;
        updateMessageStream = new NationalInstruments.HtmlVI.UpdateMessageStream();
        updateMessageStream.addEventUpdateMessage(viName, frontPanelControlId, frontPanelControlKind, data);
        var niViModelService = {
            getVI: function (viName) {
                var viModel = new NationalInstruments.HtmlVI.VIModel();
                viModel.processUpdateMessage = function (message) {
                    expect(message.getMessageType()).toEqual(NationalInstruments.HtmlVI.UpdateMessageTypeEnum.EVENT_UPDATE);
                    expect(message.getViName()).toEqual(viName);
                    expect(message.getRootControlId()).toEqual(frontPanelControlId);
                    expect(message.getRootControlKind()).toEqual(frontPanelControlKind);
                    expect(message.getData()).toEqual(data);
                };
                return viModel;
            }
        };
        updateMessageDispatcher = new NationalInstruments.HtmlVI.UpdateMessageDispatcher(niViModelService);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('allows to call his constructor', function () {
        expect(updateMessageStream).toBeDefined();
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('throws an exception when dispatchMessagesToHTMLVI method is called with invalid parameters', function () {
        expect(updateMessageDispatcher.dispatchMessagesToHTMLVI).toThrow();

        try {
            updateMessageDispatcher.dispatchMessagesToHTMLVI('funny');
            expect(false).toEqual(true); // We shouldn't hit this line, an exception should have been thrown.
        }
        catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('allows to call the dispatchMessagesToHTMLVI method', function () {
        updateMessageDispatcher.dispatchMessagesToHTMLVI(updateMessageStream);
    });

    it('throws an exception when dispatchMessageToHTMLVI method is called with invalid parameters', function () {
        expect(updateMessageDispatcher.dispatchMessageToHTMLVI).toThrow();

        try {
            updateMessageDispatcher.dispatchMessageToHTMLVI('funny');
            expect(false).toEqual(true); // We shouldn't hit this line, an exception should have been thrown.
        }
        catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('allows to call the dispatchMessageToHTMLVI method', function () {
        messages = updateMessageStream.getMessages();
        expect(messages.length).toEqual(1);
        updateMessage = messages[0];
        updateMessageDispatcher.dispatchMessageToHTMLVI(updateMessage);
    });

    it('throws an exception when sendMessagesToListeners method is called with invalid parameters', function () {
        expect(updateMessageDispatcher.sendMessagesToListeners).toThrow();

        try {
            updateMessageDispatcher.sendMessagesToListeners('funny');
            expect(false).toEqual(true); // We shouldn't hit this line, an exception should have been thrown.
        }
        catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('allows to call the sendMessagesToListeners method', function () {
        updateMessageDispatcher.sendMessagesToListeners(updateMessageStream);
    });

    it('throws an exception when sendMessageToListeners method is called with invalid parameters', function () {
        expect(updateMessageDispatcher.sendMessageToListeners).toThrow();

        try {
            updateMessageDispatcher.sendMessageToListeners('funny');
            expect(false).toEqual(true); // We shouldn't hit this line, an exception should have been thrown.
        }
        catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('allows to call the sendMessageToListeners method', function () {
        messages = updateMessageStream.getMessages();
        expect(messages.length).toEqual(1);
        updateMessage = messages[0];
        updateMessageDispatcher.sendMessageToListeners(updateMessage);
    });
});