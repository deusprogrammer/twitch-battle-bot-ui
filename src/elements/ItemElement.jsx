import React from 'react';

export default (props) => {
    const item = props.item;
    let value = item.ac || item.dmg || item.use;
    let rarity = [];
    for (let i = 0; i < rarity; i++) {
        rarity.push("*");
    }
    return (
        <div className="item">
            <div className="item-inner">
                <div className="item-image"><img src="https://dummyimage.com/100X100/000/fff" /></div>
                <div className="item-details">
                    <div className="item-header"><span className="item-name">{item.name}</span><span className="item-type">{item.slot !== "hand" ? item.slot : null} {item.type}</span></div>
                    <div className="item-description">{item.description}</div>
                    <div className="item-stats">
                        <div>{value} <strong>{(item.ac ? "armor " : null) || (item.dmg ? ` damage to ${item.dmgStat}` : null)} </strong></div>
                        {["STR", "DEX", "INT"].map((modStat) => {
                            return <div style={{float: "left"}} className={item.toHitStat === modStat ? "item-stat-highlight" : "item-stat"}>{modStat}: {item.mods[modStat.toLowerCase()]}</div>
                        })}
                        <div style={{clear: "both"}} />
                        {["HIT", "AC", "AP"].map((modStat) => {
                            return <div style={{float: "left"}} className={item.toHitStat === modStat ? "item-stat-highlight" : "item-stat"}>{modStat}: {item.mods[modStat.toLowerCase()]}</div>
                        })}
                    </div>
                    <div style={{clear: "both"}} />
                    <div className="item-triggers">
                        {item.triggers.map((trigger) => {
                            return <div style={{float: "left"}}>{trigger.abilityId} ({trigger.chance}% chance)</div>
                        })}
                    </div>
                    <div style={{clear: "both"}} />
                    <div className="item-abilities">
                        {item.abilities.map((ability) => {
                            return <div style={{float: "left"}}>{ability.abilityId}</div>
                        })}
                    </div>
                    <div className="item-value"><span>{item.value} gold</span><span>{rarity.map(star => star)}</span></div>
                </div>
            </div>
        </div>
    );
}