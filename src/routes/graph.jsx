import React, {useEffect, useState} from 'react';
import styles from './graph.module.css';
import {useParams} from "react-router-dom";
import MultiLine from "../d3/MultiLine/MultiLine";
import Legend from "../d3/MultiLine/Legend";
import {formattingData} from "../d3/utils/formattingData";
import cn from "classnames";
import {useSelector, useDispatch} from 'react-redux'
import {fetchDataGraph} from '../store/dataGraphSlice'
import {upIntervalSec} from "../store/reloadSlice";

const Graph = () => {
    const [isLoaded, setIsLoaded] = useState(false); //Отвечает за готовность данных к отрисовке
    const [fetchData, setFetchData] = useState({}); //Данные, которые пришли с сервера без изменений
    const [oldData, setOldData] = useState({}); //Исходные данные перед получением новых данных
    const [data, setData] = useState({}); //Отоформатированные данные
    const [filteredData, setFilteredData] = useState({}); //Отформатированные и отфильтрованные данные
    const [check, setCheck] = useState([]) //Массив с отмеченными данными для легенды
    const [firsLoad, setFirstLoad] = useState(true)
    const params = useParams(); //Параметры из URL
    const dimensions = {
        width: 300,
        height: 300,
        margin: {top: 30, right: 30, bottom: 30, left: 30}
    };

    const dispatch = useDispatch();
    const reloadData = useSelector((state) => state.reload.reload); //Флаг для повторной подгрузки данных
    const reloadInterval = useSelector((state) => state.reload.interval); //Интервал обновления данных
    const reloadMode = useSelector((state) => state.reload.mode);

    const {status, error} = useSelector(state => state.dataGraph);
    const dataGraph = useSelector(state => state.dataGraph.data);

    //Отправка данных о странице в createAsyncThunk fetchDataGraph для получения данных с сервера
    useEffect(() => {
        dispatch(fetchDataGraph(`${params.category}/${params.func}`));
        setOldData(dispatch(fetchDataGraph(`${params.category}/${params.func}`)));
    }, [dispatch, params.category, params.func, reloadData])

    useEffect(() => {
        if (reloadMode === 'manual') {
            const interval = setInterval(() => {
                dispatch(fetchDataGraph(`${params.category}/${params.func}`));
            }, reloadInterval * 1000);
            return () => clearInterval(interval)
        }
        if (reloadMode === 'auto') {
            const intervalAuto = setInterval(() => {
                dispatch(fetchDataGraph(`${params.category}/${params.func}`));
                if (JSON.stringify(dataGraph) === JSON.stringify(oldData)) {
                    dispatch(upIntervalSec(5))
                } else {
                    setOldData(fetchData)
                }
            }, reloadInterval * 1000);
            return () => clearInterval(intervalAuto)
        }

    }, [data, dataGraph, dispatch, fetchData, params.category, params.func, reloadInterval, reloadMode])


    //Обновление данных при изменении данных на сервере
    useEffect(() => {
        if (status === 'resolved') {
            if (firsLoad) {
                setOldData(dataGraph);
                setFetchData(dataGraph);
                setData(formattingData(dataGraph));
                setFilteredData(formattingData(dataGraph));
                setIsLoaded(true);
                setFirstLoad(false);
            } else {
                setFetchData(dataGraph);
                setData(formattingData(dataGraph));
                setFilteredData(formattingData(dataGraph));
                setIsLoaded(true);
            }
        }
    }, [dataGraph, firsLoad])


    //При смене страницы
    useEffect(() => {
        setIsLoaded(false);
        setFirstLoad(true);
    }, [params])


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
                {isLoaded && <Legend data={data} name={fetchData.name} handleChangeLegend={handleChangeLegend}/>}
            </div>
        </div>

    );
};

export default Graph;