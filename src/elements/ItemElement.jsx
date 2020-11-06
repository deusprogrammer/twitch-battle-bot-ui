import React from 'react';

export default (props) => {
    const item = props.item;
    let value = item.ac || item.dmg || item.use;
    let rarity = [];
    let colors = ["white", "yellow", "red", "purple"];
    for (let i = 0; i < item.rarity; i++) {
        let color = colors[Math.floor(i/5)];
        console.log("COLOR: " + color);
        rarity.push(<span style={{color}}>*</span>);
    }
    return (
        <div className="item">
            <div className="item-inner">
                <div className="item-image"><img src="https://dummyimage.com/100X100/000/fff" /></div>
                <div className="item-details">
                    <div className="item-header"><span className="item-name">{item.name}</span><span className="item-type">{item.slot !== "hand" ? item.slot : null} {item.type}</span></div>
                    <div className="item-description">{item.description}</div>
                    { item.type !== "consumable" ? 
                        <div>
                            <div className="item-stats">
                                <div>{value} <strong>{(item.ac ? "armor " : null) || (item.dmg ? ` damage to ${item.dmgStat}` : null) || (item.use ? ` use to use ${item.use}` : null)} </strong></div>
                                {["STR", "DEX", "INT", "HIT", "AC", "AP"].map((modStat) => {
                                    return <div style={{float: "left"}} className={item.type !== "armor" && item.toHitStat === modStat ? "item-stat-highlight" : "item-stat"}>{modStat}: {item.mods[modStat.toLowerCase()]}</div>
                                })}
                            </div>
                            <div style={{clear: "both"}} />
                            <div className="item-triggers">
                                <div style={{float: "left"}}>Triggers:</div>
                                {item.triggers.map((trigger) => {
                                    return <div className="action-trigger" style={{float: "left"}}>{trigger.abilityId} ({trigger.chance}% chance)</div>
                                })}
                            </div>
                            <div style={{clear: "both"}} />
                            <div className="item-abilities">
                                <div style={{float: "left"}}>Abilities:</div>
                                {item.abilities.map((ability) => {
                                    return <div className="action-trigger" style={{float: "left"}}>{ability.abilityId}</div>
                                })}
                            </div>
                        </div>                   
                    : null}
                    <div style={{clear: "both"}} />
                    <div className="item-value"><span>Value: {item.value} gold</span><span style={{"marginLeft": "5px"}}>Rarity: {rarity}</span></div>
                </div>
            </div>
        </div>
    );
}