import React from 'react';

const colors = ["white", "yellow", "orange", "red"];
const elementColors = {
    "HEALING": {b: "green", c: "white"},
    "BUFFING": {b: "green", c: "white"},
    "CLEANSING": {b: "green", c: "white"},
    "FIRE": {b: "red", c: "white"},
    "ICE": {b: "blue", c: "white"},
    "WATER": {b: "lightblue", c: "white"},
    "LIGHTNING": {b: "yellow", c: "lightgray"},
    "EARTH": {b: "brown", c: "white"},
    "DARK": {b: "purple", c: "white"},
    "LIGHT": {b: "gold", c: "white"},
    "NONE": {b: "white", c: "black"}
}

export default (props) => {
    const ability = props.ability;
    const abilityTable = props.abilityTable;
    const elementColor = elementColors[ability.element];
    const backgroundColor = elementColor.b;
    const color = elementColor.c;
    let message = ``;
    let target = ``;

    switch (ability.target) {
        case "ENEMY":
            if (ability.area === "ALL") {
                target = "all enemies";
            } else {
                target = "one enemy";
            }
            break;
        case "CHAT":
            if (ability.area === "ALL") {
                target = "all players";
            } else {
                target = "one player";
            }
            break;
        case "ANY":
            if (ability.area === "ALL") {
                target = "all enemies and players";
            } else {
                target = "one enemy or player";
            }
            break;
    }

    switch (ability.element) {
        case "CLEANSING":
            message = <div>{`Cleanses ${ability.buffs}`}</div>
            break;
        case "BUFFING":
            message = <div>{`${ability.buffs} for ${ability.buffsDuration} ticks`}</div>;
            break;
        case "HEALING":
            message = <div>{`Heals ${ability.dmg} damage to ${target}.`}</div>
            break;
        default:
            message = <div>{`${ability.dmg} ${ability.element.toLowerCase()} ${ability.dmgStat} damage ${ability.procTime > 0 ? ` every ${ability.procTime} ticks for ${ability.maxProcs} ticks` : ''} to ${target}`}</div>
            break;
    }

    return (
        <div className="item" style={{backgroundColor, color}}>
            <div className="item-inner">
                <div className="item-image"><img src="https://dummyimage.com/200X200/000/fff" /></div>
                <div className="item-details">
                    <div className="item-header"><span className="item-name">{ability.name}</span><span className="item-type">{ability.element.toLowerCase()}</span></div>
                    <div className="item-description">{ability.description}</div>
                    <div className="item-stats">
                        {message}
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