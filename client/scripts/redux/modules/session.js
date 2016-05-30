/**
 * Created by amitava on 31/01/16.
 */
import { resolve, reject as _reject } from '../middleware/simple-promise';
import extend from 'lodash/extend';
import {push, goBack, replace, } from 'react-router-redux';
import firebase from '../../helpers/firebase';
import Promise from 'bluebird';

import createAction from '../createActions';

const [STORE_SESSION, DELETE_SESSION, LOGIN] = createAction('session', ["STORE_SESSION", "DELETE_SESSION", "LOGIN"]);

const initialState = {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null
};

export default function(state = initialState, action = {}){
    switch (action.type){
        case STORE_SESSION:
            return extend({}, state, {
                user: action.payload,
                isLoggedIn: true,
                loading: false,
                error: null
            });
        case DELETE_SESSION:
            return extend({}, state, {
                user: null,
                isLoggedIn: false,
                error: action.payload
            });
        
        default:
            return state;
    }
}

export function storeSession(session){
    return {
        type: STORE_SESSION,
        payload: session
    }
}

export function signOutSuccess() {
    return {
        type: DELETE_SESSION
    };
}

export function initAuth(){
    return (dispatch) => {
        var unsub = firebase.firebaseAuth.onAuthStateChanged(
            user => {
                unsub();
                dispatch(storeSession(user));
                dispatch(push('/products'));
            },
            e => dispatch(logout())
        );
    }
}

export function openOauthPopup() {
    return (dispatch) => {
        return firebase.firebaseAuth.signInWithPopup(firebase.providers.google).then(
            r => dispatch(storeSession(r)),
            error => dispatch(logout())
        )
    }

}

export function logout(){
    return (dispatch) => {
        firebase.firebaseAuth.signOut().then(
            r => dispatch(signOutSuccess())
        )
    }
}