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

        this.setState({ability});
    }

    handleSubmit = async (values) => {
        values.id = this.state.ability.id;
        await ApiHelper.updateAbility(values);

        toast("Ability updated!", {type: "info"});

        this.props.history.goBack();
    }

    handleFailure = async (errors) => {
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