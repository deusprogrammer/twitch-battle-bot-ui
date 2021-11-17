import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import ApiHelper from '../utils/ApiHelper';

const RaidAlertManager = (props) => {
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
                                <td>
                                    <button onClick={() => {window.location = `https://deusprogrammer.com/util/twitch-tools/raid-test?raider=wagnus&raidSize=1000&theme=STORED&key=${raidAlert._id}`}}>Preview</button>
                                    <Link to={`${process.env.PUBLIC_URL}/configs/raid-alert/${raidAlert._id}`}><button type="button">Edit</button></Link>
                                    <button onClick={() => {alert("This doesn't function yet")}}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RaidAlertManager;