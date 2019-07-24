import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

const GnomeItem = ({ index, style, getItem, showDetail }) => {

    const item = getItem(index);

    return (
        <ListItem 
            divider
            button
            style={style} 
            key={index}
            onClick={() => showDetail(item)}
        >
            <ListItemAvatar>
                <Avatar 
                    alt={item.name}
                    src={item.thumbnail} 
                />
            </ListItemAvatar>
            <ListItemText 
                primary={item.name}
                secondary={item.id}
            />
        </ListItem>
    );
}

export default GnomeItem;