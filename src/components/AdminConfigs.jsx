import React from 'react';
import ApiHelper from '../utils/ApiHelper';

export default class AdminConfigs extends React.Component {
    state = {
        configs: {},
        saving: false
    }

    componentDidMount = async () => {
        let configList = await ApiHelper.getAdminConfigs();
        let configs = {}
        for (const config of configList) {
            configs[config.name] = config.values.join(",");
        }
        this.setState({configs});
    }

    onConfigChange = (configName, newValue) => {
        let configs = {...this.state.configs};
        configs[configName] = newValue;
        this.setState({configs});
    }

    onSaveConfig = async (configName) => {
        this.setState({saving: true});
        let configs = {...this.state.configs};
        let config = configs[configName];
        config =  {
            name: configName,
            values: config.values.split(",").map((value) => {return value.trim()})
        };
        console.log("CONFIG: " + JSON.stringify(config, null, 5));
        //await ApiHelper.updateAdminConfigs(config);
        this.setState({saving: false});
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Values</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.keys(this.state.configs).map((configName) => {
                        let config = this.state.configs[configName];
                        return (
                            <tr>
                                <td>{config.name}</td>
                                <td>
                                    <textarea value={config.values} onChange={(e) => {this.onConfigChange(config.name, e.target.value)}}/>
                                </td>
                                <td>
                                    <button type="button" disabled={this.state.saving} onChange={() => {this.onSaveConfig(config.name)}}>Save</button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}