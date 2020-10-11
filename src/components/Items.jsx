import React from 'react';
import ApiHelper from '../utils/ApiHelper';

export default class Items extends React.Component {
    state = {
        items: []
    }

    componentDidMount = async () => {
        let items = await ApiHelper.getItems();

        this.setState({items});
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