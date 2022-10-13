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
import RegistrationStart from './components/RegistrationStart';
import RegistrationCallBack from './components/RegistrationCallBack';
import RegistrationRefresh from './components/RegistrationRefresh';
import AbilitiesEncyclopedia from './components/AbilitiesEncyclopedia';
import ItemsEncyclopedia from './components/ItemsEncyclopedia';
import MonstersEncyclopedia from './components/MonstersEncyclopedia';

import Dev from './devComponents/Dev';

import SecureRoute from './elements/SecureRoute';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
    state = {
        menuOpen: false,
        isAdmin: false,
        profile: {},
        channel: window.localStorage.getItem("channel")
    }

    login = () => {
        if (process.env.NODE_ENV === "development") {
            window.location = `https://deusprogrammer.com/util/auth/dev?redirect=${window.location.protocol}//${window.location.hostname}:${window.location.port}${process.env.PUBLIC_URL}/dev`;
            return;
        }
        window.localStorage.setItem("twitchRedirect", "https://deusprogrammer.com/cbd/");
        window.location.replace("https://deusprogrammer.com/api/auth-svc/auth/twitch");
    }

    toggleMenu = () => {
        this.setState({menuOpen: !this.state.menuOpen});
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

        if (profile.username === null) {
            isLoggedIn = false;
        }

        this.setState({isLoggedIn, isAdmin, isBroadcaster, profile});
    }
    
    render() {
        return (
            <div style={{margin: "auto"}}>
                <ToastContainer />
                <Router>
                    <header>
                        <div id="header-row">
                            <div className="burger" onClick={() => {this.toggleMenu();}}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <h1>Chat Battler Dungeon</h1>
                            <div>
                                {!this.state.isLoggedIn ? 
                                    <button onClick={this.login}>Login</button> : <span>Logged in as {this.state.profile.username}{this.state.isAdmin ? "[ADMIN]" : null}</span>
                                }
                            </div>
                        </div>
                        <br />
                        <nav className="desktop">
                            <div style={{textAlign: "center"}}>
                                <Link to={`${process.env.PUBLIC_URL}/`}>Guide</Link> | <Link to={`${process.env.PUBLIC_URL}/battlers/~self`}>Your Battler</Link>
                            </div>
                            <div style={{textAlign: "center"}}>
                                <Link to={`${process.env.PUBLIC_URL}/encyclopedia/items`}>Item Encyclopedia</Link> | <Link to={`${process.env.PUBLIC_URL}/encyclopedia/abilities`}>Ability Encyclopedia</Link> | <Link to={`${process.env.PUBLIC_URL}/encyclopedia/monsters`}>Monster Encyclopedia</Link>
                            </div>
                            {this.state.isAdmin ? 
                                <div style={{textAlign: "center"}}>
                                    <Link to={`${process.env.PUBLIC_URL}/items`}>Item Console</Link> | <Link to={`${process.env.PUBLIC_URL}/abilities`}>Ability Console</Link> | <Link to={`${process.env.PUBLIC_URL}/monsters`}>Monster Console</Link>
                                </div>
                            : null}
                        </nav>
                        <nav className={this.state.menuOpen ? "mobile show" : "mobile"} onClick={() => {this.toggleMenu();}}>
                            <h2>Your Battler</h2>
                            <Link to={`${process.env.PUBLIC_URL}/`}><button>Guide</button></Link>
                            <Link to={`${process.env.PUBLIC_URL}/battlers/~self`}><button>Your Battler</button></Link>
                            <h2>Encyclopedia</h2>
                            <Link to={`${process.env.PUBLIC_URL}/encyclopedia/items`}><button>Item Encyclopedia</button></Link>
                            <Link to={`${process.env.PUBLIC_URL}/encyclopedia/abilities`}><button>Ability Encyclopedia</button></Link>
                            <Link to={`${process.env.PUBLIC_URL}/encyclopedia/monsters`}><button>Monster Encyclopedia</button></Link>
                            {this.state.isAdmin ? 
                                <>
                                    <h2>Admin</h2>
                                    <Link to={`${process.env.PUBLIC_URL}/items`}><button>Item Console</button></Link>
                                    <Link to={`${process.env.PUBLIC_URL}/abilities`}><button>Ability Console</button></Link>
                                    <Link to={`${process.env.PUBLIC_URL}/monsters`}><button>Monster Console</button></Link>
                                </>
                            : null}
                        </nav>
                    </header>
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
                        {/* <SecureRoute isAuthenticated={this.state.isBroadcaster || this.state.isAdmin} exact path={`${process.env.PUBLIC_URL}/sealed-items`} component={SealedItems} /> */}
                        {/* <SecureRoute isAuthenticated={this.state.isBroadcaster || this.state.isAdmin} exact path={`${process.env.PUBLIC_URL}/sealed-items/:id`} component={SealedItem} /> */}
                        <SecureRoute isAuthenticated={this.state.isBroadcaster || this.state.isAdmin} exact path={`${process.env.PUBLIC_URL}/abilities`} component={Abilities} />
                        <SecureRoute isAuthenticated={this.state.isBroadcaster || this.state.isAdmin} exact path={`${process.env.PUBLIC_URL}/abilities/:id`} component={Ability} />
                        <SecureRoute isAuthenticated={this.state.isBroadcaster || this.state.isAdmin} exact path={`${process.env.PUBLIC_URL}/monsters`} component={Monsters} />
                        <SecureRoute isAuthenticated={this.state.isBroadcaster || this.state.isAdmin} exact path={`${process.env.PUBLIC_URL}/monsters/:id`} component={Monster} />

                        { process.env.NODE_ENV === 'development' ?
                            <Route exact path={`${process.env.PUBLIC_URL}/dev`} component={Dev} /> : null
                        }
                    </Switch>
                </Router>
            </div>
    );
    }
}

export default App;
