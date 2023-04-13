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
                        <div className={'legend_item'} key={line.k}>
                            <input className={'legendCheckbox'} type="checkbox" id={line.k} name={line.k} value={check.includes(Number(line.k))} onChange={handleChange}/>
                            <svg className={'legend_colorIcon'} width={14} height={14}><rect x="0" y="0" width="14" height="14" fill={line.color}/></svg>
                            <label htmlFor={line.k}>{line.name}</label>
                        </div>)
                }
            )
        }
    </>);
};

export default Legend;