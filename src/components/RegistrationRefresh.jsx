import React from 'react';

import ApiHelper from '../utils/ApiHelper';

export default class RegistrationRefresh extends React.Component {
    state = {
        error: false,
        ready: false
    }

    componentDidMount = async () => {
        document.title = `Auth Refresh`;
        let queryParam = new URLSearchParams(window.location.search);
        let channel = parseInt(window.localStorage.getItem("channel"));
        try {
            await ApiHelper.updateToken(channel, queryParam.get("code"));
            this.setState({ready: true});
        } catch (error) {
            this.setState({error: true});
        }
    }
    
    render() {
        if (this.state.error) {
            return (
                <div>
                    <h1>Error Refreshing Authentication</h1>
                    <p>We were unable to refresh your authentication.  Please contact deusprogrammer@gmail.com for assistance.</p>
                </div>
            )
        }

        if (this.state.ready) {
            return (
                <div>
                    <h1>Thank You</h1>
                    <p>Your authentication has been updated.</p>
                </div>
            )
        }

        return (
            <div>
                <h1>Hold on...we are updating your auth token now.</h1>
            </div>
        )
    }
}