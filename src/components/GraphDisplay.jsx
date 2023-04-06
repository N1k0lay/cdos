import React, {useEffect, useState} from 'react';
import MultiLine from "../d3/MultiLine/MultiLine";
import {ShowWindowDimensions, useWindowSize} from "../d3/hooks/useWindowSize";
import {formattingData} from "../d3/utils/formattingData";
import Legend from "../d3/MultiLine/Legend";


const GraphDisplay = ({initData}) => {
    // console.log(initData)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({});
    const [filteredData, setFilteredData] = useState({});
    const [check, setCheck] = useState([])

    const dimensions = {
        width: 700,
        height: 300,
        margin: {top: 30, right: 60, bottom: 30, left: 30}
    };

    useEffect(() => {
        if (initData?.name !== 'AxiosError') {
            setData(formattingData(initData));
            setFilteredData(formattingData(initData));
            setIsLoaded(true)
        } else {
            setError(initData)
        }
    }, [initData])

    function handleChangeLegend(dataLegend) {
        setCheck(dataLegend);
    }

    useEffect(() => {

        let filterArr = [];
        for (let i = 0; i < data.length; i++) {
            if (check.includes(data[i].k)) {
                filterArr.push(data[i])
                //setFilteredData([...filteredData, data[i]])
            } else {

            }
        }
        setFilteredData(filterArr)
        console.log('filteredData')
        console.log(filteredData)
    }, [check, data])


    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <>
                <MultiLine data={filteredData.length ? filteredData : data} dimensions={dimensions}/>
                <Legend data={data} handleChangeLegend={handleChangeLegend}/>
            </>

        );
    }


};

export default GraphDisplay;