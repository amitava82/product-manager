/**
 * Created by amitava on 29/05/16.
 */
import React from 'react';
import {Link} from 'react-router';
import autobind from 'autobind-decorator';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

@connect()
export default class Product extends React.Component{

    
    edit(id){
        this.props.dispatch(push(`/products/${id}/edit`))
    }

    render(){
        const {data, onDelete} = this.props;

        const iconButtonElement = (
            <IconButton
                touch={true}
                tooltip="action"
                tooltipPosition="bottom-left"
            >
                <MoreVertIcon  />
            </IconButton>
        );

        const rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem primaryText="Delete" onTouchTap={() => onDelete(data)} />
            </IconMenu>
        );

        const styles = {
            list: {
                backgroundColor: 'white'
            },
            listContent: {
                display: 'flex',
                flexDirection: 'column'
            },
            flex: {
                flex: '1'
            },
            secondary:{
                fontSize: '12px',
                lineHeight: '20px',
                color: '#888'
            },
            avatar: {
                top: '16px'
            }
        };

        const listContent = (
            <div style={styles.listContent} >
                <span>{data.name}</span>
                <div style={styles.flex}>
                    <div style={styles.secondary}>{data.sku}<br />{data.supplier}</div>
                </div>
            </div>
        );

        return (
            <List className="product" style={styles.list} onTouchTap={() => this.edit(data.key)}  >
                <ListItem
                    leftAvatar={<Avatar src={data.image} style={styles.avatar} size={40} />}
                    rightIconButton={rightIconMenu}
                    children={listContent}
                />
            </List>
        )
    }
}