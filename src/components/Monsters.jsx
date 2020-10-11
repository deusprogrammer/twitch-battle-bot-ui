import React from 'react';
import ApiHelper from '../utils/ApiHelper';

export default class Monsters extends React.Component {
    state = {
        monsters: []
    }

    componentDidMount = async () => {
        let monsters = await ApiHelper.getMonsters();

        this.setState({monsters});
    }

    render() {
        return (
            <div>
                <h1>Monsters List</h1>
                <table style={{marginLeft: "10px"}}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>HP</th>
                            <th>STR</th>
                            <th>DEX</th>
                            <th>INT</th>
                            <th>AC</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.monsters.map((monster) => {
                            return (
                                <tr>
                                    <td>{monster.id}</td>
                                    <td>{monster.name}</td>
                                    <td>{monster.hp}</td>
                                    <td>{monster.str}</td>
                                    <td>{monster.dex}</td>
                                    <td>{monster.int}</td>
                                    <td>{monster.ac}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}