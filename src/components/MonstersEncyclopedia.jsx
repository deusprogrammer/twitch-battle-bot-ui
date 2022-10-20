import React from 'react';
import MonsterElement from '../elements/MonsterElement';

import ApiHelper from '../utils/ApiHelper';

export default class MonstersEncyclopedia extends React.Component {
    state = {
        monsters: [],
        items: {}
    }

    componentDidMount = async () => {
        document.title = `Monsters Encyclopedia`;
        let monsters = await ApiHelper.getMonsters();
        let itemList = await ApiHelper.getItems();
        let items = {};
        
        itemList.forEach(({id, ...item}) => {
            items[id] = item;
        })

        this.setState({monsters, items});
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Monster Encyclopedia</h1>
                <div className="monsters">
                    { this.state.monsters.map((monster) => {
                        return (
                            <MonsterElement 
                                monster={monster} 
                                items={this.state.items}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}