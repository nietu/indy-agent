'use strict';
const config = require('../../config');
exports.validTokens = [];

exports.isLoggedIn = function(req, res, next) {
    if (exports.validTokens.includes(req.session.token))
        return next();
    else
        res.redirect(config.subUrl+'/login');
};