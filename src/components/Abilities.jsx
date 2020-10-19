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
        let created = await ApiHelper.createAbility(values);

        toast("Ability created!", {type: "info"});

        this.setState({abilities: [...this.state.abilities, created]}, () => {
            this.formApi.reset();
        });
    }

    onError = (error) => {
        toast("Failed to create ability!", {type: "error"});
        console.log(error);
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
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.abilities.map((ability) => {
                                        return (
                                            <tr 
                                                key={`ability-${ability.id}`} 
                                                onClick={() => {this.goTo(ability)}}
                                                style={{cursor: "pointer"}}>
                                                    <td>{ability.id}</td>
                                                    <td>{ability.name}</td>
                                                    <td>{ability.dmg}</td>
                                                    <td>{ability.target}</td>
                                                    <td>{ability.area}</td>
                                                    <td>{ability.element}</td>
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