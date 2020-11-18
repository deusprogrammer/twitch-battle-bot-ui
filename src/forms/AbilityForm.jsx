import React from 'react';

import {Form, Text, Select, Option, Relevant, Checkbox, Scope} from 'informed';
import * as Yup from 'yup';

import ApiHelper from '../utils/ApiHelper';

const abilitySchema = Yup.object().shape({
    name: Yup.string()
        .required("Item must have a name"),
    dmg: Yup.string()
        .required("Ability must have dmg"),
    target: Yup.string()
        .required("Ability must have target"),
    area: Yup.string()
        .required("Item must have an area"),
    element: Yup.string()
        .required("Item must have an element")
});

export default class AbilityForm extends React.Component {
    state = {
        triggers: []
    }

    componentDidMount = async () => {
        let abilities = await ApiHelper.getAbilities();
        let triggers = [];
        if (this.props.initialValues) {
            triggers = this.props.initialValues.triggers;
        }

        this.setState({abilities, triggers});
    }

    addTrigger = () => {
        let triggers = [...this.state.triggers];
        triggers.push({});
        this.setState({triggers});
    }

    removeTrigger = (index) => {
        let triggers = [...this.state.triggers];
        triggers.splice(index, 1);
        this.setState({triggers});
    }

    render() {
        return (
            <Form 
                initialValues={this.props.initialValues}
                getApi={this.props.getApi}
                onSubmit={(values) => {console.log("SUBMITTING"); this.props.onSubmit(values)}} 
                onSubmitFailure={this.props.onFailure}
                validationSchema={abilitySchema}>
                <table>
                    <tbody>
                        <fieldset>
                            <legend>Basic Stats</legend>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Ability Name:
                                </td>
                                <td>
                                    <Text field="name" />
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Ability Description:
                                </td>
                                <td>
                                    <Text field="description" />
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    AP Cost:
                                </td>
                                <td>
                                    <Text field="ap" />
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Element:
                                </td>
                                <td>
                                    <Select field="element">
                                        <Option value={null}>Select Element Type</Option>
                                        <Option value="NONE">NONE</Option>
                                        <Option value="FIRE">FIRE</Option>
                                        <Option value="ICE">ICE</Option>
                                        <Option value="WATER">WATER</Option>
                                        <Option value="EARTH">EARTH</Option>
                                        <Option value="LIGHTNING">LIGHTNING</Option>
                                        <Option value="DARK">DARK</Option>
                                        <Option value="LIGHT">LIGHT</Option>
                                        <Option value="HEALING">HEALING</Option>
                                        <Option value="BUFFING">BUFFING</Option>
                                        <Option value="CLEANSING">CLEANSING</Option>
                                    </Select>
                                </td>
                            </tr>
                            <Relevant when={({values}) => values.element && !["BUFFING", "CLEANSING"].includes(values.element)}>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Damage:
                                    </td>
                                    <td>
                                        <Text field="dmg" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Proc Time:
                                    </td>
                                    <td>
                                        <Text field="procTime" /> ticks
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Max Procs:
                                    </td>
                                    <td>
                                        <Text field="maxProcs" /> times
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Damage Stat:
                                    </td>
                                    <td>
                                        <Select field="dmgStat">
                                            <Option value={null}>NONE</Option>
                                            <Option value={"AP"}>AP</Option>
                                            <Option value={"HP"}>HP</Option>
                                            <Option value={"Gold"}>Gold</Option>
                                        </Select>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Hit Modifier Stat:
                                    </td>
                                    <td>
                                        <Select field="toHitStat">
                                            <Option value={null}>NONE</Option>
                                            <Option value={"AP"}>AP</Option>
                                            <Option value={"HP"}>HP</Option>
                                            <Option value={"STR"}>STR</Option>
                                            <Option value={"DEX"}>DEX</Option>
                                            <Option value={"INT"}>INT</Option>
                                            <Option value={"HIT"}>HIT</Option>
                                            <Option value={"Gold"}>Gold</Option>
                                        </Select>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Ignore Damage Modifiers:
                                    </td>
                                    <td>
                                        <Checkbox field="ignoreDamageMods"/>
                                    </td>
                                </tr>
                            </Relevant>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Target:
                                </td>
                                <td>
                                    <Select field="target">
                                        <Option value={null}>Select Target Type</Option>
                                        <Option value={"ENEMY"}>ENEMY</Option>
                                        <Option value={"CHAT"}>CHAT</Option>
                                        <Option value={"ANY"}>ANY</Option>
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Area:
                                </td>
                                <td>
                                    <Select field="area">
                                        <Option value={null}>Select Area Type</Option>
                                        <Option value={"ALL"}>ALL</Option>
                                        <Option value={"ONE"}>ONE</Option>
                                    </Select>
                                </td>
                            </tr>
                            <Relevant when={({values}) => values.element && ["BUFFING"].includes(values.element)}>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Buffs:
                                    </td>
                                    <td>
                                        <Text field="buffs" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Buffs Duration:
                                    </td>
                                    <td>
                                        <Text field="buffsDuration" type="number" /> ticks
                                    </td>
                                </tr>
                            </Relevant>
                            <Relevant when={({values}) => values.element && ["CLEANSING"].includes(values.element)}>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Cleanses:
                                    </td>
                                    <td>
                                        <Text field="buffs"/>
                                    </td>
                                </tr>
                            </Relevant>
                        </fieldset>
                        <fieldset>
                            <legend>Triggers</legend>
                            { this.state.triggers.map((trigger, index) => {
                                return (
                                    <fieldset key={`triggers[${index}]`}>
                                        <legend>{`triggers[${index}]`}</legend>
                                        <Scope scope={`triggers[${index}]`}>
                                            <tr>
                                                <td style={{fontWeight: "bolder"}}>
                                                    Ability:
                                                </td>
                                                <td>
                                                    <Select field="abilityId">
                                                        <Option value={null}>{"Select an ability..."}</Option>
                                                        { this.state.abilities.map((ability) => {
                                                            return (
                                                                <Option value={ability.id}>{ability.name}</Option>
                                                            )
                                                        })}
                                                    </Select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{fontWeight: "bolder"}}>
                                                    Chance:
                                                </td>
                                                <td>
                                                    <Text field="chance" type="number" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <button type="button" class="btn btn-primary" onClick={() => this.removeTrigger(index)}>Remove</button>
                                                </td>
                                            </tr>
                                        </Scope>
                                    </fieldset>
                                )
                            })}
                            <tr>
                                <td><button type="button" class="btn btn-primary" onClick={() => {this.addTrigger()}}>Add New Trigger</button></td>
                            </tr>
                        </fieldset>
                        <Relevant when={({values}) => values.element && !["BUFFING", "CLEANSING"].includes(values.element)}>
                            <fieldset>
                                <legend>Modifiers</legend>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Hit Modifier:
                                    </td>
                                    <td>
                                        <Text field="mods.hit" type="number" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Strength Modifier:
                                    </td>
                                    <td>
                                        <Text field="mods.str" type="number" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Intelligence Modifier:
                                    </td>
                                    <td>
                                        <Text field="mods.int" type="number" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Armor Class Modifier:
                                    </td>
                                    <td>
                                        <Text field="mods.ac" type="number" />
                                    </td>
                                </tr>
                            </fieldset>
                        </Relevant>
                    </tbody>
                </table>
                <button class="btn btn-primary" type="submit">Submit</button>
            </Form>
        )
    }
}