import React from 'react';

import ApiHelper from '../utils/ApiHelper';

let queryParam = new URLSearchParams(window.location.search);

export default async () => {
    await ApiHelper.createBot(queryParam.get("code"));
    return (
        <div>
            <h1>Thank You</h1>
            <p>Your user has been created and your bot has been registered.  You may now use any of the admin console features above to create monsters, items, abilities, and such that belong to your channel.  Please refer to the guide for information about how these ideas work.</p>
        </div>
    )
}