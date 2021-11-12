import React from 'react';
import {toast} from 'react-toastify';

import ApiHelper from '../utils/ApiHelper';

import ItemForm from '../forms/ItemForm';

export default class Item extends React.Component {
    state = {
        item: null
    }

    componentDidMount = async () => {
        let item = await ApiHelper.getItem(this.props.match.params.id);

        document.title = `${item.name} Item`;

        this.setState({item});
    }

    handleSubmit = async (values) => {
        values.id = this.state.item.id;
        values.owningChannel = parseInt(window.localStorage.getItem("channel"));

        if (values.type === "consumable") {
            values.slot = "inventory";
        }

        if (!values.slot) {
            toast("Must select a slot", {type: "error"});
            return;
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