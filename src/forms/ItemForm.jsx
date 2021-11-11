import React from 'react';

import {Form, Text, Select, Option, Relevant, Scope} from 'informed';
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
        .required("Item must have a value"),
    rarity: Yup.number()
        .required("Monster must have rarity")
});

export default class ItemForm extends React.Component {
    state = {
        sealedItems: [],
        abilities: [],
        unlocks: [],
        skills: [],
        triggers: [],
        abilitiesAdded: [],
        unlocksAdded: [],
        skillsAdded: []
    };

    componentDidMount = async () => {
        let abilities = await ApiHelper.getAbilities();
        let unlocks = ["$speak", "$listen"];
        let sealedItems = await ApiHelper.getSealedItems(window.localStorage.getItem("channel"));
        let abilitiesAdded = [];
        let skillsAdded = [];
        let unlocksAdded = [];
        let triggers = [];
        if (this.props.initialValues) {
            abilitiesAdded = this.props.initialValues.abilities;
            skillsAdded = this.props.initialValues.skills;
            unlocksAdded = this.props.initialValues.unlocks;
            triggers = this.props.initialValues.triggers;
        }

        this.setState({sealedItems, abilities, abilitiesAdded, skillsAdded, triggers, unlocks, unlocksAdded});
    }

    addAbility = () => {
        let abilitiesAdded = [...this.state.abilitiesAdded];
        abilitiesAdded.push({});
        this.setState({abilitiesAdded});
    }

    removeAbility = (index) => {
        let abilitiesAdded = [...this.state.abilitiesAdded];
        abilitiesAdded.splice(index, 1);
        this.setState({abilitiesAdded});
    }

    addUnlock = () => {
        let unlocksAdded = [...this.state.unlocksAdded];
        unlocksAdded.push({});
        this.setState({unlocksAdded});
    }

    removeUnlock = (index) => {
        let unlocksAdded = [...this.state.unlocksAdded];
        unlocksAdded.splice(index, 1);
        this.setState({unlocksAdded});
    }

    addSkill = () => {
        let skillsAdded = [...this.state.skillsAdded];
        skillsAdded.push({});
        this.setState({skillsAdded});
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
                onSubmit={this.props.onSubmit} 
                onSubmitFailure={this.props.onFailure}>
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
                                        <Option value="gift">GIFT</Option>
                                        <Option value="sealed">SEALED CHEST</Option>
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
                            <Relevant when={({values}) => values.type === "gift"}>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Gift Receiver Type:
                                    </td>
                                    <td>
                                        <Select field="slot">
                                            <Option value="null">Select Item Slot</Option>
                                            <Option value="miku">MIKU</Option>
                                            <Option value="monster">MONSTER</Option>
                                        </Select>
                                    </td>
                                </tr>
                            </Relevant>
                            <Relevant when={({values}) => values.type === "sealed"}>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Sealed Item Type:
                                    </td>
                                    <td>
                                        <Select field="slot">
                                            <Option value="null">Select Sealed Item Type</Option>
                                            <Option value="digital">DIGITAL CODE</Option>
                                            <Option value="physical">PHYSICAL GOODS</Option>
                                        </Select>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Sealed Item ID:
                                    </td>
                                    <td>
                                        <Select field="sealedItemId">
                                            <Option value={null}>{"Select a Sealed Item..."}</Option>
                                            { this.state.sealedItems.map((sealedItem) => {
                                                return (
                                                    <Option value={sealedItem.id}>{sealedItem.name}</Option>
                                                )
                                            })}
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
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Item Description:
                                </td>
                                <td>
                                    <Text field="description"></Text>
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Dungeon:
                                </td>
                                <td>
                                    <Text field="dungeon"></Text>
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
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Damage Stat:
                                    </td>
                                    <td>
                                        <Select field="dmgStat">
                                            <Option value={null}>Select Stat Damaged</Option>
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
                                            <Option value={null}>Select To Hit Modifier</Option>
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
                                        <Select field={`use`}>
                                            <Option value={null}>{"Select an ability..."}</Option>
                                            { this.state.abilities.map((ability) => {
                                                return (
                                                    <Option value={ability.id}>{ability.name}</Option>
                                                )
                                            })}
                                        </Select>
                                    </td>
                                </tr>
                            </Relevant>
                            <Relevant when={({values}) => values.type !== "sealed"}>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Price:
                                    </td>
                                    <td>
                                        <Text field="value" type="number"></Text>
                                    </td>
                                </tr>
                            </Relevant>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Rarity:
                                </td>
                                <td>
                                    <Text field="rarity" type="number"></Text>
                                </td>
                            </tr>
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
                        <Relevant when={({values}) => !["consumable", "sealed", "gift"].includes(values.type)}>
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
                                <legend>Resistances</legend>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Fire:
                                    </td>
                                    <td>
                                        <Text field="resistances.fire" type="number"></Text>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Ice:
                                    </td>
                                    <td>
                                        <Text field="resistances.ice" type="number"></Text>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Lightning:
                                    </td>
                                    <td>
                                        <Text field="resistances.lightning" type="number"></Text>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Water:
                                    </td>
                                    <td>
                                        <Text field="resistances.water" type="number"></Text>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Earth:
                                    </td>
                                    <td>
                                        <Text field="resistances.earth" type="number"></Text>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Dark:
                                    </td>
                                    <td>
                                        <Text field="resistances.dark" type="number"></Text>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Light:
                                    </td>
                                    <td>
                                        <Text field="resistances.light" type="number"></Text>
                                    </td>
                                </tr>
                            </fieldset>
                            <fieldset>
                                <legend>Abilities</legend>
                                { this.state.abilitiesAdded.map((abilityAdded, index) => {
                                    return (
                                        <fieldset key={`abilities[${index}]`}>
                                            <legend>{`abilities[${index}]`}</legend>
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
                                                    <button type="button" class="btn btn-primary" onClick={() => this.removeAbility(index)}>Remove</button>
                                                </td>
                                            </tr>
                                        </fieldset>
                                    )})
                                }
                                <tr>
                                    <td><button type="button" class="btn btn-primary" onClick={() => {this.addAbility()}}>Add New Ability</button></td>
                                </tr>
                            </fieldset>
                            <fieldset>
                                <legend>Unlocks</legend>
                                { this.state.unlocksAdded.map((unlockAdded, index) => {
                                    return (
                                        <fieldset key={`unlocks[${index}]`}>
                                            <legend>{`unlocks[${index}]`}</legend>
                                            <tr>
                                                <td>
                                                    <Select field={`unlocks[${index}]`}>
                                                        <Option value={null}>{"Select an unlock..."}</Option>
                                                        { this.state.unlocks.map((unlock) => {
                                                            return (
                                                                <Option value={unlock}>{unlock}</Option>
                                                            )
                                                        })}
                                                    </Select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <button type="button" class="btn btn-primary" onClick={() => this.removeUnlock(index)}>Remove Unlock</button>
                                                </td>
                                            </tr>
                                        </fieldset>
                                    )})
                                }
                                <tr>
                                    <td><button type="button" class="btn btn-primary" onClick={() => {this.addUnlock()}}>Add New Unlock</button></td>
                                </tr>
                            </fieldset>
                        </Relevant>
                        {/* <fieldset>
                            <legend>Skills</legend>
                        </fieldset> */}
                    </tbody>
                </table>
                <button class="btn btn-primary" type="submit">Submit</button>
            </Form>
        )
    }
}