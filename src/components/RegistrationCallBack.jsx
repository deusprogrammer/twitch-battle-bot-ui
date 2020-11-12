import React from 'react';

import ApiHelper from '../utils/ApiHelper';

export default class RegistrationCallBack extends React.Component {
    state = {
        error: false,
        ready: false
    }

    componentDidMount = async () => {
        let queryParam = new URLSearchParams(window.location.search);
        try {
            await ApiHelper.createBot(queryParam.get("code"));
            this.setState({ready: true});
        } catch (error) {
            this.setState({error: true});
        }
    }
    
    render() {
        if (this.state.error) {
            return (
                <div>
                    <h1>Error Registering Bot</h1>
                    <p>We were unable to create your bot.  Please contact deusprogrammer@gmail.com for assistance.</p>
                </div>
            )
        }

        if (this.state.ready) {
            return (
                <div>
                    <h1>Thank You</h1>
                    <p>Your user has been created and your bot has been registered.  You may now use any of the admin console features above to create monsters, items, abilities, and such that belong to your channel.  Please refer to the guide for information about how these ideas work.</p>
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