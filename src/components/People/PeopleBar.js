import React from 'react';
import { connect } from 'react-redux';
import { searchPeople, showExtraFilters, showTownSelector } from '../../actions/people';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import LanguageIcon from '@material-ui/icons/Language';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import PeopleFiltersDialog from './PeopleFiltersDialog';

const HideOnScroll = (props) => {
    const { children } = props;
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            marginLeft: theme.spacing(1),
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        marginRight: theme.spacing(1),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    townTitle: {
        display: 'none',
        marginRight: theme.spacing(1),
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            marginRight: theme.spacing(0)
        },
    },
    townButton: {
        backgroundColor: 'inherit',
        [theme.breakpoints.up('sm')]: {
            backgroundColor: fade(theme.palette.common.white, 0.15),    
        },
    }
}));

const PeopleBar = ({ selectedTown, search, onSearchPeople, onShowExtraFilters, onShowTownSelector }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <HideOnScroll>
                <AppBar>
                    <Toolbar>
                        <div>
                            <Button
                                color="inherit"
                                onClick={onShowTownSelector}
                                className={classes.townButton}
                            >
                                <LanguageIcon className={classes.leftIcon}/>
                                <div className={classes.townTitle}>{selectedTown}</div>
                            </Button>
                        </div>
                        <Typography className={classes.title} variant="h6" noWrap>
                            People
                        </Typography>
                        
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'Search' }}
                                value={search}
                                onChange={(e) => onSearchPeople(e.target.value)}
                            />
                        </div>
                        <div className={classes.filter}>
                            <IconButton
                                aria-label="Filter"
                                color="inherit"
                                onClick={onShowExtraFilters}
                            >
                                <FilterListIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <PeopleFiltersDialog />
        </div>
    );
}

const mapStateToProps = ({ peopleState }) => ({
    search: peopleState.filter.search,
    selectedTown: peopleState.selectedTown
});

const mapDispatchToProps = dispatch => ({
    onSearchPeople: (search) => dispatch(searchPeople(search)),
    onShowExtraFilters: () => dispatch(showExtraFilters()),
    onShowTownSelector: () => dispatch(showTownSelector()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PeopleBar);