import React from 'react';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome to Twitch Battle Bot</h1>
                <p>THIS IS STILL IN EARLY ACCESS!</p>
                <p>Welcome to what I hope is a new experience in the game-ification of Twitch chat to increase interaction with followers.  Currently this bot is only used for https://twitch.tv/thetruekingofspace, but as soon as it's finished it will be available to whoever desires to use it and characters will be accessible cross-channel.</p>
                <p>Currently all the bot supports is:</p>
                <ul>
                    <li>Character Creation via Channel Point Redemption</li>
                    <li>Charging AP (action points) to unlock chat actions.</li>
                    <li>PVP Battling via Chat Window Commands</li>
                    <li>Equipment/Inventory Management via this UI</li>
                </ul>
                <p>Eventually the following will be implemented:</p>
                <ul>
                    <li>Abilities and Spells</li>
                    <li>Fighting Monsters that Spawn in Chat</li>
                    <li>Fighting Big monsters that Spawn During Channel Breaks and During the Stream Itself</li>
                    <li>Loot Drops, Including Super Rares that only one Viewer Will Recieve...EVER</li>
                    <li>Custom Abilities for VIP's and Subscribers</li>
                </ul>
            </div>
        );
    }
}