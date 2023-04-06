import React, {useEffect, useState} from 'react';


const Legend = ({data, handleChangeLegend}) => {
    const [check, setCheck] = useState([]);
    function handleChange (event) {
        let id = Number(event.target.id);
        if(check.includes(id)) {
            let newArr = check.filter(k=> k !== id);
            setCheck(newArr);
        } else {
            setCheck([id, ...check])
        }
    }

    useEffect(() => {
        handleChangeLegend(check)
    }, [check])
    return (<>
        Легенда
        {
            data.map(line => {
                    return (
                        <div key={line.k}>
                            <input className={'legendCheckbox'} type="checkbox" id={line.k} name={line.k} value={check.includes(Number(line.k))} onChange={handleChange}/>
                            <label htmlFor={line.k}>{line.name}</label>
                        </div>)
                }
            )
        }
    </>);
};

export default Legend;