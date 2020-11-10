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

        document.title = `${item.name} Item`;

        this.setState({item});
    }

    handleSubmit = async (values) => {
        values.id = this.state.item.id;
        values.owningChannel = window.localStorage.getItem("channel");
        
        if (values.type === "consumable") {
            values.slot = "inventory";
        }

        try {
            await ApiHelper.updateItem(values);
            toast("Item updated!", {type: "info"});
            this.props.history.goBack();
        } catch (e) {
            console.error(e);
            toast("Failed to update item", {type: "error"});
        }
    }

    handleFailure = (errors) => {
        console.error("Failed to update item!");
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