import React from 'react';
import {toast} from 'react-toastify';

import ApiHelper from '../utils/ApiHelper';

import AbilityForm from '../forms/AbilityForm';
import AbilityElement from '../elements/AbilityElement';

export default class Abilities extends React.Component {
    state = {
        abilities: []
    }

    componentDidMount = async () => {
        document.title = `Abilities Admin`;
        let abilities = await ApiHelper.getAbilities();
        this.abilityTable = await ApiHelper.getAbilityTable();

        this.setState({abilities});
    }

    goTo = async (selectedAbility) => {
        this.props.history.push(`${process.env.PUBLIC_URL}/abilities/${selectedAbility.id}`);
    }

    onSubmit = async (values) => {
        values.id = values.name.replaceAll(" ", "_").toUpperCase();
        values.owningChannel = window.localStorage.getItem("channel");
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
                            { ["NONE", "FIRE", "ICE", "LIGHTNING", "WATER", "EARTH", "DARK", "LIGHT", "HEALING", "BUFFING", "CLEANSING"].map((element) => {
                                return this.state.abilities.map((ability) => {
                                    if (element !== ability.element) {
                                        return;
                                    }

                                    return (
                                        <AbilityElement 
                                            ability={ability} 
                                            abilityTable={this.abilityTable} 
                                            onGetId={(ability) => {navigator.clipboard.writeText(ability.id);toast("Copied id to clipboard", {type: "info"});}} 
                                            onEdit={(ability) => {this.goTo(ability)}} />
                                    )
                                });
                            })}
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