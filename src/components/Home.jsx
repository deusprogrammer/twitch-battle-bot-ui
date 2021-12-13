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

                <p>First you need to create a battler through the Twitch extension under the video.  Once you do this, you can check out and manage your profile here: https://deusprogrammer.com/cbd/battlers/~self</p>

                <h1>How Does it Work?</h1>

                <p>Well, as soon as you create your battler as layed out above, you will become visible to other players as soon as you perform any of the below actions.</p>

                <p>The bot or a mod will spawn monsters during the duration of the chat.  They will attack a random person or whoever has the most aggro based on who has done the most damage.  Once defeated, they will drop loot for a random participant.</p>
                
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
        
                <p>Explore the dungeon and find monsters to fight and occasional treasure and gold.  If you specify a dungeon id, you can hunt specific and rarer monsters for their loot.  Exploring costs 5AP and exploring a specific dungeon costs 10AP.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !explore [DUNGEON_ID]<br/>
                    <br/>
                    Example:<br/>
                    !explore<br/>
                    OR<br/>
                    !explore PSO
                </div>

                <h1>Mod Commands</h1>

                <h2>Spawn a Monster</h2>

                <p>Spawns a monster with a given id.  If an id isn't provided, a random monster will be spawned for whatever the currently configured dungeon is.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !spawn [MONSTER_ID]<br/>
                    <br/>
                    Example:<br/>
                    !spawn SLIME<br/>
                    OR<br/>
                    !spawn
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

                <p>Change a config value on the bot.  Currently the two config items are 'verbosity', 'currentDungeon' and 'maxEncounters'</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !config CONFIG_KEY CONFIG_VALUE<br/>
                    <br/>
                    Example:<br/>
                    !config verbosity verbose<br/>
                    !config verbosity simple<br/>
                    !config currentDungeon PSO<br/>
                    !config maxEncounters 4
                </div>

                <h2>Shut Down Bot</h2>

                <p>Turn off the bot.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !shutdown<br/>
                    <br/>
                    Example:<br/>
                    !shutdown
                </div>

                <h2>Restart Bot</h2>

                <p>Restart the bot.</p>

                <div style={{background: "gray", color: "white", paddingLeft: "5px", marginLeft: "10px"}}>
                    !restart<br/>
                    <br/>
                    Example:<br/>
                    !restart
                </div>

                <h1>Game Play Features</h1>

                <h2>Your Stats and What they Mean</h2>

                <h3>HP</h3>
                
                <p>Hit points are how much damage your character can take until you are dead.  Simple enough.</p>

                <h3>AP</h3>

                <p>Action points are used everytime you perform an action like attacking, using abilities, or exploring.</p>

                <h3>STR</h3>

                <p>Strength is how hard you hit with your weapon.  This stat adds damage each attack you perform.</p>

                <h3>DEX</h3>

                <p>How quickly you can attack.  If you have a DEX of 0 your cooldown time is 25 seconds.  At the maximum value of +5 your cool down times are 5 seconds, and negative DEX has no limit on how much it can slow you down.  In the future, DEX beyond +5 will allow for multiple attacks in one cool down period.</p>

                <h3>INT</h3>

                <p>This stat is how well you can cast magic.  Abilities can use any of these stats to specify if an ability hits or not, but magic type abilities will always rely on intelligence.</p>

                <h3>HIT</h3>

                <p>This stat is how well you can aim your attacks.  The higher this is, the more likely you are to hit your target with an attack or a non-magic ability.</p>

                <h3>AC</h3>

                <p>This stat represents how hard you are to damage.  This is generally due to how well you armor protects you.</p>

                <h2>Special Effects</h2>

                <h3>Damage Area/Target Types</h3>

                <p>Some abilities can target more than one enemy, and some can only target monsters or only players in chat.</p>

                <h3>Damage Types</h3>

                <p>Weapons and abilities can damage more than just your HP.  They can also damage (or heal) your AP or Gold.</p>

                <h3>Buffs/Debuffs</h3>

                <p>Some abilities will temporarily increase your stats and make it easier/harder to damage targets, do more/less damage to targets, act faster/slower, or be harder/easier hit.</p>

                <h3>Status Effects</h3>

                <p>Some attacks and abilities will harm your HP/AP/Gold over time.  An example of this is the poison spell that deals 1d4 every 10 seconds.</p>

                <h3>Triggered Effects</h3>

                <p>Some weapons are able to trigger abilities.  The Poop Knife for example has a 50% chance of inflicting poison.  Triggered abilities are used for free.</p>
            </div>
        );
    }
}