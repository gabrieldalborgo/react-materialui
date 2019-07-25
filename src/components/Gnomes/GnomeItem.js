import React from 'react';
import { connect } from 'react-redux';
import { showGnome } from '../../actions/gnome';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

const getDetail = ({ age, height, weight }) => {
    return `Age: ${age} - Weight: ${weight} - Height: ${height}`
}

const GnomeItem = ({ index, style, data, onShowGnome }) => {

    const gnome = index < data.length ? data[index] : null;
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
                secondary={getDetail(gnome)}
            />
        </ListItem>
    );
}

const mapStateToProps = ({ gnomeState }) => ({
    data: gnomeState.list.data
});

const mapDispatchToProps = dispatch => ({
    onShowGnome: gnome => dispatch(showGnome(gnome))
});

export default connect(mapStateToProps, mapDispatchToProps)(GnomeItem);