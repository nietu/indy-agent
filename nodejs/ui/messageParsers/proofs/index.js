'use strict';
const indy = require('../../../indy');
const config = require('../../../config');

exports.request = async function(message) {
    let theirDid = message.message.origin;
    let name = await indy.pairwise.getAttr(theirDid, 'name');
    let endpointDid = await indy.did.getTheirEndpointDid(theirDid);
    if(name) {
        message.relationshipName = name;
    } else if (endpointDid) {
        message.relationshipName = `Endpoint DID: ${endpointDid}`
    }
    message.links = [
        {
            name: "Accept",
            href: config.subUrl+"/api/proofs/accept",
            method: "POST",
            message: JSON.stringify({
                messageId: message.id
            })
        },
        {
            name: "Reject",
            href: config.subUrl+"/api/messages/delete",
            method: "POST",
            message: JSON.stringify({
                messageId: message.id
            })
        }
    ];

    return Promise.resolve(message);
};