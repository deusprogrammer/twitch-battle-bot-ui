import React from 'react';
import {toast} from 'react-toastify';

import ApiHelper from '../utils/ApiHelper';

import ItemForm from '../forms/ItemForm';

export default class Items extends React.Component {
    state = {
        items: [
            // {
            //     "_id": "5f7e351ac1cf475d70236c15",
            //     "id": "SPACE_KNIGHT_LEGS",
            //     "type": "armor",
            //     "slot": "legs",
            //     "name": "Space Knight Legs",
            //     "ac": 8,
            //     "value": 0,
            //     "__v": 0
            // },
            // {
            //     "_id": "5f798e83afd8650738313392",
            //     "id": "POTION",
            //     "type": "consumable",
            //     "slot": "inventory",
            //     "name": "Potion",
            //     "use": "+100HP",
            //     "value": 10,
            //     "__v": 0
            // },
            // {
            //     "_id": "5f7f4b38c1cf475d70250b8d",
            //     "id": "TEQUILA_BOTTLE",
            //     "type": "weapon",
            //     "slot": "hand",
            //     "name": "Broken Tequila Bottle",
            //     "dmg": "2d4",
            //     "value": 0
            // }
        ]
    }

    componentDidMount = async () => {
        let items = await ApiHelper.getItems();

        this.setState({items});
    }

    goTo = async (selectedItem) => {
        console.log("Changing selected item to: " + selectedItem.name);
        this.props.history.push(`${process.env.PUBLIC_URL}/items/${selectedItem.id}`);
    }

    handleSubmit = async (values) => {
        values.id = values.name.replaceAll(" ", "_").toUpperCase();
        if (values.type === "consumable") {
            values.slot = "inventory";
        }
        let created = await ApiHelper.createItem(values);

        toast("Item created", {type: "info"});

        this.setState({items: [...this.state.items, created]}, () => {
            this.formApi.reset();
        });
    }

    handleFailure = async (errors) => {
        toast("Failed to create item", {type: "error"});
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Item Admin Console</h1>
                <div>
                    { this.state.items.length > 0 ? 
                    <div style={{float: "left", width: "49%"}}>
                        <h2>Item List</h2>
                        <table>
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
                                { this.state.items.map((item, index) => {
                                    let value = item.ac || item.dmg || item.use;
                                    return (
                                        <tr 
                                            key={`item-${item.id}`} 
                                            onClick={() => {this.goTo(item)}}
                                            style={{cursor: "pointer"}}>
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
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div> : null }
                    <div style={{float: "right", width: "49%"}}>
                        <h2>Create New Item</h2>
                        <ItemForm 
                            getApi={formApi => this.formApi = formApi}
                            onSubmit={(values) => {this.handleSubmit(values)}} 
                            onFailure={(errors) => {this.handleFailure(errors)}} />
                    </div>
                </div>
            </div>
        )
    }
}