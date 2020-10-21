import React from 'react';
import {toast} from 'react-toastify';

import ApiHelper from '../utils/ApiHelper';

export default class Battler extends React.Component {
    state = {
        user: null,
        saving: false
    };

    rollDice = (dice) => {
        let tokens = dice.split("d");
        let total = 0;
        for (var i = 0; i < tokens[0]; i++) {
          total += Math.floor(Math.random() * Math.floor(tokens[1])) + 1;
        }
        return total;
    }

    damageRange = (user) => {
        console.log(JSON.stringify(user, null, 5));
        let tokens = user.equipment.hand.dmg.split("d");
        return {low: (tokens[0] * 1) + user.str, high: (tokens[0] * tokens[1]) + user.str};
    }

    getUser = async (username) => {
        let itemTable = await ApiHelper.getItemTable();
        let jobTable = await ApiHelper.getJobTable();
        let abilityTable = await ApiHelper.getAbilityTable();
        let user = await ApiHelper.getUser(username);
        return ApiHelper.expandUser(user, {itemTable, jobTable, abilityTable});
    }

    equipItemOnUser = async (item, index) => {
        let user = {...this.state.user};
        let equipment = {...user.equipment};
        let inventory = [...user.inventory];

        // Update version in state
        let oldItem = equipment[item.slot];
        equipment[item.slot] = item;
        if (oldItem) {
            inventory[index] = oldItem;
        } else {
            delete inventory[index];
        }

        this.setState({saving: true}, async () => {
            // Create stripped down version for update call
            let strippedUser = {...user};
            strippedUser.totalAC = null;
            strippedUser.equipment = {};
            strippedUser.inventory = [];
            strippedUser.currentJob = {
                id: user.currentJob.id
            };

            Object.keys(equipment).forEach((slot) => {
                strippedUser.equipment[slot] = {id: equipment[slot].id};
            });
            inventory.forEach((inventoryItem) => {
                strippedUser.inventory.push(inventoryItem.id);
            });

            // Update and store updated version of user
            try {
                await ApiHelper.updateUser(strippedUser);
                let updated = await this.getUser(user.name);
                this.setState({saving: false, user: updated});
                toast(`Equipped ${item.name}`, {type: "info"});
            } catch (e) {
                console.error(e);
                toast(`Failed to equip ${item.name}`, {type: "error"});
                this.setState({saving: false});
            }
        });
    }

    sellItem = async (item, index) => {
        let user = {...this.state.user};
        let equipment = {...user.equipment};
        let inventory = [...user.inventory];

        // Remove item from inventory
        delete inventory[index];

        // Update gold
        user.gold += item.value;

        this.setState({saving: true}, async () => {
            // Create stripped down version for update call
            let strippedUser = {...user};
            strippedUser.totalAC = null;
            strippedUser.equipment = {};
            strippedUser.inventory = [];
            strippedUser.currentJob = {
                id: user.currentJob.id
            };

            Object.keys(equipment).forEach((slot) => {
                strippedUser.equipment[slot] = {id: equipment[slot].id};
            });
            inventory.forEach((inventoryItem) => {
                strippedUser.inventory.push(inventoryItem.id);
            });

            // Update and store updated version of user
            try {
                await ApiHelper.updateUser(strippedUser);
                let updated = await this.getUser(user.name);
                this.setState({saving: false, user: updated});
                toast(`Sold ${item.name}`, {type: "info"});
            } catch (e) {
                console.error(e);
                toast(`Failed to sell ${item.name}`, {type: "error"});
                this.setState({saving: false});
            }
        });
    }

    async componentDidMount() {
        let username = this.props.match.params.id;
        if (!this.props.match.params.id) {
            username = "self";
        }

        let user = await this.getUser(username);
        console.log(JSON.stringify(user, null, 5));
        this.setState({user});
    }

    render() {
        let user = this.state.user;

        if (!user) {
            return <div>Loading</div>;
        }

        return (
            <div>
                <h1>{user.name}</h1>
                <div style={{marginLeft: "50px"}}>
                    <div style={{display: "table-row"}}>
                        <div style={{display: "table-cell", paddingRight: "50px"}}>
                            <h3>Stats</h3>
                            <table style={{marginLeft: "10px"}}>
                                <tbody>
                                    <tr title="Your health points determine whether you are alive or not.  Once you hit zero, it's over." style={{cursor: "pointer"}}>
                                        <td style={{background: "teal", color: "white", fontWeight: "bolder"}}>HP</td>
                                        <td>{user.hp}/{user.maxHp}</td>
                                    </tr>
                                    <tr title="Your action points are consumed when you perform actions like attacking or using abilities." style={{cursor: "pointer"}}>
                                        <td style={{background: "teal", color: "white", fontWeight: "bolder"}}>AP</td>
                                        <td style={{textAlign: "center"}}>{user.ap}</td>
                                    </tr>
                                    <tr title="Your strength determines how hard you hit when you attack." style={{cursor: "pointer"}}>
                                        <td style={{background: "teal", color: "white", fontWeight: "bolder"}}>STR</td>
                                        <td style={{textAlign: "center"}}>{user.str}</td>
                                    </tr>
                                    <tr title="Your dexterity determines how often you can attack." style={{cursor: "pointer"}}>
                                        <td style={{background: "teal", color: "white", fontWeight: "bolder"}}>DEX</td>
                                        <td style={{textAlign: "center"}}>{user.dex}</td>
                                    </tr>
                                    <tr title="Your intelligence determines if your abilities succeed or not." style={{cursor: "pointer"}}>
                                        <td style={{background: "teal", color: "white", fontWeight: "bolder"}}>INT</td>
                                        <td style={{textAlign: "center"}}>{user.int}</td>
                                    </tr>
                                    <tr title="Your hit determines whether your attacks hit or not." style={{cursor: "pointer"}}>
                                        <td style={{background: "teal", color: "white", fontWeight: "bolder"}}>HIT</td>
                                        <td style={{textAlign: "center"}}>{user.hit}</td>
                                    </tr>
                                    <tr title="Your armor class determines how hard it is to hit you." style={{cursor: "pointer"}}>
                                        <td style={{background: "teal", color: "white", fontWeight: "bolder"}}>AC</td>
                                        <td style={{textAlign: "center"}}>{user.totalAC}</td>
                                    </tr>
                                    <tr title="Gold is used for purchasing things." style={{cursor: "pointer"}}>
                                        <td style={{background: "teal", color: "white", fontWeight: "bolder"}}>Gold</td>
                                        <td style={{textAlign: "center"}}>{user.gold}</td>
                                    </tr>
                                    <tr title="This is the range of damage you can do with your current weapon." style={{cursor: "pointer"}}>
                                        <td style={{background: "teal", color: "white", fontWeight: "bolder"}}>Damage Range</td>
                                        <td style={{textAlign: "center"}}>{this.damageRange(user).low} - {this.damageRange(user).high}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style={{display: "table-cell", paddingRight: "50px"}}>
                            <h3>Equipment</h3>
                            <table style={{marginLeft: "10px"}}>
                                <thead>
                                    <tr>
                                        <th>Slot</th>
                                        <th>Item Name</th>
                                        <th>HP Mod</th>
                                        <th>STR Mod</th>
                                        <th>DEX Mod</th>
                                        <th>INT Mod</th>
                                        <th>HIT Mod</th>
                                        <th>AC Mod</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { Object.keys(user.equipment).map((slot) => {
                                        let item = user.equipment[slot];
                                        let value = item.ac || item.dmg || item.use;
                                        return (
                                            <tr>
                                                <td style={{textAlign: "center", background: "teal", color: "white", fontWeight: "bolder"}}>{slot.toUpperCase()}</td>
                                                <td>{item.name}</td>
                                                <td style={{textAlign: "center"}}>{item.mods.hp}</td>
                                                <td style={{textAlign: "center"}}>{item.mods.str}</td>
                                                <td style={{textAlign: "center"}}>{item.mods.dex}</td>
                                                <td style={{textAlign: "center"}}>{item.mods.int}</td>
                                                <td style={{textAlign: "center"}}>{item.mods.hit}</td>
                                                <td style={{textAlign: "center"}}>{item.mods.ac}</td>
                                                <td style={{textAlign: "center"}}>{value} <strong>{(item.ac ? "AC" : null) || (item.dmg ? "DMG" : null)}</strong></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div style={{display: "table-cell", paddingRight: "50px"}}>
                            <h3>Inventory</h3>
                            <table style={{marginLeft: "10px"}}>
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Slot</th>
                                        <th>Item Name</th>
                                        <th>HP Mod</th>
                                        <th>STR Mod</th>
                                        <th>DEX Mod</th>
                                        <th>INT Mod</th>
                                        <th>HIT Mod</th>
                                        <th>AC Mod</th>
                                        <th>Value</th>
                                        <th>Price</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { user.inventory.map((item, index) => {
                                        let value = item.ac || item.dmg || item.use;
                                        return (
                                            <tr>
                                                <td style={{textAlign: "center", background: "teal", color: "white", fontWeight: "bolder"}}>{item.type.toUpperCase()}</td>
                                                <td style={{textAlign: "center", background: "teal", color: "white", fontWeight: "bolder"}}>{item.slot.toUpperCase()}</td>
                                                <td>{item.name}</td>
                                                <td style={{textAlign: "center"}}>{item.mods.hp}</td>
                                                <td style={{textAlign: "center"}}>{item.mods.str}</td>
                                                <td style={{textAlign: "center"}}>{item.mods.dex}</td>
                                                <td style={{textAlign: "center"}}>{item.mods.int}</td>
                                                <td style={{textAlign: "center"}}>{item.mods.hit}</td>
                                                <td style={{textAlign: "center"}}>{item.mods.ac}</td>
                                                <td style={{textAlign: "center"}}>{value} <strong>{(item.ac ? "AC" : null) || (item.dmg ? "DMG" : null)}</strong></td>
                                                <td style={{textAlign: "center"}}>{item.value}g</td>
                                                <td>
                                                    {item.type !== "consumable" ? <button onClick={() => {this.equipItemOnUser(item, index)}} disabled={this.state.saving}>Equip</button> : null}
                                                    {item.value > 0 ? <button onClick={() => {this.sellItem(item, index);}} disabled={this.state.saving}>Sell</button> : <button onClick={() => {this.sellItem(item, index);}} disabled={this.state.saving}>Discard</button>}
                                                    <button onClick={() => {navigator.clipboard.writeText(item.id);toast("Copied trade id to clipboard", {type: "info"});}}>Get Trade Id</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style={{display: "table-row"}}>
                        <div style={{display: "table-cell", paddingRight: "50px"}}>
                            <h3>Abilities</h3>
                            {user.abilities.length > 0 ?
                                <table style={{marginLeft: "10px"}}>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>AP Cost</th>
                                            <th>Damage</th>
                                            <th>Target</th>
                                            <th>Area</th>
                                            <th>Element</th>
                                            <th>HP Mod</th>
                                            <th>STR Mod</th>
                                            <th>DEX Mod</th>
                                            <th>INT Mod</th>
                                            <th>HIT Mod</th>
                                            <th>AC Mod</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { user.abilities.map((ability) => {
                                            return (
                                                <tr 
                                                    key={`ability-${ability.id}`}>
                                                        <td>{ability.name}</td>
                                                        <td>{ability.ap}</td>
                                                        <td>{ability.dmg}</td>
                                                        <td>{ability.target}</td>
                                                        <td>{ability.area}</td>
                                                        <td>{ability.element}</td>
                                                        <td style={{textAlign: "center"}}>{ability.mods.hp}</td>
                                                        <td style={{textAlign: "center"}}>{ability.mods.str}</td>
                                                        <td style={{textAlign: "center"}}>{ability.mods.dex}</td>
                                                        <td style={{textAlign: "center"}}>{ability.mods.int}</td>
                                                        <td style={{textAlign: "center"}}>{ability.mods.hit}</td>
                                                        <td style={{textAlign: "center"}}>{ability.mods.ac}</td>
                                                        <td>
                                                            <button onClick={() => {this.goTo(ability)}}>Edit</button>
                                                            <button onClick={() => {navigator.clipboard.writeText(ability.id);toast("Copied id to clipboard", {type: "info"});}}>Get Id</button>
                                                        </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table> : null 
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}