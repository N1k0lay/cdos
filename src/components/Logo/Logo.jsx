import React from 'react';
import style from "../Sidebar/Sidebar.module.css";
import LogoImg from "../../assets/img/logo_vniitf.png";

const Logo = () => {
    return (
        <div className={style.logo}>
            <img src={LogoImg}  alt={'logo'}/>
        </div>
    );
};

export default Logo;