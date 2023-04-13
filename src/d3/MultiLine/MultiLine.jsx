import * as d3 from "d3";
import React, {useEffect, useRef, useState} from "react";


const MultiLine = ({data, dimensions}) => {

    // console.log(data)

    const svgRef = useRef(null);
    const {margin} = dimensions;
    const [width, setWidth] = useState(dimensions.width)
    const [height, setHeight] = useState(dimensions.height)
    const [svgWidth, setSvgWidth] = useState(width);
    const [svgHeight, setSvgHeight] = useState(height);

    //Первичная установка размеров области графика
    useEffect(() => {
        const div = document.querySelector('#graph-container');
        setSvgWidth(div.offsetWidth);
        setSvgHeight(div.offsetHeight);
        setHeight(div.offsetHeight  - margin.top - margin.bottom)
        setWidth(div.offsetWidth  - margin.left - margin.right)
    }, [])

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

    }, [data, dimensions, height, width, svgWidth, svgHeight])


    return (
        <>
            <svg className='graph' ref={svgRef} width={svgWidth} height={svgHeight}/>
        </>
    )
}

export default MultiLine;