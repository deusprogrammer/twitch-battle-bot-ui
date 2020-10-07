import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './components/Home';
import Battler from './components/Battler';
import Admin from './components/Admin';
import './App.css';

function App() {
    return (
        <div style={{width: "80%", margin: "auto"}}>
            <Router>
                <Switch>
                    <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
                    <Route exact path={`${process.env.PUBLIC_URL}/battlers/:id`} component={Battler} />
                </Switch>
            </Router>
        </div>
  );
}

export default App;
