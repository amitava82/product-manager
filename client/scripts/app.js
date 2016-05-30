/**
 * Created by amitava on 30/01/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {SITE_DESC} from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import Toastr from './utils/toastr';

import { initAuth} from './redux/modules/session';


injectTapEventPlugin();

@connect(state => state)
export default class App extends React.Component {

    componentWillMount(){
        this.props.dispatch(initAuth());
    }

    render(){
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <main className="full-height">
                    <Helmet title="Spotcher" meta={[
                        {
                            name: 'description',
                            content: SITE_DESC
                        }
                    ]} />
                    <div id="main" className="full-height">
                        {this.props.children}
                    </div>
                    <Footer />
                    <Toastr />
                </main>
            </MuiThemeProvider>
        );
    }
}
