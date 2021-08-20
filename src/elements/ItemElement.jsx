import React from 'react';
import ReactToolTip from 'react-tooltip';
import AbilityElement from './AbilityElement';

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

export default (props) => {
    const item = props.item;
    const abilityTable = props.abilityTable;
    let value = item.ac || item.dmg || item.use;
    let rarity = [];
    let message = ``;
    let target = ``;
    for (let i = 0; i < 10; i++) {
        let color = colors[Math.floor(i/2)];
        if (i < Math.ceil(item.rarity/2)) {
            rarity.push(<span style={{color, WebkitTextStrokeColor: "white", WebkitTextStrokeWidth: "1px"}}>&#9733;</span>);    
        } else {
            rarity.push(<span style={{color: "black", WebkitTextStrokeColor: "white", WebkitTextStrokeWidth: "1px"}}>&#9733;</span>);
        }
    }

    if (item.type === "consumable") {
        let ability = abilityTable[item.use];
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
                message = <div>{`${ability.dmg} ${ability.element !== "NONE" ? ability.element.toLowerCase() : ''} ${ability.dmgStat} damage ${ability.procTime > 0 ? ` every ${ability.procTime} ticks for ${ability.maxProcs} ticks` : ''} to ${target}`}</div>
                break;
        }
    }

    let backgroundColor = "black";
    let color = "white";

    if (item.type === "sealed") {
        backgroundColor = "red";
        color = "white";
    }

    return (
        <div className="item" style={{backgroundColor, color}}>
            <div className="item-inner">
                <div className="item-image"><img src="https://dummyimage.com/200X200/000/fff" /></div>
                <div className="item-details">
                    <div className="item-header"><span className="item-name">{item.name}</span><span className="item-type">{item.slot !== "hand" ? item.slot : null} {item.type}</span></div>
                    <div className="item-description">{item.description}</div>
                    { item.type === "consumable" ?
                        <div className="item-use"><b>Use: </b>{message}</div>
                        : 
                        <div><b>Effect: </b>{value} <b>{(item.ac ? "armor" : null) || (item.dmg ? `damage to ${item.dmgStat}` : null)} </b></div>}
                    { item.type !== "consumable" && item.type !== "sealed" && item.type !== "gift" ? 
                        <div>
                            <div className="item-triggers">
                                <div style={{float: "left", padding: "5px 0px 5px 0px"}}><b>Triggers:</b></div>
                                {item.triggers.map((trigger, index) => {
                                    let ability = abilityTable[trigger.abilityId];
                                    let elementColor = elementColors[ability.element];
                                    let color = elementColor.c;
                                    let backgroundColor = elementColor.b;
                                    return (
                                        <React.Fragment>
                                            <div 
                                                data-tip 
                                                data-for={`${item.name}-trigger-${index}`}
                                                className="action-trigger" 
                                                style={{float: "left", cursor: "pointer", color, backgroundColor}}>
                                                {ability.name} ({trigger.chance}%)
                                            </div>
                                            <ReactToolTip id={`${item.name}-trigger-${index}`} effect="solid" delayHide={500} delayShow={500} delayUpdate={500}>
                                                <AbilityElement ability={ability} abilityTable={abilityTable} />
                                            </ReactToolTip>
                                        </React.Fragment>)
                                })}
                            </div>
                            <div style={{clear: "both"}} />
                            <div className="item-abilities">
                                <div style={{float: "left", padding: "5px 0px 5px 0px"}}><b>Abilities:</b></div>
                                {item.abilities.map((abilityName, index) => {
                                    let ability = abilityTable[abilityName];
                                    let elementColor = elementColors[ability.element];
                                    let color = elementColor.c;
                                    let backgroundColor = elementColor.b;
                                    return (
                                        <React.Fragment>
                                            <div 
                                                data-tip 
                                                data-for={`${item.name}-ability-${index}`}
                                                className="action-ability" 
                                                style={{float: "left", cursor: "pointer", color, backgroundColor}}>{ability.name}</div>
                                            <ReactToolTip id={`${item.name}-ability-${index}`} effect="solid" delayHide={500} delayShow={500} delayUpdate={500}>
                                                <AbilityElement ability={ability} abilityTable={abilityTable} />
                                            </ReactToolTip>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                            <div style={{clear: "both"}} />
                            <div className="item-stats">
                                <div style={{float: "left", height: "25px", lineHeight: "25px"}}><b>Stat Mods:</b></div>
                                {["STR", "DEX", "INT", "HIT", "AC"].map((modStat) => {
                                    return <div style={{float: "left"}} className={item.type !== "armor" && item.toHitStat === modStat ? "item-stat-highlight" : "item-stat"}>{modStat}: {item.mods[modStat.toLowerCase()]}</div>
                                })}
                            </div>
                            <div style={{clear: "both"}} />
                            <div className="item-stats">
                                <div style={{float: "left", height: "25px", lineHeight: "25px"}}><b>Resistances:</b></div>
                                {["Fire", "Ice", "Lightning", "Water", "Earth", "Dark", "Light"].map((resistance) => {
                                    let elementColor = elementColors[resistance.toUpperCase()];
                                    let color = elementColor.c;
                                    let backgroundColor = elementColor.b;
                                    return <div style={{float: "left", color, backgroundColor, width: "120px", textAlign: "center"}}>{resistance}: {item.resistances[resistance.toLowerCase()]*5}%</div>
                                })}
                            </div>
                            <div style={{clear: "both"}} />
                        </div>                   
                    : null}
                    <div style={{clear: "both"}} />
                    <div className="item-value"><b>Value:</b> {item.value} gold</div>
                    <div className="item-rarity"><b>Rarity:</b> {rarity}</div>
                </div>
                {props.count ? <div className="item-count">X{props.count}</div> : null}
            </div>
            <div style={{textAlign: "center"}}>
                {item.type !== "consumable" && item.type !== "sealed" && item.type !== "gift" && props.onEquip ? <button type="button" class="btn btn-primary" onClick={() => {props.onEquip(item)}}>Equip</button> : null}
                {props.onEquip ? <button type="button" class="btn btn-primary" onClick={() => {props.onSell(item)}}>Sell</button> : null}
                {props.onGetId ? <button type="button" class="btn btn-primary" onClick={() => {props.onGetId(item)}}>Get Id</button> : null}
                {props.onEdit ? <button type="button" class="btn btn-primary" onClick={() => {props.onEdit(item)}}>Edit</button> : null}
            </div>
        </div>
    );
}