import './App.css';
import {useEffect, useState} from "react";
import schc from "../src/d3/dataTest/SCHC.json";
import vcit from "../src/d3/dataTest/VCIT.json";
import portfolio from "../src/d3/dataTest/portfolio.json";
import MultilineChart from "./d3/MultilineChart/MultilineChart";
import {Legend} from "./d3/components";
import LineChart from "./d3/LineChart";


function App() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({});
    const [dataLine, setDataLine] = useState({});

    const portfolioData = {
        name: "Portfolio",
        color: "#ffffff",
        items: portfolio.map((d) => ({...d, date: new Date(d.date)}))
    };
    const schcData = {
        name: "SCHC",
        color: "#d53e4f",
        items: schc.map((d) => ({...d, date: new Date(d.date)}))
    };
    const vcitData = {
        name: "VCIT",
        color: "#5e4fa2",
        items: vcit.map((d) => ({...d, date: new Date(d.date)}))
    };

    useEffect(() => {
        if (isLoaded) {
            console.log(data)
            console.log(data[0])
            const res = data[0];
            let viewData = [];
            for (let i = 0; i < res.k.length; i++) {
                viewData[i] = {k: res.k[i], data: []};
                for (let j = 0; j < res.data.length; j++) {
                    viewData[i].data.push({time: res.data[j].t, value: res.data[j].value[i]})
                }
                console.log(res.k[i])
            }
            console.log(viewData)
        }
    }, [data, isLoaded])

    console.log(vcitData)

    const dimensions = {
        width: 600,
        height: 300,
        margin: {top: 30, right: 30, bottom: 30, left: 60}
    };

    const [selectedItems, setSelectedItems] = useState([]);
    const legendData = [portfolioData, schcData, vcitData];
    const chartData = [
        portfolioData,
        ...[schcData, vcitData].filter((d) => selectedItems.includes(d.name))
    ];

    const onChangeSelection = (name) => {
        const newSelectedItems = selectedItems.includes(name)
            ? selectedItems.filter((item) => item !== name)
            : [...selectedItems, name];
        setSelectedItems(newSelectedItems);
    };

    useEffect(() => {
        fetch("http://localhost:3003/trigonometry/")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setData(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div className="App">
                <LineChart
                    data={[portfolioData, schcData, vcitData]}
                    dimensions={dimensions}/>

                {/*<Legend*/}
                {/*    data={legendData}*/}
                {/*    selectedItems={selectedItems}*/}
                {/*    onChange={onChangeSelection}*/}
                {/*/>*/}
                {/*<MultilineChart data={chartData} />*/}
            </div>
        );
    }
}

export default App;
