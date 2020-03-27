'use strict';

const express = require('express');
const { Datastore } = require('@google-cloud/datastore');

const router = express.Router();
const datastore = new Datastore();

const env = process.env.ENVIRONMENT || 'dev';

router.all('/:path', async (req, res) => {
    let query = datastore.createQuery(env, 'Url');
    let { path } = req.params;

    if (!path.match(/^[a-zA-Z0-9\-\_]+$/)) {
        return res.status(400).send('Invalid path');
    }

    let [urls] = await query.filter('path', path).run();
    if (!urls.length) {
        return res.status(404).send('Not found');
    }

    let url = urls[0]['redirect'];
    if (!isValidUrl(url)) {
        return res.status(400).send('Invalid URL');
    }

    return res.redirect(301, url);
});

router.all('/*', (_, res) => {
    return res.redirect(301, 'https://quicky.dg7.pt');
});

const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = router;
