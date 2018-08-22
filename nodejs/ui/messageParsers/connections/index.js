'use strict';
const config = require('../../../config');

exports.connectionsRequest = function (message) {
    message.links = {
        accept: {
            href: config.subUrl+"/api/connections/request",
            method: "PUT",
            rel: "accept"
        },
        reject: {
            href: config.subUrl+"/api/connections/request",
            method: "DELETE",
            rel: "reject"
        }
    };
    message.relationship = {};
    return Promise.resolve(message);
};

exports.connectionsResponse = function (message) {
    message.links = {
        accept: {
            href: config.subUrl+"/api/connections/request",
            method: "PUT",
            rel: "accept"
        },
        reject: {
            href: config.subUrl+"/api/connections/request",
            method: "DELETE",
            rel: "reject"
        }
    };
    message.relationship = {};
    return Promise.resolve(message);
};