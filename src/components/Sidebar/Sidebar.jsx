import React from 'react';
import Menu from "../Menu/Menu";
import style from './Sidebar.module.css'
import { useSelector, useDispatch } from 'react-redux'
import UpdateGraphButton from "../UpdateGraphButton/UpdateGraphButton";
import FormSelectReload from "../FormSelectReload/FormSelectReload";
import Logo from "../Logo/Logo";


function Sidebar(props) {
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