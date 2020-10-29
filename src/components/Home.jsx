import React from 'react';

export default class Home extends React.Component {
    componentDidMount = () => {
        document.title = "Welcome to Chat Battler Dungeons";
    }

    render() {
        return (
            <div style={{paddingBottom: "10px"}}>
                <h1>Welcome to Chat Battler Dungeons</h1>
                <strong>THIS IS STILL IN EARLY ACCESS!</strong>
                <p>Welcome to what I hope is a new experience in the game-ification of Twitch chat to increase interaction with followers.  Currently this bot is only used for https://twitch.tv/thetruekingofspace, but as soon as it's finished it will be available to whoever desires to use it and characters will be accessible cross-channel.</p>
                
                <h1>Getting Started</h1>

                <p>First you need to stick around long enough to get 1 channel point for the "Create Battler" channel point reward.  Or if the extension panel is available, just create one through that interface.  However if the extension isn't available you can use the below steps to create one with channel points.  This method will be removed once the extension is live.</p>

                <div style={{textAlign: "center"}}>
                    <img src={process.env.PUBLIC_URL + "/battler-step-1.png"} style={{width: "80%"}} /><br />
                    <img src={process.env.PUBLIC_URL + "/battler-step-2.png"} style={{width: "80%"}} /><br />
                    <img src={process.env.PUBLIC_URL + "/battler-step-3.png"} style={{width: "80%"}} /><br />
                </div>

                <p>Once you do this, you can check out and manage your profile here: https://deusprogrammer.com/util/twitch/battlers/~self</p>

                <p>See!  Easy peasy!  Now what can you currently do?</p>

                <h1>How Does it Work?</h1>

                <p>Well, as soon as you create your battler as layed out above, you will become visible to other players as soon as you speak or do any of the below actions.</p>

                <p>The bot or a mod will spawn monsters during the duration of the chat.  They will attack a random person or whoever has the most aggro based on who has done the most damage.  Once defeated, they will drop loot for whoever landed the last blow.</p>
                
                <h1>User Commands</h1>

                <p>You can use these commands in chat, or you can use the extension for a push button interface.</p>

                <h2>Ready yourself for battle</h2>

                <p>Mark yourself as available for battle with monsters or other players.  This state will end after 10 minutes of inactivity.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !ready<br/>
                    <br/>
                    Example:<br/>
                    !ready
                </div>

                <h2>Attack an Enemy</h2>

                <p>Attack a given target with your currently equipped weapon.  Monsters are prefixed with a ~ and use a special target identifier like ~M1 instead of a name.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !attack TARGET<br/>
                    <br/>
                    Example:<br/>
                    !attack thetruekingofspace<br/>
                    !attack ~M1
                </div>

                <h2>Use an Ability</h2>

                <p>Use an ability with a given name on a target.  If an ability targets all monsters, you may leave the target off.  Also if the ability targets a friendly target, you can leave the target off as a shortcut for yourself.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !use ABILITY_NAME [TARGET]<br/>
                    <br/>
                    Examples:<br/>
                    // Heal yourself<br/>
                    !use HEAL<br/>
                    // Heal 'other_player'<br/>
                    !use HEAL other_player<br/>
                    // Heal all other players<br/>
                    !use RESTA<br/>
                    // Tackle 'other_player'<br/>
                    !use TACKLE other_player<br/>
                    // Tackle monster identified by ~M1<br/>
                    !use TACKLE ~M1<br/>
                    // Rocket blast all monsters<br/>
                    !use ROCKET_BLAST
                </div>

                <h2>Use an Item</h2>

                <p>Use an item with a given name on a target.  If an item targets all monsters, you may leave the target off.  Also if the item targets a friendly target, you can leave the target off as a shortcut for yourself.  Items are prefixed with a #.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !user ABILITY_NAME [TARGET]<br/>
                    <br/>
                    Examples:<br/>
                    // Use potion on yourself<br/>
                    !use #POTION<br/>
                    // Use potion on 'other_player'<br/>
                    !use #POTION other_player<br/>
                    // Use mega potion on all players <br/>
                    !use #MEGA_POTION
                </div>

                <h2>Look at Stats</h2>
        
                <p>This will show your stats or the stats of a user if you provide a target.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !stats [TARGET]<br/>
                    <br/>
                    Example:<br/>
                    !stats thetruekingofspace
                </div>

                <h2>Show Targets</h2>
        
                <p>This will show all available targets in chat.  Monsters will be denoted with a ~.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !targets<br/>
                    <br/>
                    Example:<br/>
                    !targets
                </div>

                <h2>Show Abilities</h2>
        
                <p>This will show a link to go view your abilities.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !abilities<br/>
                    <br/>
                    Example:<br/>
                    !abilities
                </div>

                <h2>Give an Item to another Character</h2>
        
                <p>This will give an item to a user.  You must have it in your inventory however.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !give ITEM_ID TARGET<br/>
                    <br/>
                    Example:<br/>
                    !give POTION thetruekingospace
                </div>

                <h2>Explore</h2>
        
                <p>Explore the dungeon and find monsters to fight and occasional treasure and gold.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !explore<br/>
                    <br/>
                    Example:<br/>
                    !explore
                </div>

                <h1>Mod Commands</h1>

                <h2>Spawn a Monster</h2>

                <p>Spawns a monster with a given id.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !spawn MONSTER_ID<br/>
                    <br/>
                    Example:<br/>
                    !spawn SLIME
                </div>

                <h2>Turn an Annoying Chatter into a Slime</h2>

                <p>Converts a chat user into a slime who is banned once they die.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !transmog TARGET<br/>
                    <br/>
                    Example:<br/>
                    !transmog get_affiliated_now
                </div>

                <h2>Turn a Chatter back into a Human</h2>

                <p>Converts a chat user back into a chatter from a slime.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !untransmog TARGET<br/>
                    <br/>
                    Example:<br/>
                    !untransmog get_affiliated_now
                </div>

                <h2>Gift an Item to a User</h2>

                <p>Gift any item to a user even if you don't have it in your inventory.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !gift ITEM_ID TARGET<br/>
                    <br/>
                    Example:<br/>
                    !gift VIRTUOUS_CONTRACT thetruekingospace
                </div>

                <h2>Refresh Cache</h2>

                <p>After updating the database, use this command to refresh the cache on the bot.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !refresh<br/>
                    <br/>
                    Example:<br/>
                    !refresh
                </div>

                <h2>Reset Encounters</h2>

                <p>Reset the encounter table to clear all monsters in case of a malfunction.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !reset<br/>
                    <br/>
                    Example:<br/>
                    !reset
                </div>

                <h2>Change Bot Configuration</h2>

                <p>Change a config value on the bot.  Currently the two config items are 'verbosity' and 'maxEncounters'</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !config CONFIG_KEY CONFIG_VALUE<br/>
                    <br/>
                    Example:<br/>
                    !config verbosity verbose<br/>
                    !config verbosity simple<br/>
                    !config maxEncounters 4
                </div>

                <h2>Shut Down Bot</h2>

                <p>Turn off the bot.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !shutdown<br/>
                    OR<br/>
                    !goodnight<br/>
                    <br/>
                    Example:<br/>
                    !shutdown<br/>
                    !goodnight
                </div>
            </div>
        );
    }
}