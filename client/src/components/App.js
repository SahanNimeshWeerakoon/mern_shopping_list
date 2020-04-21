import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';
import { Provider } from 'react-redux';
import AppNavbar from './AppNavbar';
import store from '../store';
import ShoppingList from './ShoppingList';
import { loadUser } from '../actions/authAction';

class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        store.dispatch(loadUser());
    }
    
    render() {
        return (
            <Provider store={store}>
                <AppNavbar />
                <ShoppingList />
            </Provider>
        );
    }
}

export default App
