//**********************************************************
// Service that handles interaction with the LabVIEW Editor
// National Instruments Copyright 2014
//**********************************************************

NationalInstruments.HtmlVI.updateService = (function () {
    'use strict';

    function EditorUpdateMessageDispatcher (niVIModelsService) {
        // Properties
        NationalInstruments.HtmlVI.UpdateMessageDispatcher.call(this, niVIModelsService);
    }

    NationalInstruments.HtmlVI.inheritFromParent(EditorUpdateMessageDispatcher, NationalInstruments.HtmlVI.UpdateMessageDispatcher);

    EditorUpdateMessageDispatcher.prototype.sendMessageToListeners = function (updateMessage) {
        if (NationalInstruments.HtmlVI.UpdateMessageDispatcher.prototype.sendMessageToListeners(updateMessage)) {
            //TO_DO: 10/3/2014 Carlos Gonzalez. Send info back to LabVIEW NG Editor
            console.log('Sending message to LabVIEW Editor');
            updateMessage.printToConsole('');
        }
    };

    var editorUpdateMessageDispatcher = new EditorUpdateMessageDispatcher(NationalInstruments.HtmlVI.viModelsService);

    var dispatchMessagesToHTMLVIFunction = function (updateMessageStream) {
        editorUpdateMessageDispatcher.dispatchMessagesToHTMLVI(updateMessageStream);
    };

    var dispatchMessageToHTMLVIFunction = function (updateMessage) {
        editorUpdateMessageDispatcher.dispatchMessageToHTMLVI(updateMessage);
    };

    var sendMessagesToListenersFunction = function (updateMessageStream) {
        editorUpdateMessageDispatcher.sendMessagesToListeners(updateMessageStream);
    };

    var sendMessageToListenersFunction = function (updateMessage) {
        editorUpdateMessageDispatcher.sendMessageToListeners(updateMessage);
    };

    var startFunction = function () {
    };

    //*************************************************************
    //* Service creation
    //*************************************************************
    return {
        dispatchMessagesToHTMLVI: dispatchMessagesToHTMLVIFunction,
        dispatchMessageToHTMLVI: dispatchMessageToHTMLVIFunction,
        sendMessagesToListeners: sendMessagesToListenersFunction,
        sendMessageToListeners: sendMessageToListenersFunction,
        start: startFunction
    };
})();
