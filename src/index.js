import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./redux/redux-store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";




 let rerenderEntireTree = () => {
	ReactDOM.render(
		 <BrowserRouter>
			 <Provider store={store}>
			 	<App state={store.getState()}/>
			 </Provider>
		 </BrowserRouter>, document.getElementById('root'));
};
rerenderEntireTree(store.getState());

store.subscribe(() =>{
	 let state = store.getState();
	 rerenderEntireTree(state)
});

serviceWorker.unregister();
