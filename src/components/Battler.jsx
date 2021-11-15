import React from 'react';
import ReactToolTip from 'react-tooltip';
import {toast} from 'react-toastify';
import ItemElement from '../elements/ItemElement';
import AbilityElement from '../elements/AbilityElement';

import ApiHelper from '../utils/ApiHelper';

const iconMap = {
    HAND: `${process.env.PUBLIC_URL}/icons/weapon-icon.png`,
    OFFHAND: `${process.env.PUBLIC_URL}/icons/weapon-icon.png`,
    HEAD: `${process.env.PUBLIC_URL}/icons/head-icon.png`,
    ARMS: `${process.env.PUBLIC_URL}/icons/arms-icon.png`,
    BODY: `${process.env.PUBLIC_URL}/icons/body-icon.png`,
    LEGS: `${process.env.PUBLIC_URL}/icons/legs-icon.png`,
    ACCESSORY: `${process.env.PUBLIC_URL}/icons/accessory-icon.png`,
    MIKU: `${process.env.PUBLIC_URL}/icons/key-item-icon.png`,
    MONSTER: `${process.env.PUBLIC_URL}/icons/key-item-icon.png`,
    DIGITAL: `${process.env.PUBLIC_URL}/icons/sealed-item-icon.png`,
    PHYSICAL: `${process.env.PUBLIC_URL}/icons/sealed-item-icon.png`,
    CONSUMABLE: `${process.env.PUBLIC_URL}/icons/consumable-icon.png`
}

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
        if (!user.equipment.hand) {
            return {low: 1, high: 1 + user.str};
        }
        let tokens = user.equipment.hand.dmg.split("d");
        return {low: (tokens[0] * 1) + user.str, high: (tokens[0] * tokens[1]) + user.str};
    }

    getUser = async (username) => {
        let itemTable = this.itemTable = await ApiHelper.getItemTable();
        let jobTable = this.jobTable = await ApiHelper.getJobTable();
        let abilityTable = this.abilityTable = await ApiHelper.getAbilityTable();
        let user = await ApiHelper.getUser(username);
        return ApiHelper.expandUser(user, {itemTable, jobTable, abilityTable});
    }

    equipItemOnUser = async (item) => {
        this.setState({saving: true}, async () => {
            // Update and store updated version of user
            try {
                await ApiHelper.equipItem(this.state.user.name, item.id);
                let updated = await this.getUser(this.state.user.name);
                this.setState({saving: false, user: updated});
                toast(`Equipped ${item.name}`, {type: "info"});
            } catch (e) {
                console.error(e);
                toast(`Failed to equip ${item.name}, please refresh and try again.`, {type: "error"});
                this.setState({saving: false});
            }
        });
    }

    unequipItem = async (item) => {
        this.setState({saving: true}, async () => {
            // Update and store updated version of user
            try {
                await ApiHelper.unequipItem(this.state.user.name, item.id);
                let updated = await this.getUser(this.state.user.name);
                this.setState({saving: false, user: updated});
                toast(`Unequipped ${item.name}`, {type: "info"});
            } catch (e) {
                console.error(e);
                toast(`Failed to equip ${item.name}, please refresh and try again.`, {type: "error"});
                this.setState({saving: false});
            }
        });
    }

    sellItem = async (item) => {
        this.setState({saving: true}, async () => {
            // Update and store updated version of user
            try {
                await ApiHelper.sellItem(this.state.user.name, item.id);
                let updated = await this.getUser(this.state.user.name);
                this.setState({saving: false, user: updated});
                toast(`Sold ${item.name}`, {type: "info"});
            } catch (e) {
                console.error(e);
                toast(`Failed to sell ${item.name}, please refresh and try again.`, {type: "error"});
                this.setState({saving: false});
            }
        });
    }

    async componentDidMount() {
        window.onblur = function() {window.onfocus = function () {window.location.reload(true)}};

        let username = this.props.match.params.id;
        if (!this.props.match.params.id) {
            username = "self";
        }

        document.title = `Battler for ${username}`;

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
                <div className="container-fluid">
                    <h1>{user.name}</h1>
                    <div className="row">
                        <div className="col-md-2">
                            <h3>Stats</h3>
                            <table>
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
                        <div className="col-md-3">
                            <h3>Equipment</h3>
                            <table>
                                    { ["HAND", "HEAD", "ARMS", "BODY", "LEGS", "ACCESSORY"].map((slot) => {
                                        let item = user.equipment[slot.toLowerCase()];
                                        let icon = <img src={iconMap[slot]} />;
                                        if (!item) {
                                            return (
                                                <tr style={{height: "40px"}}>
                                                    <td style={{textAlign: "center"}}>{icon}</td>
                                                    <td>None</td>
                                                    <td></td>
                                                </tr>
                                            )
                                        }
                                        return (
                                            <React.Fragment>
                                                <tr 
                                                    data-tip 
                                                    data-for={`${item.slot}-tip`}
                                                    style={{cursor: "pointer", height: "40px"}}>
                                                        <td style={{textAlign: "center"}}>{icon}</td>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            <button type="button" class="btn btn-primary" onClick={() => {this.unequipItem(item)}}>Unequip</button>
                                                        </td>
                                                </tr>
                                                <ReactToolTip id={`${item.slot}-tip`} place="right" effect="solid" clickable={true} delayHide={500} delayShow={500} delayUpdate={500}>
                                                    <ItemElement 
                                                        item={item} 
                                                        abilityTable={this.abilityTable} />
                                                </ReactToolTip>
                                            </React.Fragment>
                                        )
                                    })}
                            </table>
                        </div>
                        <div className="col-md-3">
                            <h3>Abilities</h3>
                            {user.abilities.length > 0 ?
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>AP Cost</th>
                                            <th>Element</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { ["NONE", "FIRE", "ICE", "LIGHTNING", "WATER", "EARTH", "DARK", "LIGHT", "HEALING", "BUFFING", "CLEANSING"].map((element) => {
                                            return user.abilities.map((ability) => {
                                                if (element !== ability.element) {
                                                    return;
                                                }

                                                return (
                                                    <React.Fragment>
                                                        <tr data-tip
                                                            data-for={`${ability.id}-tip`}
                                                            style={{cursor: "pointer"}}
                                                            key={`ability-${ability.id}`}>
                                                                <td>{ability.name}</td>
                                                                <td>{ability.ap}</td>
                                                                <td>{ability.element}</td>
                                                                <td>
                                                                    <button type="button" class="btn btn-primary" onClick={() => {navigator.clipboard.writeText(ability.id);toast("Copied id to clipboard", {type: "info"});}}>Get Id</button>
                                                                </td>
                                                        </tr>
                                                        <ReactToolTip id={`${ability.id}-tip`} place="right" effect="solid" clickable={true} delayHide={500} delayShow={500} delayUpdate={500}>
                                                            <AbilityElement 
                                                                ability={ability} 
                                                                abilityTable={this.abilityTable} />
                                                        </ReactToolTip>
                                                    </React.Fragment>
                                                )
                                            })
                                        })}
                                    </tbody>
                                </table> : null 
                            }
                        </div>
                        <div className="col-md-4">
                            <h3>Inventory</h3>
                            <table>
                                { ["HAND", "OFFHAND", "HEAD", "BODY", "ARMS", "LEGS", "ACCESSORY", "INVENTORY", "MIKU", "MONSTER", "DIGITAL", "PHYSICAL"].map((slot) => {
                                    return Object.keys(user.condensedInventory).map((itemKey) => {
                                        const item = user.condensedInventory[itemKey].item;
                                        const count = user.condensedInventory[itemKey].count;
                                        let icon = <img src={iconMap[slot]} />;
                                        if (item.slot.toUpperCase() !== slot) {
                                            return;
                                        }
                                        return (
                                            <React.Fragment>
                                                <tr 
                                                    data-tip 
                                                    data-for={`${item.id}-inv-tip`}
                                                    style={{cursor: "pointer"}}>
                                                        <td style={{textAlign: "center"}}>{icon}</td>
                                                        <td>{item.name}</td>
                                                        <td>{count}</td>
                                                        <td>
                                                            {item.slot !== "INVENTORY" ? <button type="button" class="btn btn-primary" onClick={() => {this.equipItemOnUser(item)}}>Equip</button> : null}
                                                            <button type="button" class="btn btn-primary" onClick={() => {this.sellItem(item)}}>Sell</button>
                                                        </td>
                                                </tr>
                                                <ReactToolTip id={`${item.id}-inv-tip`} place="left" effect="solid" clickable={true} delayHide={500} delayShow={500} delayUpdate={500}>
                                                    <ItemElement 
                                                        item={item} 
                                                        abilityTable={this.abilityTable} />
                                                </ReactToolTip>
                                            </React.Fragment>
                                        )
                                    })}
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}