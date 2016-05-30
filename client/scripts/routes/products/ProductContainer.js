/**
 * Created by amitava on 29/05/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import autobind from 'autobind-decorator';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';

import {registerListeners, deleteProduct} from '../../redux/modules/product';

import Product from '../../components/Product';

@connect(state=>state)
export default class ProductContainer extends React.Component{

    componentDidMount(){
            const {session: {user}} = this.props;
            this.props.dispatch(registerListeners(`products/${user.uid}`));
    }

    @autobind
    delete(product){
        this.props.dispatch(deleteProduct(product));
    }

    render(){

        const {products: {loading, ids, entities}} = this.props;

        let productsList = null;

        if(loading) productsList = <CircularProgress />;
        
        productsList = ids.map(i=>{
            return <Product data={entities[i]} key={i} onDelete={this.delete} />
        });


        return (
            <div className="product-container">
                <AppBar
                    title="PRODUCT"
                    showMenuIconButton={false}
                    iconElementRight={null}
                />

                <div className="content-wrapper">
                    {productsList}
                </div>

                <Link to="/products/add">
                    <FloatingActionButton className="btn-add-product">
                        <ContentAdd />
                    </FloatingActionButton>
                </Link>
            </div>
        )
    }
}