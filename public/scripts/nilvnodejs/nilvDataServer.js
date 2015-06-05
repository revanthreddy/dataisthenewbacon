//*************************************************************
// nodeJS implementation of a data server that provides
// widget updates for a HTML vi
//*************************************************************
var ControlKindEnum = Object.freeze({
    NI_GAUGE: 'niGauge',
    NI_BOOLEAN_BUTTON: 'niBooleanButton',
    NI_CHART: 'niChart',
    NI_NUMERIC_TEXTBOX: 'niNumericTextBox',
    NI_SLIDER: 'niSlider'
});

//****************************************
// Update Message Class
//****************************************
var UpdateMessageTypeEnum = Object.freeze({
    PROPERTY_UPDATE: 'PROPERTY_UPDATE',
    VI_STATE_UPDATE: 'VI_STATE_UPDATE',
    EVENT_UPDATE: 'EVENT_UPDATE'
});

function UpdateMessage() {
    'use strict';
    // Properties
    this.messageType = undefined;
    this.viName = undefined;
    this.frontPanelControlId = undefined;
    this.frontPanelControlKind = undefined;
    this.data = null;

    // Methods
    if (typeof this.updateMessageMethods !== 'function') {
        UpdateMessage.prototype.updateMessageMethods = function () {
        };

        UpdateMessage.prototype.setMessageType = function (messageType) {
            this.messageType = messageType;
        };

        UpdateMessage.prototype.getMessageType = function () {
            return this.messageType;
        };

        UpdateMessage.prototype.setViName = function (viName) {
            this.viName = viName;
        };

        UpdateMessage.prototype.getViName = function () {
            return this.viName;
        };

        UpdateMessage.prototype.setFrontPanelControlId = function (frontPanelControlId) {
            this.frontPanelControlId = frontPanelControlId;
        };

        UpdateMessage.prototype.getFrontPanelControlId = function () {
            return this.frontPanelControlId;
        };

        UpdateMessage.prototype.setFrontPanelControlKind = function (frontPanelControlKind) {
            this.frontPanelControlKind = frontPanelControlKind;
        };

        UpdateMessage.prototype.getFrontPanelControlKind = function () {
            return this.frontPanelControlKind;
        };

        UpdateMessage.prototype.setData = function (data) {
            this.data = data;
        };

        UpdateMessage.prototype.getData = function () {
            return this.data;
        };

        UpdateMessage.prototype.initAsPropertyUpdateMessage = function (viName, frontPanelControlId, frontPanelControlKind, data) {
            this.messageType = UpdateMessageTypeEnum.PROPERTY_UPDATE;
            this.viName = viName;
            this.frontPanelControlId = frontPanelControlId;
            this.frontPanelControlKind = frontPanelControlKind;
            this.data = data;
        };

        UpdateMessage.prototype.initAsVIStateUpdateMessage = function (viName, data) {
            this.messageType = UpdateMessageTypeEnum.VI_STATE_UPDATE;
            this.viName = viName;
            this.frontPanelControlId = '';
            this.frontPanelControlKind = '';
            this.data = data;
        };

        UpdateMessage.prototype.initAsEventUpdateMessage = function (viName, frontPanelControlId, frontPanelControlKind, data) {
            this.messageType = UpdateMessageTypeEnum.EVENT_UPDATE;
            this.viName = viName;
            this.frontPanelControlId = frontPanelControlId;
            this.frontPanelControlKind = frontPanelControlKind;
            this.data = data;
        };

        UpdateMessage.prototype.printToConsole = function (space) {
            console.log(space + 'messageType: ' + this.getMessageType());
            console.log(space + 'viName: ' + this.getViName());
            console.log(space + 'frontPanelControlId: ' + this.getFrontPanelControlId());
            console.log(space + 'frontPanelControlKind: ' + this.getFrontPanelControlKind());
            console.log(space + 'data: ' + JSON.stringify(this.getData()));
        };
    }
}

//****************************************
// Update Message Stream
//****************************************
function UpdateMessageStream() {
    'use strict';
    // Properties
    this.updateMessages = new Array(0);

    // Methods
    if (typeof this.updateMessageStreamMethods !== 'function') {
        UpdateMessageStream.prototype.updateMessageStreamMethods = function () {
        };

        UpdateMessageStream.prototype.getMessages = function () {
            return this.updateMessages;
        };

        UpdateMessageStream.prototype.clear = function () {
            this.updateMessages.length = 0;
        };

        UpdateMessageStream.prototype.addPropertyUpdateMessage = function (viName, frontPanelControlId, frontPanelControlKind, data) {
            var updateMessage = new UpdateMessage();
            updateMessage.initAsPropertyUpdateMessage(viName, frontPanelControlId, frontPanelControlKind, data);
            this.updateMessages.push(updateMessage);
        };

        UpdateMessageStream.prototype.addVIStateUpdateMessage = function (viName, data) {
            var updateMessage = new UpdateMessage();
            updateMessage.initAsVIStateUpdateMessage(viName, data);
            this.updateMessages.push(updateMessage);
        };

        UpdateMessageStream.prototype.addEventUpdateMessage = function (viName, frontPanelControlId, frontPanelControlKind, data) {
            var updateMessage = new UpdateMessage();
            updateMessage.initAsEventUpdateMessage(viName, frontPanelControlId, frontPanelControlKind, data);
            this.updateMessages.push(updateMessage);
        };

        UpdateMessageStream.prototype.toJSON = function () {
            return JSON.stringify(this.updateMessages);
        };

        UpdateMessageStream.prototype.fromJSON = function (jsonValue) {
            this.updateMessages.length = 0;
            var updateMessagesData = JSON.parse(jsonValue);
            for (var index = 0; index < updateMessagesData.length; index++) {
                var updateMessage = new UpdateMessage();
                updateMessage.setViName(updateMessagesData[index].viName);
                updateMessage.setMessageType(updateMessagesData[index].messageType);
                updateMessage.setFrontPanelControlId(updateMessagesData[index].frontPanelControlId);
                updateMessage.setFrontPanelControlKind(updateMessagesData[index].frontPanelControlKind);
                updateMessage.setData(updateMessagesData[index].data);
                this.updateMessages.push(updateMessage);
            }
        };

        UpdateMessageStream.prototype.printToConsole = function (title, space) {
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

        UpdateMessageStream.prototype.processMessages = function (callback) {
            this.updateMessages.forEach(callback);
            this.updateMessages.length = 0;
        };
    }
}

//*************************************************************
// Timer class
//*************************************************************
function Timer(callback, interval) {
    'use strict';
    this.callback = callback;
    this.interval = interval;
    this.stopped = false;
    this.timerObject = null;

    // Methods
    if (typeof this.timerMethods !== 'function') {
        Timer.prototype.timerMethods = function () {
        };

        Timer.prototype.startTimer = function () {
            this.stopped = false;
            this.timerObject = setInterval(this.callback, this.interval);
        };

        Timer.prototype.stopTimer = function () {
            this.stopped = true;
            clearInterval(this.timerObject);
        };
    }
}

//*************************************************************
// Socket protocol implementation
//*************************************************************
var http = require('http');
var io = require('socket.io');

var viModels = [];
function Server(port) {
    'use strict';
    this.port = port;
    this.server = null;
    this.socket = null;
    this.socketConnectionStablished = false;
    this.timer = null;

    // Methods
    if (typeof this.serverMethods !== 'function') {
        Server.prototype.serverMethods = function () {
        };

        Server.prototype.connect = function (updateTimer) {
            var self = this;

            this.server = http.createServer(function (request, response) {
                // Send generic HTML headers and message
                request.writeHead(200, { 'Content-Type': 'text/html' });
                response.end('<h1>Hello there!</h1>');
            });
            this.server.listen(this.port);
            this.socket = io.listen(this.server);

            // Add a connect listener
            this.socket.on('connection', function (client) {
                console.log('Connection to client established.');

                self.socketConnectionStablished = true;
                self.timer = updateTimer;
                self.timer.startTimer();

                // Success!  Now listen to messages to be received
                client.on('message', function (event) {
                    var data = JSON.parse(event);
                    switch (data.operation) {
                        case 'REGISTER_VI_MODELS': {
                            viModels = data.array;
                            break;
                        }
                        case 'PROCESS_EVENTS': {
                            //var receivedDataEventStream = new DataEventStream();
                            //receivedDataEventStream.fromArray(data.array);
                            //receivedDataEventStream.printToConsole(receivedDataEventStream, "                              CLIENT ");
                            break;
                        }
                    }
                });

                client.on('disconnect', function () {
                    viModels.length = 0;
                    if (self.timer !== null) {
                        self.timer.stopTimer();
                    }
                    console.log('Client has disconnected.');
                });
            });
        };

        Server.prototype.sendMessageToClient = function (message) {
            if (this.socketConnectionStablished) {
                this.socket.send(message);
            }
        };
    }
}

//*************************************************************
// Message generation
//*************************************************************
var port = 1337;
var server = new Server(port);
var sendUpdateMessagesToClient = function () {
    'use strict';
    if (viModels.length > 0) {

        var getRandomIntValue = function (minimum, maximum) {
            var randomValue = Math.random() * (maximum - minimum + 1);
            randomValue = Math.floor(randomValue) + minimum;
            return randomValue;
        };

        // Process the VIs
        var updateMessageStream = new UpdateMessageStream();
        for (var viModelsIndex = 0; viModelsIndex < viModels.length; viModelsIndex++) {
            var viModel = viModels[viModelsIndex];
            // Process front panel controls
            var frontPanelControls = viModel.frontPanelControls;
            for (var fpcIndex = 0; fpcIndex < frontPanelControls.length; fpcIndex++) {
                // Generate update events for the controls
                var frontPanelControl = frontPanelControls[fpcIndex];
                var kind = frontPanelControl.kind;
                var id = frontPanelControl.id;
                switch (kind) {
                    case ControlKindEnum.NI_GAUGE:
                    case ControlKindEnum.NI_NUMERIC_TEXTBOX: {
                        var minimum = frontPanelControl.minimum;
                        var maximum = frontPanelControl.maximum;
                        var randomValue = getRandomIntValue(minimum, maximum);
                        updateMessageStream.addPropertyUpdateMessage(viModel.name, id, kind, { value: randomValue });
                        break;
                    }
                    case ControlKindEnum.NI_SLIDER: {
                        break;
                    }
                    case ControlKindEnum.NI_CHART: {
                        break;
                    }
                    case ControlKindEnum.NI_BOOLEAN_BUTTON: {
                        break;
                    }
                }
            }
        }

        var jsonValue = updateMessageStream.toJSON();
        //updateMessageStream.printToConsole('Updates to client', 'SERVER ');

        server.sendMessageToClient(jsonValue);
    }
};

var updateTimer = new Timer(sendUpdateMessagesToClient, 100);
server.connect(updateTimer);

console.log('Server running at http://127.0.0.1:' + port + '/');