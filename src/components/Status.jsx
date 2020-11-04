import React from 'react';
import {toast} from 'react-toastify';

import ApiHelper from '../utils/ApiHelper';

import StatusForm from '../forms/StatusForm';

export default class Ability extends React.Component {
    state = {
        status: null
    }

    componentDidMount = async () => {
        let status = await ApiHelper.getStatus(this.props.match.params.id);

        document.title = `${status.name} Status`;

        this.setState({status});
    }

    handleSubmit = async (values) => {
        values.id = this.state.status.id;
        try {
            await ApiHelper.updateStatus(values);
            toast("Status updated!", {type: "info"});
            this.props.history.goBack();
        } catch (e) {
            console.error(e);
            toast("Failed to update status!", {type: "error"});
        }
    }

    handleFailure = (errors) => {
        console.error("Failed to update status!");
        console.error(errors);
        toast("Failed to update status!", {type: "error"});
    }

    render() {
        return (
            <div>
                {this.state.status ? 
                    <div>
                        <h1>Update Ability</h1>
                        <StatusForm 
                            initialValues={this.state.status}
                            onSubmit={(values) => {this.handleSubmit(values)}} 
                            onFailure={(errors) => {this.handleFailure(errors)}} />
                    </div> 
                    : 
                    null
                }
            </div>
        )
    }
}