import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGnomes } from '../../actions/gnome';
import GnomeBar from './GnomeBar';
import GnomeList from './GnomeList';
import GnomeDialog from './GnomeDialog';

class Gnomes extends Component {

    componentDidMount() {
        if (this.props.init)
            this.props.onGetGnomes();
    }

    render() {
        return (
            <>
                <GnomeBar />
                <div style={{ paddingTop: 64 }}>
                    <GnomeList />
                </div>
                <GnomeDialog />
            </>
        );
    }
}

const mapStateToProps = ({ gnomeState }) => ({
    init: gnomeState.init,
});

const mapDispatchToProps = dispatch => ({
    onGetGnomes: () => dispatch(getGnomes())
});

export default connect(mapStateToProps, mapDispatchToProps)(Gnomes);