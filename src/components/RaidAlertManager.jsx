import React, { useEffect, useState } from 'react';
import ApiHelper from '../utils/ApiHelper';

export default (props) => {
    let [raidAlerts, setRaidAlerts] = useState([]);
    useEffect(async () => {
        let channel = parseInt(window.localStorage.getItem("channel"));
        let configs = await ApiHelper.getRaidAlerts(channel);
        setRaidAlerts(configs);
    }, []);

    return (
        <div>
            <h1>Raid Alerts Manager</h1>
            <table>
                <tbody>
                    {raidAlerts.map((raidAlert) => {
                        return (
                            <tr>
                                <td>{raidAlert.name}</td>
                                <td><button onClick={() => {window.location = `https://deusprogrammer.com/util/twitch-tools/raid-test?raider=wagnus&raidSize=1000&theme=STORED&key=${raidAlert.id}`}}>Preview</button></td>
                                <td><button onClick={() => {window.location = `https://deusprogrammer.com/util/twitch/bot/raid-alert/${raidAlert.id}`}}>Edit</button>
                                <button onClick={() => {alert("This doesn't function yet")}}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}