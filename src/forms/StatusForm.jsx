import React from 'react';

import {Form, Text, Select, Option, Relevant} from 'informed';
import * as Yup from 'yup';

const abilitySchema = Yup.object().shape({
    name: Yup.string()
        .required("Item must have a name"),
    element: Yup.string()
        .required("Item must have an element")
});

export default class StatusForm extends React.Component {
    render() {
        return (
            <Form 
                initialValues={this.props.initialValues}
                getApi={this.props.getApi}
                onSubmit={this.props.onSubmit} 
                onSubmitFailure={this.props.onFailure}
                validationSchema={abilitySchema}>
                <table>
                    <tbody>
                        <fieldset>
                            <legend>Basic Stats</legend>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Status Name:
                                </td>
                                <td>
                                    <Text field="name" />
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Status Description:
                                </td>
                                <td>
                                    <Text field="description" />
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
                                    </Select>
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
                            <Relevant when={({values}) => values.dmgStat && values.dmgStat !== "NONE"}>
                                <tr>
                                    <td style={{fontWeight: "bolder"}}>
                                        Damage per Proc:
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
                            </Relevant>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Effects:
                                </td>
                                <td>
                                    <Text field="otherEffects" />
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Effects Duration:
                                </td>
                                <td>
                                    <Text field="otherEffectsDuration" type="number" /> ticks
                                </td>
                            </tr>
                        </fieldset>
                    </tbody>
                </table>
                <button type="submit">Submit</button>
            </Form>
        )
    }
}