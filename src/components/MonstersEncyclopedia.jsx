import React from 'react';
import {toast} from 'react-toastify';

import ApiHelper from '../utils/ApiHelper';

export default class MonstersEncyclopedia extends React.Component {
    state = {
        monsters: [
        ]
    }

    componentDidMount = async () => {
        document.title = `Monsters Encyclopedia`;
        let monsters = await ApiHelper.getMonsters();

        this.setState({monsters});
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Monster Admin Console</h1>
                <div>
                    { this.state.monsters.length > 0 ?
                    <div style={{margin: "auto"}}>
                        <table style={{marginLeft: "10px"}}>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Dungeon</th>
                                    <th>Name</th>
                                    <th>HP</th>
                                    <th>STR</th>
                                    <th>DEX</th>
                                    <th>INT</th>
                                    <th>DMG</th>
                                    <th>HIT</th>
                                    <th>AC</th>
                                    <th>Rarity</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.monsters.map((monster) => {
                                    return (
                                        <tr 
                                        title={monster.description}
                                        key={`monster-${monster.id}`}>
                                            <td>{monster.type || "MOB"}</td>
                                            <td>{monster.dungeon}</td>
                                            <td>{monster.name}</td>
                                            <td>{monster.hp}</td>
                                            <td>{monster.str}</td>
                                            <td>{monster.dex}</td>
                                            <td>{monster.int}</td>
                                            <td>{monster.dmg}</td>
                                            <td>{monster.hit}</td>
                                            <td>{monster.ac}</td>
                                            <td>{monster.rarity}</td>
                                            <td>
                                                <button onClick={() => {navigator.clipboard.writeText(monster.id);toast("Copied id to clipboard", {type: "info"});}}>Get Id</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div> : null }
                </div>
            </div>
        )
    }
}