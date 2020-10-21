import React from 'react';

import {Form, Text, Select, Option, Relevant} from 'informed';
import * as Yup from 'yup';

import ApiHelper from '../utils/ApiHelper';

const itemSchema = Yup.object().shape({
    name: Yup.string()
        .required("Item must have a name"),
    type: Yup.string()
        .required("Item must have a type"),
    slot: Yup.string()
        .required("Item must have a slot"),
    ac: Yup.number()
        .when("type", {
            is: "armor",
            then: Yup.number().required("If type is armor, then item needs ac")
        }),
    dmg: Yup.string()
        .when("type", {
            is: "weapon",
            then: Yup.string().required("If type is weapon, then item needs dmg")
        }),
    use: Yup.string()
        .when("type", {
            is: "consumable",
            then: Yup.string().required("If type is consumable, then item needs use")
        }),
    value: Yup.number()
        .required("Item must have a value")
});

export default class ItemForm extends React.Component {
    state = {
        abilities: [],
        skills: [],
        abilitiesAdded: [],
        skillsAdded: []
    };

    componentDidMount = async () => {
        let abilities = await ApiHelper.getAbilities();
        let abilitiesAdded = [];
        let skillsAdded = [];
        if (this.this.props.initialValues) {
            abilitiesAdded = this.this.props.initialValues.abilitiesAdded;
            skillsAdded = this.this.props.initialValues.skillsAdded;
        }

        this.setState({abilities, abilitiesAdded, skillsAdded});
    }

    addAbility = () => {
        let abilitiesAdded = [...this.state.abilitiesAdded];
        abilitiesAdded.push({});
        this.setState({abilitiesAdded});
    }

    addSkill = () => {
        let skillsAdded = [...this.state.skillsAdded];
        skillsAdded.push({});
        this.setState({skillsAdded});
    }

    render() {
        return (
            <Form 
                initialValues={this.props.initialValues}
                getApi={this.props.getApi}
                onSubmit={this.props.onSubmit} 
                onSubmitFailure={this.props.onFailure}
                validationSchema={itemSchema}>
                <table>
                    <tbody>
                        <fieldset>
                            <legend>Basic Info</legend>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Type:
                                </td>
                                <td>
                                    <Select field="type">
                                        <Option value="null">Select Item Type</Option>
                                        <Option value="weapon">WEAPON</Option>
                                        <Option value="armor">ARMOR</Option>
                                        <Option value="consumable">CONSUMABLE</Option>
                                    </Select>
                                </td>
                            </tr>
                            <Relevant when={({values}) => values.type === "weapon"}>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Slot:
                                    </td>
                                    <td>
                                        <Select field="slot">
                                            <Option value="null">Select Item Slot</Option>
                                            <Option value="hand">HAND</Option>
                                            <Option value="offhand">OFFHAND</Option>
                                        </Select>
                                    </td>
                                </tr>
                            </Relevant>
                            <Relevant when={({values}) => values.type === "armor"}>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Slot:
                                    </td>
                                    <td>
                                        <Select field="slot">
                                            <Option value="null">Select Item Slot</Option>
                                            <Option value="head">HEAD</Option>
                                            <Option value="body">BODY</Option>
                                            <Option value="arms">ARMS</Option>
                                            <Option value="legs">LEGS</Option>
                                            <Option value="accessory">ACCESSORY</Option>
                                        </Select>
                                    </td>
                                </tr>
                            </Relevant>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Item Name:
                                </td>
                                <td>
                                    <Text field="name"></Text>
                                </td>
                            </tr>
                            <Relevant when={({values}) => values.type === "weapon"}>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Damage:
                                    </td>
                                    <td>
                                        <Text field="dmg"></Text>
                                    </td>
                                </tr>
                            </Relevant>
                            <Relevant when={({values}) => values.type === "armor"}>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Armor Class:
                                    </td>
                                    <td>
                                        <Text field="ac" type="number"></Text>
                                    </td>
                                </tr>
                            </Relevant>
                            <Relevant when={({values}) => values.type === "consumable"}>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Use:
                                    </td>
                                    <td>
                                        <Text field="use"></Text>
                                    </td>
                                </tr>
                            </Relevant>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Price:
                                </td>
                                <td>
                                    <Text field="value" type="number"></Text>
                                </td>
                            </tr>
                        </fieldset>
                        <fieldset>
                            <legend>Modifiers</legend>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    HP Modifier:
                                </td>
                                <td>
                                    <Text field="mods.hp" type="number"></Text>
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Hit Modifier:
                                </td>
                                <td>
                                    <Text field="mods.hit" type="number"></Text>
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Strength Modifier:
                                </td>
                                <td>
                                    <Text field="mods.str" type="number"></Text>
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Dexterity Modifier:
                                </td>
                                <td>
                                    <Text field="mods.dex" type="number"></Text>
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Intelligence Modifier:
                                </td>
                                <td>
                                    <Text field="mods.int" type="number"></Text>
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Armor Class Modifier:
                                </td>
                                <td>
                                    <Text field="mods.ac" type="number"></Text>
                                </td>
                            </tr>
                        </fieldset>
                        <fieldset>
                            <legend>Abilities</legend>
                            { this.state.abilitiesAdded.map((abilityAdded, index) => {
                            return (
                                <fieldset key={`actions[${index}]`}>
                                    <legend>{`actions[${index}]`}</legend>
                                    <tr>
                                        <td>
                                            <Select field={`abilities[${index}]`}>
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
                                        <td>
                                            <button>Remove</button>
                                        </td>
                                    </tr>
                                </fieldset>
                            )})}
                            <tr>
                                <td><button onClick={() => {this.addAbility()}} type="button">Add New Ability</button></td>
                            </tr>
                        </fieldset>
                        {/* <fieldset>
                            <legend>Skills</legend>
                        </fieldset> */}
                    </tbody>
                </table>
                <button type="submit">Submit</button>
            </Form>
        )
    }
}