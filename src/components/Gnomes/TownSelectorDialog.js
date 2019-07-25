import React from 'react';
import { connect } from 'react-redux';
import { withCommons } from '../Commons';
import { selectTown, hideTownSelector } from '../../actions/gnome';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const TownSelectorDialog = ({ fullScreen, showTownSelector, towns, onSelectTown, onHideTownSelector }) => {

    if (!showTownSelector)
        return null;

    return (
        <Dialog
            fullWidth
            fullScreen={fullScreen}
            open={showTownSelector}
            onClose={onHideTownSelector}
        >
            <DialogTitle>Select town</DialogTitle>
            <List>
                {towns.map(town => (
                    <ListItem button onClick={() => onSelectTown(town)} key={town}>
                        <ListItemText>{town}</ListItemText>
                    </ListItem>
                ))}
            </List>

        </Dialog>
    );
}

const mapStateToProps = ({ gnomeState }) => ({
    towns: gnomeState.towns,
    showTownSelector: gnomeState.showTownSelector
});

const mapDispatchToProps = dispatch => ({
    onSelectTown: (town) => dispatch(selectTown(town)),
    onHideTownSelector: () => dispatch(hideTownSelector()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withCommons(TownSelectorDialog));