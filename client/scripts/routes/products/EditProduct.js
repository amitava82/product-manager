/**
 * Created by amitava on 29/05/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {push} from 'react-router-redux';
import autobind from 'autobind-decorator';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import ProductForm from '../../components/ProductForm';

import {updateProduct} from '../../redux/modules/product';

@connect(state=>state)
export default class AddProduct extends React.Component{

    constructor(...args){
        super(...args);

        const {params: {id}, products: {entities, ids}} = this.props;
        const product = entities[id] || {};

        this.state = {
            name: product.name,
            sku: product.sku,
            image: product.image,
            supplier: product.supplier,
            upc: product.upc,
            key: product.key
        };
    }

    componentWillReceiveProps(nextProps){
        const {params: {id}, products: {entities, ids}} = nextProps;
        const product = entities[id];
        if(product){
            this.setState({...product});
        }
    }

    @autobind
    save(){
        this.props.dispatch(updateProduct(this.state));
        this.props.dispatch(push('/products'));
    }

    @autobind
    onInputChange(name, val){
        this.setState({
            [name]: val
        });
    }

    render(){
        
        const {params: {id}, products: {entities, ids}} = this.props;
        const product = entities[id];
        
        return (
            <div className="product-container">
                <AppBar
                    title="Edit Product"
                    iconElementLeft={<Link to="/products"><IconButton><NavigationClose /></IconButton></Link>}
                    iconElementRight={<FlatButton label="Save" onClick={this.save} /> }
                />
                <div className="content-wrapper">
                    {product && <ProductForm {...this.state} onChange={this.onInputChange} />}
                </div>
            </div>
        )
    }
}