import React from 'react';
import style from "./FormSelectReload.module.css";
import {setInterval, setMode} from "../../store/reloadSlice";
import {useDispatch} from "react-redux";

const FormSelectReload = () => {
    const dispatch = useDispatch()

    return (
        <form className={style.selectReload}>
            <label className={style.selectReloadLabel} htmlFor="reload-select">Частота обновления</label>
            <select defaultValue={0} name="reload" id="reload-select" size={6}>
                <option value={0} onClick={() => dispatch(setMode('stop'))}>Отключить</option>
                <option value={15} onClick={() => {
                    dispatch(setInterval(15));
                    dispatch(setMode('manual'));
                }}>15 секунд</option>
                <option value={30} onClick={() => {
                    dispatch(setInterval(30));
                    dispatch(setMode('manual'));
                }}>30 секунд</option>
                <option value={60} onClick={() => {
                    dispatch(setInterval(60));
                    dispatch(setMode('manual'));
                }}>1 минута</option>
                <option value={600} onClick={() => {
                    dispatch(setInterval(600))
                    dispatch(setMode('manual'));
                }}>10 минут</option>
                <option value={-1} onClick={() => dispatch(setMode('auto'))}>Автообновление</option>
            </select>
        </form>
    );
};

export default FormSelectReload;