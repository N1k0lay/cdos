import React from 'react';
import style from "../Sidebar/Sidebar.module.css";
import {reload} from "../../store/reloadSlice";
import {useDispatch} from "react-redux";

const UpdateGraphButton = () => {
    const dispatch = useDispatch()

    return (
        <button className={style.btnPrimary} onClick={() => dispatch(reload())}>
            Обновить данные
        </button>
    );
};

export default UpdateGraphButton;