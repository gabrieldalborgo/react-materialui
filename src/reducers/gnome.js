import * as actions from '../actions/gnome';

const INITIAL_STATE = {
    items: [],
    towns: [ "Brastlewark", "Otra", "Cualquiera"],
    selectedTown: "",
    itemsByTown: [],
    showTownSelector: false,
    init: true,
    filter: {
        search: '',
        showExtraFilters: false,
        extraFilters: {
            age: {
                enabled: false,
                from: 0,
                to: 500,
                min: 0,
                max: 500
            },
            weight: {
                enabled: false,
                from: 0,
                to: 50,
                min: 0,
                max: 50
            },
            height: {
                enabled: false,
                from: 0,
                to: 150,
                min: 0,
                max: 150
            }
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
    towns: action.towns,
    selectedTown: action.selectedTown,
    itemsByTown: action.itemsByTown,
    init: false
});

const applySelectTown = (state, action) => ({
    ...state,
    selectedTown: action.selectedTown,
    itemsByTown: action.itemsByTown,
    showTownSelector: false
})

const applyShowTownSelector = (state, action) => ({
    ...state,
    showTownSelector: true
})

const applyHideTownSelector = (state, action) => ({
    ...state,
    showTownSelector: false
})

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

const applySetSearch = (state, action) => ({
    ...state,
    filter: {
        ...state.filter,
        search: action.search
    }
});

const applyShowExtraFilters = (state, action) => ({
    ...state,
    filter: {
        ...state.filter,
        showExtraFilters: true
    }
});

const applyHideExtraFilters = (state, action) => ({
    ...state,
    filter: {
        ...state.filter,
        showExtraFilters: false
    }
});

const applySaveExtraFilters = (state, action) => ({
    ...state,
    filter: {
        ...state.filter,
        extraFilters: action.extraFilters
    }
});

const applyClearExtraFilters = (state, action) => ({
    ...state,
    filter: {
        ...state.filter,
        extraFilters: INITIAL_STATE.filter.extraFilters
    }
});

function gnomeReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.SET_ITEMS: {
            return applySetItems(state, action);
        }
        case actions.SELECT_TOWN: {
            return applySelectTown(state, action);
        }
        case actions.OPEN_DIALOG: {
            return applyOpenDialog(state, action);
        }
        case actions.SET_ITEM_DIALOG: {
            return applySetItemDialog(state, action);
        }
        case actions.CLOSE_DIALOG: {
            return applyCloseDialog(state, action);
        }
        case actions.WAITING_LIST: {
            return applyWaitingList(state, action);
        }
        case actions.SET_LIST: {
            return applySetList(state, action);
        }
        case actions.SET_SEARCH: {
            return applySetSearch(state, action);
        }
        case actions.SHOW_FILTERS: {
            return applyShowExtraFilters(state, action);
        }
        case actions.HIDE_FILTERS: {
            return applyHideExtraFilters(state, action);
        }
        case actions.SAVE_FILTERS: {
            return applySaveExtraFilters(state, action);
        }
        case actions.CLEAR_FILTERS: {
            return applyClearExtraFilters(state, action);
        }
        case actions.SHOW_TOWN_SELECTOR: {
            return applyShowTownSelector(state, action);
        }
        case actions.HIDE_TOWN_SELECTOR: {
            return applyHideTownSelector(state, action);
        }
        default:
            return state;
    }
}

export default gnomeReducer;