const INITIAL_STATE = {
    items: [],
    init: true,
    filter: {
        search: null,
        age: {
            from: null,
            to: null
        },
        weight: {
            from: null,
            to: null
        },
        height: {
            from: null,
            to: null
        }
    },
    list: {
        loading: true,
        data: []
    },
    dialog: {
        open: false,
        loading: false,
        item: null,
    }
};

const applySetItems = (state, action) => ({
    ...state,
    items: action.items,
    init: false
});

const applyOpenDialog = (state, action) => ({
    ...state,
    dialog: {
        open: true,
        loading: true,
        item: null
    },
});

const applyCloseDialog = (state, action) => ({
    ...state,
    dialog: {
        open: false,
        loading: false,
        item: null,
    },
});

const applySetItemDialog = (state, action) => ({
    ...state,
    dialog: {
        open: true,
        loading: false,
        item: action.item,
    },
});

const applyWaitingList = (state, action) => ({
    ...state,
    list: {
        ...state.list,
        loading: true,
    },
});

const applySetList = (state, action) => ({
    ...state,
    list: {
        ...state.list,
        loading: false,
        data: action.data,
    },
});

const applySetFilter = (state, action) => ({
    ...state,
    filter: state.filter,
});

function gnomeReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case '[GNOMES]SET_ITEMS': {
            return applySetItems(state, action);
        }
        case '[GNOMES]OPEN_DIALOG': {
            return applyOpenDialog(state, action);
        }
        case '[GNOMES]SET_ITEM_DIALOG': {
            return applySetItemDialog(state, action);
        }
        case '[GNOMES]CLOSE_DIALOG': {
            return applyCloseDialog(state, action);
        }
        case '[GNOMES]WAITING_LIST': {
            return applyWaitingList(state, action);
        }
        case '[GNOMES]SET_LIST': {
            return applySetList(state, action);
        }
        case '[GNOMES]SET_FILTER': {
            return applySetFilter(state, action);
        }
        default:
            return state;
    }
}

export default gnomeReducer;