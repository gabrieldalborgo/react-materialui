import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ImageIcon from '@material-ui/icons/Image';

const GnomeItem = ({ key, index, style, getItemByIndex}) => {
    return (
        <ListItem button style={style} key={index}>
            <ListItemAvatar>
                <Avatar> 
                    <ImageIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={getItemByIndex(index)} secondary="Jan 9, 2014" />
        </ListItem>
        
    );
}

export default GnomeItem;