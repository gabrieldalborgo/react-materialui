import React from 'react';
import { connect } from 'react-redux';
import { showGnome } from '../../actions/gnome';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

const GnomeItem = ({ index, style, items, onShowGnome }) => {

    const gnome = index < items.length ? items[index] : null;
    if (gnome == null)
        return null;

    return (
        <ListItem 
            divider
            button
            style={style} 
            key={index}
            onClick={() => onShowGnome(gnome)}
        >
            <ListItemAvatar>
                <Avatar 
                    alt={gnome.name}
                    src={gnome.thumbnail} 
                />
            </ListItemAvatar>
            <ListItemText 
                primary={gnome.name}
                secondary={gnome.id}
            />
        </ListItem>
    );
}

const mapStateToProps = ({ gnomeState }) => ({
    items: gnomeState.items
});

const mapDispatchToProps = dispatch => ({
    onShowGnome: gnome => dispatch(showGnome(gnome))
});

export default connect(mapStateToProps, mapDispatchToProps)(GnomeItem);