/**
 * Created by amitava on 30/01/16.
 */
import React from 'react';
import {Route, IndexRoute, IndexRedirect, Redirect} from 'react-router';
import get from 'lodash/get';


import {
    HomeContainer
} from './routes/home';

import {
    ProductContainer,
    AddProduct,
    EditProduct
} from './routes/products';

import Error from './routes/misc/Error';

import App from './app';


export default (store) => {

    function ensureLoggedIn(nextState, replace, cb){
        const {session: {isLoggedIn, user}} = store.getState();
        if(!isLoggedIn){
            replace({pathname: '/home'});
        }
        cb();
    }

    return (
        <Route path="/" component={App}>
            <IndexRedirect to="/home"/>
            <Route path="/home" component={HomeContainer} />
            <Route path="/products" component={ProductContainer} onEnter={ensureLoggedIn} />
            <Route path="/products/add" components={AddProduct} onEnter={ensureLoggedIn} />
            <Route path="/products/:id/edit" component={EditProduct} onEnter={ensureLoggedIn} />
            <Route path="/error" component={Error} />
        </Route>
    );
};