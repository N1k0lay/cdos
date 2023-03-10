import * as d3 from "d3";
import React, {useEffect} from "react";

const LinearZoom = ({data, dimensions}) => {

    useEffect(() => {

        const {height, width, margin} = dimensions;

        d3.select("#my_dataviz").selectAll("*").remove(); //Удаление всех элементов из div, в котором идет отрисовка

        const svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.date))
            .range([0, width]);
        let xAxis = svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .attr('color', 'black')
            .call(d3.axisBottom(xScale));

        // Add Y axis
        const yScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.value))
            .range([height, 0]);
        let yAxis = svg.append("g")
            .attr('color', 'black')
            .call(d3.axisLeft(yScale));

        // Add a clipPath: everything out of this area won't be drawn.
        const clip = svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0)
            .attr("y", 0);

        // Add brushing
        const brush = d3.brushX()                   // Add the brush feature using the d3.brush function
            .extent([[0, 0], [width, height]])  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
            .on("end", updateChart)               // Each time the brush selection changes, trigger the 'updateChart' function

        // Create the area variable: where both the area and the brush take place
        const area = svg.append('g')
            .attr("clip-path", "url(#clip)")

        // Create an area generator
        const line = d3.line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.value))

        // Add the area
        area.append("path")
            .datum(data)
            .attr('fill', 'none')
            .attr("class", "myArea")  // I add the class myArea to be able to modify it later on.
            .attr("stroke", "black")
            .attr("stroke-width", 3)
            .attr("d", line)

        // Add the brushing
        area
            .append("g")
            .attr("class", "brush")
            .call(brush);

        // A function that set idleTimeOut to null
        let idleTimeout

        function idled() {
            idleTimeout = null;
        }

        // A function that update the chart for given boundaries
        function updateChart(event) {

            // What are the selected boundaries?
            let extent = event.selection

            // If no selection, back to initial coordinate. Otherwise, update X axis domain
            if (!extent) {
                if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
                xScale.domain([4, 8])
            } else {
                xScale.domain([xScale.invert(extent[0]), xScale.invert(extent[1])])
                area.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
            }

            // Update axis and area position
            xAxis.transition().duration(1000).call(d3.axisBottom(xScale))
            area
                .select('.myArea')
                .transition()
                .duration(1000)
                .attr("d", line)
        }

        // If user double click, reinitialize the chart
        svg.on("dblclick", function () {
            xScale.domain(d3.extent(data, d => d.date))
            xAxis.transition().call(d3.axisBottom(xScale))
            area
                .select('.myArea')
                .transition()
                .attr("d", line)
        });
    }, [data, dimensions])


    return (<>
        График синуса
        <div id="my_dataviz"></div>
    </>)
}

export default LinearZoom;