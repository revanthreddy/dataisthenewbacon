//**********************************************************
// Service that handles interaction with a Remote source
// National Instruments Copyright 2015
//**********************************************************

NationalInstruments.HtmlVI.updateService = (function () {
    'use strict';

    function RemoteUpdateMessageDispatcher(niVIModelsService) {

        // Properties
        NationalInstruments.HtmlVI.UpdateMessageDispatcher.call(this, niVIModelsService);
        this.socket = null;
        this.socketConnected = false;
        this.blocked = false;
        this.retryConnection = true;
        this.viStatus = 0;

        this.preferredVersion = {
            majorVersion: 0,
            minorVersion: 1,
            patchVersion: 0,
            preReleaseVersion: 'preAlpha',
            versionMetadata: 'testMetadata'
        };

        this.serverVersion = {};

        // Uses strings because statuses are sent as strings
        var viStatuses = Object.freeze({
            'stopped':1,
            'running':2,
            'paused':3,
            'error':4
        });

        // Prevent Closing on Constructor Properties
        niVIModelsService = undefined;

        // Methods
        if (typeof this.remoteUpdateMessageDispatcherMethods !== 'function') {
            RemoteUpdateMessageDispatcher.prototype.remoteUpdateMessageDispatcherMethods = function () {
            };

            RemoteUpdateMessageDispatcher.prototype.sendMessageToListeners = function (updateMessage) {
                if (NationalInstruments.HtmlVI.UpdateMessageDispatcher.prototype.sendMessageToListeners(updateMessage)) {
                    //TO_DO: 10/14/2014 Carlos Gonzalez. Send info back to Vireo
                    console.log('Sending message back to Vireo');
                    updateMessage.printToConsole('');
                }
            };

            RemoteUpdateMessageDispatcher.prototype.sendMessageToServer = function (message) {
                if (this.socketConnected) {
                    this.socket.send(message);
                }
                else {
                    console.log('Unable to send message(' + message + '). Socket is not connected.');
                }
            };

            RemoteUpdateMessageDispatcher.prototype.connectToServer = function (ipAddress, port, viModels) {
                var that = this;

                // viModels is not used YET
                viModels = null;

                this.socket = new WebSocket('ws://' + ipAddress + ':' + port);

                this.socket.addEventListener('open', function () {
                    that.socketConnected = true;
                    that.enablePanel();
                    that.sendHandshake();
                });

                this.socket.addEventListener('message', function (event) {
                    var messageObject;
                    try {
                        messageObject = JSON.parse(event.data);
                    } catch(err) {
                        console.log('Error parsing message: ' + err.message);
                    }
                    if (typeof messageObject === 'object') {
                        switch (messageObject.messageType) {
                            case NationalInstruments.HtmlVI.UpdateMessageTypeEnum.VERSION_MESSAGE:
                                that.processVersionMessage(messageObject);
                                break;
                            case NationalInstruments.HtmlVI.UpdateMessageTypeEnum.PROPERTY_UPDATE:
                                that.processPropertyUpdate(messageObject);
                                break;
                            case NationalInstruments.HtmlVI.UpdateMessageTypeEnum.VI_STATE_UPDATE:
                                that.processStatusUpdate(messageObject);
                                break;
                            default:
                                // Ignore message types that the client does not support
                                console.log('Unsupported MethodId: ' + messageObject.messageType);
                                break;
                        }
                    }
                });

                this.socket.addEventListener('close', function () {
                    that.socketConnected = false;
                    if (that.retryConnection === true) {
                        that.disablePanel(NationalInstruments.HtmlVI.errorMessages, true);
                        setTimeout(that.connectToServer.bind(that), 1000);
                    }
                });

                this.socket.addEventListener('error', function (event) {
                    console.log(event.data);
                });

                return this.socket;
            };

            RemoteUpdateMessageDispatcher.prototype.sendHandshake = function() {
                var versionMessage = {};
                versionMessage.messageType = NationalInstruments.HtmlVI.UpdateMessageTypeEnum.VERSION_MESSAGE;
                versionMessage.version = this.preferredVersion;
                this.socket.send(JSON.stringify(versionMessage));
            };

            RemoteUpdateMessageDispatcher.prototype.processVersionMessage = function (versionMessage) {
                this.serverVersion = versionMessage.version;
                if (this.preferredVersion.majorVersion !== this.serverVersion.majorVersion) {
                    this.closeConnection(NationalInstruments.HtmlVI.errorMessages.PROTOCOL_VERSION_ERROR, false, false);
                }
            };

            RemoteUpdateMessageDispatcher.prototype.processPropertyUpdate = function (message) {
                for (var key in message.data) {
                    if (message.data.hasOwnProperty(key)) {
                        var valueObject = JSON.parse(message.data[key]);
                        message.data[key] = valueObject;
                    }
                }

                // Log the message for unit test that verifies the correct message is processed
                console.log(JSON.stringify(message));

                var receivedUpdateMessageStream = new NationalInstruments.HtmlVI.UpdateMessageStream();
                receivedUpdateMessageStream.addPropertyUpdateMessage(message.viName, message.controlId, message.controlKind, message.data);
                this.dispatchMessagesToHTMLVI(receivedUpdateMessageStream);
            };

            RemoteUpdateMessageDispatcher.prototype.processStatusUpdate = function (message) {
                this.viStatus = viStatuses[message.data.status];
                switch (this.viStatus) {
                    case viStatuses.running:
                        if (this.blocked === true) {
                            this.enablePanel();
                        }
                        break;
                    case viStatuses.stopped:
                        this.disablePanel(NationalInstruments.HtmlVI.errorMessages.VI_STOPPED, true);
                        break;
                    case viStatuses.paused:
                        this.disablePanel(NationalInstruments.HtmlVI.errorMessages.VI_PAUSED, true);
                        break;
                    case viStatuses.error:
                        if (typeof message.ErrorMessage === 'string') {
                            this.disablePanel(NationalInstruments.HtmlVI.errorMessages.VI_ERROR +' : ' + message.errorMessage, true);
                        } else {
                            this.disablePanel(NationalInstruments.HtmlVI.errorMessages.VI_ERROR, true);
                        }
                        break;
                    default:
                        // Ignore VI statuses that the client does not support
                        console.log('Unsupported VI status: ' + message.status);
                        return;
                }

                var receivedUpdateMessageStream = new NationalInstruments.HtmlVI.UpdateMessageStream();
                receivedUpdateMessageStream.addVIStateUpdateMessage(message.viName, message.data);
                this.dispatchMessagesToHTMLVI(receivedUpdateMessageStream);
            };

            RemoteUpdateMessageDispatcher.prototype.disablePanel = function (blockedText, waitCursor) {
                if (this.blocked === false) {
                    $.blockUI({ message: blockedText,
                               css: {
                                   border: 'none',
                                   padding: '15px',
                                   backgroundColor: '#000',
                                   '-webkit-border-radius': '10px',
                                   '-moz-border-radius': '10px',
                                   opacity: 0.5,
                                   color: '#fff',
                                   cursor: waitCursor ? 'wait' : 'default'
                               }
                              });
                }

                this.blocked = true;
            };

            RemoteUpdateMessageDispatcher.prototype.enablePanel = function () {
                $.unblockUI();
                this.blocked = false;
            };

            RemoteUpdateMessageDispatcher.prototype.closeConnection = function (disconnectMessage, retry, waitCursor) {
                this.retryConnection = retry;
                this.disablePanel(disconnectMessage, waitCursor);
                this.socket.close();
                this.socket = null;
            };

            RemoteUpdateMessageDispatcher.prototype.generateVIModelsForServer = function () {
                // Process the VIs
                var viModelsOutput = [];
                var viModels = this.viModelsService.getVIModels();
                for (var viModelsIndex = 0; viModelsIndex < viModels.length; viModelsIndex++) {
                    var viModel = viModels[viModelsIndex];
                    var viModelOutput = { name: viModel.getName(), frontPanelControls: [] };
                    // Process front panel controls
                    var frontPanelControls = viModel.getRootModelControls();
                    for (var id in frontPanelControls) {
                        if (frontPanelControls.hasOwnProperty(id)) {
                            // Generate update events for the controls
                            var frontPanelControl = frontPanelControls[id];
                            var kind = frontPanelControl.getKind();
                            var frontPanelControlOutput = {};
                            frontPanelControlOutput.id = id;
                            frontPanelControlOutput.kind = kind;
                            switch (kind) {
                                case NationalInstruments.HtmlVI.ControlKindEnum.NI_GAUGE:
                                case NationalInstruments.HtmlVI.ControlKindEnum.NI_NUMERIC_TEXTBOX: {
                                    frontPanelControlOutput.minimum = frontPanelControl.getMinimum();
                                    frontPanelControlOutput.maximum = frontPanelControl.getMaximum();
                                    break;
                                }
                                case NationalInstruments.HtmlVI.ControlKindEnum.NI_SLIDER: {
                                    break;
                                }
                                case NationalInstruments.HtmlVI.ControlKindEnum.NI_CHART: {
                                    break;
                                }
                                case NationalInstruments.HtmlVI.ControlKindEnum.NI_CARTESIAN_GRAPH: {
                                    //frontPanelControlOutput.value = frontPanelControl.getValue();
                                    break;
                                }
                                case NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON: {
                                    break;
                                }
                            }

                            viModelOutput.frontPanelControls.push(frontPanelControlOutput);
                        }
                    }

                    viModelsOutput.push(viModelOutput);
                }

                return viModelsOutput;
            };
        }
    }

    NationalInstruments.HtmlVI.inheritFromParent(RemoteUpdateMessageDispatcher, NationalInstruments.HtmlVI.UpdateMessageDispatcher);

    //*************************************************************
    // Service creation
    //*************************************************************
    var remoteUpdateMessageDispatcher = new RemoteUpdateMessageDispatcher(NationalInstruments.HtmlVI.viModelsService);

    var dispatchMessagesToHTMLVIFunction = function (updateMessageStream) {
        remoteUpdateMessageDispatcher.dispatchMessagesToHTMLVI(updateMessageStream);
    };

    var dispatchMessageToHTMLVIFunction = function (updateMessage) {
        remoteUpdateMessageDispatcher.dispatchMessageToHTMLVI(updateMessage);
    };

    var sendMessagesToListenersFunction = function (updateMessageStream) {
        remoteUpdateMessageDispatcher.sendMessagesToListeners(updateMessageStream);
    };

    var sendMessageToListenersFunction = function (updateMessage) {
        remoteUpdateMessageDispatcher.sendMessageToListeners(updateMessage);
    };

    var sendMessageToServerFunction = function (message) {
        remoteUpdateMessageDispatcher.sendMessageToServer(message);
    };

    var startFunction = function (ipAddress, port) {
        var viModels = remoteUpdateMessageDispatcher.generateVIModelsForServer();
        remoteUpdateMessageDispatcher.disablePanel(NationalInstruments.HtmlVI.errorMessages.CONNECTING);
        return remoteUpdateMessageDispatcher.connectToServer(ipAddress, port, viModels);
    };

    var closeFunction = function (disconnectMessage, retry, waitCursor) {
        remoteUpdateMessageDispatcher.closeConnection(disconnectMessage, retry, waitCursor);
    };

    //*************************************************************
    // Properties
    //*************************************************************
    var getBlockedFunction = function () {
        return remoteUpdateMessageDispatcher.blocked;
    };

    return {
        dispatchMessagesToHTMLVI: dispatchMessagesToHTMLVIFunction,
        dispatchMessageToHTMLVI: dispatchMessageToHTMLVIFunction,
        sendMessagesToListeners: sendMessagesToListenersFunction,
        sendMessageToListeners: sendMessageToListenersFunction,
        sendMessageToServer: sendMessageToServerFunction,
        start: startFunction,
        close: closeFunction,
        getBlocked: getBlockedFunction
    };
})();
