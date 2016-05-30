/**
 * Created by amitava on 29/05/16.
 */
import React from 'react';
import {Link} from 'react-router';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export default class Product extends React.Component{
    
    render(){
        const {data, onDelete} = this.props;
        return (
            <Paper className="product">
                <img src={data.image} />
                <div className="product-details">
                    <p>{data.name}</p>
                    <p>{data.sku}</p>
                    <p>{data.supplier}</p>
                </div>
                <div className="action-bar">
                    <IconMenu
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    >
                        <Link to={`/products/${data.key}/edit`}>
                            <MenuItem primaryText="Edit"/>
                        </Link>
                        <MenuItem primaryText="Delete" onClick={() => onDelete(data)} />

                    </IconMenu>
                </div>
            </Paper>
        )
    }
}