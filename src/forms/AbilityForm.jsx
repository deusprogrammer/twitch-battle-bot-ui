import React from 'react';

import {Form, Text, Select, Option, Relevant} from 'informed';
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
                                AP Cost:
                            </td>
                            <td>
                                <Text field="ap"></Text>
                            </td>
                        </tr>
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
                                Target:
                            </td>
                            <td>
                                <Select field="target">
                                    <Option value={null}>Select Target Type</Option>
                                    <Option>ENEMY</Option>
                                    <Option>CHAT</Option>
                                    <Option>ANY</Option>
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
                                    <Option>ALL</Option>
                                    <Option>ONE</Option>
                                </Select>
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight: "bolder"}}>
                                Element:
                            </td>
                            <td>
                                <Select field="element" initialValue="NONE">
                                    <Option>NONE</Option>
                                    <Option>FIRE</Option>
                                    <Option>ICE</Option>
                                    <Option>WATER</Option>
                                    <Option>EARTH</Option>
                                    <Option>LIGHTNING</Option>
                                    <Option>DARK</Option>
                                    <Option>LIGHT</Option>
                                    <Option>HEALING</Option>
                                    <Option>BUFFING</Option>
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
                </tbody>
            </table>
            <button type="submit">Submit</button>
        </Form>
    )
}