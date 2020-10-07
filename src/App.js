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
                    <Route exact path="/" component={Home} />
                    <Route exact path="/battler" component={Battler} />
                    <Route exact path="/battlers/:id" component={Battler} />
                    <Route exact path="/admin" component={Admin} />
                </Switch>
            </Router>
        </div>
  );
}

export default App;
