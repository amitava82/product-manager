/**
 * Created by amitava on 29/05/16.
 */
import React from 'react';
import autobind from 'autobind-decorator';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconInsertPhoto from 'material-ui/svg-icons/editor/insert-photo';
import get from 'lodash/get';

export default class ProductForm extends React.Component{

    static propTypes = {
        image: React.PropTypes.any,
        name: React.PropTypes.string.isRequired,
        supplier: React.PropTypes.string.isRequired,
        upc: React.PropTypes.string.isRequired,
        sku: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired
    };
    
    @autobind
    onChange(e){
        const {target: {name, type, value, files}} = e;
        this.props.onChange(name, get(files, '[0]', value));
    }

    readFile(file){
        if(typeof file === 'string') return file;
        return window.URL.createObjectURL(file)
    }

    render(){

        const {image, name, supplier, upc, sku} = this.props;

        const styles = {
            exampleImageInput: {
                cursor: 'pointer',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                width: '100%',
                opacity: 0
            },
            btn: {
                width: 120,
                height: 120,
                backgroundColor: '#f1f1f1'
            }
        };

        return (
            <div className="product-form">
                {image ? (
                    <FlatButton style={styles.btn}>
                        <img src={this.readFile(image)} width={100}/>
                        <input name="image" onChange={this.onChange} type="file" style={styles.exampleImageInput} />
                    </FlatButton>
                ) : (
                    <FlatButton style={styles.btn} icon={<IconInsertPhoto />}>
                        <input name="image" onChange={this.onChange} type="file" style={styles.exampleImageInput} />
                    </FlatButton>
                )}
                <br />
                <TextField onChange={this.onChange}
                    autoFocus
                    name="name"
                    fullWidth={true}
                    value={name}
                    hintText="Product Name"
                    floatingLabelText="Product Name"
                /><br />
                <TextField onChange={this.onChange}
                    fullWidth={true}
                    value={supplier}
                    name="supplier"
                    hintText="Supplier"
                    floatingLabelText="Supplier"
                /><br />
                <TextField onChange={this.onChange}
                    fullWidth={true}
                    value={upc}       
                    name="upc"
                    hintText="UPC"
                    floatingLabelText="UPC"
                /><br />
                <TextField onChange={this.onChange}
                    fullWidth={true}
                    value={sku}
                    name="sku"
                    hintText="SKU"
                    floatingLabelText="SKU"
                /><br />
            </div>
        )
    }
}