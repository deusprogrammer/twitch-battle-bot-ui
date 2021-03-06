import React from 'react';
import {toast} from 'react-toastify';

import ApiHelper from '../utils/ApiHelper';

import StatusForm from '../forms/StatusForm';

export default class Abilities extends React.Component {
    state = {
        statuses: []
    }

    componentDidMount = async () => {
        document.title = `Statuses Admin`;
        let channel = window.localStorage.getItem("channel");
        let statuses = await ApiHelper.getStatuses(channel);

        this.setState({statuses});
    }

    goTo = async (selectedAbility) => {
        this.props.history.push(`${process.env.PUBLIC_URL}/statuses/${selectedAbility.id}`);
    }

    onSubmit = async (values) => {
        values.id = values.name.replaceAll(" ", "_").replaceAll("'", "").toUpperCase();

        let existing = await ApiHelper.getStatus(values.id);

        if (existing) {
            toast("Status with this name already exists!", {type: "error"});
            return;
        }

        values.owningChannel = parseInt(window.localStorage.getItem("channel"));

        try {
            let created = await ApiHelper.createStatus(values);
            toast("Status created!", {type: "info"});
            this.setState({statuses: [...this.state.statuses, created]}, () => {
                this.formApi.reset();
            });
        } catch (e) {
            console.error(e);
            toast("Failed to create status!", {type: "error"});
        }
    }

    onError = (error) => {
        console.error("Failed to create status!");
        toast("Failed to create status!", {type: "error"});
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Statuses List</h1>
                <div>
                    <div style={{float: "left"}}>
                        <h2>Statuses List</h2>
                        {this.state.statuses.length > 0 ?
                            <table style={{marginLeft: "10px"}}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Damage</th>
                                        <th>Damage Stat</th>
                                        <th>Element</th>
                                        <th>Proc Time</th>
                                        <th>Max Procs</th>
                                        <th>Effects</th>
                                        <th>Duration</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.statuses.map((status) => {
                                        return (
                                            <tr 
                                                title={status.description}
                                                key={`ability-${status.id}`}>
                                                    <td>{status.name}</td>
                                                    <td>{status.dmg}</td>
                                                    <td>{status.dmgStat}</td>
                                                    <td>{status.element}</td>
                                                    <td>{status.procTime}</td>
                                                    <td>{status.maxProcs}</td>
                                                    <td style={{textAlign: "center"}}>{status.otherEffects}</td>
                                                    <td style={{textAlign: "center"}}>{status.otherEffectsDuration}</td>
                                                    <td>
                                                        <button onClick={() => {this.goTo(status)}}>Edit</button>
                                                        <button onClick={() => {navigator.clipboard.writeText(status.id);toast("Copied id to clipboard", {type: "info"});}}>Get Id</button>
                                                    </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table> : null }
                    </div>
                    <div style={{float: "right"}}>
                        <h2>Create New Status</h2>
                        <StatusForm
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