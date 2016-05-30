/**
 * Created by amitava on 29/05/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Link} from 'react-router';
import autobind from 'autobind-decorator';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import ProductFrom from '../../components/ProductForm';

import {createProduct} from '../../redux/modules/product';

@connect(state=>state)
export default class AddProduct extends React.Component{

    constructor(...args){
        super(...args);
        this.state = {
            name: '',
            sku: '',
            image: null,
            supplier: '',
            upc: ''
        }
    }
    @autobind
    create(){
       // createProduct('amit', {name: 'something'})
        this.props.dispatch(createProduct(this.state));
        this.props.dispatch(push('/products'));
    }

    @autobind
    onInputChange(name, val){
        this.setState({
            [name]: val
        });
    }

    render(){
        return (
            <div className="product-container">
                <AppBar
                    title="New Product"
                    iconElementLeft={<Link to="/products"><IconButton><NavigationClose /></IconButton></Link>}
                    iconElementRight={<FlatButton label="Save" onClick={this.create} /> }
                />
                <div className="content-wrapper">
                    <ProductFrom {...this.state}  onChange={this.onInputChange} />
                </div>
            </div>
        )
    }
}