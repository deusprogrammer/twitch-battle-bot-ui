import React from 'react';

const twitchAuthUrl = "https://id.twitch.tv/oauth2/authorize?client_id=uczfktv6o7vvdeqxnafizuq672r5od&redirect_uri=https://deusprogrammer.com/util/twitch/registration/callback&response_type=code&scope=channel:read:redemptions%20channel:read:subscriptions%20bits:read";

export default class RegistrationStart extends React.Component {
    componentDidMount() {
        document.title = `Bot Registration`;
        window.localStorage.removeItem("accessToken");
    }

    render() {
        return (
            <div>
                <h1>Bot User Registration</h1>
                <p>This process will get the required information to create a user for you in our service as well as giving the bot access to your channel point redemption events.  The bot listens for specific rewards to be redeemed to award players Action Points (AP) that they use to perform actions.</p>
                <p>The other information we collect is your profile so we can register you in our system and use Twitch to log you in from now on to manage your assets (more on that later).</p>
                <p>Clicking the below button will redirect you to Twitch to get your permission for this data.  This data will not be used for anything other than the purpose of managing your account and giving our bot the ability to read channel point redemptions.</p>
                <a href={twitchAuthUrl}><button>Continue to Twitch</button></a>
            </div>
        )
    }
}