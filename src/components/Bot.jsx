import React from 'react';
import {Link} from 'react-router-dom';
import ApiHelper from '../utils/ApiHelper';
import {toast} from 'react-toastify';

const twitchAuthUrl = "https://id.twitch.tv/oauth2/authorize?client_id=uczfktv6o7vvdeqxnafizuq672r5od&redirect_uri=https://deusprogrammer.com/util/twitch/registration/refresh&response_type=code&scope=channel:read:redemptions%20channel:read:subscriptions%20bits:read%20channel_subscriptions";

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

        if (!tokenState.valid) {
            window.location.replace(twitchAuthUrl);
        }

        setInterval(async () => {
            tokenState = await ApiHelper.checkToken(this.state.channelId);
            botState = await ApiHelper.getBotState(this.state.channelId);
            this.setState({botState, tokenState, buttonDisable: false});

            if (!tokenState.valid) {
                window.location.replace(twitchAuthUrl);
            }
        }, 5000);
    }

    changeBotState = async (state) => {
        this.setState({buttonDisable: true});
        await ApiHelper.changeBotState(this.state.channelId, state);
        toast(`Bot ${state} successful`, {type: "info"});
    }

    onConfigChange = async (event, configItem) => {
        let config = {...this.state.config};
        config[configItem] = event.target.checked;
        await ApiHelper.updateBotConfig(this.state.channelId, config);
        toast(`Bot config saved`, {type: "info"});
        this.setState({config});
    }

    refreshAccessToken = () => {
        window.location.replace(twitchAuthUrl);
    }

    render() {
        return (
            <div>
                <h1>Your Bot</h1>
                <h3>Current State</h3>
                <div style={{marginLeft: "10px"}}>
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
                </div>
                <h3>Twitch Account Link</h3>
                <p>If you haven't run your bot in a while, you might need to reauthorize access for the bot.  If you are encountering issues with the bot starting, just click the below button.</p>
                <div style={{marginLeft: "10px"}}>
                    <div style={{display: "table"}}>
                        <div style={{display: "table-row"}}>
                            <div style={{display: "table-cell", padding: "10px", fontWeight: "bolder"}}>Valid:</div>
                            <div style={{display: "table-cell", padding: "10px"}}>{this.state.tokenState.valid ? "Yes" : "No"}</div>
                        </div>
                    </div>
                    <a href={twitchAuthUrl}>
                        <button>Refresh Authentication</button>
                    </a>
                </div>
                <h3>Bot Configuration</h3>
                <div>
                    <p>Set the below checkboxes to enable or disable certain aspects of the bot.  You cannot change these settings while the bot is running.</p>
                    <div style={{marginLeft: "10px"}}>
                    { Object.keys(this.state.config).map((configElement) => {
                        let configElementValue = this.state.config[configElement];
                        let configElementDescription = configElementDescriptions[configElement];
                        return (
                            <React.Fragment>
                                <input type="checkbox" onChange={(e) => {this.onConfigChange(e, configElement)}} checked={configElementValue} disabled={this.state.botState.running} />&nbsp;<label>{configElementDescription}</label><br/>
                            </React.Fragment>
                        )
                    })}
                    </div>
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
                        <div style={{display: "table-cell", padding: "10px", fontWeight: "bolder"}}>Soundboard:</div>
                        <div style={{display: "table-cell", padding: "10px"}}><input type="text" value={`https://deusprogrammer.com/util/twitch-tools/sound-player?channelId=${this.state.channelId}`} style={{width: "700px"}} /></div>
                    </div>
                    <div style={{display: "table-row"}}>
                        <div style={{display: "table-cell", padding: "10px", fontWeight: "bolder"}}>Animation Overlay:</div>
                        <div style={{display: "table-cell", padding: "10px"}}><input type="text" value={`https://deusprogrammer.com/util/twitch-tools/multi?channelId=${this.state.channelId}`} style={{width: "700px"}} /></div>
                    </div>
                </div>
                <h3>Panel Tools</h3>
                <div style={{marginLeft: "10px"}}>
                    <Link to={`${process.env.PUBLIC_URL}/bot/media`}><button type="button">Configure Media Pool</button></Link>
                </div>
                <h3>Actions</h3>
                <div style={{marginLeft: "10px"}}>
                    <button disabled={this.state.botState.running || this.state.buttonDisable} onClick={() => {this.changeBotState("start")}}>Start</button>
                    <button disabled={!this.state.botState.running || this.state.buttonDisable} onClick={() => {this.changeBotState("stop")}}>Stop</button>
                    <button disabled={this.state.buttonDisable} onClick={() => {this.changeBotState("restart")}}>Restart</button>
                </div>
            </div>
        )
    }
}