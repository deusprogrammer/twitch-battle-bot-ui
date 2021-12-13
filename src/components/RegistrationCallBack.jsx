import React from 'react';

import ApiHelper from '../utils/ApiHelper';

export default class RegistrationCallBack extends React.Component {
    state = {
        error: false,
        ready: false
    }

    componentDidMount = async () => {
        document.title = `Bot Registration`;
        let queryParam = new URLSearchParams(window.location.search);
        try {
            await ApiHelper.createBot(queryParam.get("code"));
            this.setState({ready: true});
        } catch (error) {
            this.setState({error: true});
        }
    }

    login = () => {
        window.localStorage.setItem("twitchRedirect", "https://deusprogrammer.com/cbd");
        window.location.replace("https://deusprogrammer.com/api/auth-svc/auth/twitch");
    }
    
    render() {
        if (this.state.error) {
            return (
                <div>
                    <h1>Error Registering Bot</h1>
                    <p>We were unable to create your bot.  Please contact deusprogrammer@gmail.com for assistance.</p>
                    <p>The problem may be that you haven't been approved by the creator to make a bot.  This isn't personal, but due to the fact that I am running this on my home lab and can't handle the bandwidth if there are too many users =P.</p>
                </div>
            )
        }

        if (this.state.ready) {
            return (
                <div>
                    <h1>Thank You</h1>
                    <p>Your user has been created and your bot has been registered.  You may now use any of the admin console features above to create monsters, items, abilities, and such that belong to your channel.  Please refer to the guide for information about how these ideas work.</p>
                    <p>Please click below to login.</p>
                    <button onClick={this.login}>Login</button>
                </div>
            )
        }

        return (
            <div>
                <h1>Hold on...we are registering your bot right now.</h1>
            </div>
        )
    }
}