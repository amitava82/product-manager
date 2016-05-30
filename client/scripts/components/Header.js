import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import autobind from 'autobind-decorator';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import {openOauthPopup, logout} from '../redux/modules/session';

@connect(state => state)
export default class Header extends React.Component {

    @autobind
    initLogin(){
        this.props.dispatch(openOauthPopup()).then(
            r => this.props.dispatch(push('/products'))
        )
    }

    @autobind
    logout(){
        this.props.dispatch(logout());
    }

    render () {

        const btnElm = this.props.session.isLoggedIn ? <FlatButton label="LOGOUT" onClick={this.logout} /> : <FlatButton label="LOGIN" onClick={this.initLogin} />;
        return (
            <AppBar
                title="HOME"
                showMenuIconButton={false}
                iconElementRight={btnElm}

            />
        )
    }
}