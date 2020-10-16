import React from 'react';
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
        values.id = this.state.monster.id;
        await ApiHelper.updateMonster(values);
        this.props.history.goBack();
    }

    handleFailure = async (errors) => {
        alert("Monster update failed!");
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