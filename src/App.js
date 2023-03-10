import './App.css';
import './style.css'
import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import {Outlet} from "react-router-dom";


function App() {

    return (
        <div className='page'>
            <div className='sidebar'>
                <Sidebar/>
            </div>
            <div className='main'>
                <Outlet/>
            </div>
        </div>
    );
}

export default App;
