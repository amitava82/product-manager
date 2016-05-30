/**
 * Created by amitava on 29/05/16.
 */
import React from 'react';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export default class Product extends React.Component{

    render(){
        const data = this.props.data;
        return (
            <Paper className="product">
                <div>

                </div>
                <div>
                    <p>{data.name}</p>
                    <p>{data.sku}</p>
                    <p>{data.supplier}</p>
                </div>
                <div>
                    <IconMenu
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    >
                        <MenuItem primaryText="Delete" />
                    </IconMenu>
                </div>
            </Paper>
        )
    }
}