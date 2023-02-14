import './App.css';
import GraphDisplay from "./components/GraphDisplay";
import './style.css'
import React from "react";
import {useWindowSize} from "./hooks/useWindowSize";


function App() {

    return (
        <div className='page'>
            <div className='sidebar'>
                сайдбар
            </div>
            <div className='graph'>
                <GraphDisplay />
            </div>
            <div className='data'>
                данные
            </div>
        </div>

    );
}

export default App;
