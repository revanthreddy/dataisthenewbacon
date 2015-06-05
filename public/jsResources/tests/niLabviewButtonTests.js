/* global describe, beforeEach, inject, it, expect */

'use strict';

describe('niLabviewButton directive', function() {
    var element;
    var scope;

    beforeEach(function() {
// ARRANGE
        // Load each module required for the tests. Loading the niLabviewApp module will
        // also load its dependencies listed in the niLabviewApp.js file.
        module('niLabviewApp');
        module('niLabviewDataServiceModule');
        module('niLabviewButtonModule');
        module('singleButtonControlModelsModule');

        inject(function($compile, $rootScope) {
            // This is from the html generated when a button is dropped on the canvas
            var buttonHtml = '<nilv-Button id=\'buttonFunction19\' label=\'Button\'>' +
                                 '<label id=\'lFunction19\' style=\'position: absolute; top: 178px; left: 624px\'>{{label}}</label>' +
                                 '<input id=\'buttonFunction19Control\' type=\'button\' readonly=true value=\'Button\' style=\'position: absolute; top: 198px; left: 624px; width: 75px; height: 30px\'>' +
                             '</nilv-Button>';

            // Create a new child scope of the root scope
            scope = $rootScope.$new();

// ACT
            // Compile the html string and link it with the current scope
            element = $compile(buttonHtml)(scope);
        });
    });

    it('instantiates and initializes a button', function() {
// ASSERT
        // Verify the button exists and has the correct class.
        expect(element.attr('class')).toEqual('ng-scope');

        // Verify the label exists and has correct text
        expect(element.attr('label')).toEqual('Button');

        // Verify the input exists
        expect(element.attr('input')).not.toBe(null);
    });
});