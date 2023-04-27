import * as d3 from "d3";
import React, {useEffect, useRef, useState} from "react";
import './tooltip.css'

const MultiLine = ({data, dimensions}) => {
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
        setHeight(div.offsetHeight - margin.top - margin.bottom)
        setWidth(div.offsetWidth - margin.left - margin.right)
    }, [])

    useEffect(() => {
        const xScale = d3.scaleLinear()
            .domain([
                d3.min(data, d => d3.min(d.items, i => i.date)),
                ((d3.max(data[0].items, (d) => d.date)*1.05))
            ])
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([
                d3.min(data, d => d3.min(d.items, i => i.value)),
                ((d3.max(data[0].items, (d) => d.value)*1.1))])
            .range([height, 0]);

        const svgEl = d3.select(svgRef.current);
        svgEl.selectAll("*").remove(); // Очистка SVG перед отрисовкой

        const svg = svgEl
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Добавление оси Х
        let xAxis = svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .attr('color', 'black')
            .call(d3.axisBottom(xScale));

        // Добавление оси Y
        let yAxis = svg.append("g")
            .attr('color', 'black')
            .call(d3.axisLeft(yScale));

        // Рисуем линии
        const line = d3.line()
            .x((d) => xScale(d.date))
            .y((d) => yScale(d.value))

        // create a tooltip
        const Tooltip =
            d3.select('.graph-container')
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "2px")
                .style("border-radius", "5px")
                .style("padding", "5px")

        // Функции, срабатывающие при наведении на точку (hover / move / leave)
        const mouseover = function (event, d) {
            Tooltip
                .style("opacity", 1)
        }
        const mousemove = function (event, d) {
            Tooltip
                .html(`y: ${d.value} <br> x: ${d.date}`)
                .style("left", `${event.layerX + 10}px`)
                .style("top", `${event.layerY}px`)
        }
        const mouseleave = function (event, d) {
            Tooltip
                .style("opacity", 0)
        }

        //Начало Zoom

        // Добавление clipPath: всё что выходит за пределы этой области отображаться не будет
        let clip = svg.append("defs").append("svg:clipPath")
            .attr("id", "clip")
            .append("svg:rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0)
            .attr("y", 0);

        // Добавление возможности выделять область
        let brush = d3.brushX()                 // Добавьте функцию кисти, используя функцию d3.brush.
            .extent([[0, 0], [width, height]]) // инициализировать область кисти: начать с 0,0 и закончить шириной, высотой
            .on("end", updateChart) // Каждый раз, когда выделение заканчивается, запускается функция updateChart.

        // Добавление области, где находится область выделения и линии
        let scatter = svg.append('g')
            .attr("clip-path", "url(#clip)")

        // Добавление рисования
        scatter
            .append("g")
            .attr("class", "brush")
            .call(brush);

        // Функция устанавливает для idleTimeOut =  null
        let idleTimeout

        function idled() {
            idleTimeout = null;
        }

        // Функция, которая обновляет график для заданных границ
        function updateChart(event) {
            let extent = event.selection

            // Если нет выбора, вернуться к исходной координате. В противном случае обновите домен оси X.
            if (!extent) {
                if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // Задержка перед анимацией
                xScale.domain([
                    d3.min(data, d => d3.min(d.items, i => i.date)),
                    ((d3.max(data[0].items, (d) => d.date)*1.05))
                ])
                    .range([0, width]);
            } else {
                xScale.domain([xScale.invert(extent[0]), xScale.invert(extent[1])])
                scatter.select(".brush").call(brush.move, null) // Это удалит серую область кисти, как только выделение будет сделано
            }

            // Обновление осей и позиции линий / Update axis and circle position
            xAxis.transition().duration(1000).call(d3.axisBottom(xScale))
            scatter
                .selectAll("path")
                .transition().duration(1000)
                .attr("fill", "none")
                .attr("stroke", (d) => d.color)
                .attr("stroke-width", 3)
                .attr("d", (d) => line(d.items));

            scatter
                // points
                .selectAll("circle")
                .transition().duration(1000)
                .attr("cx", d => xScale(d.date))
                .attr("cy", d => yScale(d.value))
                .attr("r", 3)
                .attr("stroke", "black")
        }


        //Отрисовка линий на графике
        scatter.selectAll(".line")
            .data(data)
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", (d) => d.color)
            .attr("stroke-width", 3)
            .attr("d", (d) => line(d.items));

        scatter
            // dots
            .selectAll(".dots")
            .data(data)
            .enter()
            .append('g')
            .style("fill", d => (d.color))
            // points
            .selectAll(".points")
            .data(d => d.items)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.date))
            .attr("cy", d => yScale(d.value))
            .attr("r", 3)
            .attr("stroke", "rgba(0, 0, 0, 0.3)")
            .style("cursor", 'pointer')
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)


    }, [data, dimensions, height, width, svgWidth, svgHeight])


    return (
        <div className='graph-container'>
            <svg className='graph' ref={svgRef} width={svgWidth} height={svgHeight}/>
        </div>
    )
}

export default MultiLine;