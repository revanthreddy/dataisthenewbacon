//****************************************
// Tests for niSupport file
// National Instruments Copyright 2014
//****************************************

describe('The niSupport', function () {
    'use strict';
    var result;
    // -------------------------------------------------
    // Testing functions
    // -------------------------------------------------
    it('has a ControlKindEnum object', function () {
        expect(NationalInstruments.HtmlVI.ControlKindEnum).toBeDefined();
    });

    it('has a replaceStrings function', function () {
        expect(NationalInstruments.HtmlVI.replaceStrings).toBeDefined();
    });

    it('allows to call the replaceStrings function with zero arguments', function () {
        result = NationalInstruments.HtmlVI.replaceStrings();
        expect(result).toEqual('');
    });

    it('allows to call the replaceStrings function with one argument', function () {
        result = NationalInstruments.HtmlVI.replaceStrings('one');
        expect(result).toEqual('one');
    });

    it('allows to call the replaceStrings function with more than one argument', function () {
        result = NationalInstruments.HtmlVI.replaceStrings('%1','one');
        expect(result).toEqual('one');
    });
});