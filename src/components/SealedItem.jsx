import React from 'react';
import {toast} from 'react-toastify';

import ApiHelper from '../utils/ApiHelper';

import SealedItemForm from '../forms/SealedItemForm';

export default class SealedItem extends React.Component {
    state = {
        sealedItem: null
    }

    componentDidMount = async () => {
        let sealedItem = await ApiHelper.getSealedItem(this.props.match.params.id);

        document.title = `${sealedItem.name} Sealed Item`;

        this.setState({sealedItem});
    }

    handleSubmit = async (values) => {
        values.id = this.state.sealedItem.id;
        try {
            await ApiHelper.updateSealedItem(values);
            toast("Sealed Item updated!", {type: "info"});
            this.props.history.goBack();
        } catch (e) {
            console.error(e);
            toast("Failed to update sealed item!", {type: "error"});
        }
    }

    handleFailure = (errors) => {
        console.error("Failed to update sealed item!");
        console.error(errors);
        toast("Failed to update sealed item!", {type: "error"});
    }

    render() {
        return (
            <div>
                {this.state.sealedItem ? 
                    <div>
                        <h1>Update Status</h1>
                        <SealedItemForm 
                            initialValues={this.state.sealedItem}
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