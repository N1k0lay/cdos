import React, {useEffect, useState} from 'react';
import stylesTypography from '../../assets/styles/typography.module.css';
import stylesLegend from './Legend.module.css'

const Legend = ({data, handleChangeLegend}) => {
    const [check, setCheck] = useState([]);

    function handleChange(event) {
        let id = Number(event.target.id);
        if (check.includes(id)) {
            let newArr = check.filter(k => k !== id);
            setCheck(newArr);
        } else {
            setCheck([id, ...check])
        }
    }

    useEffect(() => {
        handleChangeLegend(check)
    }, [check])
    return (
        <>
            <div className={stylesTypography.title}>Легенда</div>
            {
                data.map(line => {
                        return (
                            <div className={stylesLegend.legendItem} key={line.k}>
                                <input className={'legendCheckbox'} type="checkbox" id={line.k} name={line.k}
                                       value={check.includes(Number(line.k))} onChange={handleChange}/>
                                <label htmlFor={line.k}>
                                    <span className={stylesLegend.name}>{line.name}</span>
                                    <svg className={'legend_colorIcon'} width={14} height={14}>
                                        <rect x="0" y="0" width="14" height="14" fill={line.color}/>
                                    </svg>
                                </label>
                            </div>)
                    }
                )
            }
        </>);
};

export default Legend;