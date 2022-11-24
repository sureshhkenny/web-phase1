import {defineMessages} from 'react-intl';
import sharedMessages from '../shared-messages';

let messages = defineMessages({
    meow: {
        defaultMessage: 'Meow',
        description: 'Name for the meow sound',
        id: 'gui.defaultProject.meow'
    },
    variable: {
        defaultMessage: 'my variable',
        description: 'Name for the default variable',
        id: 'gui.defaultProject.variable'
    }
});

messages = {...messages, ...sharedMessages};

// use the default message if a translation function is not passed
const defaultTranslator = msgObj => msgObj.defaultMessage;

/**
 * Generate a localized version of the default project
 * @param {function} translateFunction a function to use for translating the default names
 * @return {object} the project data json for the default project
 */
const projectData = translateFunction => {
    const translator = translateFunction || defaultTranslator;
    return ({
        "targets": [
          {
            "isStage": true,
            "name": "Stage",
            "variables": {
              "`jEk@4|i[#Fk?(8x)AV.-my variable": [
                "my variable",
                0
              ]
            },
            "lists": {},
            "broadcasts": {},
            "blocks": {},
            "comments": {},
            "currentCostume": 0,
            "costumes": [
              {
                "name": "backdrop1",
                "dataFormat": "svg",
                "assetId": "cd21514d0531fdffb22204e0ec5ed84a",
                "md5ext": "cd21514d0531fdffb22204e0ec5ed84a.svg",
                "rotationCenterX": 240,
                "rotationCenterY": 180
              }
            ],
            "sounds": [
              {
                "name": "pop",
                "assetId": "83a9787d4cb6f3b7632b4ddfebf74367",
                "dataFormat": "wav",
                "format": "",
                "rate": 48000,
                "sampleCount": 1123,
                "md5ext": "83a9787d4cb6f3b7632b4ddfebf74367.wav"
              }
            ],
            "volume": 100,
            "layerOrder": 0,
            "tempo": 60,
            "videoTransparency": 50,
            "videoState": "on",
            "textToSpeechLanguage": null
          }
        ],
        "monitors": [],
        "extensions": [],
        "meta": {
          "semver": "3.0.0",
          "vm": "1.1.4",
          "agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
        }
      });
};


export default projectData;
