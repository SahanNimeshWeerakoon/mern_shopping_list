import { FETCH_ITEMS, DELETE_ITEM, NEW_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
    items: [],
    item: {},
    loading: false
};

export default (state=initialState, action) => {
    switch(action.type) {
        case FETCH_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }
        case NEW_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;

    }
}