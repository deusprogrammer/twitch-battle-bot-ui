import React from 'react';

import {Form, Text, Checkbox, Select, Option, Scope} from 'informed';

export default () =>  { 
    return (
        <Form 
            initialValues={this.props.initialValues}
            getApi={this.props.getApi}
            onSubmit={this.props.onSubmit} 
            onSubmitFailure={this.props.onFailure}>
            <table>
                <tbody>
                    <fieldset>
                        <legend>Basic Info</legend>
                        <tr>
                            <td style={{fontWeight: "bolder"}}>
                                Name:
                            </td>
                            <td>
                                <Text field="name" />
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight: "bolder"}}>
                                Description:
                            </td>
                            <td>
                                <Text field="description" />
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight: "bolder"}}>
                                Code:
                            </td>
                            <td>
                                <Text field="code" />
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight: "bolder"}}>
                                Claimed:
                            </td>
                            <td>
                                <Checkbox field="claimed" />
                            </td>
                        </tr>
                    </fieldset>
                </tbody>
            </table>
            <button class="btn btn-primary" type="submit">Submit</button>
        </Form>
    )
}