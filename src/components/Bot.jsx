import React from 'react';

export default class Bot extends React.Component {
    state = {
        channelId: parseInt(window.localStorage.getItem("channel"))
    }

    componentDidMount() {
        if (!this.state.channelId) {
            this.props.history.push(`${process.env.PUBLIC_URL}/registration/start`);
        }
    }

    render() {
        return (
            <div>
                <h1>Your Bot</h1>
                <h3>Panel URLs</h3>
                <p>Bring the below into your XSplit or OBS presentation layouts to show monsters and battle notifications.  It is recommended to place the encounter panel on either side of the screen, and the notification panel on the top or bottom of the screen.</p>
                <div>
                    <span><strong>Encounters Panel:</strong> https://deusprogrammer.com/util/battle-panel/encounters?channelId={this.state.channelId}</span>
                </div>
                <div>
                    <span><strong>Notification Panel:</strong> https://deusprogrammer.com/util/battle-panel/notifications?channelId={this.state.channelId}</span>
                </div>
                <h3>Actions</h3>
                <button>Start</button><button>Stop</button><button>Restart</button>
            </div>
        )
    }
}