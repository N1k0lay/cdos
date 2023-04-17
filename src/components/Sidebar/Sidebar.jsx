import React from 'react';
import Menu from "../Menu/Menu";
import style from './Sidebar.module.css'
import UpdateGraphButton from "../UpdateGraphButton/UpdateGraphButton";
import FormSelectReload from "../FormSelectReload/FormSelectReload";
import Logo from "../Logo/Logo";


function Sidebar() {
    return (
        <div className={style.sidebar}>
            <Logo />
            <Menu />
            <UpdateGraphButton />
            <FormSelectReload />
        </div>
    );
}

export default Sidebar;