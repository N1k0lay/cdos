import React from 'react';
import Menu from "../Menu/Menu";
import style from './Sidebar.module.css'
import LogoImg from '../../assets/img/logo_vniitf.png'

function Sidebar(props) {
    return (
        <div className={style.sidebar}>
            <div className={style.logo}>
                <img src={LogoImg}  alt={'logo'}/>
            </div>
            <Menu />
        </div>
    );
}

export default Sidebar;