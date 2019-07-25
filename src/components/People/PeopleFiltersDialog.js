import React, { Component } from 'react';
import { withCommons } from '../Commons';
import { connect } from 'react-redux';
import { hideExtraFilters, saveExtraFilters, clearExtraFilters } from '../../actions/people';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
    margin: {
        height: theme.spacing(3),
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const PeopleFiltersDialogBase = withCommons(({ fullScreen, showExtraFilters, extraFilters, onHideExtraFilters, onClearExtraFilters, onChangeElement }) => {
    const classes = useStyles();
    const { age, weight, height } = extraFilters;

    return (
        <Dialog
            fullScreen={fullScreen}
            fullWidth
            open={showExtraFilters}
            onClose={onHideExtraFilters}
        >
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={onHideExtraFilters} aria-label="Close">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Filters
                    </Typography>
                    <Button color="inherit" onClick={onClearExtraFilters}>
                        Clear
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <div className={classes.margin} />
                <FormControlLabel
                    control={
                        <Switch
                            color="primary"
                            checked={age.enabled}
                            onChange={() => onChangeElement("age", "switch", !age.enabled)}
                        />
                    }
                    label="Age"
                    labelPlacement="end"
                />
                <Slider 
                    value={[age.from, age.to]}
                    min={age.min}
                    max={age.max}
                    disabled={!age.enabled}
                    onChange={(e, newValue) => onChangeElement("age", "slider", newValue)}
                    valueLabelDisplay="auto"
                />
                <div className={classes.margin} />
                <FormControlLabel
                    control={
                        <Switch
                            color="primary"
                            checked={height.enabled}
                            onChange={() => onChangeElement("height", "switch", !height.enabled)}
                        />
                    }
                    label="Height"
                    labelPlacement="end"
                />
                <Slider 
                    value={[height.from, height.to]}
                    min={height.min}
                    max={height.max}
                    disabled={!height.enabled}
                    onChange={(e, newValue) => onChangeElement("height", "slider", newValue)}
                    valueLabelDisplay="auto"
                />
                <div className={classes.margin} />
                <FormControlLabel
                    control={
                        <Switch
                            color="primary"
                            checked={weight.enabled}
                            onChange={() => onChangeElement("weight", "switch", !weight.enabled)}
                        />
                    }
                    label="Weight"
                    labelPlacement="end"
                />
                <Slider 
                    value={[weight.from, weight.to]}
                    min={weight.min}
                    max={weight.max}
                    disabled={!weight.enabled}
                    onChange={(e, newValue) => onChangeElement("weight", "slider", newValue)}
                    valueLabelDisplay="auto"
                />
            </DialogContent>
        </Dialog>
    );
});

class PeopleFiltersDialog extends Component {

    constructor(props) {
        super(props)

        this.handleChangeElement = this.handleChangeElement.bind(this);
    }

    handleChangeElement = (filterName, fieldType, value) => {
        const filter = { ...this.props.extraFilters[filterName] };
        if (fieldType === 'switch') {
            filter.enabled = value;
        } else if (fieldType === 'slider') {
            filter.from = value[0];
            filter.to = value[1];
        }
        const extraFilters = { 
            ...this.props.extraFilters,
            [filterName]: filter
        };
        this.props.onSaveExtraFilters(extraFilters);
    }

    render() {
    
        if (!this.props.showExtraFilters)
            return null;

        return <PeopleFiltersDialogBase
                    {...this.props}
                    onChangeElement={this.handleChangeElement}
                />
    }
}

const mapStateToProps = ({ peopleState }) => ({
    showExtraFilters: peopleState.filter.showExtraFilters,
    extraFilters: peopleState.filter.extraFilters,
});

const mapDispatchToProps = dispatch => ({
    onHideExtraFilters: () => dispatch(hideExtraFilters()),
    onSaveExtraFilters: (filters) => dispatch(saveExtraFilters(filters)),
    onClearExtraFilters: () => dispatch(clearExtraFilters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PeopleFiltersDialog);