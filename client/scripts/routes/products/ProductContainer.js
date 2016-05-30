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
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';

import {registerListeners, deleteProduct} from '../../redux/modules/product';
import {logout} from '../../redux/modules/session';

import Product from '../../components/Product';

@connect(state=>state)
export default class ProductContainer extends React.Component{

    constructor(...args){
        super(...args);
        this.state = {
            showDialog: false,
            snack: false
        }
    }
    
    componentDidMount(){
            const {session: {user}} = this.props;
            this.props.dispatch(registerListeners(`products/${user.uid}`));
    }

    @autobind
    delete(product){
        this.openDialog(product);
    }

    @autobind
    openDialog(p){
        this.setState({showDialog: true, deleting: p});
    };

    handleClose = () => {
        this.setState({showDialog: false, deleting: null});
    };

    @autobind
    submitDelete(){
        this.props.dispatch(deleteProduct(this.state.deleting));
        this.handleClose();
        this.notify();
    }

    @autobind
    notify(){
        this.setState({
            snack: !this.state.snack
        })
    }

    @autobind
    logout(){
        this.props.dispatch(logout());
    }

    render(){

        const {products: {loading, ids, entities}} = this.props;

        let productsList = null;

        if(loading) productsList = <CircularProgress />;
        
        productsList = ids.map(i=>{
            return <Product data={entities[i]} key={i} onDelete={this.delete} />
        });

        const styles = {
            paddingTop: '54px',
            paddingBottom: '60px'
        };

        const actions = [
            <FlatButton
                label="Cancel"
                primary={false}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Yes"
                primary={true}
                onTouchTap={this.submitDelete}
            />
        ];

        const lgoutBtn =  <FlatButton label="LOGOUT" onClick={this.logout} />;

        return (
            <div className="product-container">
                <AppBar
                    className="appbar"
                    title="PRODUCT"
                    showMenuIconButton={false}
                    iconElementRight={lgoutBtn}
                />

                <Paper style={styles}>
                    {productsList}
                </Paper>

                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.showDialog}
                    onRequestClose={this.handleClose}
                >
                    Confirm Delete?
                </Dialog>

                <Snackbar
                    open={this.state.snack}
                    message="Product deleted"
                    autoHideDuration={4000}
                    onRequestClose={this.notify}
                />

                <Link to="/products/add">
                    <FloatingActionButton className="btn-add-product">
                        <ContentAdd />
                    </FloatingActionButton>
                </Link>
            </div>
        )
    }
}