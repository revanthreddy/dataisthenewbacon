//**********************************************************
// Service that handles interaction with Vireo
// National Instruments Copyright 2014
//**********************************************************

NationalInstruments.HtmlVI.updateService = (function () {
    'use strict';

    function LocalUpdateMessageDispatcher (niVIModelsService) {
        // Properties
        NationalInstruments.HtmlVI.UpdateMessageDispatcher.call(this, niVIModelsService);

        // Prevent Closing on Constructor Properties
        niVIModelsService = undefined;

        // Methods
        if (typeof this.localUpdateMessageDispatcherMethods !== 'function') {
            LocalUpdateMessageDispatcher.prototype.localUpdateMessageDispatcherMethods = function () {
            };

            LocalUpdateMessageDispatcher.prototype.sendMessageToListeners = function (updateMessage) {
                if (NationalInstruments.HtmlVI.UpdateMessageDispatcher.prototype.sendMessageToListeners(updateMessage)) {
                    NationalInstruments.HtmlVI.niVireoRuntime.processUpdateMessage(updateMessage);
                }
            };
        }
    }

    NationalInstruments.HtmlVI.inheritFromParent(LocalUpdateMessageDispatcher, NationalInstruments.HtmlVI.UpdateMessageDispatcher);

    var localUpdateMessageDispatcher = new LocalUpdateMessageDispatcher(NationalInstruments.HtmlVI.viModelsService);

    //*************************************************************
    // Service creation
    //*************************************************************
    var dispatchMessagesToHTMLVIFunction = function (updateMessageStream) {
        localUpdateMessageDispatcher.dispatchMessagesToHTMLVI(updateMessageStream);
    };

    var dispatchMessageToHTMLVIFunction = function (updateMessage) {
        localUpdateMessageDispatcher.dispatchMessageToHTMLVI(updateMessage);
    };

    var sendMessagesToListenersFunction = function (updateMessageStream) {
        localUpdateMessageDispatcher.sendMessagesToListeners(updateMessageStream);
    };

    var sendMessageToListenersFunction = function (updateMessage) {
        localUpdateMessageDispatcher.sendMessageToListeners(updateMessage);
    };

    var startFunction = function () {
    };

    return {
        dispatchMessagesToHTMLVI: dispatchMessagesToHTMLVIFunction,
        dispatchMessageToHTMLVI: dispatchMessageToHTMLVIFunction,
        sendMessagesToListeners: sendMessagesToListenersFunction,
        sendMessageToListeners: sendMessageToListenersFunction,
        start: startFunction
    };
})();
