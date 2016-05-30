/**
 * Created by amitava on 29/05/16.
 */
import React from 'react';
import autobind from 'autobind-decorator';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import get from 'lodash/get';

export default class ProductForm extends React.Component{

    @autobind
    onChange(e){
        const {target: {name, type, value, files}} = e;
        this.props.onChange(name, get(files, '[0]', value));
    }

    render(){

        const styles = {
            exampleImageInput: {
                cursor: 'pointer',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                width: '100%',
                opacity: 0,
            },
        };

        return (
            <div>
                <FlatButton label="Choose an Image" labelPosition="before">
                    <input name="image" onChange={this.onChange} type="file" style={styles.exampleImageInput} />
                </FlatButton>
                <br />
                <TextField onChange={this.onChange}
                    name="name"
                    hintText="Product Name"
                    floatingLabelText="Product Name"
                /><br />
                <TextField onChange={this.onChange}
                    name="supplier"
                    hintText="Supplier"
                    floatingLabelText="Supplier"
                /><br />
                <TextField onChange={this.onChange}
                    name="upc"
                    hintText="UPC"
                    floatingLabelText="UPC"
                /><br />
                <TextField onChange={this.onChange}
                    name="sku"
                    hintText="SKU"
                    floatingLabelText="SKU"
                /><br />
            </div>
        )
    }
}