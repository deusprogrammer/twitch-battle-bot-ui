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
import Status from './components/Status';
import Statuses from './components/Statuses';
import SealedItem from './components/SealedItem';
import SealedItems from './components/SealedItems';

import ApiHelper from './utils/ApiHelper';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    state = {
        isAdmin: false
    }

    componentDidMount = async () => {
        // If no access token is present, don't retrieve their information
        if (!localStorage.getItem("accessToken")) {
            return;
        }

        let user = await ApiHelper.getUser("~self");
        let res = await axios.get(`https://deusprogrammer.com/api/profile-svc/users/${user.name}`, {
            headers: {
                "X-Access-Token": localStorage.getItem("accessToken")
            }
        });

        let profile = res.data;

        console.log("PROFILE: " + JSON.stringify(profile, null, 5));

        let isAdmin = false;
        let isBroadcaster = false;
        if (profile.roles.includes("SUPER_USER")) {
            isAdmin = true;
        }

        if (profile.roles.includes("TWITCH_BROADCASTER")) {
            isBroadcaster = true;
        }

        this.setState({isAdmin, isBroadcaster});
    }
    
    render() {
        return (
            <div style={{margin: "auto"}}>
                <ToastContainer />
                <Router>
                    <div style={{textAlign: "center"}}>
                        <Link to={`${process.env.PUBLIC_URL}/`}>Guide</Link> | <Link to={`${process.env.PUBLIC_URL}/battlers/~self`}>Battler</Link>
                    </div>
                    {this.state.isAdmin ? 
                        <div style={{textAlign: "center"}}>
                            <Link to={`${process.env.PUBLIC_URL}/items`}>Items</Link> | <Link to={`${process.env.PUBLIC_URL}/abilities`}>Abilities</Link> | <Link to={`${process.env.PUBLIC_URL}/statuses`}>Statuses</Link> | <Link to={`${process.env.PUBLIC_URL}/monsters`}>Monsters</Link>
                        </div>
                    : null}
                    {this.state.isAdmin ? 
                        <div style={{textAlign: "center"}}>
                            <Link to={`${process.env.PUBLIC_URL}/sealed-items`}>Sealed Items</Link>
                        </div>
                    : null}
                    <Switch>
                        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
                        <Route exact path={`${process.env.PUBLIC_URL}/items`} component={Items} />
                        <Route exact path={`${process.env.PUBLIC_URL}/items/:id`} component={Item} />
                        <Route exact path={`${process.env.PUBLIC_URL}/sealed-items`} component={SealedItems} />
                        <Route exact path={`${process.env.PUBLIC_URL}/sealed-items/:id`} component={SealedItem} />
                        <Route exact path={`${process.env.PUBLIC_URL}/abilities`} component={Abilities} />
                        <Route exact path={`${process.env.PUBLIC_URL}/abilities/:id`} component={Ability} />
                        <Route exact path={`${process.env.PUBLIC_URL}/statuses`} component={Statuses} />
                        <Route exact path={`${process.env.PUBLIC_URL}/statuses/:id`} component={Status} />
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
