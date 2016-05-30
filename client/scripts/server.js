/**
 * Created by amitava on 30/01/16.
 */
import React from 'react';
import Helmet from 'react-helmet';
import HTML from './html';


module.exports = function (deps, app, callback) {

    app.use(function(req, res){
        const head = Helmet.rewind();
        const html =  HTML('', undefined, head);
        res.send(html)
    });

};
