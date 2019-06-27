import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Index } from 'debug/Index';
import { Diff } from 'debug/Diff';
import { Creator } from 'debug/creator';



ReactDOM.render(<Router>
    <Route exact path='/' component={Index} />
    <Route exact path='/diff' component={Diff} />
    <Route exact path='/creator' component={Creator} />
</Router>
, document.getElementById('app'));