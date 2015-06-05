describe('Generated Html with a single button', function () {
    'use strict';

    // ******************************************
    // *** Section for front panel initialization
    // ******************************************

    var controlId = 'Function19';
    var frontPanelCanvas = document.createElement('section');
    var htmlTagCanvasId = 'FrontPanelCanvas';
    frontPanelCanvas.id = htmlTagCanvasId;
    if (document.body === null) {
        var body = document.createElement('body');
        document.body = body;
    }

    document.body.appendChild(frontPanelCanvas);

    var viName = 'Function.gvi';
    var viModel = NationalInstruments.HtmlVI.viModelsService.addVI(viName);
    var updateService = NationalInstruments.HtmlVI.updateService;

    var frontPanelControls, buttonModel, buttonElement, internalElement;

    beforeEach(function() {
        viModel.createElement(controlId, htmlTagCanvasId, 'ni-boolean-button',{
            id: controlId,
            kind: NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
            visible: true,
            configuration: {
            },
            left: '270px',
            top: '150px',
            width: '75px',
            height: '30px'
        });
        
        var button = document.getElementById(controlId);
        frontPanelCanvas.appendChild(button);
        frontPanelControls = viModel.getRootModelControls();

        // ButtonElement may have changed in addFrontPanelControl.
        buttonElement = document.getElementById(controlId);
        internalElement = buttonElement.firstElementChild;
        buttonModel = frontPanelControls[controlId];
    });

    it('injects a button element in the DOM', function() {
        expect(buttonElement).toExist();
        expect(internalElement).toHaveClass('jqx-button');
        viModel.removeFrontPanelControl(controlId);
    });

    it('configures the attributes of the button', function() {
        var style = buttonElement.style;
        expect(style.left).toBe('270px');
        expect(style.top).toBe('150px');
        expect(style.position).toBe('absolute');
        expect(style.width).toBe('75px');
        expect(style.height).toBe('30px'); 
        expect(buttonElement.id).toBe(controlId);
        viModel.removeFrontPanelControl(controlId);
    });

    it('adds the button model to the viModel', function() {
        expect(frontPanelControls[controlId]).toBeDefined();
        expect(buttonModel instanceof NationalInstruments.HtmlVI.BooleanButtonModel).toBe(true);
        viModel.removeFrontPanelControl(controlId);
    });

    it('updates only one property of the DOM element when one property of the model is updated', function() {
        var updateMessage = new NationalInstruments.HtmlVI.UpdateMessage();
        updateMessage.initAsPropertyUpdateMessage(viName, controlId,
                                                  NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
                                                  { left: '250px' });
        updateService.dispatchMessageToHTMLVI(updateMessage);
        var style = buttonElement.style;
        expect(style.left).toBe('250px');
        expect(style.top).toBe('150px');
        expect(style.width).toBe('75px');
        expect(style.height).toBe('30px');
        viModel.removeFrontPanelControl(controlId);
    });

    it('updates multiple properties of the DOM element when multiple properties of the model are updated', function() {
        var updateMessage = new NationalInstruments.HtmlVI.UpdateMessage();
        updateMessage.initAsPropertyUpdateMessage(viName, controlId,
                                                  NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
                                                  { left: '250px', top: '100px', width: '50px', height: '25px' });
        updateService.dispatchMessageToHTMLVI(updateMessage);
        var style = buttonElement.style;
        expect(style.left).toBe('250px');
        expect(style.top).toBe('100px');
        expect(style.width).toBe('50px');
        expect(style.height).toBe('25px');
        viModel.removeFrontPanelControl(controlId);
    });

    it('doesn\'t update a property with an invalid value', function() {
        var updateMessage = new NationalInstruments.HtmlVI.UpdateMessage();
        updateMessage.initAsPropertyUpdateMessage(viName, controlId,
                                                  NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
                                                  { left: 'not a valid value' });
        updateService.dispatchMessageToHTMLVI(updateMessage);
        var style = buttonElement.style;
        expect(style.left).toBe('270px');

        updateMessage.initAsPropertyUpdateMessage(viName, controlId,
                                                  NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
                                                  { left: {} });
        updateService.dispatchMessageToHTMLVI(updateMessage);
        expect(style.left).toBe('270px');

        updateMessage.initAsPropertyUpdateMessage(viName, controlId,
                                                  NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
                                                  { left: undefined });
        updateService.dispatchMessageToHTMLVI(updateMessage);
        expect(style.left).toBe('270px');

        updateMessage.initAsPropertyUpdateMessage(viName, controlId,
                                                  NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
                                                  { left: null });
        updateService.dispatchMessageToHTMLVI(updateMessage);
        expect(style.left).toBe('');

        updateMessage.initAsPropertyUpdateMessage(viName, controlId,
                                                  NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
                                                  { left: '250px' });
        updateService.dispatchMessageToHTMLVI(updateMessage);
        expect(style.left).toBe('250px');
        viModel.removeFrontPanelControl(controlId);
    });

    it('doesn\'t change anything when an invalid property is updated', function() {
        var updateMessage = new NationalInstruments.HtmlVI.UpdateMessage();
        updateMessage.initAsPropertyUpdateMessage(viName, controlId,
                                                  NationalInstruments.HtmlVI.ControlKindEnum.NI_BOOLEAN_BUTTON,
                                                  { notAValidProperty: '1px' });
        updateService.dispatchMessageToHTMLVI(updateMessage);
        var style = buttonElement.style;
        expect(style.left).toBe('270px');
        expect(style.top).toBe('150px');
        expect(style.position).toBe('absolute');
        expect(style.width).toBe('75px');
        expect(style.height).toBe('30px');
        expect(buttonElement.id).toBe(controlId);
        viModel.removeFrontPanelControl(controlId);
    });
});
