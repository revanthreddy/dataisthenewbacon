//****************************************
// Localization strings
// National Instruments Copyright 2014
//****************************************

NationalInstruments.HtmlVI.errorMessages = {
    INDEX_OUT_OF_RANGE : 'Index(%1) out of range(0..%2).',
    FRONT_PANEL_CONTROL_MISTMATCH : 'Front panel control(%1) with type(%2) in HTML VI does not match the required type(%3).',
    FRONT_PANEL_CONTROL_NOT_FOUND : 'Unable to find front panel control(%1) with type(%2) in HTML VI.',
    UNABLE_TO_ADD_FRONT_PANEL_CONTROL_AS_ID_ALREADY_EXISTS : 'Unable to add front panel control with id %1 as a control with this id already exists.',
    UNABLE_TO_ADD_FRONT_PANEL_CONTROL_TO_VI_MODEL_UNKNOWN_TYPE : 'Unable to add front panel control(%1) to HTML VI. The type(%2) was not recognized by the framework.',
    UNABLE_TO_PROCESS_UPDATE_MESSAGE_UNKNOWN_TYPE: 'Unable to process update message for HTML VI. Message type(%1), is not recognized by the framework.',
    UNKNOWN_NAME : 'Unknown',
    INVALID_VI_MODEL : 'The object is not a valid HTML VI',
    INVALID_UPDATE_MESSAGE : 'The object is not a valid update message',
    INVALID_UPDATE_MESSAGE_STREAM : 'The object is not a valid update message stream',
    INVALID_VI_MODEL_SERVICE : 'The object is not a valid HTML VI service',
    UNABLE_TO_DISPATCH_MESSAGES_INVALID_MESSAGE_STREAM: 'Unable to dispatch messages to HTML VIs. %1.',
    UNABLE_TO_DISPATCH_MESSAGES_INVALID_UPDATE_MESSAGE: 'Unable to dispatch update message to HTML VI(%1). %2.',
    UNABLE_TO_SEND_MESSAGES_TO_LISTENERS_INVALID_MESSAGE_STREAM : 'Unable to send messages to listeners from HTML VI. %1.',
    UNABLE_TO_SEND_MESSAGES_TO_LISTENERS_INVALID_UPDATE_MESSAGE: 'Unable to send message to listeners from HTML VI(%1). %2.',
    UNABLE_TO_CREATE_CONTROL: 'Unable to create front panel control(%1) with type (%2). Verify that is supported by the framework.',
    UNKNOWN_TYPE : 'Unknown type(%1) was found.',
    NO_PARAMETERS_SPECIFIED : 'No parameters were specified for the call to function %1. The function requires inputs to run.',
    PARAMETER_NOT_DOM_ELEMENT : 'The provided DOM element is either undefined or not a DOM Node. The following value was provided: %1',
    PARAMETER_NOT_STRING : 'The provided string was either undefined or not a string. The following string was provided: %1',
    REQUIRES_AT_LEAST_ONE_PARAMETER : 'At least one of the following parameters must be defined: %1. The following values were provided: %2',
    UNEXPECTED_BEHAVIOR : 'The following unexpected or unintended behavior occurred: %1',
    UNKNOWN_ID : 'The id: %1 , was provided but could not be found. Please perform the following to prevent this behavior: %2',
    PROTOCOL_VERSION_ERROR : 'Client and server have different protocol versions',
    CONNECTION_LOST : 'Connection lost',
    CONNECTING : 'Connecting',
    VI_STOPPED : 'VI is stopped',
    VI_PAUSED : 'VI is paused',
    VI_ERROR : 'VI reported an error',
    VIEWCONFIG_EXPECTS_STRING : 'The control viewconfig update for %1 was provided a %2 instead of a string',
    PROPERTY_DOES_NOT_EXIST : 'The property %1 does not exist for object %2'
};
