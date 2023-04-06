import React from 'react';
import GraphDisplay from "../components/GraphDisplay";
import './graph.css';
import {getDataGraph} from "../api/getDataGraph";
import {useLoaderData} from "react-router-dom";

export async function loader({ params }) {
    const dataGraph = await getDataGraph(`${params.category}/${params.func}`);
    return {dataGraph};
}

const Graph = () => {
    const {dataGraph} = useLoaderData();
    return (
        <div className='graphPage'>
            <div className='graph-container'>
                <GraphDisplay initData={dataGraph} />
            </div>
            <div className='data-container'>
                данные
            </div>
        </div>
    );
};

export default Graph;