import React from 'react';
import {toast} from 'react-toastify';

import ApiHelper from '../utils/ApiHelper';

import AbilityForm from '../forms/AbilityForm';

export default class Abilities extends React.Component {
    state = {
        abilities: []
    }

    componentDidMount = async () => {
        document.title = `Abilities Admin`;
        let abilities = await ApiHelper.getAbilities();

        this.setState({abilities});
    }

    goTo = async (selectedAbility) => {
        this.props.history.push(`${process.env.PUBLIC_URL}/abilities/${selectedAbility.id}`);
    }

    onSubmit = async (values) => {
        values.id = values.name.replaceAll(" ", "_").toUpperCase();
        try {
            let created = await ApiHelper.createAbility(values);
            toast("Ability created!", {type: "info"});
            this.setState({abilities: [...this.state.abilities, created]}, () => {
                this.formApi.reset();
            });
        } catch (e) {
            console.error(e);
            toast("Failed to create ability!", {type: "error"});
        }
    }

    onError = (error) => {
        console.error("Failed to create ability!");
        toast("Failed to create ability!", {type: "error"});
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Abilities List</h1>
                <div>
                    <div style={{float: "left"}}>
                        <h2>Abilities List</h2>
                        {this.state.abilities.length > 0 ?
                            <table style={{marginLeft: "10px"}}>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>AP Cost</th>
                                        <th>Damage</th>
                                        <th>Damage Stat</th>
                                        <th>Hit Modifier</th>
                                        <th>Ignore Damage Mod</th>
                                        <th>Target</th>
                                        <th>Area</th>
                                        <th>Element</th>
                                        <th>HP Mod</th>
                                        <th>STR Mod</th>
                                        <th>DEX Mod</th>
                                        <th>INT Mod</th>
                                        <th>HIT Mod</th>
                                        <th>AC Mod</th>
                                        <th>Buffs</th>
                                        <th>Duration</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.abilities.map((ability) => {
                                        return (
                                            <tr 
                                                title={ability.description}
                                                key={`ability-${ability.id}`}>
                                                    <td style={{backgroundColor: "black", color: "white"}}>{ability.id}</td>
                                                    <td>{ability.name}</td>
                                                    <td>{ability.ap}</td>
                                                    <td>{ability.dmg}</td>
                                                    <td>{ability.dmgStat}</td>
                                                    <td>{ability.toHitStat}</td>
                                                    <td>{ability.ignoreDamageMods} ? "Yes" : "No"</td>
                                                    <td>{ability.target}</td>
                                                    <td>{ability.area}</td>
                                                    <td>{ability.element}</td>
                                                    <td style={{textAlign: "center"}}>{ability.mods.hp}</td>
                                                    <td style={{textAlign: "center"}}>{ability.mods.str}</td>
                                                    <td style={{textAlign: "center"}}>{ability.mods.dex}</td>
                                                    <td style={{textAlign: "center"}}>{ability.mods.int}</td>
                                                    <td style={{textAlign: "center"}}>{ability.mods.hit}</td>
                                                    <td style={{textAlign: "center"}}>{ability.mods.ac}</td>
                                                    <td style={{textAlign: "center"}}>{ability.buffs}</td>
                                                    <td style={{textAlign: "center"}}>{ability.buffsDuration}</td>
                                                    <td>
                                                        <button onClick={() => {this.goTo(ability)}}>Edit</button>
                                                        <button onClick={() => {navigator.clipboard.writeText(ability.id);toast("Copied id to clipboard", {type: "info"});}}>Get Id</button>
                                                    </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table> : null }
                    </div>
                    <div style={{float: "right"}}>
                        <h2>Create New Ability</h2>
                        <AbilityForm
                            getApi={formApi => this.formApi = formApi}
                            onSubmit={this.onSubmit}
                            onFailure={this.onError}
                            />
                    </div>
                </div>
            </div>
        )
    }
}