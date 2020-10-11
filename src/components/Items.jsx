import React from 'react';
import {getItems} from '../utils/ApiHelper';

export default class Items extends React.Component {
    state = {
        items: [
            {
                "_id": "5f798e49afd8650738313390",
                "id": "LEATHER_GAUNTLETS",
                "type": "armor",
                "slot": "arms",
                "name": "Leather Gauntlets",
                "ac": 2,
                "value": 100,
                "__v": 0
            },
            {
                "_id": "5f7e34ffc1cf475d70236bd2",
                "id": "SPACE_KNIGHT_GAUNTLET",
                "type": "armor",
                "slot": "arms",
                "name": "Space Knight Gauntlet",
                "ac": 8,
                "value": 0,
                "__v": 0
            },
            {
                "_id": "5f798e2fafd865073831338f",
                "id": "LEATHER_CURIASS",
                "type": "armor",
                "slot": "body",
                "name": "Leather Curiass",
                "ac": 4,
                "value": 100,
                "__v": 0
            },
            {
                "_id": "5f7e34e9c1cf475d70236b93",
                "id": "SPACE_KNIGHT_BREAST_PLATE",
                "type": "armor",
                "slot": "body",
                "name": "Space Knight Breast Plate",
                "ac": 8,
                "value": 0,
                "__v": 0
            },
            {
                "_id": "5f798e12afd865073831338e",
                "id": "LEATHER_CAP",
                "type": "armor",
                "slot": "head",
                "name": "Leather Cap",
                "ac": 2,
                "value": 100,
                "__v": 0
            },
            {
                "_id": "5f7e3531c1cf475d70236c5c",
                "id": "SPACE_KNIGHT_VISOR",
                "type": "armor",
                "slot": "head",
                "name": "Space Knight Visor",
                "ac": 8,
                "value": 0,
                "__v": 0
            },
            {
                "_id": "5f798e58afd8650738313391",
                "id": "LEATHER_PANTS",
                "type": "armor",
                "slot": "legs",
                "name": "Leather Pants",
                "ac": 2,
                "value": 100,
                "__v": 0
            },
            {
                "_id": "5f7e351ac1cf475d70236c15",
                "id": "SPACE_KNIGHT_LEGS",
                "type": "armor",
                "slot": "legs",
                "name": "Space Knight Legs",
                "ac": 8,
                "value": 0,
                "__v": 0
            },
            {
                "_id": "5f798e83afd8650738313392",
                "id": "POTION",
                "type": "consumable",
                "slot": "inventory",
                "name": "Potion",
                "use": "+100HP",
                "value": 10,
                "__v": 0
            },
            {
                "_id": "5f798ca2ad161d071de43b42",
                "id": "LONG_SWORD",
                "type": "weapon",
                "slot": "hand",
                "name": "Long Sword",
                "dmg": "1d6",
                "value": 100,
                "__v": 0
            },
            {
                "_id": "5f798cbaad161d071de43b43",
                "id": "STAFF",
                "type": "weapon",
                "slot": "hand",
                "name": "Staff",
                "dmg": "1d4",
                "value": 100,
                "__v": 0
            },
            {
                "_id": "5f7e3483c1cf475d70236a79",
                "id": "VIRTUOUS_CONTRACT",
                "type": "weapon",
                "slot": "hand",
                "name": "Virtuous Contract",
                "dmg": "1d12",
                "value": 0,
                "__v": 0
            }
        ]
    }

    componentDidMount = async () => {
        // let items = await getItems();

        // this.setState({items});
    }

    render() {
        return (
            <div>
                <h1>Items List</h1>
                <table style={{marginLeft: "10px"}}>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Slot</th>
                            <th>Item Name</th>
                            <th>Value</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.items.map((item, index) => {
                            let value = item.ac || item.dmg || item.use;
                            return (
                                <tr>
                                    <td style={{textAlign: "center", background: "teal", color: "white", fontWeight: "bolder"}}>{item.type.toUpperCase()}</td>
                                    <td style={{textAlign: "center", background: "teal", color: "white", fontWeight: "bolder"}}>{item.slot.toUpperCase()}</td>
                                    <td>{item.name}</td>
                                    <td style={{textAlign: "center"}}>{value} <strong>{(item.ac ? "AC" : null) || (item.dmg ? "DMG" : null)}</strong></td>
                                    <td style={{textAlign: "center"}}>{item.value}g</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}