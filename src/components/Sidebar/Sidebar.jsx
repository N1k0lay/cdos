import React from 'react';
import Menu from "../Menu/Menu";
import style from './Sidebar.module.css'
import LogoImg from '../../assets/img/logo_vniitf.png';
import { useSelector, useDispatch } from 'react-redux'
import {reload, interval } from '../../store/reloadSlice'


function Sidebar(props) {

    const stateInterval = useSelector((state) => state.reload.interval)
    // console.log(stateInterval)
    const dispatch = useDispatch()

    return (
        <div className={style.sidebar}>
            <div className={style.logo}>
                <img src={LogoImg}  alt={'logo'}/>
            </div>
            <Menu />

                <button className={style.btnPrimary} onClick={() => dispatch(reload())}>
                    Обновить данные
                </button>

            <form className={style.selectReload}>
                <label className={style.selectReloadLabel} htmlFor="reload-select">Частота обновления</label>
                <select name="reload" id="reload-select" size={5}>
                    <option value={0}>Автообновление</option>
                    <option value={1}>1 минута</option>
                    <option value={60}>1 час</option>
                    <option value={60*3}>3 часа</option>
                    <option value={60*12}>12 часов</option>
                </select>
            </form>


        </div>
    );
}

export default Sidebar;