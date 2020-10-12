import React from 'react';

import {Form, Text, Select, Option, Relevant} from 'informed';
import * as Yup from 'yup';

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

export default (props) => {
    return (
        <Form 
            initialValues={props.initialValues}
            onSubmit={props.onSubmit} 
            onSubmitFailure={props.onFailure}
            validationSchema={itemSchema}>
            <table>
                <tbody>
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
                </tbody>
            </table>
            <button type="submit">Submit</button>
        </Form>
    )
}