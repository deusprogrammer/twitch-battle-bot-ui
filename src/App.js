import React from 'react';
import {ToastContainer} from 'react-toastify';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import Battler from './components/Battler';
import Item from './components/Item';
import Items from './components/Items';
import Monster from './components/Monster';
import Monsters from './components/Monsters';
import Ability from './components/Ability';
import Abilities from './components/Abilities';
import Bot from './components/Bot';
import SealedItem from './components/SealedItem';
import SealedItems from './components/SealedItems';
import RegistrationStart from './components/RegistrationStart';
import RegistrationCallBack from './components/RegistrationCallBack';
import RegistrationRefresh from './components/RegistrationRefresh';
import AbilitiesEncyclopedia from './components/AbilitiesEncyclopedia';
import ItemsEncyclopedia from './components/ItemsEncyclopedia';
import MonstersEncyclopedia from './components/MonstersEncyclopedia';
import AdminConfigs from './components/AdminConfigs';
import MediaPoolConfig from './components/MediaPoolConfig';
import RaidAlertCustomizer from './components/RaidAlertCustomizer';
import RaidAlertManager from './components/RaidAlertManager';

import SecureRoute from './elements/SecureRoute';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
    state = {
        isAdmin: false,
        channel: window.localStorage.getItem("channel")
    }

    login = () => {
        window.localStorage.setItem("twitchRedirect", "https://deusprogrammer.com/util/twitch/");
        window.location.replace("https://deusprogrammer.com/api/auth-svc/auth/twitch");
    }

    componentDidMount = async () => {
        // If no access token is present, don't retrieve their information
        if (!localStorage.getItem("accessToken")) {
            return;
        }

        let res = await axios.get(`https://deusprogrammer.com/api/profile-svc/users/~self`, {
            headers: {
                "X-Access-Token": localStorage.getItem("accessToken")
            }
        });

        let profile = res.data;

        window.localStorage.setItem("channel", profile.connected.twitch.channels.length > 0 ? profile.connected.twitch.channels[0] : null);

        let isLoggedIn = true;
        let isAdmin = false;
        let isBroadcaster = false;
        if (profile.roles.includes("TWITCH_BROADCASTER")) {
            isAdmin = true;
        }

        if (profile.roles.includes("TWITCH_BROADCASTER")) {
            isBroadcaster = true;
        }

        this.setState({isLoggedIn, isAdmin, isBroadcaster, profile});
    }
    
    render() {
        return (
            <div style={{margin: "auto"}}>
                <ToastContainer />
                <Router>
                    <div style={{textAlign: "right"}}>
                        {!this.state.isLoggedIn ? 
                            <button onClick={this.login}>Login</button> : <button onClick={() => {alert("This is not currently implemented")}}>My Profile</button>
                        }
                    </div>
                    <div style={{textAlign: "center"}}>
                        <Link to={`${process.env.PUBLIC_URL}/`}>Guide</Link> | <Link to={`${process.env.PUBLIC_URL}/battlers/~self`}>Your Battler</Link> | {this.state.isAdmin ? <Link to={`${process.env.PUBLIC_URL}/bot`}>Your Bot</Link> : <Link to={`${process.env.PUBLIC_URL}/registration/start`}>Get a Bot</Link>}
                    </div>
                    <div style={{textAlign: "center"}}>
                        <Link to={`${process.env.PUBLIC_URL}/encyclopedia/items`}>Item Encyclopedia</Link> | <Link to={`${process.env.PUBLIC_URL}/encyclopedia/abilities`}>Ability Encyclopedia</Link> | <Link to={`${process.env.PUBLIC_URL}/encyclopedia/monsters`}>Monster Encyclopedia</Link>
                    </div>
                    {this.state.isAdmin ? 
                        <div style={{textAlign: "center"}}>
                            <Link to={`${process.env.PUBLIC_URL}/items`}>Item Console</Link> | <Link to={`${process.env.PUBLIC_URL}/abilities`}>Ability Console</Link> | <Link to={`${process.env.PUBLIC_URL}/monsters`}>Monster Console</Link>
                        </div>
                    : null}
                    {this.state.isBroadcaster ? 
                        <div style={{textAlign: "center"}}>
                            <Link to={`${process.env.PUBLIC_URL}/sealed-items`}>Sealed Items</Link>
                        </div>
                    : null}
                    {this.state.isAdmin ?
                        <div style={{textAlign: "center"}}>
                            <label>Channel:</label>
                            <select 
                                value={this.state.channel}
                                onChange={(evt) => {window.localStorage.setItem("channel", evt.target.value); window.location.reload();}}>
                                { this.state.profile.connected.twitch.channels.map((channel) => {
                                    return (
                                        <option value={channel}>{channel}</option>
                                    );
                                })}
                            </select>
                        </div> : null
                    }
                    <Switch>
                        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
                        <Route exact path={`${process.env.PUBLIC_URL}/registration/start`} component={RegistrationStart} />
                        <Route exact path={`${process.env.PUBLIC_URL}/registration/callback`} component={RegistrationCallBack} />
                        <Route exact path={`${process.env.PUBLIC_URL}/registration/refresh`} component={RegistrationRefresh} />
                        <Route exact path={`${process.env.PUBLIC_URL}/encyclopedia/abilities`} component={AbilitiesEncyclopedia} />
                        <Route exact path={`${process.env.PUBLIC_URL}/encyclopedia/items`} component={ItemsEncyclopedia} />
                        <Route exact path={`${process.env.PUBLIC_URL}/encyclopedia/monsters`} component={MonstersEncyclopedia} />
                        
                        <SecureRoute isAuthenticated={this.state.isLoggedIn} exact path={`${process.env.PUBLIC_URL}/battlers/:id`} component={Battler} />
                        <SecureRoute isAuthenticated={this.state.isBroadcaster || this.state.isAdmin} exact path={`${process.env.PUBLIC_URL}/items`} component={Items} />
                        <SecureRoute isAuthenticated={this.state.isBroadcaster || this.state.isAdmin} exact path={`${process.env.PUBLIC_URL}/items/:id`} component={Item} />
                        <SecureRoute isAuthenticated={this.state.isBroadcaster || this.state.isAdmin} exact path={`${process.env.PUBLIC_URL}/sealed-items`} component={SealedItems} />
                        <SecureRoute isAuthenticated={this.state.isBroadcaster || this.state.isAdmin} exact path={`${process.env.PUBLIC_URL}/sealed-items/:id`} component={SealedItem} />
                        <SecureRoute isAuthenticated={this.state.isBroadcaster || this.state.isAdmin} exact path={`${process.env.PUBLIC_URL}/abilities`} component={Abilities} />
                        <SecureRoute isAuthenticated={this.state.isBroadcaster || this.state.isAdmin} exact path={`${process.env.PUBLIC_URL}/abilities/:id`} component={Ability} />
                        <SecureRoute isAuthenticated={this.state.isBroadcaster || this.state.isAdmin} exact path={`${process.env.PUBLIC_URL}/monsters`} component={Monsters} />
                        <SecureRoute isAuthenticated={this.state.isBroadcaster || this.state.isAdmin} exact path={`${process.env.PUBLIC_URL}/monsters/:id`} component={Monster} />
                    </Switch>
                </Router>
            </div>
    );
    }
}

export default App;
