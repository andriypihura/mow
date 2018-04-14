import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'normalize.css';
import App from './app.js';
import registerServiceWorker from './registerServiceWorker';
require('dotenv').config()

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
