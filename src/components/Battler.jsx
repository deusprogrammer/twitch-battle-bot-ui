import React from 'react';

import ApiHelper from '../utils/ApiHelper';

export default class Battler extends React.Component {
    state = {
        user: {
            currentJob: {}, 
            equipment: {}, 
            inventory: []
        }, 
        users: [],
        saving: false
    };

    getUser = async (username) => {
        let itemTable = await ApiHelper.getItemTable();
        let jobTable = await ApiHelper.getJobTable();
        let user = await ApiHelper.getUser(username);
        return ApiHelper.expandUser(user, {itemTable, jobTable});
        // return ApiHelper.recalculateStats(user);
    }

    equipItemOnUser = async (item, index) => {
        let user = {...this.state.user};
        let equipment = {...user.equipment};
        let inventory = [...user.inventory];

        // Update version in state
        let oldItem = equipment[item.slot];
        equipment[item.slot] = item;
        inventory[index] = oldItem;

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
            inventory.forEach((item) => {
                strippedUser.inventory.push(item.id);
            });

            // Update and store updated version of user
            await ApiHelper.updateUser(strippedUser);
            let updated = await this.getUser(user.name);
            this.setState({saving: false, user: updated});
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
            inventory.forEach((item) => {
                strippedUser.inventory.push(item.id);
            });

            // Update and store updated version of user
            await ApiHelper.updateUser(strippedUser);
            let updated = await this.getUser(user.name);
            this.setState({saving: false, user: updated});
        });
    }

    async componentDidMount() {
        let username = this.props.match.params.id;
        if (!this.props.match.params.id) {
            username = "self";
        }

        let user = await this.getUser(username);
        let users = await ApiHelper.getUsers();
        console.log(JSON.stringify(user, null, 5));
        this.setState({user, users});
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
                                    <tr>
                                        <td style={{background: "teal", color: "white", fontWeight: "bolder"}}>HP</td>
                                        <td>{user.hp}/{user.currentJob.hp}</td>
                                    </tr>
                                    <tr>
                                        <td style={{background: "teal", color: "white", fontWeight: "bolder"}}>AP</td>
                                        <td style={{textAlign: "center"}}>{user.ap}</td>
                                    </tr>
                                    <tr>
                                        <td style={{background: "teal", color: "white", fontWeight: "bolder"}}>STR</td>
                                        <td style={{textAlign: "center"}}>{user.str}</td>
                                    </tr>
                                    <tr>
                                        <td style={{background: "teal", color: "white", fontWeight: "bolder"}}>DEX</td>
                                        <td style={{textAlign: "center"}}>{user.dex}</td>
                                    </tr>
                                    <tr>
                                        <td style={{background: "teal", color: "white", fontWeight: "bolder"}}>INT</td>
                                        <td style={{textAlign: "center"}}>{user.int}</td>
                                    </tr>
                                    <tr>
                                        <td style={{background: "teal", color: "white", fontWeight: "bolder"}}>HIT</td>
                                        <td style={{textAlign: "center"}}>{user.hit}</td>
                                    </tr>
                                    <tr>
                                        <td style={{background: "teal", color: "white", fontWeight: "bolder"}}>AC</td>
                                        <td style={{textAlign: "center"}}>{user.totalAC}</td>
                                    </tr>
                                    <tr>
                                        <td style={{background: "teal", color: "white", fontWeight: "bolder"}}>Gold</td>
                                        <td style={{textAlign: "center"}}>{user.gold}</td>
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
                                        <th>Trade Id</th>
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
                                                <td title="Click to copy trade id" style={{textAlign: "center", backgroundColor: "black", color: "white", cursor: "pointer"}} onClick={() => {navigator.clipboard.writeText(item.id)}}>{item.id}</td>
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
                                                    {item.value > 0 ? <button onClick={() => {this.sellItem(item, index)}} disabled={this.state.saving}>Sell</button> : <button onClick={() => {this.sellItem(item, index)}} disabled={this.state.saving}>Discard</button>}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}