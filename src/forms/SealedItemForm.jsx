import React from 'react';

import {Form, Text, Checkbox} from 'informed';

export default (props) =>  { 
    return (
        <Form 
            initialValues={props.initialValues}
            getApi={props.getApi}
            onSubmit={props.onSubmit} 
            onSubmitFailure={props.onFailure}>
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