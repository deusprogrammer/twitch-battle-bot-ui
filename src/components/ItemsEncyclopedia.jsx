import React from 'react';
import {toast} from 'react-toastify';

import ApiHelper from '../utils/ApiHelper';

import ItemElement from '../elements/ItemElement';

export default class ItemsEncyclopedia extends React.Component {
    state = {
        items: [
        ]
    }

    componentDidMount = async () => {
        document.title = `Items Encyclopedia`;
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
        });

        this.setState({items});
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Item Encyclopedia</h1>
                <div className="item-grid">
                    { this.state.items.length > 0 ? 
                    <div style={{margin: "auto"}}>
                        { ["HAND", "OFFHAND", "HEAD", "BODY", "ARMS", "LEGS", "ACCESSORY", "INVENTORY"].map((slot) => {
                            let slotName = "";
                            switch (slot) {
                                case "HAND":
                                    slotName = "Weapons";
                                    break;
                                case "OFFHAND":
                                    slotName = "Offhand Weapons";
                                    break;
                                case "HEAD":
                                    slotName = "Head Armor";
                                    break;
                                case "BODY":
                                    slotName = "Body Armor";
                                    break;
                                case "ARMS":
                                    slotName = "Arm Armor";
                                    break;
                                case "LEGS":
                                    slotName = "Leg Armor";
                                    break;
                                case "ACCESSORY":
                                    slotName = "Accessories";
                                    break;
                                case "INVENTORY":
                                    slotName = "Items";
                                    break;
                                default:
                            }
                            return ( 
                            <div>
                                <h2>{slotName}</h2>
                                {this.state.items.map((item) => {
                                    if (item.slot.toUpperCase() !== slot) {
                                        return;
                                    }
                                    
                                    return <ItemElement 
                                                item={item} 
                                                abilityTable={this.abilityTable}
                                                onGetId={(item) => {navigator.clipboard.writeText(item.id);toast("Copied id to clipboard", {type: "info"});}} 
                                                />
                                })}
                            </div>
                            )
                        })}
                    </div> : null }
                </div>
            </div>
        )
    }
}