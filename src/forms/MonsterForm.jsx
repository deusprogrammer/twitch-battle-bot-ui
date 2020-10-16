import React from 'react';

import {Form, Text, Checkbox, Select, Option, Scope} from 'informed';
import * as Yup from 'yup';
import ApiHelper from '../utils/ApiHelper';

const monsterSchema = Yup.object().shape({
    name: Yup.string()
        .required("Monster must have a name"),
    hp: Yup.number()
        .required("Monster must have hp"),        
    str: Yup.number()
        .required("Monster must have str"),
    dex: Yup.number()
        .required("Monster must have dex"),
    str: Yup.number()
        .required("Monster must have int"),
    ac: Yup.number()
        .required("Monster must have ac")
});

export default class MonsterForm extends React.Component { 
    state={
        actions: [],
        drops: [],
        abilities: [],
        items: []
    }

    componentDidMount = async () => {
        let items = await ApiHelper.getItems();
        let abilities = await ApiHelper.getAbilities();
        let actions = this.props.initialValues.actions;
        let drops = this.props.initialValues.drops;

        this.setState({abilities, items, actions, drops});
    }

    addAction = () => {
        let actions = [...this.state.actions];
        actions.push({});
        this.setState({actions});
    }

    addDrop = () => {
        let drops = [...this.state.drops];
        drops.push({});
        this.setState({drops});
    }

    render() {
        return (
            <Form 
                initialValues={this.props.initialValues}
                getApi={this.props.getApi}
                onSubmit={this.props.onSubmit} 
                onFailure={this.props.onFailure}
                validationSchema={monsterSchema}>
                <table>
                    <tbody>
                        <fieldset>
                            <legend>Basic Stats</legend>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Name:
                                </td>
                                <td>
                                    <Text field="name" />
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    HP:
                                </td>
                                <td>
                                    <Text field="hp" type="number" />
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    STR:
                                </td>
                                <td>
                                    <Text field="str" type="number" />
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    DEX:
                                </td>
                                <td>
                                    <Text field="dex" type="number" />
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    INT:
                                </td>
                                <td>
                                    <Text field="int" type="number" />
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Basic Attack Damage:
                                </td>
                                <td>
                                    <Text field="dmg" />
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    HIT:
                                </td>
                                <td>
                                    <Text field="hit" type="number" />
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bolder"}}>
                                    Armor Class:
                                </td>
                                <td>
                                    <Text field="ac" type="number" />
                                </td>
                            </tr>
                        </fieldset>
                        <fieldset>
                            <legend>Actions</legend>
                            { this.state.actions.map((action, index) => {
                                return (
                                    <fieldset key={`actions[${index}]`}>
                                        <legend>{`actions[${index}]`}</legend>
                                        <Scope scope={`actions[${index}]`}>
                                            <tr>
                                                <td style={{fontWeight: "bolder"}}>
                                                    Ability:
                                                </td>
                                                <td>
                                                    <Select field="abilityId">
                                                        <Option value={null}>{"Select an ability..."}</Option>
                                                        { this.state.abilities.map((ability) => {
                                                            return (
                                                                <Option>{ability.id}</Option>
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
                                                    <Text field="chance" type="number" initialValue={action.chance} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <button>Remove</button>
                                                </td>
                                            </tr>
                                        </Scope>
                                    </fieldset>
                                )
                            })}
                            <tr>
                                <td><button onClick={() => {this.addAction()}} type="button">Add New Action</button></td>
                            </tr>
                        </fieldset>
                        <fieldset>
                            <legend>Drops</legend>
                            { this.state.drops.map((drop, index) => {
                                return (
                                <fieldset key={`drops[${index}]`}>
                                    <legend>{`drops[${index}]`}</legend>
                                    <Scope scope={`drops[${index}]`}>
                                        <tr>
                                            <td style={{fontWeight: "bolder"}}>
                                                Item ID:
                                            </td>
                                            <td>
                                                <Select field="itemId">
                                                    <Option value={null}>{"Select an item..."}</Option>
                                                    { this.state.items.map((item) => {
                                                        return (
                                                            <Option>{item.id}</Option>
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
                                                <Text field="chance" type="number" initialValue={drop.chance} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{fontWeight: "bolder"}}>
                                                Only One:
                                            </td>
                                            <td>
                                                <Checkbox field="onlyOne" initialValue={drop.chance} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <button>Remove</button>
                                            </td>
                                        </tr>
                                    </Scope>
                                </fieldset>
                                )
                            })}
                            <tr>
                                <td><button onClick={() => {this.addDrop()}} type="button">Add New Drop</button></td>
                            </tr>
                        </fieldset>
                    </tbody>
                </table>
                <button type="submit">Submit</button>
            </Form>
        )
    }
}