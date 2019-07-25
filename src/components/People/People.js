import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPeople } from '../../actions/people';
import PeopleBar from './PeopleBar';
import PeopleList from './PeopleList';
import PeopleDialog from './PeopleDialog';
import TownSelectorDialog from './TownSelectorDialog';

class People extends Component {

    componentDidMount() {
        if (this.props.init)
            this.props.onGetPeople();
    }

    render() {
        return (
            <>
                <PeopleBar />
                <div style={{ paddingTop: 64 }}>
                    <PeopleList />
                </div>
                <PeopleDialog />
                <TownSelectorDialog />
            </>
        );
    }
}

const mapStateToProps = ({ peopleState }) => ({
    init: peopleState.init,
});

const mapDispatchToProps = dispatch => ({
    onGetPeople: () => dispatch(getPeople())
});

export default connect(mapStateToProps, mapDispatchToProps)(People);