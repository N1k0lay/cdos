import React from "react";
import * as d3 from "d3";
import {getXScale, getYScale, drawAxis, drawLine, animateLine} from "../utils.js";

const MultilineChart = ({data = [], dimensions = {}}) => {

    const svgRef = React.useRef(null);

    const [portfolioData] = data;
    const {width, height, margin = {}} = dimensions;
    const [prevItems, setPrevItems] = React.useState([]);
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    const xScale = React.useMemo(
        () => getXScale(portfolioData.items, width),
        [portfolioData, width]
    );
    const yScale = React.useMemo(
        () => getYScale(portfolioData.items, height, 50),
        [portfolioData, height]
    );

    React.useEffect(() => {
        const svg = d3.select(".container");
        svg.selectAll(".axis").remove();
        // Add X grid lines with labels
        drawAxis({
            xScale,
            container: svg,
            tickSize: -height + margin.bottom,
            ticks: 5,
            transform: `translate(0, ${height - margin.bottom})`
        });
        // Add Y grid lines with labels
        drawAxis({
            yScale,
            container: svg,
            tickSize: -width,
            ticks: 5,
            tickFormat: (val) => `${val}%`
        });
    }, [xScale, yScale, width, height, margin]);

    React.useEffect(() => {
        const svg = d3.select(".container");
        svg.selectAll("path").remove();
        // Draw the lines
        data.forEach((d) => {
            const line = drawLine({container: svg, data: d, xScale, yScale});
            if (!prevItems.includes(d.name)) {
                animateLine({element: line.node()});
            }
        });
        setPrevItems(data.map(({name}) => name));
    }, [data, xScale, yScale]);

    return (
        <svg ref={svgRef} width={svgWidth} height={svgHeight}>
            <g className="container" transform={`translate(${margin.left},${margin.top})`}/>
        </svg>
    );
};

export default MultilineChart;