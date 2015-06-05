//****************************************
// Update Service Base Classes
// National Instruments Copyright 2014
//****************************************

//****************************************
// Update Message Class
//****************************************
NationalInstruments.HtmlVI.UpdateMessageTypeEnum = Object.freeze({
    VERSION_MESSAGE: 'VERSION_MESSAGE',
    PROPERTY_UPDATE: 'PROPERTY_UPDATE',
    VI_STATE_UPDATE: 'VI_STATE_UPDATE',
    EVENT_UPDATE: 'EVENT_UPDATE'
});

NationalInstruments.HtmlVI.UpdateMessage = function () {
    'use strict';
    // Properties
    this.messageType = undefined;
    this.viName = undefined;
    this.frontPanelControlId = undefined;
    this.frontPanelControlKind = undefined;
    this.data = null;

    // Prevent Closing on Constructor Properties
    // No constructor parameters

    // Methods
    if (typeof this.updateMessageMethods !== 'function') {
        NationalInstruments.HtmlVI.UpdateMessage.prototype.updateMessageMethods = function () {
        };

        NationalInstruments.HtmlVI.UpdateMessage.prototype.setMessageType = function (messageType) {
            this.messageType = messageType;
        };

        NationalInstruments.HtmlVI.UpdateMessage.prototype.getMessageType = function () {
            return this.messageType;
        };

        NationalInstruments.HtmlVI.UpdateMessage.prototype.setViName = function (viName) {
            this.viName = viName;
        };

        NationalInstruments.HtmlVI.UpdateMessage.prototype.getViName = function () {
            return this.viName;
        };

        NationalInstruments.HtmlVI.UpdateMessage.prototype.setFrontPanelControlId = function (frontPanelControlId) {
            this.frontPanelControlId = frontPanelControlId;
        };

        NationalInstruments.HtmlVI.UpdateMessage.prototype.getRootControlId = function () {
            return this.frontPanelControlId;
        };

        NationalInstruments.HtmlVI.UpdateMessage.prototype.setFrontPanelControlKind = function (frontPanelControlKind) {
            this.frontPanelControlKind = frontPanelControlKind;
        };

        NationalInstruments.HtmlVI.UpdateMessage.prototype.getRootControlKind = function () {
            return this.frontPanelControlKind;
        };

        NationalInstruments.HtmlVI.UpdateMessage.prototype.setData = function (data) {
            this.data = data;
        };

        NationalInstruments.HtmlVI.UpdateMessage.prototype.getData = function () {
            return this.data;
        };

        NationalInstruments.HtmlVI.UpdateMessage.prototype.initAsPropertyUpdateMessage = function (viName, frontPanelControlId, frontPanelControlKind, data) {
            this.messageType = NationalInstruments.HtmlVI.UpdateMessageTypeEnum.PROPERTY_UPDATE;
            this.viName = viName;
            this.frontPanelControlId = frontPanelControlId;
            this.frontPanelControlKind = frontPanelControlKind;
            this.data = data;
        };

        NationalInstruments.HtmlVI.UpdateMessage.prototype.initAsVIStateUpdateMessage = function (viName, data) {
            this.messageType = NationalInstruments.HtmlVI.UpdateMessageTypeEnum.VI_STATE_UPDATE;
            this.viName = viName;
            this.frontPanelControlId = '';
            this.frontPanelControlKind = '';
            this.data = data;
        };

        NationalInstruments.HtmlVI.UpdateMessage.prototype.initAsEventUpdateMessage = function (viName, frontPanelControlId, frontPanelControlKind, data) {
            this.messageType = NationalInstruments.HtmlVI.UpdateMessageTypeEnum.EVENT_UPDATE;
            this.viName = viName;
            this.frontPanelControlId = frontPanelControlId;
            this.frontPanelControlKind = frontPanelControlKind;
            this.data = data;
        };

        NationalInstruments.HtmlVI.UpdateMessage.prototype.printToConsole = function (space) {
            console.log(space + 'messageType: ' + this.getMessageType());
            console.log(space + 'viName: ' + this.getViName());
            console.log(space + 'frontPanelControlId: ' + this.getRootControlId());
            console.log(space + 'frontPanelControlKind: ' + this.getRootControlKind());
            console.log(space + 'data: ' + JSON.stringify(this.getData()));
        };
    }
};

//****************************************
// Update Message Stream
//****************************************
NationalInstruments.HtmlVI.UpdateMessageStream = function () {
    'use strict';
    // Properties
    this.updateMessages = new Array(0);

    // Prevent Closing on Constructor Properties
    // No constructor parameters

    // Methods
    if (typeof this.updateMessageStreamMethods !== 'function') {
        NationalInstruments.HtmlVI.UpdateMessageStream.prototype.updateMessageStreamMethods = function () {
        };

        NationalInstruments.HtmlVI.UpdateMessageStream.prototype.getMessages = function () {
            return this.updateMessages;
        };

        NationalInstruments.HtmlVI.UpdateMessageStream.prototype.clear = function () {
            this.updateMessages.length = 0;
        };

        NationalInstruments.HtmlVI.UpdateMessageStream.prototype.addPropertyUpdateMessage = function (viName, frontPanelControlId, frontPanelControlKind, data) {
            var updateMessage = new NationalInstruments.HtmlVI.UpdateMessage();
            updateMessage.initAsPropertyUpdateMessage(viName, frontPanelControlId, frontPanelControlKind, data);
            this.updateMessages.push(updateMessage);
        };

        NationalInstruments.HtmlVI.UpdateMessageStream.prototype.addVIStateUpdateMessage = function (viName, data) {
            var updateMessage = new NationalInstruments.HtmlVI.UpdateMessage();
            updateMessage.initAsVIStateUpdateMessage(viName, data);
            this.updateMessages.push(updateMessage);
        };

        NationalInstruments.HtmlVI.UpdateMessageStream.prototype.addEventUpdateMessage = function (viName, frontPanelControlId, frontPanelControlKind, data) {
            var updateMessage = new NationalInstruments.HtmlVI.UpdateMessage();
            updateMessage.initAsEventUpdateMessage(viName, frontPanelControlId, frontPanelControlKind, data);
            this.updateMessages.push(updateMessage);
        };

        NationalInstruments.HtmlVI.UpdateMessageStream.prototype.toJSON = function () {
            return JSON.stringify(this.updateMessages);
        };

        NationalInstruments.HtmlVI.UpdateMessageStream.prototype.fromJSON = function (jsonValue) {
            this.updateMessages.length = 0;
            var updateMessagesData = JSON.parse(jsonValue);
            for (var index = 0; index < updateMessagesData.length; index++) {
                var updateMessage = new NationalInstruments.HtmlVI.UpdateMessage();
                updateMessage.setViName(updateMessagesData[index].viName);
                updateMessage.setMessageType(updateMessagesData[index].messageType);
                updateMessage.setFrontPanelControlId(updateMessagesData[index].frontPanelControlId);
                updateMessage.setFrontPanelControlKind(updateMessagesData[index].frontPanelControlKind);
                updateMessage.setData(updateMessagesData[index].data);
                this.updateMessages.push(updateMessage);
            }
        };

        NationalInstruments.HtmlVI.UpdateMessageStream.prototype.printToConsole = function (title, space) {
            console.log(space + '************************');
            console.log(space + '******** ' + title);
            console.log(space + '******** Printing update messages');
            console.log(space + '******** Number of messages = ' + this.updateMessages.length);
            space = space + '    ';
            for (var index = 0; index < this.updateMessages.length; index++) {
                console.log(space + '-----------------');
                this.updateMessages[index].printToConsole(space);
            }
            console.log(space + '************************');
        };

        NationalInstruments.HtmlVI.UpdateMessageStream.prototype.processMessages = function (callback) {
            this.updateMessages.forEach(callback);
            this.updateMessages.length = 0;
        };
    }
};

//****************************************
// Update Message Dispatcher
//****************************************
NationalInstruments.HtmlVI.UpdateMessageDispatcher = function (viModelsService) {
    'use strict';
    // Properties
    this.viModelsService = viModelsService;

    // Prevent Closing on Constructor Properties
    viModelsService = undefined;

    // Methods
    if (typeof this.updateMessageDispatcherMethods !== 'function') {
        NationalInstruments.HtmlVI.UpdateMessageDispatcher.prototype.updateMessageDispatcherMethods = function () {
        };

        NationalInstruments.HtmlVI.UpdateMessageDispatcher.prototype.dispatchMessagesToHTMLVI = function (updateMessageStream) {
            if (updateMessageStream instanceof NationalInstruments.HtmlVI.UpdateMessageStream) {
                var updateMessages = updateMessageStream.getMessages();
                for (var i = 0; i < updateMessages.length; i++) {
                    this.dispatchMessageToHTMLVI(updateMessages[i]);
                }
                updateMessageStream.clear();
            }
            else {
                var errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNABLE_TO_DISPATCH_MESSAGES_INVALID_MESSAGE_STREAM,
                    NationalInstruments.HtmlVI.errorMessages.INVALID_UPDATE_MESSAGE_STREAM);
                throw new Error(errorMessage);
            }
        };

        NationalInstruments.HtmlVI.UpdateMessageDispatcher.prototype.dispatchMessageToHTMLVI = function (updateMessage) {
            var errorReason = '';
            var viName = NationalInstruments.HtmlVI.errorMessages.UNKNOWN_NAME;
            if ((updateMessage instanceof NationalInstruments.HtmlVI.UpdateMessage) && (this.viModelsService instanceof Object)) {
                var viModel = this.viModelsService.getVI(updateMessage.getViName());
                if (viModel instanceof NationalInstruments.HtmlVI.VIModel) {
                    viModel.processUpdateMessage(updateMessage);
                    return true;
                }
                else {
                    errorReason = NationalInstruments.HtmlVI.errorMessages.INVALID_VI_MODEL;
                    viName = updateMessage.getViName();
                }
            }
            else {
                if (!(updateMessage instanceof NationalInstruments.HtmlVI.UpdateMessage)) {
                    errorReason = NationalInstruments.HtmlVI.errorMessages.INVALID_UPDATE_MESSAGE;
                }
                else if (!(this.viModelsService instanceof Object)) {
                    errorReason = NationalInstruments.HtmlVI.errorMessages.INVALID_VI_MODEL_SERVICE;
                    viName = updateMessage.getViName();
                }
            }

            var errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNABLE_TO_DISPATCH_MESSAGES_INVALID_UPDATE_MESSAGE,
                viName, errorReason);
            throw new Error(errorMessage);
        };

        NationalInstruments.HtmlVI.UpdateMessageDispatcher.prototype.sendMessagesToListeners = function (updateMessageStream) {
            if (updateMessageStream instanceof NationalInstruments.HtmlVI.UpdateMessageStream) {
                var updateMessages = updateMessageStream.getMessages();
                for (var i = 0; i < updateMessages.length; i++) {
                    this.sendMessageToListeners(updateMessages[i]);
                }
                updateMessageStream.clear();
            }
            else {
                var errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNABLE_TO_SEND_MESSAGES_TO_LISTENERS_INVALID_MESSAGE_STREAM,
                    NationalInstruments.HtmlVI.errorMessages.INVALID_UPDATE_MESSAGE_STREAM);
                throw new Error(errorMessage);
            }
        };

        NationalInstruments.HtmlVI.UpdateMessageDispatcher.prototype.sendMessageToListeners = function (updateMessage) {
            if (updateMessage instanceof NationalInstruments.HtmlVI.UpdateMessage) {
                return true;
            }

            var errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNABLE_TO_SEND_MESSAGES_TO_LISTENERS_INVALID_UPDATE_MESSAGE,
                updateMessage.getViName(), NationalInstruments.HtmlVI.errorMessages.INVALID_UPDATE_MESSAGE);
            throw new Error(errorMessage);
        };
    }
};

