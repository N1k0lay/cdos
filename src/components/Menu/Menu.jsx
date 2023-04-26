import React, {useEffect, useState} from 'react';
import './Menu.module.css';
import axios from "axios";
import {Link} from "react-router-dom";
import styles from './Menu.module.css'
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
        <menu className={styles.menu}>
            <ul>
                {isLoaded && menu.map(item => {
                    if (item.submenu) {
                        return <li key={item.name} className={styles.menuItem}>
                            <details>
                                <summary>{item.name}</summary>
                                <ul>
                                    {item.submenu.map(subItem => {
                                        return <li className={styles.menuSubItem} key={subItem.id + subItem.name}>
                                            <Link className={styles.subLink} to={subItem.link}>{subItem.name}</Link>
                                        </li>
                                    })}
                                </ul>
                            </details>
                        </li>
                    }
                })}
                {error && <div className={styles.errorMenu}>Сервер не отвечает</div>}
            </ul>
        </menu>
);
}

export default Menu;