// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const {
    TurnContext,
    MessageFactory,
    TeamsActivityHandler,
    CardFactory,
    ActionTypes
} = require('botbuilder');

class BotActivityHandler extends TeamsActivityHandler {
    constructor() {
        super();
    }

    /* Building a messaging extension search command is a two step process.
        (1) Define how the messaging extension will look and be invoked in the client.
            This can be done from the Configuration tab, or the Manifest Editor.
            Learn more: https://aka.ms/teams-me-design-search.
        (2) Define how the bot service will respond to incoming search commands.
            Learn more: https://aka.ms/teams-me-respond-search.
        
        NOTE:   Ensure the bot endpoint that services incoming messaging extension queries is
                registered with Bot Framework.
                Learn more: https://aka.ms/teams-register-bot. 
    */

    // Invoked when the service receives an incoming search query.
    async handleTeamsMessagingExtensionQuery(context, query) {
        const axios = require('axios');
        const querystring = require('querystring');

        const searchQuery = query.parameters[0].value;
        //Wikipedia API のエンドポイントを指定
        const response = await axios.get(`https://ja.wikipedia.org/w/rest.php/v1/search/page?${querystring.stringify({ q: searchQuery, size: 8 })}&limit=10`);

        const attachments = [];
        
        //Wikipedia API が返す JSON の構造に合わせてコードを変更
        response.data.pages.forEach(obj => {
            const heroCard = CardFactory.heroCard(obj.title);
            const preview = CardFactory.heroCard(obj.title); // Preview cards are optional for Hero card. You need them for Adaptive Cards.
            preview.content.tap = { type: 'invoke', value: { description: obj.excerpt } };
            const attachment = { ...heroCard, preview };
            attachments.push(attachment);
        });

        return {
            composeExtension: {
                type: 'result',
                attachmentLayout: 'list',
                attachments: attachments
            }
        };
    }

    // Invoked when the user selects an item from the search result list returned above.
    async handleTeamsMessagingExtensionSelectItem(context, obj) {
        return {
            composeExtension: {
                type: 'result',
                attachmentLayout: 'list',
                attachments: [CardFactory.thumbnailCard(obj.description)]
            }
        };
    }

    /* Messaging Extension - Unfurling Link */
    handleTeamsAppBasedLinkQuery(context, query) {
        const attachment = CardFactory.thumbnailCard('Thumbnail Card',
            query.url,
            ['https://raw.githubusercontent.com/microsoft/botframework-sdk/master/icon.png']);
    
        const result = {
            attachmentLayout: 'list',
            type: 'result',
            attachments: [attachment]
        };
    
        const response = {
            composeExtension: result
        };
        return response;
        }
    /* Messaging Extension - Unfurling Link */
}

module.exports.BotActivityHandler = BotActivityHandler;

