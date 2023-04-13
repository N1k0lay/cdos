import './App.css';
import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import {Outlet} from "react-router-dom";
import './assets/fonts/NotoSans-Light.ttf'
import './assets/fonts/NotoSans-Regular.ttf'
import './assets/fonts/NotoSans-Bold.ttf'


function App() {

    return (
        <div className='page'>
                <Sidebar/>
            <div className='main'>
                <Outlet/>
            </div>
        </div>
    );
}

export default App;
