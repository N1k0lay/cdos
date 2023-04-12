import * as d3 from "d3";
import React, {useEffect, useRef, useState} from "react";
import {useWindowSize} from "../hooks/useWindowSize";


const MultiLine = ({data, dimensions}) => {

    // console.log(data)

    const svgRef = useRef(null);
    const {margin} = dimensions;
    const [width, setWidth] = useState(+dimensions.width - +margin.left - +margin.right)
    const [height, setHeight] = useState(+dimensions.height - +margin.top - +margin.bottom)
    const [svgWidth, setSvgWidth] = useState(width);
    const [svgHeight, setSvgHeight] = useState(height);

    //Первичная установка размеров области графика
    useEffect(() => {
        const div = document.querySelector('.graph-container');
        const w = div.offsetWidth - margin.left - margin.right;
        const h = div.offsetHeight - margin.bottom;
        setSvgWidth(w);
        setSvgHeight(h);
        // console.log(w)
    }, [])

    useEffect(() => {
        setWidth(svgWidth - margin.left - margin.right);
        setHeight(svgHeight - margin.top - margin.bottom)
    }, [svgWidth, margin.left, margin.right, margin.top, margin.bottom, svgHeight],)

    useEffect(() => {
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data[0].items, d => d.date))
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([d3.min(data, d => d3.min(d.items, i => i.value)), d3.max(data[0].items, (d) => d.value)])
            .range([height, 0]);

        const svgEl = d3.select(svgRef.current);
        svgEl.selectAll("*").remove(); // Очистка SVG перед отрисовкой

        const svg = svgEl
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);


        let xAxis = svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .attr('color', 'black')
            .call(d3.axisBottom(xScale));

        // Add Y axis

        let yAxis = svg.append("g")
            .attr('color', 'black')
            .call(d3.axisLeft(yScale));

        // Рисуем линии
        const line = d3.line()
            .x((d) => xScale(d.date))
            .y((d) => yScale(d.value))

        svg.selectAll(".line")
            .data(data)
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", (d) => d.color)
            .attr("stroke-width", 3)
            .attr("d", (d) => line(d.items));

    }, [data, dimensions, height, margin.left, margin.top, width, svgWidth, svgHeight])


    return (
        <>
            <svg className='graph' ref={svgRef} width={svgWidth} height={svgHeight}/>
        </>
    )
}

export default MultiLine;