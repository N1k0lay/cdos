import React from 'react';
import Menu from "../Menu/Menu";
import './Sidebar.css'

function Sidebar(props) {
    return (
        <>
            <img className={'logo'} src={'http://vniitf.ru/data/pub/imgs/ru/logo_vniitf.png'} />
            <Menu />
        </>
    );
}

export default Sidebar;