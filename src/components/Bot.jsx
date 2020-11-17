import React from 'react';

export default class Bot extends React.Component {
    state = {
        channelId: parseInt(window.localStorage.getItem("channel"))
    }

    componentDidMount() {
        document.title = "Your Bot";
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
                <div style={{display: "table"}}>
                    <div style={{display: "table-row"}}>
                        <div style={{display: "table-cell", padding: "10px", fontWeight: "bolder"}}>Encounters Panel:</div>
                        <div style={{display: "table-cell", padding: "10px"}}><input type="text" value={`https://deusprogrammer.com/util/battle-panel/encounters?channelId=${this.state.channelId}`} style={{width: "700px"}} /></div>
                    </div>
                    <div style={{display: "table-row"}}>
                        <div style={{display: "table-cell", padding: "10px", fontWeight: "bolder"}}>Notifications Panel:</div>
                        <div style={{display: "table-cell", padding: "10px"}}><input type="text" value={`https://deusprogrammer.com/util/battle-panel/notifications?channelId=${this.state.channelId}`} style={{width: "700px"}} /></div>
                    </div>
                </div>
                <h3>Actions</h3>
                <button disabled={true}>Start</button><button disabled={true}>Stop</button><button disabled={true}>Restart</button>
            </div>
        )
    }
}