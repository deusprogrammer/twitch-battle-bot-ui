import React from 'react';
import {ToastContainer} from 'react-toastify';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Home from './components/Home';
import Battler from './components/Battler';
import Item from './components/Item';
import Items from './components/Items';
import Monster from './components/Monster';
import Monsters from './components/Monsters';
import Ability from './components/Ability';
import Abilities from './components/Abilities';

import ApiHelper from './utils/ApiHelper';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import axios from 'axios';

class App extends React.Component {
    state = {
        isAdmin: false
    }

    componentDidMount = async () => {
        let user = await ApiHelper.getUser("~self");
        let res = await axios.get(`https://deusprogrammer.com/api/profile-svc/users/${user.name}`, {
            headers: {
                "X-Access-Token": localStorage.getItem("accessToken")
            }
        });

        let profile = res.data;

        console.log("PROFILE: " + JSON.stringify(profile, null, 5));

        if (profile.roles.includes("SUPER_USER")) {
            this.setState({isAdmin: true});
        }
    }
    
    render() {
        return (
            <div style={{width: "80%", margin: "auto"}}>
                <ToastContainer />
                <Router>
                    <div style={{textAlign: "center"}}>
                        <Link to={`${process.env.PUBLIC_URL}/`}>Guide</Link> | <Link to={`${process.env.PUBLIC_URL}/battlers/~self`}>Battler</Link> | {this.state.isAdmin ? <Link to={`${process.env.PUBLIC_URL}/items`}>Items</Link> | <Link to={`${process.env.PUBLIC_URL}/abilities`}>Abilities</Link> | <Link to={`${process.env.PUBLIC_URL}/monsters`}>Monsters</Link> : null}
                    </div>
                    <Switch>
                        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
                        <Route exact path={`${process.env.PUBLIC_URL}/items`} component={Items} />
                        <Route exact path={`${process.env.PUBLIC_URL}/items/:id`} component={Item} />
                        <Route exact path={`${process.env.PUBLIC_URL}/abilities`} component={Abilities} />
                        <Route exact path={`${process.env.PUBLIC_URL}/abilities/:id`} component={Ability} />
                        <Route exact path={`${process.env.PUBLIC_URL}/monsters`} component={Monsters} />
                        <Route exact path={`${process.env.PUBLIC_URL}/monsters/:id`} component={Monster} />
                        <Route exact path={`${process.env.PUBLIC_URL}/battlers/:id`} component={Battler} />
                    </Switch>
                </Router>
            </div>
    );
    }
}

export default App;
