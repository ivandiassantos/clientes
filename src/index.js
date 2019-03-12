import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './componentes/login/Login';
import App from './App';

ReactDOM.render(
    <Router>
        <div>
            <Route path="/" exact component={Login}/>
            <Route path="/principal/" component={App}/>
        </div>
    </Router>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
