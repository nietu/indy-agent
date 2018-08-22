'use strict';
const indy = require('../../../indy');
const config = require('../../../config');

exports.credentialOffer = async function (message) {
    let theirDid = message.message.origin;
    message.relationshipName = await indy.pairwise.getAttr(theirDid, 'name');
    message.links = [
        {
            name: "Accept",
            href: config.subUrl+"/api/credentials/accept_offer",
            method: "POST",
            message: JSON.stringify({
                messageId: message.id
            })
        },
        {
            name: "Reject",
            href: config.subUrl+"/api/credentials/reject_offer",
            method: "POST",
            message: JSON.stringify({
                messageId: message.id
            })
        }
    ];

    return message;
};