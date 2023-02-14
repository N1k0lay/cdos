import React, {useEffect, useState} from 'react';
import LinearZoom from "../d3/LinearZoom/LinearZoon";
import axios from "axios";

function formattingData (data, i) {
    let formattedData = [];
    const res = data[i]; //берем синус для теста
    for (let i = 0; i < res.k.length; i++) {
        formattedData[i] = {k: res.k[i], data: []};
        for (let j = 0; j < res.data.length; j++) {
            formattedData[i].data.push({date: res.data[j].t, value: res.data[j].value[i]})
        }
    }
    return formattedData;
}
const GraphDisplay = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({});
    const [formatData, setFormatData] = useState([]);

    const dimensions = {
        width: 700,
        height: 300,
        margin: {top: 30, right: 30, bottom: 30, left: 60}
    };


    useEffect(() => {
        axios
            .get("http://localhost:3003/trigonometry/")
            .then(res => {
                console.log(res)
                setData(formattingData(res.data, 0))
                setIsLoaded(true)
            })
            .catch(error => {
                setError(error);
            })
    }, [])


    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div>
                <LinearZoom data={data[0].data} dimensions={dimensions}/>
            </div>

        );
    }


};

export default GraphDisplay;