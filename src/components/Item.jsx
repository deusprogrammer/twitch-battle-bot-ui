import React from 'react';
import {toast} from 'react-toastify';

import ApiHelper from '../utils/ApiHelper';

import ItemForm from '../forms/ItemForm';

export default class Item extends React.Component {
    state = {
        item: null
        // {
        //     "_id": "5f7e351ac1cf475d70236c15",
        //     "id": "SPACE_KNIGHT_LEGS",
        //     "type": "armor",
        //     "slot": "legs",
        //     "name": "Space Knight Legs",
        //     "ac": 8,
        //     "value": 0,
        //     "__v": 0
        // }
    }

    componentDidMount = async () => {
        let item = await ApiHelper.getItem(this.props.match.params.id);

        this.setState({item});
    }

    handleSubmit = async (values) => {
        toast("Item updated!", {type: "info"});
        values.id = this.state.item.id;
        if (values.type === "consumable") {
            values.slot = "inventory";
        }
        await ApiHelper.updateItem(values);
        this.props.history.goBack();
    }

    handleFailure = async (errors) => {
        toast("Failed to update item", {type: "error"});
    }

    render() {
        return (
            <div>
                {this.state.item ? 
                    <div>
                        <h1>Update Item</h1>
                        <ItemForm 
                            initialValues={this.state.item}
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