import React from 'react';
import {toast} from 'react-toastify';

import ApiHelper from '../utils/ApiHelper';

import ItemForm from '../forms/ItemForm';
import ItemElement from '../elements/ItemElement';

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
        document.title = `Items Admin`;

        let items = await ApiHelper.getItems();
        this.abilityTable = await ApiHelper.getAbilityTable();

        items.forEach((item) => {
            if (!item.mods) {
                item.mods = {
                    hp: 0,
                    str: 0,
                    dex: 0,
                    int: 0,
                    hit: 0,
                    ac: 0
                }
            }
        })

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

        try {
            let created = await ApiHelper.createItem(values);
            toast("Item created", {type: "info"});
            this.setState({items: [...this.state.items, created]}, () => {
                this.formApi.reset();
            });
        } catch (e) {
            console.error(e);
            toast("Failed to create item", {type: "error"});
        }
    }

    handleFailure = (errors) => {
        console.error("Failed to create item!");
        toast("Failed to create item", {type: "error"});
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Item Admin Console</h1>
                <div>
                    { this.state.items.length > 0 ? 
                    <div style={{float: "left"}}>
                        <h2>Item List</h2>
                        { ["HAND", "OFFHAND", "HEAD", "BODY", "ARMS", "LEGS", "ACCESSORY", "INVENTORY", "DIGITAL", "PHYSICAL"].map((slot) => {
                            return this.state.items.map((item) => {
                                if (item.slot.toUpperCase() !== slot) {
                                    return;
                                }
                                
                                return <ItemElement 
                                            item={item} 
                                            abilityTable={this.abilityTable} 
                                            onEdit={(item) => {this.goTo(item)}}
                                            onGetId={(item) => {navigator.clipboard.writeText(item.id);toast("Copied id to clipboard", {type: "info"});}} 
                                            />
                            })
                        })}
                    </div> : null }
                    <div style={{float: "right"}}>
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