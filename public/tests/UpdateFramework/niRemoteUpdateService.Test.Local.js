//******************************************
// Tests for the RemoteUpdateService
// National Instruments Copyright 2015
//******************************************

describe('The RemoteUpdateService', function () {
    'use strict';

    var updateService = NationalInstruments.HtmlVI.updateService;
    var updateMessageTypeEnum = NationalInstruments.HtmlVI.UpdateMessageTypeEnum;
    var socket = null;
    var viName = 'myTest.vi';

    beforeEach(function (done) {
        socket = updateService.start('localhost', 8181, done);

        var listener = function () {
            done();
            socket.removeEventListener('message', listener);
        };

        // Wait until the handshake message has been received
        socket.addEventListener('message', listener);

        var fakeGetVI = function () {
            var viModel = new NationalInstruments.HtmlVI.VIModel();
            viModel.setName(viName);
            viModel.processUpdateMessage = function () {};
            return viModel;
        };

        this.realViModelsService = NationalInstruments.HtmlVI.viModelsService;
        this.realGetVI = NationalInstruments.HtmlVI.viModelsService.getVI;
        NationalInstruments.HtmlVI.viModelsService.getVI = fakeGetVI;
    });

    afterEach(function (done) {
        NationalInstruments.HtmlVI.viModelsService = this.realViModelsService;
        NationalInstruments.HtmlVI.viModelsService.getVI = this.realGetVI;

        if (socket.readyState === socket.OPEN) {
            socket.addEventListener('close', function () {
                done();
            });

            updateService.close('Connection closed', false, false);
        } else {
            done();
        }
    });

    it('connects to a WebSocket server', function () {
        expect(socket.readyState).toEqual(socket.OPEN);
    });

    describe('receives a version message with an incompatible major version', function () {
        afterEach(function () {
            expect(socket.readyState).toEqual(socket.CLOSED);
        });


        it('and closes the connection', function (done) {
            var preferredVersion = {
                majorVersion: 42,
                minorVersion: 1,
                patchVersion: 0,
                preReleaseVersion: 'preAlpha',
                versionMetadata: 'testMetadata'
            };

            var versionMessage = {};
            versionMessage.messageType = updateMessageTypeEnum.VERSION_MESSAGE;
            versionMessage.version = preferredVersion;

            socket.addEventListener('close', function () {
                done();
            });

            updateService.sendMessageToServer(JSON.stringify(versionMessage));
        });
    });

    describe('receives a status update message', function () {
        afterEach(function () {
            expect(updateService.getBlocked()).toBe(true);
        });

        it('that indicates the VI is stopped and blocks the UI', function (done) {
            var statusMessage = {
                messageType: updateMessageTypeEnum.VI_STATE_UPDATE,
                data: {
                    status: 'stopped'
                }
            };

            socket.addEventListener('message', function () {
                done();
            });

            updateService.sendMessageToServer(JSON.stringify(statusMessage));
        });

        it('that indicates the VI is paused and blocks the UI', function (done) {
            var statusMessage = {
                messageType: updateMessageTypeEnum.VI_STATE_UPDATE,
                data: {
                    status: 'paused'
                }
            };

            socket.addEventListener('message', function () {
                done();
            });

            updateService.sendMessageToServer(JSON.stringify(statusMessage));
        });

        it('that indicates the VI has an error with a message and blocks the UI', function (done) {
            var statusMessage = {
                messageType: updateMessageTypeEnum.VI_STATE_UPDATE,
                errorMessage: 'This is an error message',
                data: {
                    status: 'error',
                }
            };

            socket.addEventListener('message', function () {
                done();
            });

            updateService.sendMessageToServer(JSON.stringify(statusMessage));
        });

        it('that indicates the VI has an error without a message and blocks the UI', function (done) {
            var statusMessage = {
                messageType: updateMessageTypeEnum.VI_STATE_UPDATE,
                data: {
                    status: 'error'
                }
            };

            socket.addEventListener('message', function () {
                done();
            });

            updateService.sendMessageToServer(JSON.stringify(statusMessage));
        });
    });

    describe('receives a status update message', function () {
        afterEach(function () {
            expect(updateService.getBlocked()).toBe(false);
        });

        it('that indicates the VI is running and unblocks the UI', function (done) {
            var statusMessage = {
                messageType: updateMessageTypeEnum.VI_STATE_UPDATE,
                data: {
                    status: 'running'
                }
            };

            socket.addEventListener('message', function () {
                done();
            });

            updateService.sendMessageToServer(JSON.stringify(statusMessage));
        });

        it('with an invalid status', function (done) {
            var statusMessage = {
                messageType: updateMessageTypeEnum.VI_STATE_UPDATE,
                data: {
                    status: 'invalid'
                }
            };

            socket.addEventListener('message', function () {
                done();
            });

            updateService.sendMessageToServer(JSON.stringify(statusMessage));
        });
    });

    describe('receives a running status update when the UI is blocked', function () {
        beforeEach(function(done) {
            var stoppedStatusMessage = {
                messageType: updateMessageTypeEnum.VI_STATE_UPDATE,
                data: {
                    status: 'stopped'
                }
            };

            socket.addEventListener('message', function () {
                done();
            });

            updateService.sendMessageToServer(JSON.stringify(stoppedStatusMessage));
        });

        afterEach(function() {
            expect(updateService.getBlocked()).toBe(false);
        });

        it('and it unblocks the UI', function (done) {
            var runningStatusMessage = {
                messageType: updateMessageTypeEnum.VI_STATE_UPDATE,
                data: {
                    status: 'running'
                }
            };

            socket.addEventListener('message', function () {
                done();
            });

            updateService.sendMessageToServer(JSON.stringify(runningStatusMessage));
        });
    });

    describe('receives a property update message', function() {
        beforeEach(function () {
            var frontPanelControlId = 'id109';
            var frontPanelControlKind = NationalInstruments.HtmlVI.ControlKindEnum.NI_GAUGE;
            var data = {
                value: 1
            };

            this.expectedMessage = {
                messageType: updateMessageTypeEnum.PROPERTY_UPDATE,
                viName: viName,
                frontPanelControlId: frontPanelControlId,
                frontPanelControlKind: frontPanelControlKind,
                data: data
            };

            this.updateMessage = new NationalInstruments.HtmlVI.UpdateMessage();
            this.updateMessage.initAsPropertyUpdateMessage(viName, frontPanelControlId, frontPanelControlKind, data);

            spyOn(console, 'log');
        });

        afterEach(function () {
            expect(console.log).toHaveBeenCalledWith(JSON.stringify(this.expectedMessage));
        });

        it('and applies the property update', function (done) {
            socket.addEventListener('message', function () {
                done();
            });

            updateService.sendMessageToServer(JSON.stringify(this.updateMessage));
        });
    });
});
