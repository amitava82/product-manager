/**
 * Created by amitava on 29/05/16.
 */
import { resolve, reject as _reject } from '../middleware/simple-promise';
import extend from 'lodash/extend';
import union from 'lodash/union';
import pull from 'lodash/pull';
import {push, goBack, replace, } from 'react-router-redux';
import firebase from '../../helpers/firebase';
import Promise from 'bluebird';


import createAction from '../createActions';

const [CREATE, EDIT, DELETE, LIST] = createAction('product', ["CREATE", "EDIT", "DELETE", "LIST"]);

const initialState = {
    ids: [],
    entities: {},
    loading: false,
    error: null
};

export default function reducer(state = initialState, action){
    switch (action.type){
        case CREATE:
        case EDIT:
        case LIST:
            return extend({}, state, {
                loading: true,
                error: null
            });

        case _reject(CREATE):
        case _reject(EDIT):
        case _reject(LIST):
            return extend({}, state, {
                loading: false,
                error: action.payload
            });

        case resolve(CREATE):
        case resolve(EDIT):
            console.log(action.payload.key)
            return extend({}, state, {
                loading: false,
                error: null,
                ids: union(state.ids, [action.payload.key]),
                entities: extend({}, state.entities, {[action.payload.key]:action.payload})
            });
        case resolve(LIST):
            return extend({}, state, {
                loading: false,
                error: null,
                products: action.payload
            });


        default:
            return state;
    }
}

export function createProduct(data){
    return (dispatch, getState) => {
        const {session: {user}} = getState();
        const {image, ...rest} = data;
        const storageRef = firebase.firebaseStore.ref();
        const uploadTask = storageRef.child('images/' + image.name).put(image, {user_id: user.uid});
        uploadTask.on('state_changed', snapshot => {
            console.log(snapshot)
        }, e => {
            console.log(e)
        }, () => {
            console.log('upload done: ', uploadTask.snapshot.downloadURL)
            firebase.firebaseDb.ref(`products/${user.uid}`).push({
                user_id: user.uid,
                ...rest,
                ...{image: uploadTask.snapshot.downloadURL}
            }).then(
                r => console.log(r),
                e => console.log((e))
            )
        });
    }

}

export function loadProducts(){
    firebase.firebaseDb.ref('products')
}


export function registerListeners(path) {
    return (dispatch, getState) => {
        const ref = firebase.firebaseDb.ref(path);

        ref.on('child_added', snapshot => dispatch({
            type: resolve(CREATE),
            payload: recordFromSnapshot(snapshot)
        }));

        ref.on('child_changed', snapshot => dispatch({
            type: resolve(EDIT),
            payload: recordFromSnapshot(snapshot)
        }));

        ref.on('child_removed', snapshot => dispatch({
            type: resolve(DELETE),
            payload: recordFromSnapshot(snapshot)
        }));
    };
}

function recordFromSnapshot(snapshot) {
    let record = snapshot.val();
    record.key = snapshot.key;
    return record;
}

