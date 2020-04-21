import axios from 'axios'
import { FETCH_ITEMS, NEW_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authAction';
import { returnErrors } from './errorAction';

export const fetchPosts = () => dispatch => {
    dispatch(itemsLoading());

    axios
        .get('http://localhost:5000/api/items')
        .then(res => dispatch({
            type: FETCH_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addPost = item => (dispatch, getState) => {
    axios
        .post('http://localhost:5000/api/items', item, tokenConfig(getState))
        .then(res => dispatch({
            type: NEW_ITEM,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const removePost = (id) => (dispatch, getState) => {
    axios
        .delete(`http://localhost:5000/api/items/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const itemsLoading = () => dispatch => {
    return {
        type: ITEMS_LOADING
    }
}