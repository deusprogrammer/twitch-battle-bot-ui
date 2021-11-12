import React from 'react';
import { Route } from 'react-router';

export default (props) => {
    if (!props.isAuthenticated) {
        return <div>You must be authenticated to use this page.  Please login.</div>
    }

    return (
        <Route {...props} />
    );
}