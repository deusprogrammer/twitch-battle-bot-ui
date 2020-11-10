import React from 'react';
import {toast} from 'react-toastify';

import ApiHelper from '../utils/ApiHelper';

import SealedItemForm from '../forms/SealedItemForm';

export default class Abilities extends React.Component {
    state = {
        sealedItems: []
    }

    componentDidMount = async () => {
        document.title = `Sealed Item Admin`;
        let channel = window.localStorage.getItem("channel");
        let sealedItems = await ApiHelper.getSealedItems(channel);

        this.setState({sealedItems});
    }

    goTo = async (sealedItem) => {
        this.props.history.push(`${process.env.PUBLIC_URL}/sealed-items/${sealedItem.id}`);
    }

    onSubmit = async (values) => {
        values.id = values.name.replaceAll(" ", "_").replaceAll("'", "").toUpperCase();
        values.owningChannel = parseInt(window.localStorage.getItem("channel"));
        
        try {
            let created = await ApiHelper.createSealedItem(values);
            toast("Sealed Item created!", {type: "info"});
            this.setState({sealedItems: [...this.state.sealedItems, created]}, () => {
                this.formApi.reset();
            });
        } catch (e) {
            console.error(e);
            toast("Failed to create sealed item!", {type: "error"});
        }
    }

    onError = (error) => {
        console.error("Failed to create sealed Item!");
        toast("Failed to create sealed item!", {type: "error"});
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Sealed Item List</h1>
                <div>
                    <div style={{float: "left"}}>
                        <h2>Sealed Item List</h2>
                        {this.state.sealedItems.length > 0 ?
                            <table style={{marginLeft: "10px"}}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Claimed</th>
                                        <th>Claimed By</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.sealedItems.map((sealedItem) => {
                                        return (
                                            <tr 
                                                title={sealedItem.description}
                                                key={`ability-${sealedItem.id}`}>
                                                    <td>{sealedItem.name}</td>
                                                    <td style={{textAlign: "center"}}>{sealedItem.claimed ? "Yes" : "No"}</td>
                                                    <td style={{textAlign: "center"}}>{sealedItem.claimedBy}</td>
                                                    <td>
                                                        <button onClick={() => {this.goTo(sealedItem)}}>Edit</button>
                                                        <button onClick={() => {navigator.clipboard.writeText(sealedItem.id);toast("Copied id to clipboard", {type: "info"});}}>Get Id</button>
                                                    </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table> : null }
                    </div>
                    <div style={{float: "right"}}>
                        <h2>Create New Sealed Item</h2>
                        <SealedItemForm
                            getApi={formApi => this.formApi = formApi}
                            onSubmit={this.onSubmit}
                            onFailure={this.onError}
                            />
                    </div>
                </div>
            </div>
        )
    }
}