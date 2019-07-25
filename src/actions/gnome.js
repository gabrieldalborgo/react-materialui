import config from '../config';
import axios from 'axios';

export const OPEN_DIALOG = '[GNOMES]OPEN_DIALOG';
export const CLOSE_DIALOG = '[GNOMES]CLOSE_DIALOG';
export const SET_ITEM_DIALOG = '[GNOMES]SET_ITEM_DIALOG';
export const SET_ITEMS = '[GNOMES]SET_ITEMS';
export const WAITING_LIST = '[GNOMES]WAITING_LIST';
export const SET_LIST = '[GNOMES]SET_LIST';
export const SET_SEARCH = '[GNOMES]SET_SEARCH';
export const SHOW_FILTERS = '[GNOMES]SHOW_FILTERS';
export const HIDE_FILTERS = '[GNOMES]HIDE_FILTERS';
export const SAVE_FILTERS = '[GNOMES]SAVE_FILTERS';
export const CLEAR_FILTERS = '[GNOMES]CLEAR_FILTERS';

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

const setSearch = (search) => {
    return {
        type: SET_SEARCH,
        search: search
    }
}

const findGnome = (items, gnome) => {
    return items.find((item) => item.name === gnome);
}

const applyFilterSearch = (items, searchText) => {
    if (!searchText || searchText.length < 3)
        return items;
    return items.filter(item => {
        return item.name.includes(searchText);
    });
}

const applyExtraFilters = (items, extraFilters) => {
    const {age, height, weight } = extraFilters;
    return items.filter(item => {
        return (!age.enabled || (age.enabled && item.age >= age.from && item.age <= age.to))
            && (!height.enabled || (height.enabled && item.height >= height.from && item.height <= height.to))
            && (!weight.enabled || (weight.enabled && item.weight >= weight.from && item.weight <= weight.to));
    });
}

const applyFilters = () => {
    return (dispatch, getState) => {
        const { items, filter } = getState().gnomeState;
        const { search, extraFilters } = filter;

        let list = items;
        list = applyFilterSearch(list, search);
        list = applyExtraFilters(list, extraFilters);
        dispatch(setList(list));
    }
}

export const findAndShowGnome = (name) => {
    return (dispatch, getState) => {
        Promise.all([
            dispatch(openDialog())
        ]).then(() => dispatch(showGnome(findGnome(getState().gnomeState.items, name))));
    }
}

export const showGnome = (gnome) => setItemDialog(gnome);

export const hideGnome = () => closeDialog();

export const getGnomes = () => {
    return (dispatch) => {
        Promise.all([
            dispatch(waitingList())
        ]).then(() => {
            axios.get(config.URL)
                .then(response => response.data)
                .then((data) => dispatch(setItems(data.Brastlewark)))
                .then(() => dispatch(applyFilters()));
        });
    }
}

export const searchGnomes = (search) => {
    return (dispatch, getState) => {
        Promise.all([
            dispatch(setSearch(search))
        ]).then(() => dispatch(waitingList()))
        .then(() => dispatch(applyFilters()));
    }
}

export const showExtraFilters = () => {
    return {
        type: SHOW_FILTERS
    };
}

export const hideExtraFilters = () => {
    return {
        type: HIDE_FILTERS
    };
}

export const saveExtraFilters = (extraFilters) => {
    return (dispatch, getState) => {
        Promise.all([
            dispatch({
                type: SAVE_FILTERS,
                extraFilters: extraFilters
            })
        ]).then(() => dispatch(waitingList()))
        .then(() => dispatch(applyFilters()));
    };
}

export const clearExtraFilters = () => {
    return (dispatch, getState) => {
        Promise.all([
            dispatch({
                type: CLEAR_FILTERS,
            })
        ]).then(() => dispatch(waitingList()))
        .then(() => dispatch(applyFilters()));
    };
}