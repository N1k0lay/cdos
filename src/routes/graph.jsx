import React, {useEffect, useState} from 'react';
import styles from './graph.module.css';
import {getDataGraph} from "../api/getDataGraph";
import {useLoaderData, useParams} from "react-router-dom";
import MultiLine from "../d3/MultiLine/MultiLine";
import Legend from "../d3/MultiLine/Legend";
import {formattingData} from "../d3/utils/formattingData";
import cn from "classnames";
import {useSelector, useDispatch} from 'react-redux'
import {update, fetchDataGraph} from '../store/dataGraphSlice'
import {reload, interval} from '../store/reloadSlice'

const Graph = () => {
    const [isLoaded, setIsLoaded] = useState(false); //Отвечает за готовность данных к отрисовке
    const [data, setData] = useState({});
    const [filteredData, setFilteredData] = useState({});
    const [check, setCheck] = useState([])
    const params = useParams();
    const dimensions = {
        width: 300,
        height: 300,
        margin: {top: 30, right: 30, bottom: 30, left: 30}
    };

    const dispatch = useDispatch();
    const reloadData = useSelector((state) => state.reload.reload);

    const {status, error} = useSelector(state => state.dataGraph);
    const dataGraph = useSelector(state => state.dataGraph.data);

    //Отправка данных о странице в createAsyncThunk fetchDataGraph для получения данных с сервера
    useEffect(() => {
        dispatch(fetchDataGraph(`${params.category}/${params.func}`));
    }, [dispatch, params.category, params.func, reloadData])


    //Первоначальное Получение данных, обработка данных
    useEffect(() => {
        if (status === 'resolved') {
            setData(formattingData(dataGraph));
            setFilteredData(formattingData(dataGraph));
            setIsLoaded(true)
        }
    }, [dataGraph, status])


    function handleChangeLegend(dataLegend) {
        setCheck(dataLegend);
    }

    //Фильтрация данных для легенды
    useEffect(() => {
        let filterArr = [];
        for (let i = 0; i < data.length; i++) {
            if (check.includes(data[i].k)) {
                filterArr.push(data[i])
            }
        }
        setFilteredData(filterArr)
    }, [check, data])



    return (
        <div className={styles.graphPage}>
            <div className={cn(styles.container, styles.graphContainer)} id={'graph-container'}>
                {error && <div>Ошибка: {error}</div>}
                {!isLoaded && <div>Загрузка</div>}
                {isLoaded && <MultiLine data={filteredData.length ? filteredData : data} dimensions={dimensions}/>}
            </div>
            <div className={cn(styles.container, styles.dataContainer)}>
                {!isLoaded && <div>Загрузка</div>}
                {isLoaded && <Legend data={data} handleChangeLegend={handleChangeLegend}/>}
            </div>
        </div>

    );
};

export default Graph;