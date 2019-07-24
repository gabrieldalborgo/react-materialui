import React, { Component } from 'react';
import GnomeBar from './GnomeBar';
import GnomeList from './GnomeList';
import GnomeDialog from './GnomeDialog';

const generateDemoData = () => {
    const list = [];
    for (var i = 0; i < 10000; i++) {
        var item = {
            "id": i,
            "name": "Tobus Quickwhistle",
            "thumbnail": "http://www.publicdomainpictures.net/pictures/10000/nahled/thinking-monkey-11282237747K8xB.jpg",
            "age": 306,
            "weight": 39.065952,
            "height": 107.75835,
            "hair_color": "Pink",
            "professions": [
                "Metalworker",
                "Woodcarver",
                "Stonecarver",
                " Tinker",
                "Tailor",
                "Potter"
            ],
            "friends": [
                "Cogwitz Chillwidget",
                "Tinadette Chillbuster"
            ]
        };
        list.push(item);
    }
    return list;
}

class Gnomes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            filter: {
                search: null,
            },
            list: {
                loading: true,
                data: generateDemoData()
            },
            dialog: {
                open: false,
                loading: false,
                item: null,
            }
        }

        this.openDialog = this.openDialog.bind(this);
    }

    openDialog = (item) => {
        let dialog = Object.assign({}, this.state.dialog);
        dialog.open = true;
        dialog.item = item;
        this.setState({ dialog });
    }

    closeDialog = () => {
        let dialog = Object.assign({}, this.state.dialog);
        dialog.open = false;
        dialog.item = null;
        this.setState({ dialog });
    }

    getItem = (index) => {
        const { list } = this.state;
        if (index < list.data.length)
            return list.data[index];
        return null;
    }

    render() {
        const { filter, list, dialog } = this.state;

        return (
            <>
                <GnomeBar
                    {...filter}
                />
                <div style={{ paddingTop: 64 }}>
                    <GnomeList
                        getItem={this.getItem}
                        showDetail={this.openDialog}
                        {...list}
                    />
                </div>
                <GnomeDialog
                    onClose={this.closeDialog}
                    {...dialog}
                />
            </>
        );
    }
}

export default Gnomes;