import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './src_0-functional/App';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import JokeClass from "./JokeClass";

ReactDOM.render(<JokeClass />, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root-f'));
registerServiceWorker();
