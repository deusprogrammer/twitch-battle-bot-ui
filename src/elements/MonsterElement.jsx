import React from 'react';
import { toast } from 'react-toastify';

import './MonsterElement.css';

const colors = ["lightgray", "white", "yellow", "orange", "red"];
const elementColors = {
    "HEALING": {b: "limegreen", c: "white"},
    "BUFFING": {b: "midnightblue", c: "white"},
    "CLEANSING": {b: "lightseagreen", c: "white"},
    "FIRE": {b: "red", c: "white"},
    "ICE": {b: "blue", c: "white"},
    "WATER": {b: "lightblue", c: "white"},
    "LIGHTNING": {b: "yellow", c: "lightgray"},
    "EARTH": {b: "brown", c: "white"},
    "DARK": {b: "purple", c: "white"},
    "LIGHT": {b: "gold", c: "white"},
    "NONE": {b: "white", c: "black"}
}

export default ({monster, items, onGetId, onEdit}) => {
    let rarity = [];
    for (let i = 0; i < 10; i++) {
        let color = colors[Math.floor(i/2)];
        if (i < Math.ceil(monster.rarity/2)) {
            rarity.push(<span style={{color, WebkitTextStrokeColor: "white", WebkitTextStrokeWidth: "1px"}}>&#9733;</span>);    
        } else {
            rarity.push(<span style={{color: "black", WebkitTextStrokeColor: "white", WebkitTextStrokeWidth: "1px"}}>&#9733;</span>);
        }
    }
    return (
        <div 
            className="monster" 
            title="Click to copy ID"
            onClick={() => {navigator.clipboard.writeText(monster.id);toast("Copied id to clipboard", {type: "info"});}}
        >
            <div className="monster-name">
                {monster.name} <span className="monster-dungeon">{monster.dungeon.replace("_", " ").toLowerCase()}</span>
            </div>
            <div className="monster-description">
                {monster.description}
            </div>
            <div className="stat-label">Stats</div>
            <div className="monster-stats">
                <div className="stat-label">HP</div><div className="stat-label">STR</div><div className="stat-label">DEX</div><div className="stat-label">INT</div>
                <div>{monster.hp}</div><div>{monster.str}</div><div>{monster.dex}</div><div>{monster.int}</div>
                <div className="stat-label">DMG</div><div className="stat-label">HIT</div><div className="stat-label">AC</div><div></div>
                <div>{monster.dmg}</div><div>{monster.hit}</div><div>{monster.ac}</div><div></div>
            </div>
            <div className="stat-label">Drops</div>
            <div className="monster-drops">
                { monster.drops.map(({itemId, chance}) => {
                    let {name, slot} = items[itemId];
                    return (
                        <div>
                            {name} ({chance}%)
                        </div>
                    )
                })}
            </div>
            <div className="monster-rarity element-row">
                <div>Rarity</div><div>{rarity}</div>
            </div>
            <div style={{textAlign: "center"}}>
                {onEdit ? <button type="button" class="btn btn-primary" onClick={() => {onEdit(monster)}}>Edit</button> : null}
            </div>
        </div>
    );
}