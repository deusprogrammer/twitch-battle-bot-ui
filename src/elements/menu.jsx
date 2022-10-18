import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css';

export const menu = ({title, menu, className}) => {
    return (
        <div className={className} id="menu">
            <input id="menu-checkbox" type="checkbox" />
            <label id="menu-checkbox-label" for="menu-checkbox">
                <div id="menu-burger">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <h1>{title}</h1>
            </label>
            <nav>
                { Object.keys(menu).map((menuGroup, i) => {
                    let {items, show} = menu[menuGroup];

                    if (show) {
                        return (
                            <div className="menu-group" key={`group${i}`}>
                                <h2>{menuGroup}</h2>
                                <ul>    
                                    {items.map(({to, label}, j) => {
                                        return <li key={`group${i}item${j}`}><Link to={to}>{label}</Link></li>;
                                    })}
                                </ul>
                            </div>
                        )
                    }
                })}
            </nav>
        </div>
    );
}

export default menu;