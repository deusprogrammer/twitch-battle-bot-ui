import React from 'react';

export default (props) => {
    const item = props.item;
    let value = item.ac || item.dmg || item.use;
    const rarity = [];
    for (let i = 0; i < rarity; i++) {
        rarity += "*";
    }
    return (
        <div className="item">
            <div className="item-image"><img src="https://dummyimage.com/300X300/000/fff" /></div>
            <div className="item-details">
                <div className="item-header"><span className="item-name">{item.name}</span><span className="item-type">{item.slot !== "hand" ? item.slot : null} {item.type}</span></div>
                <div className="item-description">{item.description}</div>
                <div className="item-stats">
                    <div>{value} <strong>{(item.ac ? "armor " : null) || (item.dmg ? ` damage to ${item.dmgStat}` : null)} </strong></div>
                    {["HP", "STR", "DEX", "INT", "HIT", "AC"].map((modStat) => {
                        return <div className={item.toHitStat === modStat ? "stat-highlight" : null}>{item.mods[modStat.toLowerCase()]}</div>
                    })}
                </div>
                <div className="item-triggers"></div>
                <div className="item-abilities"></div>
                <div className="item-value"><span>{item.value} gold</span><span>{rarity.map(star => star)}</span></div>
            </div>
        </div>
    );
}