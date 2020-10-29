import React from 'react';

import {Form, Text, Select, Option, Relevant, Checkbox} from 'informed';
import * as Yup from 'yup';

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

export default (props) => {
    return (
        <Form 
            initialValues={props.initialValues}
            getApi={props.getApi}
            onSubmit={props.onSubmit} 
            onSubmitFailure={props.onFailure}
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
                                <Text field="name"></Text>
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight: "bolder"}}>
                                Ability Description:
                            </td>
                            <td>
                                <Text field="description"></Text>
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight: "bolder"}}>
                                AP Cost:
                            </td>
                            <td>
                                <Text field="ap"></Text>
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
                                </Select>
                            </td>
                        </tr>
                        <Relevant when={({values}) => values.element && values.element !== "BUFFING"}>
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
                        <tr>
                            <td style={{fontWeight: "bolder"}}>
                                Buffs:
                            </td>
                            <td>
                                <Text field="buffs"></Text>
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight: "bolder"}}>
                                Buffs Duration (in ticks):
                            </td>
                            <td>
                                <Text field="buffsDuration" type="number"></Text>
                            </td>
                        </tr>
                    </fieldset>
                    <Relevant when={({values}) => values.element && values.element !== "BUFFING"}>
                        <fieldset>
                            <legend>Modifiers</legend>
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
                    </Relevant>
                </tbody>
            </table>
            <button type="submit">Submit</button>
        </Form>
    )
}