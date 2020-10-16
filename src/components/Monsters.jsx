import React from 'react';
import ApiHelper from '../utils/ApiHelper';

import MonsterForm from '../forms/MonsterForm';

export default class Monsters extends React.Component {
    state = {
        monsters: [
            // {
            //     "actions": [
            //         {
            //             "abilityId": "TACKLE",
            //             "chance": 1
            //         }
            //     ],
            //     "drops": [
            //         {
            //             "itemId": "POTION",
            //             "chance": 0.25,
            //             "onlyOne": false
            //         },
            //         {
            //             "itemId": "IRON_SHARD",
            //             "chance": 0.1,
            //             "onlyOne": false
            //         }
            //     ],
            //     "_id": "5f82d5b6abb4370014c3a56e",
            //     "id": "GOLEM",
            //     "name": "Golem",
            //     "hp": 25,
            //     "str": 5,
            //     "dex": -2,
            //     "int": -2,
            //     "ac": 12,
            //     "__v": 0
            // },
            // {
            //     "actions": [
            //         {
            //             "abilityId": "TACKLE",
            //             "chance": 1
            //         }
            //     ],
            //     "drops": [
            //         {
            //             "itemId": "POTION",
            //             "chance": 0.25,
            //             "onlyOne": false
            //         },
            //         {
            //             "itemId": "IRON_SHARD",
            //             "chance": 0.1,
            //             "onlyOne": false
            //         },
            //         {
            //             "itemId": "SLIME_PET",
            //             "onlyOne": true
            //         }
            //     ],
            //     "_id": "5f82d584abb4370014c3a56d",
            //     "id": "SLIME",
            //     "name": "Slime",
            //     "hp": 10,
            //     "str": -1,
            //     "dex": 0,
            //     "int": -2,
            //     "ac": 6,
            //     "__v": 0
            // }
        ]
    }

    componentDidMount = async () => {
        let monsters = await ApiHelper.getMonsters();

        this.setState({monsters});
    }

    goTo = async (selectedMonster) => {
        this.props.history.push(`${process.env.PUBLIC_URL}/monsters/${selectedMonster.id}`);
    }

    onSubmit = async (values) => {
        values.id = values.name.replaceAll(" ", "_").toUpperCase();
        let created = await ApiHelper.createMonster(values);
        // let created = values;
        this.setState({monsters: [...this.state.monsters, created]}, () => {
            this.formApi.reset();
        });
    }

    onError = async (error) => {
        alert("Form is not complete");
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Monster Admin Console</h1>
                <div>
                    { this.state.monsters.length > 0 ?
                    <div style={{float: "left", width: "49%"}}>
                        <h2>Monster List</h2>
                        <table style={{marginLeft: "10px"}}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>HP</th>
                                    <th>STR</th>
                                    <th>DEX</th>
                                    <th>INT</th>
                                    <th>DMG</th>
                                    <th>HIT</th>
                                    <th>AC</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.monsters.map((monster) => {
                                    return (
                                        <tr 
                                        key={`monster-${monster.id}`}
                                        onClick={() => {this.goTo(monster)}}
                                        style={{cursor: "pointer"}}>
                                            <td>{monster.id}</td>
                                            <td>{monster.name}</td>
                                            <td>{monster.hp}</td>
                                            <td>{monster.str}</td>
                                            <td>{monster.dex}</td>
                                            <td>{monster.int}</td>
                                            <td>{monster.dmg}</td>
                                            <td>{monster.hit}</td>
                                            <td>{monster.ac}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div> : null }
                    <div style={{float: "right", width: "49%"}}>
                        <h2>Create a New Monster</h2>
                        <MonsterForm
                            getApi={formApi => this.formApi = formApi}
                            onSubmit={this.onSubmit}
                            onSubmitFailure={this.onError} />
                    </div>
                </div>
            </div>
        )
    }
}