export const OPEN_DIALOG = '[GNOMES]OPEN_DIALOG';
export const CLOSE_DIALOG = '[GNOMES]CLOSE_DIALOG';
export const SET_ITEM_DIALOG = '[GNOMES]SET_ITEM_DIALOG';
export const SET_ITEMS = '[GNOMES]SET_ITEMS';
export const WAITING_LIST = '[GNOMES]WAITING_LIST';
export const SET_LIST = '[GNOMES]SET_LIST';
export const SET_FILTER = '[GNOMES]SET_FILTER';

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

const openDialog = () => {
    return {
        type: OPEN_DIALOG
    };
}

const setItemDialog = (item) => {
    return {
        type: SET_ITEM_DIALOG,
        item: item
    };
}

const closeDialog = () => {
    return {
        type: CLOSE_DIALOG
    };
}

const waitingList = () => {
    return {
        type: WAITING_LIST
    };
}

const setList = (data) => {
    return {
        type: SET_LIST,
        data: data
    };
}

const setItems = (items) => {
    return {
        type: SET_ITEMS,
        items: items
    }
}

const setFilter = (filter) => {
    return {
        type: SET_FILTER,
        filter: filter
    }
}

const applyFilters = () => {
    return (dispatch, getState) => {
        const { items, filter } = getState().gnomeState;
        const { search, age, height, weight} = filter;

        let list = items;
        dispatch(setList(list));
    }
}

export const showGnome = (gnome) => setItemDialog(gnome);

export const findAndShowGnome = (index) => {
    return (dispatch, getState) => {
        Promise.all([
            dispatch(openDialog())
        ]).then(() => {
            dispatch(setItemDialog(getState().items[index]));
        })
    }
}

export const hideGnome = () => closeDialog();

export const getGnomes = () => {
    return (dispatch, getState) => {
        Promise.all([
            dispatch(waitingList())
        ]).then(() => {
            const gnomes = generateDemoData();
            dispatch(setItems(gnomes));
        }).then(() => dispatch(applyFilters()))
    }
}

export const filterGnomes = (filter) => {
    return (dispatch, getState) => {
        Promise.all([
            dispatch(setFilter(filter))
        ]).then(() => dispatch(applyFilters()))
    }
}

