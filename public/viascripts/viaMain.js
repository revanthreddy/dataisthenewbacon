//***************************************
// Vireo Runtime Classes
// National Instruments Copyright 2014
//***************************************

//***************************************
// Vireoruntime Class
//***************************************
NationalInstruments.HtmlVI.VIRuntimeEnvironment = function () {
    'use strict';

    // Properties
    this.viToRun = null;
    // the Vireo Runtime 
    this.esh = {};
    // the state of Vireo Runtime
    this.vState = {};
    // the VIA which will be executed
    this.code = {};
    this.code.loaded = false;
    this.vireoModule = null;
    this.viaLocalName = null;


    // Methods
    if (typeof this.vireoMethods !== 'function') {
        var proto = NationalInstruments.HtmlVI.VIRuntimeEnvironment.prototype;
        proto.vireoMethods = function () {
        };

        proto.initializeDataItemBindingsInPanelVI = function () {
            var outputDataItem = NationalInstruments.HtmlVI.outputDataItem;
            var inputDataItem = NationalInstruments.HtmlVI.inputDataItem;
            var viModels = NationalInstruments.HtmlVI.viModelsService.getVIModels();
            // Process all the VI models
            for (var viModelsIndex = 0; viModelsIndex < viModels.length; viModelsIndex++) {
                var viModel = viModels[viModelsIndex];
                var frontPanelControls = viModel.getRootModelControls();
                // Process all the front panel controls for each VI model
                for (var id in frontPanelControls) {
                    if (frontPanelControls.hasOwnProperty(id)) {                      
                        var frontPanelControl = frontPanelControls[id];
                        if (frontPanelControl.isNested()) {
                            continue;
                        }
                        var bindingInfo = frontPanelControl.bindingInfo;
                        // Process all the binding info available for each front panel control
                        // Bindinginfo ={value : "27"} 

                        if (!bindingInfo) {
                            continue;
                        }

                        var sync = bindingInfo.sync;
                        if (sync) {
                            delete bindingInfo.sync;
                        }
                        for (var bindingKey in bindingInfo) {
                            if (bindingInfo.hasOwnProperty(bindingKey)) {
                                var dataItem = bindingInfo[bindingKey];
                                var runtimeName = 'di_' + dataItem;
                                var dataIO = '';
                                var datatype = 'Object';
                                // Figure out if the control is an input or/and an output
                                if (inputDataItem.hasOwnProperty(runtimeName)) {
                                    dataIO += 'I';
                                    datatype = inputDataItem[runtimeName];
                                }
                                if (outputDataItem.hasOwnProperty(runtimeName)) {
                                    dataIO += 'O';
                                    datatype = outputDataItem[runtimeName];
                                }
                                // Update dataItem properties with the new values
                                bindingInfo[bindingKey] = {};
                                bindingInfo[bindingKey].IO = dataIO;
                                bindingInfo[bindingKey].key = dataItem;
                                bindingInfo[bindingKey].sync = !!sync;
                                bindingInfo[bindingKey].runtimeName = runtimeName;
                                bindingInfo[bindingKey].type = datatype;
                            }
                        }
                    }
                }
            }
        };

        proto.peek = function (name, type) {
            var value = null;
            switch (type) {
                case 'String':
                    value = JSON.parse(this.esh.readJSON(this.viToRun, name));
                    break;
                case 'Number':
                    value = this.esh.readDouble(this.viToRun, name);
                    break;
                case 'Boolean':
                    value = this.esh.readJSON(this.viToRun, name);
                    if (value === 'f' || value === 'false')
                        value = false;
                    else
                        value = true;
                    break;
                case 'Array':
                    value = this.esh.readJSON(this.viToRun, name);
                    break;
                case 'Timestamp':
                    value = this.esh.readDouble(this.viToRun, name);
                    break;
                case 'Object':
                    value = JSON.parse(this.esh.readJSON(this.viToRun, name));
                    break;
                default:
                    var errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNKNOWN_TYPE, type);
                    throw new Error(errorMessage);
            }
            return value;
        };

        proto.poke = function (name, type, data) {
            switch (type) {
                case 'String':
                    this.esh.writeJSON(this.viToRun, name, JSON.stringify(data));
                    break;
                case 'Number':
                    this.esh.writeDouble(this.viToRun, name, data);
                    break;
                case 'Boolean':
                    this.esh.writeJSON(this.viToRun, name, JSON.stringify(data));
                    break;
                case 'Array':
                    this.esh.writeJSON(this.viToRun, name, JSON.stringify(data));
                    break;
                case 'Timestamp':
                    this.esh.writeDouble(this.viToRun, name, data);
                    break;
                case 'Object':
                    this.esh.writeJSON(this.viToRun, name, JSON.stringify(data));
                    break;
                default:
                    var errorMessage = NationalInstruments.HtmlVI.replaceStrings(NationalInstruments.HtmlVI.errorMessages.UNKNOWN_TYPE, type);
                    throw new Error(errorMessage);
            }
        };

        proto.processUpdateMessage = function (updateMessage) {
            var dataItems = null;
            var dataItem = null;
            var runtimeName = null;

            if (updateMessage.hasOwnProperty('bindingItem')) {
                dataItems = updateMessage.bindingItem;
                for (var changedProperty in dataItems) {
                    if (dataItems.hasOwnProperty(changedProperty)) {
                        dataItem = dataItems[changedProperty];
                        runtimeName = dataItem.runtimeName;
                        if (dataItem.hasOwnProperty('fieldName')) {
                            runtimeName = runtimeName + '.' + dataItem.fieldName;
                        }
                        if (dataItem.IO.indexOf('I') > -1) {
                            this.poke(runtimeName, dataItem.type, updateMessage.data[changedProperty]);
                        }
                    }
                }
            }
        };

        proto.initializeRuntimeInput = function () {
            var viModels = NationalInstruments.HtmlVI.viModelsService.getVIModels();
            // Process all the VI models
            for (var viModelsIndex = 0; viModelsIndex < viModels.length; viModelsIndex++) {
                var viModel = viModels[viModelsIndex];
                var frontPanelControls = viModel.getRootModelControls();
                // Process all the front panel controls for each VI model
                for (var id in frontPanelControls) {
                    if (frontPanelControls.hasOwnProperty(id)) {

                        var frontPanelControl = frontPanelControls[id];
                        var bindingInfo = frontPanelControl.bindingInfo;
                        bindingInfo = viModel.getCompleteBindingInfo(frontPanelControl, bindingInfo);
                       
                        for (var bindingProperty in bindingInfo) {
                            if (bindingInfo.hasOwnProperty(bindingProperty)) {
                                var dataItem = bindingInfo[bindingProperty];
                                var runtimeName = dataItem.runtimeName;
                                if (dataItem.hasOwnProperty('fieldName')) {
                                    runtimeName = runtimeName + '.' + dataItem.fieldName;
                                }
                                var inputData = frontPanelControl[bindingProperty];
                                if (inputData && dataItem.IO.indexOf('I') > -1) {
                                    this.poke(runtimeName, dataItem.type, inputData);
                                }
                            }
                        }
                    }
                }
            }
        };

        proto.VRun = function () {
            var that = this;
            if (!this.code.loaded) {
                $.ajax({
                    url: 'VIAcode.txt',
                    cache: false
                }).done(function (data) {
                    that.code.text = data;
                    that.code.loaded = true;
                    setTimeout(function () { that.VRun(); }, 150);
                });
                return false;
            }
            var vUserShell = this.vireoModule.core.v_userShell;
            if (vUserShell !== 0) {
                this.esh.reboot();
            }
            this.esh.loadVia(this.code.text);
            this.esh.execCount = 0;
            this.esh.startTime = Date.now();
            this.vState.value = 'started';
            this.initializeRuntimeInput();
            setTimeout(function () { that.vireoRunProc(); }, 0);
            setTimeout(function () { that.updateHTMLControls(); }, 0);
        };

        proto.vireoRunProc = function () {
            // Run a chunk of code. if there is more pending
            // Then restart soon, else restart when it makes sense.
            var that = this;
            if (this.esh.pause) {
                return;
            }
            that.updateUI('running');
            var x = this.esh.executeSlices(1000, -1);
            this.esh.execCount += 1;
            if (x > 0) {
                // periodically sleep for 50 ms or so.
                setTimeout(function () { that.vireoRunProc(); }, 0);
                this.updateHTMLControls();
            }
            else {
                this.updateHTMLControls();
                that.updateUI('finishedRunning');
                this.vState.value = 'done ' + this.esh.execCount + ' time ' + (Date.now() - this.esh.startTime);

                if (this.esh.repeat) {
                    setTimeout(function () { that.VRun(); }, 150);
                }
            }
        };

        proto.updateHTMLControls = function () {
            // loop all the indicators. We dont need to loop the controls in this function, because the controls will only be updated through user.
            // currently the viname of the VIA runtime doesnt equal to the Vi model name on panel
            var viModels = NationalInstruments.HtmlVI.viModelsService.getVIModels();
            // Process all the VI models
            for (var viModelsIndex = 0; viModelsIndex < viModels.length; viModelsIndex++) {
                var viModel = viModels[viModelsIndex];
                var frontPanelControls = viModel.getRootModelControls();
                // Process all the front panel controls for each VI model
                for (var id in frontPanelControls) {
                    if (frontPanelControls.hasOwnProperty(id)) {
                        var frontPanelControl = frontPanelControls[id];
                        if (frontPanelControl.isNested()) {
                            continue;
                        }
                        var bindingInfo = frontPanelControl.bindingInfo;
                        // Process all the binding info available for each front panel control

                        for (var bindingProperty in bindingInfo) {
                            if (bindingInfo.hasOwnProperty(bindingProperty)) {
                                if (bindingInfo.sync) {
                                    continue;
                                }

                                var dataItem = bindingInfo[bindingProperty];
                                var runtimeName = dataItem.runtimeName;
                                if (dataItem.IO.indexOf('O') > -1) {
                                    var messsageData = {};
                                    messsageData[bindingProperty] = this.peek(runtimeName, dataItem.type);
                                    var updateMessage = new NationalInstruments.HtmlVI.UpdateMessage();
                                    updateMessage.initAsPropertyUpdateMessage(viModel.getName(), frontPanelControl.getId(), frontPanelControl.getKind(), messsageData);
                                    NationalInstruments.HtmlVI.updateService.dispatchMessageToHTMLVI(updateMessage);
                                }
                            }
                        }
                    }
                }
            }
        };

        proto.findSyncHTMLControl = function (fpId) {
            // loop all the indicators. We dont need to loop the controls in this function, because the controls will only be updated through user.
            // currently the viname of the VIA runtime doesnt equal to the Vi model name on panel
            var viModels = NationalInstruments.HtmlVI.viModelsService.getVIModels();
            // Process all the VI models
            for (var viModelsIndex = 0; viModelsIndex < viModels.length; viModelsIndex++) {
                var viModel = viModels[viModelsIndex];
                var frontPanelControls = viModel.getRootModelControls();
                // Process all the front panel controls for each VI model
                for (var id in frontPanelControls) {
                    if (frontPanelControls.hasOwnProperty(id)) {
                        var frontPanelControl = frontPanelControls[id];
                        var bindingInfo = frontPanelControl.bindingInfo;
                        // Process all the binding info available for each front panel control
                        for (var bindingProperty in bindingInfo) {
                            if (bindingInfo.hasOwnProperty(bindingProperty)) {
                                var dataItem = bindingInfo[bindingProperty];
                                var key = dataItem.key;
                                var that = this;
                                if ((key == fpId) && (dataItem.sync)) {
                                    return function (dI, bindingProperty, viModel, frontPanelControl) {
                                        return function () {
                                            var runtimeName = dI.runtimeName; // "di_"+ 
                                            if (dI.IO.indexOf('O') > -1) {
                                                var messageData = {};
                                                messageData[bindingProperty] = that.peek(runtimeName, dI.type);
                                                var updateMessage = new NationalInstruments.HtmlVI.UpdateMessage();
                                                updateMessage.initAsPropertyUpdateMessage(viModel.getName(), frontPanelControl.getId(), frontPanelControl.getKind(), messageData);
                                                NationalInstruments.HtmlVI.updateService.dispatchMessageToHTMLVI(updateMessage);
                                            }
                                        }
                                    }(dataItem, bindingProperty, viModel, frontPanelControl);
                                }
                            }
                        }
                    }
                }
            }
        };

        proto.updateSyncHTMLControl = function (fpId) {
            if (!this.syncMethodsCache[fpId]) {
                this.syncMethodsCache[fpId] = this.findSyncHTMLControl(fpId);
            }

            if (this.syncMethodsCache[fpId]) {
                this.syncMethodsCache[fpId]();
            }
        };

        proto.initializeVireo = function () {
            // VIA code initialization
            this.esh.version = this.vireoModule.version;
            this.esh.loadVia = this.vireoModule.loadVia;
            this.esh.writeDouble = this.vireoModule.writeDouble;
            this.esh.readDouble = this.vireoModule.readDouble;
            this.esh.readJSON = this.vireoModule.readJSON;
            this.esh.writeJSON = this.vireoModule.writeJSON;
            this.esh.executeSlices = this.vireoModule.executeSlices;
            this.esh._delete = this.vireoModule.core.v_delete;
            this.esh.reboot = this.vireoModule.reboot;

            this.esh.repeat = false;
            this.esh.pause = false;
            console.log(this.esh);
            this.vireoModule.core.print = function (text) { console.log(text + '\n'); };
            var that = this;
            this.syncMethodsCache = [];
            this.vireoModule.core.fpSync = function (fpId) {
                //console.log("***fpSync() Called***");
                that.updateSyncHTMLControl(fpId);
            };
            var foreignFunctions = NationalInstruments.HtmlVI.FFI;
            if (foreignFunctions) {
                for (var key in foreignFunctions) {
                    if (foreignFunctions.hasOwnProperty(key)) {
                        this.vireoModule[key] = foreignFunctions[key];
                    }
                }
            }
        };

        proto.updateUI = function (event) {
            switch (event) {
                case 'running':
                    console.log('vireoRunProc');
                    $('#statusMessage').text('Running');
                    break;
                case 'finishedRunning':
                    $('#statusMessage').text('Running Finished. ');
                    setTimeout(function () { $('#statusMessage').text('Ready for run.'); }, 500);
                    break;
                default:
                    $('#statusMessage').text('Ready');
            }
        };

        proto.main = function () {
            var that = this;
            $(document).ready(function () {
                var addGo = '<button id = \'goButton\' type =\'button\' style=\'position: relative; top: 10px; left: 10px; width: 80px; height: 30px; margin-right: 30px; background-color: #53a93f;\'>GO</button>';
                var addShow = '<button id = \'showButton\' type =\'button\' style=\'position: relative; top: 10px; left: 20px; width: 100px; height: 30px; background-color: #009afd;\'>Show</button>';
                var addStatus = '<p id = \'status\' style=\'display:inline; position: relative; top: 10px; left: 100px; width: 60px; height: 30px; \'> Status: <span id="statusMessage" style=\'color: #dd4b39\'>FrontPanel Canvas</span></p>';

                $('body').append(addGo);
                $('body').append(addShow);
                $('body').append(addStatus);

                that.viToRun = NationalInstruments.HtmlVI.viName;
                that.vireoModule = NationalInstruments.Vireo;
                that.viaLocalName = NationalInstruments.HtmlVI.VIAlocalName;

                that.initializeVireo();
                that.initializeDataItemBindingsInPanelVI();
                NationalInstruments.HtmlVI.updateService.start();
                $('#showButton').click(function () {

                    if ($('#backend').length === 0) {
                        $('body').append('<div id="backend"></div>');
                        $('body').append(viaText);
                        var viaText = '<textarea id="viaCanvas" style="display: inline;  margin-left: 10px;margin-top: 30px; width: 700px; height : 800px; border: 2px solid #ebebeb"></textarea>';
                        var viaInfo = '<textarea id="viaInfo" style="display: inline;  margin-left: 10px;margin-top: 30px; width: 700px; height : 800px; border: 2px solid #ebebeb"></textarea>';

                        $('#backend').append(viaText);
                        $('#backend').append(viaInfo);

                        $('#backend').hide();
                        $('#viaCanvas').bind('input', function () {
                            that.code.text = $(this).val();
                            console.log(that.code.text);

                        });
                    }
                    $.ajax({ url: 'VIAInfo.js' }).done(function (data) {
                        $('#viaInfo').text(data);
                    });
                    if (!that.code.loaded) {
                        $.ajax({
                            url: 'VIAcode.txt',
                            cache: false
                        }).done(function (data) {
                            that.code.text = data;
                            that.code.loaded = true;
                            $('#viaCanvas').text(data);
                        });
                    } else {
                        $('#viaCanvas').text(that.code.text);
                    }
                    $('#FrontPanelCanvas').toggle();
                    $('#backend').toggle();
                    if (($('#backend').css("display") !== "none")) {
                        $('#statusMessage').text('VIA code & Info');
                    }
                    else {
                        $('#statusMessage').text('FrontPanel Canvas');
                    }

                });
                $('#goButton').click(function () {
                    that.VRun();
                });
                $('#goButton').mousedown(function () {
                    $('#statusMessage').text('Strat running!');
                });

            });
        };
    }
}; // end of class declaration

NationalInstruments.HtmlVI.niVireoRuntime = (function () {
    'use strict';

    //*************************************************************
    // Service creation
    //*************************************************************
    var vireoInstance = new NationalInstruments.HtmlVI.VIRuntimeEnvironment();

    var mainFunction = function () {
        vireoInstance.main();
    };

    var processUpdateMessageFunction = function (updateMessage) {
        vireoInstance.processUpdateMessage(updateMessage);
    };

    return {
        instance: vireoInstance,
        main: mainFunction,
        processUpdateMessage: processUpdateMessageFunction
    };
})();