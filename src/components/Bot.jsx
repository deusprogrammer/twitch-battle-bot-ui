import React from 'react';
import ApiHelper from '../utils/ApiHelper';

const twitchAuthUrl = "https://id.twitch.tv/oauth2/authorize?client_id=uczfktv6o7vvdeqxnafizuq672r5od&redirect_uri=https://deusprogrammer.com/util/twitch/registration/refresh&response_type=code&scope=channel:read:redemptions";

const configElementDescriptions = {
    cbd: "Chat Battle Dungeon",
    requests: "Request Queue"
}

export default class Bot extends React.Component {
    state = {
        channelId: parseInt(window.localStorage.getItem("channel")),
        buttonDisable: false,
        botState: {
            running: false,
            created: false
        },
        tokenState: {
            valid: false
        },
        config: {
            cbd: true,
            requests: true
        }
    }

    async componentDidMount() {
        document.title = "Bot Control Panel";
        if (!this.state.channelId) {
            this.props.history.push(`${process.env.PUBLIC_URL}/registration/start`);
        }

        let config = await ApiHelper.getBotConfig(this.state.channelId);

        // Check token state
        let tokenState = await ApiHelper.checkToken(this.state.channelId);
        let botState = await ApiHelper.getBotState(this.state.channelId);
        this.setState({botState, tokenState, config});

        setInterval(async () => {
            tokenState = await ApiHelper.checkToken(this.state.channelId);
            botState = await ApiHelper.getBotState(this.state.channelId);
            this.setState({botState, tokenState, buttonDisable: false});
        }, 5000);
    }

    changeBotState = async (state) => {
        this.setState({buttonDisable: true});
        await ApiHelper.changeBotState(this.state.channelId, state);
    }

    onConfigChange = async (event, configItem) => {
        let config = {...this.state.config};
        config[configItem] = event.target.value == "true";
        await ApiHelper.updateBotConfig(this.state.channelId, config);
        this.setState({config});
    }

    render() {
        return (
            <div>
                <h1>Your Bot</h1>
                <h3>Current State</h3>
                <div style={{display: "table"}}>
                    <div style={{display: "table-row"}}>
                        <div style={{display: "table-cell", padding: "10px", fontWeight: "bolder"}}>Created:</div>
                        <div style={{display: "table-cell", padding: "10px"}}>{this.state.botState.created ? "Yes" : "No"}</div>
                    </div>
                    <div style={{display: "table-row"}}>
                        <div style={{display: "table-cell", padding: "10px", fontWeight: "bolder"}}>Running:</div>
                        <div style={{display: "table-cell", padding: "10px"}}>{this.state.botState.running ? "Yes" : "No"}</div>
                    </div>
                </div>
                <h3>Twitch Account Link</h3>
                <div style={{display: "table"}}>
                    <div style={{display: "table-row"}}>
                        <div style={{display: "table-cell", padding: "10px", fontWeight: "bolder"}}>Valid:</div>
                        <div style={{display: "table-cell", padding: "10px"}}>{this.state.tokenState.valid ? "Yes" : "No"}</div>
                    </div>
                </div>
                <a href={twitchAuthUrl}>
                    <button disabled={this.state.tokenState.valid}>Refresh Authentication</button>
                </a>
                <h3>Bot Configuration</h3>
                <div style={{marginLeft: "10px"}}>
                    { Object.keys(this.state.config).map((configElement) => {
                        let configElementValue = this.state.config[configElement];
                        let configElementDescription = configElementDescriptions[configElement];
                        return (
                            <React.Fragment>
                                <input type="checkbox" onChange={(e) => {this.onConfigChange(e, configElement)}} checked={configElementValue} />&nbsp;<label>{configElementDescription}</label><br/>
                            </React.Fragment>
                        )
                    })}
                </div>
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
                    <div style={{display: "table-row"}}>
                        <div style={{display: "table-cell", padding: "10px", fontWeight: "bolder"}}>Death Counter Panel:</div>
                        <div style={{display: "table-cell", padding: "10px"}}><input type="text" value={`https://deusprogrammer.com/util/twitch-tools/death-counter?channelId=${this.state.channelId}`} style={{width: "700px"}} /></div>
                    </div>
                    <div style={{display: "table-row"}}>
                        <div style={{display: "table-cell", padding: "10px", fontWeight: "bolder"}}>Request Panel:</div>
                        <div style={{display: "table-cell", padding: "10px"}}><input type="text" value={`https://deusprogrammer.com/util/twitch-tools/requests?channelId=${this.state.channelId}`} style={{width: "700px"}} /></div>
                    </div>
                    <div style={{display: "table-row"}}>
                        <div style={{display: "table-cell", padding: "10px", fontWeight: "bolder"}}>BIRD UP:</div>
                        <div style={{display: "table-cell", padding: "10px"}}><input type="text" value={`https://deusprogrammer.com/util/twitch-tools/birdup?channelId=${this.state.channelId}`} style={{width: "700px"}} /></div>
                    </div>
                </div>
                <h3>Actions</h3>
                <button disabled={this.state.botState.running || this.state.buttonDisable} onClick={() => {this.changeBotState("start")}}>Start</button>
                <button disabled={!this.state.botState.running || this.state.buttonDisable} onClick={() => {this.changeBotState("stop")}}>Stop</button>
                <button disabled={this.state.buttonDisable} onClick={() => {this.changeBotState("restart")}}>Restart</button>
            </div>
        )
    }
}