/**
 * Created by amitava on 29/05/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import autobind from 'autobind-decorator';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

@connect(state=>state)
export default class AddProduct extends React.Component{

    @autobind
    save(){

    }

    render(){
        return (
            <div className="product-container">
                <AppBar
                    title="New Product"
                    iconElementLeft={<IconButton><Link to="/products"><NavigationClose /></Link></IconButton>}
                    iconElementRight={<FlatButton label="Save" onClick={this.save} /> }
                />
                <div className="content-wrapper">
                    <ProductFrom />
                    Edit
                </div>
            </div>
        )
    }
}