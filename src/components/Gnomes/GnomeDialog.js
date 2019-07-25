import React from 'react';
import { connect } from 'react-redux';
import { hideGnome } from '../../actions/gnome';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    bigAvatar: {
        margin: 10,
        width: 40,
        height: 40,
    },
}));

const GnomeDialogBasic = ({ open, loading, item, onHideGnome }) => {

    const classes = useStyles();

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={onHideGnome}
        >
            {loading && (<div>loading</div>)}
            {!loading && !item && (<div>not found</div>)}
            {!loading && item && (
                <>
                    <DialogTitle>{item.name}</DialogTitle>
                    <DialogContent>
                        <Avatar
                            alt={item.name}
                            src={item.thumbnail}
                            className={classes.bigAvatar}
                        />
                    </DialogContent>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary="Name"
                                secondary={item.name}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Age"
                                secondary={item.age}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Weight"
                                secondary={item.weight}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Height"
                                secondary={item.height}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Hair color"
                                secondary={item.hair_color}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Professions"
                                secondary={item.professions.join(' - ')}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Friends"
                                secondary={item.friends.join(' - ')}
                            />
                        </ListItem>
                    </List>
                </>
            )}
        </Dialog>
    );
}

const GnomeDialogFullScreen = ({ open, loading, item, onHideGnome }) => {

    const classes = useStyles();

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onHideGnome}
        >
            {loading && (<div>loading</div>)}
            {!loading && !item && (<div>not found</div>)}
            {!loading && item && (
                <>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={onHideGnome} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                {item.name}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <List>
                    <ListItemAvatar>
                        <Avatar 
                            alt={item.name}
                            src={item.thumbnail}
                            className={classes.bigAvatar}
                        />
                    </ListItemAvatar>
                        <ListItem>
                            <ListItemText
                                primary="Age"
                                secondary={item.age}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Weight"
                                secondary={item.weight}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Height"
                                secondary={item.height}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Hair color"
                                secondary={item.hair_color}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Professions"
                                secondary={item.professions}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Friends"
                                secondary={item.friends}
                            />
                        </ListItem>
                    </List>
                </>
            )}
        </Dialog>
    );
}

const GnomeDialog = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    if (!props.open)
        return null;

    return fullScreen
        ? (<GnomeDialogFullScreen {...props} />)
        : (<GnomeDialogBasic {...props} />)
}

const mapStateToProps = ({ gnomeState }) => ({
    open: gnomeState.dialog.open,
    loading: gnomeState.dialog.loading,
    item: gnomeState.dialog.item
});

const mapDispatchToProps = dispatch => ({
    onHideGnome: () => dispatch(hideGnome())
});

export default connect(mapStateToProps, mapDispatchToProps)(GnomeDialog);