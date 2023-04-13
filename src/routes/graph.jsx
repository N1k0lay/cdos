import React, {useEffect, useState} from 'react';
import styles from './graph.module.css';
import {getDataGraph} from "../api/getDataGraph";
import {useLoaderData} from "react-router-dom";
import MultiLine from "../d3/MultiLine/MultiLine";
import Legend from "../d3/MultiLine/Legend";
import {formattingData} from "../d3/utils/formattingData";
import cn from "classnames";

//Загрузка данных с помощью react-router-dom
export async function loader({params}) {
    const dataGraph = await getDataGraph(`${params.category}/${params.func}`);
    return {dataGraph};
}

const Graph = () => {
    const {dataGraph} = useLoaderData();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({});
    const [filteredData, setFilteredData] = useState({});
    const [check, setCheck] = useState([])


    const dimensions = {
        width: 300,
        height: 300,
        margin: {top: 30, right: 30, bottom: 30, left: 30}
    };

    //Получение данных и обработка ошибок
    useEffect(() => {
        if (dataGraph?.name !== 'AxiosError') {
            setData(formattingData(dataGraph));
            setFilteredData(formattingData(dataGraph));
            setIsLoaded(true)
        } else {
            setError(dataGraph)
        }
    }, [dataGraph])


    function handleChangeLegend(dataLegend) {
        setCheck(dataLegend);
    }

    //Фильтрация данных
    useEffect(() => {
        let filterArr = [];
        for (let i = 0; i < data.length; i++) {
            if (check.includes(data[i].k)) {
                filterArr.push(data[i])
            }
        }
        setFilteredData(filterArr)
    }, [check, data])


    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div className={styles.graphPage}>
                <div className={cn(styles.container, styles.graphContainer)} id={'graph-container'}>
                    <MultiLine data={filteredData.length ? filteredData : data} dimensions={dimensions}/>
                </div>
                <div className={cn(styles.container, styles.dataContainer)}>
                    <Legend data={data} handleChangeLegend={handleChangeLegend}/>
                </div>
            </div>

        );
    }
};

export default Graph;