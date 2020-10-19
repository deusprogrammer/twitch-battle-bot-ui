import React from 'react';
import {toast} from 'react-toastify';

import ApiHelper from '../utils/ApiHelper';

import MonsterForm from '../forms/MonsterForm';

export default class Monster extends React.Component {
    state = {
        monster: null
    }

    componentDidMount = async () => {
        let monster = await ApiHelper.getMonster(this.props.match.params.id);

        this.setState({monster});
    }

    handleSubmit = async (values) => {
        console.log("MONSTER: " + JSON.stringify(values, null, 5));
        values.id = this.state.monster.id;
        await ApiHelper.updateMonster(values);

        toast("Monster updated!", {type: "info"});

        this.props.history.goBack();
    }

    handleFailure = (errors) => {
        console.error("Failed to update monster!");
        console.error(JSON.stringify(errors, null, 5));
        toast("Failed to update monster!", {type: "error"});
    }

    render() {
        return (
            <div>
                {this.state.monster ? 
                    <div>
                        <h1>Update Monster</h1>
                        <MonsterForm 
                            initialValues={this.state.monster}
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