//******************************************
// Tests for VI model service class
// National Instruments Copyright 2014
//******************************************

describe('A viModelsService', function () {
    'use strict';
    var viModelsService;
    var viName = 'viName';

    beforeEach(function () {
        viModelsService = NationalInstruments.HtmlVI.viModelsService;
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------
    it('is defined', function () {
        expect(viModelsService).toBeDefined();
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the addVI method', function () {
        viModelsService.addVI(viName);
        var viModel = viModelsService.getVI(viName);
        expect(viModel.getName()).toEqual(viName);
    });

    it('allows to call the removeVI method', function () {
        viModelsService.removeVI(viName);
        var viModel = viModelsService.getVI(viName);
        expect(viModel).toEqual(null);
    });

    it('allows to call the getVI method', function () {
        viModelsService.addVI(viName);
        var viModel = viModelsService.getVI(viName);
        expect(viModel.getName()).toEqual(viName);
    });

    it('allows to call the getVIModels method', function () {
        var viModels = viModelsService.getVIModels();
        expect(viModels.length).toBeGreaterThan(0);
    });

    it('allows to call the printToConsole method', function () {
        spyOn(console, 'log');
        viModelsService.printToConsole('');
        expect(console.log).toHaveBeenCalledWith('name: ' + viName);
    });
});

