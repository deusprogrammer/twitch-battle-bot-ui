import React from 'react';

const colors = ["white", "yellow", "orange", "red"];
const elementColors = {
    "HEALING": {b: "green !important", c: "white !important"},
    "BUFFING": {b: "green !important", c: "white !important"},
    "CLEANSING": {b: "green !important", c: "white !important"},
    "FIRE": {b: "red !important", c: "white !important"},
    "ICE": {b: "blue !important", c: "white !important"},
    "WATER": {b: "lightblue !important", c: "white !important"},
    "LIGHTNING": {b: "yellow !important", c: "lightgray !important"},
    "EARTH": {b: "brown !important", c: "white !important"},
    "DARK": {b: "purple !important", c: "white !important"},
    "LIGHT": {b: "gold !important", c: "white !important"},
    "NONE": {b: "white !important", c: "black !important"}
}

export default (props) => {
    const ability = props.ability;
    const abilityTable = props.abilityTable;
    const elementColor = elementColors[ability.element];
    const backgroundColor = elementColor.b;
    const color = elementColors.c;
    return (
        <div className="item" style={{backgroundColor, color}}>
            <div className="item-inner">
                <div className="item-image"><img src="https://dummyimage.com/200X200/000/fff" /></div>
                <div className="item-details">
                    <div className="item-header"><span className="item-name">{ability.name}</span><span className="item-type">{ability.element.toLowerCase()}</span></div>
                    <div className="item-description">{ability.description}</div>
                    <div className="item-stats">
                        <div>{ability.dmg ? `${ability.dmg} ${ability.element} damage` : `${ability.buffs} for ${ability.buffsDuration}`}</div>
                        {["STR", "DEX", "INT", "HIT", "AC"].map((modStat) => {
                            return <div style={{float: "left"}} className={ability.toHitStat === modStat ? "item-stat-highlight" : "item-stat"}>{modStat}: {ability.mods[modStat.toLowerCase()]}</div>
                        })}
                    </div>
                    <div style={{clear: "both"}} />
                    <div className="item-triggers">
                        <div style={{float: "left", padding: "3px"}}>Triggers:</div>
                        {ability.triggers.map((trigger) => {
                            let ability = abilityTable[trigger.abilityId];
                            let elementColor = elementColors[ability.element];
                            let color = elementColor.c;
                            let backgroundColor = elementColor.b;
                            return <div className="action-trigger" style={{float: "left", border: "1px solid black", color, backgroundColor}}>{ability.name} ({trigger.chance}%)</div>
                        })}
                    </div>
                    <div style={{clear: "both"}} />
                </div>
            </div>
            <div style={{textAlign: "center"}}>{props.onGetId ? <button onClick={() => {props.onGetId(ability)}}>Get Id</button> : null}</div>
        </div>
    );
}