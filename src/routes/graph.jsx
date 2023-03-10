import React from 'react';
import GraphDisplay from "../components/GraphDisplay";
import './graph.css';
import {getDataGraph} from "../api/getDataGraph";
import {useLoaderData} from "react-router-dom";

export async function loader({ params }) {
    const graphData = await getDataGraph(`${params.category}/${params.func}`);
    return {graphData}
}

const Graph = () => {
    const { graph } = useLoaderData();
    console.log(graph)
    return (
        <div className='graphPage'>
            <div className='graph'>
                <GraphDisplay />
            </div>
            <div className='data'>
                данные
            </div>
        </div>
    );
};

export default Graph;