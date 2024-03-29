import React from 'react';
import { toast } from 'react-toastify';
import ReactToolTip from 'react-tooltip';

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

let AbilityElement = (props) => {
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
                target = "all hostiles";
            } else {
                target = "one hostile";
            }
            break;
        case "CHAT":
            if (ability.area === "ALL") {
                target = "all friendlies";
            } else {
                target = "one friendly";
            }
            break;
        case "ANY":
            if (ability.area === "ALL") {
                target = "all hostiles and players";
            } else {
                target = "one hostile or player";
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

    return (
        <div 
            className="item" 
            style={{backgroundColor, color}}
            title="Click to copy ID"
            onClick={() => {navigator.clipboard.writeText(ability.id);toast("Copied id to clipboard", {type: "info"});}}
        >
            <div className="item-inner">
                <div className="item-image"><img src="https://dummyimage.com/200X200/000/fff" /></div>
                <div className="item-details">
                    <div className="item-header"><span className="item-name">{ability.name}</span><span className="item-type">{ability.element.toLowerCase()}</span></div>
                    <div className="item-description">{ability.description}</div>
                    <div className="item-cost"><b>Cost: </b>{ability.ap} AP</div>
                    <div className="item-use"><b>Effect: </b>{message}</div>
                    <div style={{clear: "both"}} />
                    <div className="item-triggers">
                        <div style={{float: "left", padding: "5px 0px 5px 0px"}}><b>Triggers:</b></div>
                        {ability.triggers.map((trigger, index) => {
                            let ability = abilityTable[trigger.abilityId];
                            let elementColor = elementColors[ability.element];
                            let color = elementColor.c;
                            let backgroundColor = elementColor.b;
                            return (
                                <React.Fragment>
                                    <div 
                                        data-tip 
                                        data-for={`${ability.name}-trigger-${index}`} 
                                        className="action-trigger" 
                                        style={{float: "left", border: "1px solid black", cursor: "pointer", color, backgroundColor}}>{ability.name} ({trigger.chance}%)</div>
                                            <ReactToolTip id={`${ability.name}-trigger-${index}`} effect="solid" delayHide={500} delayShow={500} delayUpdate={500}>
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
                            return <div style={{float: "left"}} className={ability.toHitStat === modStat ? "item-stat-highlight" : "item-stat"}>{modStat}: {ability.mods[modStat.toLowerCase()]}</div>
                        })}
                    </div>
                    <div style={{clear: "both"}} />
                </div>
            </div>
            <div style={{textAlign: "center"}}>
                {props.onEdit ? <button type="button" class="btn btn-primary" onClick={() => {props.onEdit(ability)}}>Edit</button> : null}
            </div>
        </div>
    );
}

export default AbilityElement;