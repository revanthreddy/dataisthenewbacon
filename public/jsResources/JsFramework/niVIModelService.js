//****************************************
// NI LabVIEW VI Model Service Singleton
// National Instruments Copyright 2014
//****************************************

//********************************************************
// Service that manages the VI Models for the application
//********************************************************
NationalInstruments.HtmlVI.viModelsService = (function () {
    'use strict';

    function VIModels() {
        // Properties
        this.viModels = [];

        // Prevent Closing on Constructor Properties
        // No constructor parameters
        
        // Methods
        if (typeof this.viModelsMethods !== 'function') {
            VIModels.prototype.viModelsMethods = function () {
            };

            VIModels.prototype.addVI = function (name) {
                for (var index = 0; index < this.viModels.length; index++) {
                    if (this.viModels[index].getName() === name) {
                        throw new Error('VI Model with name ' + name + ' already created'); // TODO mraj make exception
                    }
                }
                
                var viModel = new NationalInstruments.HtmlVI.VIModel(name);
                this.viModels.push(viModel);
                return viModel;
            };

            VIModels.prototype.removeVI = function (name) {
                for (var index = 0; index < this.viModels.length; index++) {
                    if (this.viModels[index].getName() === name) {
                        this.viModels.splice(index, 1);
                    }
                }
            };

            VIModels.prototype.getVI = function (name) {
                for (var index = 0; index < this.viModels.length; index++) {
                    if (this.viModels[index].getName() === name) {
                        return this.viModels[index];
                    }
                }
                return null;
            };

            VIModels.prototype.getVIModels = function () {
                return this.viModels;
            };

            VIModels.prototype.printToConsole = function (space) {
                console.log(space + '***************************************');
                console.log(space + 'VI Models (' + this.viModels.length + ')');
                console.log(space + '***************************************');
                for (var index = 0; index < this.viModels.length; index++) {
                    this.viModels[index].printToConsole(space);
                }
            };
        }
    }

    var viModels = new VIModels();

    var addVIFunction = function (name) {
        return viModels.addVI(name);
    };

    var removeVIFunction = function (name) {
        viModels.removeVI(name);
    };

    var getVIFunction = function (name) {
        return viModels.getVI(name);
    };

    var getVIModelsFunction = function () {
        return viModels.getVIModels();
    };

    var printToConsoleFunction = function (space) {
        viModels.printToConsole(space);
    };

    // Methods exported by the service
    return {
        addVI: addVIFunction,
        removeVI: removeVIFunction,
        getVI: getVIFunction,
        getVIModels: getVIModelsFunction,
        printToConsole: printToConsoleFunction
    };
})();