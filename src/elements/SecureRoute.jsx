import React, { useEffect } from 'react';
import { Route } from 'react-router';

export default (props) => {
    useEffect(() => {
        window.onblur = function() {window.onfocus = function () {window.location.reload(true)}};
    }, [])

    if (!props.isAuthenticated) {
        delete props.component;
        return <Route {...props} render={props => <div>You must be authenticated to use this page.  Please login.</div>} />
    }

    return (
        <Route {...props} />
    );
}