import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

const urlParams = new URLSearchParams(window.location.search);
localStorage.setItem('kindId', urlParams.get('kindId') || '2');
localStorage.setItem('imprimaId', urlParams.get('imprimaId') || '');
localStorage.setItem('origin', urlParams.get('origin') || '');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
