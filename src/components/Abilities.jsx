import React from 'react';
import {toast} from 'react-toastify';

import ApiHelper from '../utils/ApiHelper';

import AbilityForm from '../forms/AbilityForm';

export default class Abilities extends React.Component {
    state = {
        abilities: []
    }

    componentDidMount = async () => {
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
                    <div style={{float: "left", width: "49%"}}>
                        <h2>Abilities List</h2>
                        {this.state.abilities.length > 0 ?
                            <table style={{marginLeft: "10px"}}>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Damage</th>
                                        <th>Target</th>
                                        <th>Area</th>
                                        <th>Element</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.abilities.map((ability) => {
                                        return (
                                            <tr 
                                                key={`ability-${ability.id}`}>
                                                    <td style={{backgroundColor: "black", color: "white"}}>{ability.id}</td>
                                                    <td>{ability.name}</td>
                                                    <td>{ability.dmg}</td>
                                                    <td>{ability.target}</td>
                                                    <td>{ability.area}</td>
                                                    <td>{ability.element}</td>
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
                    <div style={{float: "right", width: "49%"}}>
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