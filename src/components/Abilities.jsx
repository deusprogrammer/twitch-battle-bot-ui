import React from 'react';
import ApiHelper from '../utils/ApiHelper';

export default class Abilities extends React.Component {
    state = {
        abilities: []
    }

    componentDidMount = async () => {
        let abilities = await ApiHelper.getAbilities();

        this.setState({abilities});
    }

    render() {
        return (
            <div>
                <h1>Abilities List</h1>
                <table style={{marginLeft: "10px"}}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Damage</th>
                            <th>Target</th>
                            <th>Area</th>
                            <th>Element</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.abilities.map((ability) => {
                            return (
                                <tr>
                                    <td>{ability.id}</td>
                                    <td>{ability.name}</td>
                                    <td>{ability.dmg}</td>
                                    <td>{ability.target}</td>
                                    <td>{ability.area}</td>
                                    <td>{ability.element}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}