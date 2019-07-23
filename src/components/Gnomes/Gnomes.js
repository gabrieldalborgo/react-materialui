import React, { Component } from 'react';
import GnomeBar from './GnomeBar';
import GnomeList from './GnomeList';

class Gnomes extends Component {
    render() {
        return (
            <>
                <GnomeBar></GnomeBar>
                <GnomeList></GnomeList>
            </>
        );
    }
}

export default Gnomes;