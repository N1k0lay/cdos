import React, {useEffect, useState} from 'react';
import './Menu.css';
import axios from "axios";
import {Link} from "react-router-dom";

function Menu(props) {

    const [menu, setMenu] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:3003/menu/")
            .then(res => {
                setMenu(res.data)
                setIsLoaded(true)
            })
            .catch(error => {
                setError(error);
            })
    }, [])

    return (
        <menu className={'menu'}>
            <ul>
                {menu.map(item => {
                    if (item.submenu) {
                        return <li key={item.name} className={'menuItem'}>
                            <details>
                                <summary>{item.name}</summary>
                                <ul>
                                    {item.submenu.map(subItem => {
                                        return <li key={subItem.id + subItem.name}>
                                            <Link className={'subLink'} to={subItem.link}>{subItem.name}</Link>
                                        </li>
                                    })}
                                </ul>
                            </details>
                        </li>
                    }
                })}
            </ul>
        </menu>
);
}

export default Menu;