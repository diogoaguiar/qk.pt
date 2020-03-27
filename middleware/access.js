'use strict';

const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore();
const env = process.env.ENVIRONMENT || 'dev';

const access = async (req, res, next) => {
    let key = datastore.key('Access');
    key.namespace = env;

    let access = {
        key,
        data: {
            url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
            ip: req.header('x-forwarded-for') || req.connection.remoteAddress,
            method: req.method,
            body: req.body,
            date: new Date()
        }
    };

    datastore.insert(access);
    next();
};

module.exports = access;