import React from 'react';
import { connect } from 'react-redux';
import { withCommons } from '../Commons';
import { hideGnome, findAndShowGnome } from '../../actions/gnome';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Chip from '@material-ui/core/Chip';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import LaunchIcon from '@material-ui/icons/Launch';

const useStyles = makeStyles(theme => ({
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    bigAvatar: {
        margin: 10,
        width: 160,
        height: 160,
    },
    chip: {
        margin: theme.spacing(1),
    },
    margin: {
        height: theme.spacing(3),
    },
    progress: {
        margin: theme.spacing(6, 2),
    },
    paper: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(2),
    },
    section: {
        margin: theme.spacing(2),
    },
}));

const Header = ({ classes, title, onHideGnome }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={onHideGnome} aria-label="Close">
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

const Content = ({ classes, loading, item, onHideGnome, onFindGnome }) => {
    if (loading)
        return (
            <LinearProgress
                className={classes.progress}
            />
        );
    return (
        <Detail
            classes={classes}
            item={item}
            onFindGnome={onFindGnome}
        />
    );
}

const Detail = ({ classes, item, onFindGnome }) => {
    if (!item)
        return (
            <Paper className={classes.paper}>
                <Typography variant="h5" component="h3">
                    Information not found
                </Typography>
                <Typography component="p">
                    Try again later or contact and administrator.
                </Typography>
            </Paper>
        );

    return (
        <DialogContent className={classes.content}>
            <Grid container>
                <Grid item sm={6} xs={12}>
                    <Grid container justify="center" alignItems="center">
                        <Avatar
                            alt={item.name}
                            src={item.thumbnail}
                            className={classes.bigAvatar}
                        />
                    </Grid>
                </Grid> 
                <Grid item sm={6} xs={12}>
                    <Grid item>
                        <div className={classes.section}>
                            <Typography gutterBottom variant="body1">
                                Age: {item.age}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <Divider variant="middle" />
                        <div className={classes.section}>
                            <Typography gutterBottom variant="body1">
                                Weight: {item.weight}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <Divider variant="middle" />
                        <div className={classes.section}>
                            <Typography gutterBottom variant="body1">
                                Height: {item.height}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
               
                <Grid item xs={12}>
                    <Divider variant="middle" />
                    <div className={classes.section}>
                        <Typography gutterBottom variant="body1">
                            Friends
                        </Typography>
                        <div>
                        {
                            item.friends.map((friend, index) =>
                                <Chip
                                    key={index}
                                    className={classes.chip}
                                    label={friend}
                                    clickable
                                    onClick={() => onFindGnome(friend)}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                    deleteIcon={<LaunchIcon />}
                                    onDelete={() => onFindGnome(friend)}
                                />
                            )
                        }
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Divider variant="middle" />
                    <div className={classes.section}>
                        <Typography gutterBottom variant="body1">
                            Professions
                        </Typography>
                        <div>
                        {
                            item.professions.map((profession, index) =>
                                <Chip
                                    key={index}
                                    className={classes.chip}
                                    label={profession}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                />
                            )
                        }
                        </div>
                    </div>
                </Grid>
            </Grid>
        </DialogContent>
    );
}

const GnomeDialogBase = withCommons(({ fullScreen, open, loading, item, onHideGnome, onFindGnome }) => {

    const classes = useStyles();

    return (
        <Dialog
            fullWidth
            fullScreen={fullScreen}
            open={open}
            onClose={onHideGnome}
        >
            <Header
                classes={classes}
                title={item ? item.name : "Gnome"}
                onHideGnome={onHideGnome}
            />
            <Content
                classes={classes}
                loading={loading}
                item={item}
                onHideGnome={onHideGnome}
                onFindGnome={onFindGnome}
            />
        </Dialog>
    );
});

const GnomeDialog = (props) => {

    if (!props.open)
        return null;

    return <GnomeDialogBase {...props} />
}

const mapStateToProps = ({ gnomeState }) => ({
    open: gnomeState.dialog.open,
    loading: gnomeState.dialog.loading,
    item: gnomeState.dialog.item,
});

const mapDispatchToProps = dispatch => ({
    onHideGnome: () => dispatch(hideGnome()),
    onFindGnome: (name) => dispatch(findAndShowGnome(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(GnomeDialog);