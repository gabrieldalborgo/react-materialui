import React from 'react';
import { connect } from 'react-redux';
import { showPerson } from '../../actions/people';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

const getDetail = ({ age, height, weight }) => {
    return `Age: ${age} - Weight: ${weight} - Height: ${height}`
}

const PeopleItem = ({ index, style, data, onShowPerson }) => {

    const person = index < data.length ? data[index] : null;
    if (person == null)
        return null;

    return (
        <ListItem 
            divider
            button
            style={style} 
            key={index}
            onClick={() => onShowPerson(person)}
        >
            <ListItemAvatar>
                <Avatar 
                    alt={person.name}
                    src={person.thumbnail} 
                />
            </ListItemAvatar>
            <ListItemText 
                primary={person.name}
                secondary={getDetail(person)}
            />
        </ListItem>
    );
}

const mapStateToProps = ({ peopleState }) => ({
    data: peopleState.list.data
});

const mapDispatchToProps = dispatch => ({
    onShowPerson: person => dispatch(showPerson(person))
});

export default connect(mapStateToProps, mapDispatchToProps)(PeopleItem);