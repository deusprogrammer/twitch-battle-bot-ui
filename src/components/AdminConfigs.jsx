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
            configs[config.name] = config.value;
        }
        this.setState({configs});
    }

    onConfigChange = (configName, newValue) => {
        let configs = {...this.state.configs};
        configs[configName] = newValue.split(",");
        configs = configs[configName].map((config) => {
            return config.trim();
        });
        this.setState({configs});
    }

    onSaveConfig = async (configName) => {
        this.setState({saving: true});
        await ApiHelper.updateAdminConfigs(this.state.configs[configName]);
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
                    {this.state.configs.map((config) => {
                        return (
                            <tr>
                                <td>{config.name}</td>
                                <td>
                                    <textarea value={config.values.join(",")} onChange={(e) => {this.onConfigChange(config.name, e.target.value)}}/>
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