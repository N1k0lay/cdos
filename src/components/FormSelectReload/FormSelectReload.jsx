import React from 'react';
import style from "../Sidebar/Sidebar.module.css";
import {interval, setMode} from "../../store/reloadSlice";
import {useDispatch} from "react-redux";

const FormSelectReload = () => {
    const dispatch = useDispatch()

    return (
        <form className={style.selectReload}>
            <label className={style.selectReloadLabel} htmlFor="reload-select">Частота обновления</label>
            <select defaultValue={0} name="reload" id="reload-select" size={6}>
                <option value={0} onClick={() => dispatch(setMode('stop'))}>Отключить</option>
                <option value={15} onClick={() => {
                    dispatch(interval(15));
                    dispatch(setMode('manual'));
                }}>15 секунд</option>
                <option value={30} onClick={() => {
                    dispatch(interval(30));
                    dispatch(setMode('manual'));
                }}>30 секунд</option>
                <option value={60} onClick={() => {
                    dispatch(interval(60));
                    dispatch(setMode('manual'));
                }}>1 минута</option>
                <option value={600} onClick={() => {
                    dispatch(interval(600))
                    dispatch(setMode('manual'));
                }}>10 минут</option>
                <option value={0} onClick={() => dispatch(setMode('auto'))}>Автообновление</option>
            </select>
        </form>
    );
};

export default FormSelectReload;