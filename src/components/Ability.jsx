import React from 'react';
import {toast} from 'react-toastify';

import ApiHelper from '../utils/ApiHelper';

import AbilityForm from '../forms/AbilityForm';

export default class Ability extends React.Component {
    state = {
        ability: null
    }

    componentDidMount = async () => {
        let ability = await ApiHelper.getAbility(this.props.match.params.id);

        document.title = `${ability.name} Ability`;

        this.setState({ability});
    }

    handleSubmit = async (values) => {
        values.id = this.state.ability.id;
        try {
            await ApiHelper.updateAbility(values);
            toast("Ability updated!", {type: "info"});
            this.props.history.goBack();
        } catch (e) {
            console.error(e);
            toast("Failed to update ability!", {type: "error"});
        }
    }

    handleFailure = (errors) => {
        console.error("Failed to update ability!");
        toast("Failed to update ability!", {type: "error"});
    }

    render() {
        return (
            <div>
                {this.state.ability ? 
                    <div>
                        <h1>Update Ability</h1>
                        <AbilityForm 
                            initialValues={this.state.ability}
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