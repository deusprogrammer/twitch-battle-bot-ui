import React from 'react';
import {toast} from 'react-toastify';

import ApiHelper from '../utils/ApiHelper';

import AbilityForm from '../forms/AbilityForm';
import AbilityElement from '../elements/AbilityElement';

export default class AbilitiesEncyclopedia extends React.Component {
    state = {
        abilities: []
    }

    componentDidMount = async () => {
        document.title = `Abilities Encyclopedia`;
        let abilities = await ApiHelper.getAbilities();
        this.abilityTable = await ApiHelper.getAbilityTable();

        this.setState({abilities});
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Abilities List</h1>
                <div>
                    { this.state.abilities.length > 0 ? 
                    <div style={{margin: "auto"}}>
                            { ["NONE", "FIRE", "ICE", "LIGHTNING", "WATER", "EARTH", "DARK", "LIGHT", "HEALING", "BUFFING", "CLEANSING"].map((element) => {
                                let slotName = "";
                                switch (element) {
                                    case "NONE":
                                        slotName = "No Element";
                                        break;
                                    case "FIRE":
                                        slotName = "Fire Element";
                                        break;
                                    case "ICE":
                                        slotNae = "Ice Element";
                                        break;
                                    case "LIGHTNING":
                                        slotName = "Lightning Element";
                                        break;
                                    case "WATER":
                                        slotName = "Water Element";
                                        break;
                                    case "EARTH":
                                        slotName = "Earth Element";
                                        break;
                                    case "DARK":
                                        slotName = "Dark Element";
                                        break;
                                    case "LIGHT":
                                        slotName = "Light Element";
                                        break;
                                    case "HEALING":
                                        slotName = "Healing Spells";
                                        break;
                                    case "BUFFING":
                                        slotName = "Buffing Spells";
                                        break;
                                    case "CLEANSING":
                                        slotName = "Cleansing Spells";
                                        break;
                                    default:
                                }

                                return (
                                    <div>
                                        <h2>{slotName}</h2>
                                        {this.state.abilities.map((ability) => {
                                            if (element !== ability.element) {
                                                return;
                                            }

                                            return (
                                                <AbilityElement 
                                                    ability={ability} 
                                                    abilityTable={this.abilityTable} 
                                                    onGetId={(ability) => {navigator.clipboard.writeText(ability.id);toast("Copied id to clipboard", {type: "info"});}}/>
                                            )
                                        })}
                                    </div>
                                );
                            })}
                    </div> : null }
                </div>
            </div>
        )
    }
}