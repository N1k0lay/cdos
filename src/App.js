import './App.css';
import GraphDisplay from "./components/GraphDisplay";
import './style.css'

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
