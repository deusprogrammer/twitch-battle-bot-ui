import React from 'react';

export default class Home extends React.Component {
    render() {
        return (
            <div style={{paddingBottom: "10px"}}>
                <h1>Welcome to Twitch Battle Bot</h1>
                <strong>THIS IS STILL IN EARLY ACCESS!</strong>
                <p>Welcome to what I hope is a new experience in the game-ification of Twitch chat to increase interaction with followers.  Currently this bot is only used for https://twitch.tv/thetruekingofspace, but as soon as it's finished it will be available to whoever desires to use it and characters will be accessible cross-channel.</p>
                
                <h1>Getting Started</h1>

                <p>First you need to stick around long enough to get enough points for the "Create Battler" channel point reward (prices vary).</p>

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

                <h2>Attack an Enemy</h2>

                <p>Attack a given target with your currently equipped weapon.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !attack TARGET<br/>
                    <br/>
                    Example:<br/>
                    !attack thetruekingofspace
                </div>

                {/* <h2>Use an Ability</h2>

                <p>Use an ability with a given name on target.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !ability ABILITY_NAME TARGET<br/>
                    <br/>
                    Example:<br/>
                    !ability @focus-attack thetruekingofspace
                </div> */}

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

                {/* <h2>Show Abilities</h2>
        
                <p>This will show all available abilities for your users.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !abilities<br/>
                    <br/>
                    Example:<br/>
                    !abilities
                </div> */}

                <h2>Give an Item to another Character</h2>
        
                <p>This will give an item to a user.  You must have it in your inventory however.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !give TARGET ITEM_ID<br/>
                    <br/>
                    Example:<br/>
                    !give thetruekingospace POTION
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

                <h2>Give an Item to a User</h2>

                <p>Give any item to a user even if you don't have it in your inventory.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                !give TARGET ITEM_ID<br/>
                    <br/>
                    Example:<br/>
                    !give thetruekingospace VIRTUOUS_CONTRACT
                </div>
            </div>
        );
    }
}