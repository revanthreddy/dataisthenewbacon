//****************************************
// Tests for VisualComponentViewModel
// National Instruments Copyright 2014
//****************************************


describe('A VisualComponentViewModel', function () {
    'use strict';
    var viName = 'Function.gvi';
    var controlId = 'Function1';
    var frontPanelCanvas = document.createElement('section');
    var htmlTagCanvasId = 'FrontPanelCanvas';
    frontPanelCanvas.id = htmlTagCanvasId;
    if (document.body === null) {
        var body = document.createElement('body');
        document.body = body;
    }

    document.body.appendChild(frontPanelCanvas);
    var viModel = NationalInstruments.HtmlVI.viModelsService.getVI(viName);
    if (viModel === null) {
        viModel = NationalInstruments.HtmlVI.viModelsService.addVI(viName);
    }
    var frontPanelControls, textShimModel, textShimElement, settings;

    
    beforeEach(function () {
        var text = document.createElement('input');
        text.style.position = 'absolute';
        text.style.left = '272px';
        text.style.top = '64px';
        text.style.width = '23px';
        text.style.height = '16px';
        text.id = controlId;
        frontPanelCanvas.appendChild(text);
        settings = {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_TEXT,
            visible: true,
            text: 'Text',
            foreground: '#4D5359',
            fontSize: '12px',
            configuration: {
            }
        };
        
        // Shim out functions in an existing model to test CSS properties
        var orig = NationalInstruments.HtmlVI.VisualViewModel.prototype.modelPropertyChanged;
        
        NationalInstruments.HtmlVI.VisualViewModel.prototype.modelPropertyChanged = function(changes) {
            
            var viewConfig = orig.call(this, changes);
            
            var n = changes.length;
            for (var i = 0; i < n; i++) {
                switch (changes[i]) {
                    case 'text':
                        if(this.model.getText() === 'addClassAwesome') {
                            viewConfig.cssClasses.toAdd.push('awesome');
                        }
                        else if(this.model.getText() === 'removeClassAwesome') {
                            viewConfig.cssClasses.toRemove.push('awesome');
                        }
                        else if(this.model.getText() === 'wrongAddedClassType') {
                            viewConfig.cssClasses.toAdd.push(10);
                        }
                        else if(this.model.getText() === 'wrongRemovedClassType') {
                            viewConfig.cssClasses.toRemove.push(true);
                        }
                        else if(this.model.getText() === 'invalidStyle') {
                            viewConfig.cssStyles.awesomeMarginThatDoesNotExist = '10awesomepx';
                        }
                        else if(this.model.getText() === 'wrongAttributeType') {
                            viewConfig.attributes.awesomeattr = 9000;
                        }
                        break;
                    default:
                        break;
                }
            }
            
            return viewConfig;
        };
        
        spyOn(console, 'error');
    });

    it('prevents adding a control with the same id twice', function () {
        var addControlToPanel = function () {
            viModel.addFrontPanelControl(
            {
                id: controlId,
                kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_TEXT,
                visible: true,
                text: 'Text',
                foreground: '#4D5359',
                fontSize: '12px',
                configuration: {
                }
            });
        };
        
        // first call
        expect(addControlToPanel).not.toThrow();
        
        //second call
        // TODO should expect to throw after custom elements finished mraj
        console.error('Should expect to throw exception after custom elements fully implemented');
        expect(addControlToPanel).not.toThrow();
        
        viModel.removeFrontPanelControl(controlId);
    });
    
    it('allows to call the modelPropertyChanged method with a property update', function () {
        viModel.addFrontPanelControl(
        {
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_TEXT,
            visible: true,
            text: 'starting',
            foreground: '#4D5359',
            fontSize: '12px',
            configuration: {
            }
        });
        
        textShimElement = document.getElementById(controlId);
        frontPanelControls = viModel.getRootModelControls();
        textShimModel = frontPanelControls[controlId];
        expect(textShimModel).toBeDefined();
        var viewModel = viModel.findViewModel(controlId);
        expect(viewModel).toBeDefined();
        expect(textShimElement.classList.contains('awesome')).toEqual(false);
        
        textShimModel.updateModelFromDataSource({text: 'addClassAwesome'});
        Platform.performMicrotaskCheckpoint();
        expect(textShimElement.classList.contains('awesome')).toEqual(true);
        
        textShimModel.updateModelFromDataSource({text: 'removeClassAwesome'});
        Platform.performMicrotaskCheckpoint();
        expect(textShimElement.classList.contains('awesome')).toEqual(false);
        
        
        // TODO mraj The object observe polyfill captures and logs exceptions but browsers that actually implement Object observe will
        // actually throw exceptions see https://github.com/Polymer/observe-js/issues/72
        // and see https://code.google.com/p/chromium/issues/detail?id=335660
        textShimModel.updateModelFromDataSource({text: 'wrongAddedClassType'});
        Platform.performMicrotaskCheckpoint();
        expect(console.error).toHaveBeenCalled();
        
        textShimModel.updateModelFromDataSource({text: 'wrongRemovedClassType'});
        Platform.performMicrotaskCheckpoint();
        expect(console.error).toHaveBeenCalled();
        
        textShimModel.updateModelFromDataSource({text: 'invalidStyle'});
        Platform.performMicrotaskCheckpoint();
        expect(console.error).toHaveBeenCalled();
        
        textShimModel.updateModelFromDataSource({text: 'wrongAttributeType'});
        Platform.performMicrotaskCheckpoint();
        expect(console.error).toHaveBeenCalled();
        
        
        viModel.removeFrontPanelControl(controlId);
        // add check that it is gone
    });


});