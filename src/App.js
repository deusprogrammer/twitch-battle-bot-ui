import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './components/Home';
import Battler from './components/Battler';
import Item from './components/Item';
import Items from './components/Items';
import Monsters from './components/Monsters';
import Abilities from './components/Abilities';
import Admin from './components/Admin';
import './App.css';

function App() {
    return (
        <div style={{width: "80%", margin: "auto"}}>
            <Router>
                <Switch>
                    <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
                    <Route exact path={`${process.env.PUBLIC_URL}/items`} component={Items} />
                    <Route exact path={`${process.env.PUBLIC_URL}/items/:id`} component={Item} />
                    <Route exact path={`${process.env.PUBLIC_URL}/abilities`} component={Abilities} />
                    <Route exact path={`${process.env.PUBLIC_URL}/monsters`} component={Monsters} />
                    <Route exact path={`${process.env.PUBLIC_URL}/battlers/:id`} component={Battler} />
                </Switch>
            </Router>
        </div>
  );
}

export default App;
