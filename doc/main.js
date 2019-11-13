import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/serchMovie/App' ; // this changed
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
console.log(App);


ReactDOM.render(
    <Router>
        <Route path='/' component={App} />
    </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA


// serviceWorker.unregister();