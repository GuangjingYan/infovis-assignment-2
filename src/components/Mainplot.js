import React, { useRef, useEffect, useState} from "react";
import * as d3 from "d3";

const Mainplot = (props) => {
  const { width, height, margin, pointSize, maxPointSize, data, movieData, setBrushedIndex } = props;
  const { xPosition, yPosition, color, opacity, size} = data;

  const svgWidth = margin * 2 + width;
  const svgHeight = margin * 2 + height;
  const splotSvg = useRef(null);
  // update state
  const isUpdate = useRef();
  const colors = d3.scaleOrdinal(d3.schemeAccent);
  let brush = d3.brush()
                .extent([[0, 0], [width, height]])
                
  useEffect(() => {
    if(!isUpdate.current){
      drawSplot();
      isUpdate.current = true;
    }else
      // remove brush section
      d3.select(".brushSvg").call(brush.move, null);
      // clear table
      setBrushedIndex([]);
      // set stroke
      d3.selectAll("circle")
      .attr("stroke", "none");
      updateSplot();
	}, [data]);

  const drawSplot = () =>{
    // set xAxis & yAxis
    const xExtent = d3.extent(movieData.map(d => parseFloat(d[xPosition])));
    const yExtent = d3.extent(movieData.map(d => parseFloat(d[yPosition])));

    const xScale  = d3.scaleLinear().domain(xExtent).range([0, width]);
    const yScale  = d3.scaleLinear().domain(yExtent).range([height, 0]);
  
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)
    const svg = d3.select(splotSvg.current).attr("class", "Splot");

		const xAxisSvg = d3.select(splotSvg.current)
		 	.append("g")
      .attr("transform", `translate(${ margin },${ height + margin })`)
      .attr("class", "xAxisSvg")
		
    xAxisSvg.call(xAxis)

		const yAxisSvg = d3.select(splotSvg.current)
		  .append("g")
		  .attr("transform", `translate(${ margin }, ${ margin })`)
      .attr("class", "yAxisSvg")
			
    yAxisSvg.call(yAxis)
    // draw circles
		const circleSvg = svg.append("g").attr("transform", `translate(${ margin }, ${ margin })`).attr("class", "circleSvg")

		circleSvg.selectAll("circle")
						 .data(movieData)
						 .enter()
						 .append("circle")
						 .attr("cx", d => xScale(parseFloat(d[xPosition])))
						 .attr("cy", d => yScale(parseFloat(d[yPosition])))
						 .attr("class", (_, i) => "circle" + i)
						 .attr("r", pointSize)
             .attr("fill", "black")

		// set brush
    const brushSvg = svg.append("g")
                        .attr("transform", "translate(" + props.margin + "," + props.margin + ")")
                        .attr("class", "brushSvg")
    
    brush.on("start brush end", brushed)
    brushSvg.call(brush);

  }
  // update scatterplot
  const updateSplot = () =>{
    // set xAxis & yAxis
    const xExtent = d3.extent(movieData.map(d => parseFloat(d[xPosition])));
    const yExtent = d3.extent(movieData.map(d => parseFloat(d[yPosition])));

    const rExtent = d3.extent(movieData.map(d => parseFloat(d[size])));
    const oExtent = d3.extent(movieData.map(d => parseFloat(d[opacity])));

    const xScale  = d3.scaleLinear().domain(xExtent).range([0, width]);
    const yScale  = d3.scaleLinear().domain(yExtent).range([height, 0]);
    const rScale = d3.scaleLinear().domain(rExtent).range([pointSize, maxPointSize]);
    const oScale = d3.scaleLinear().domain(oExtent).range([0, 1]);

    const xAxis = d3.axisBottom(xScale);
    const xAxisSvg = d3.select(".xAxisSvg")
    xAxisSvg.call(xAxis);
    const yAxis = d3.axisLeft(yScale);
    const yAxisSvg = d3.select(".yAxisSvg")
    yAxisSvg.call(yAxis);
    // set circles
    const circleSvg = d3.select(".circleSvg")
    const circle = circleSvg.selectAll("circle")
    circle.data(movieData)
    .join()
    .transition()
    .duration(100)
    .attr("cx", d => xScale(parseFloat(d[xPosition])))
    .attr("cy", d => yScale(parseFloat(d[yPosition])))
    // set circle radius
    if(size === "none")
      circle.attr("r",pointSize);
    else{
      circle.data(movieData)
      .join()
      .attr("r", d => rScale(parseFloat(d[size])))
    }
    //set circle opacity
    if(opacity === "none")
    circle.attr("opacity",1);
    else{
    circle.data(movieData)
    .join()
    .attr("opacity", d => oScale(parseFloat(d[opacity])))
    }
    //set circle color
    if(color === "none")
      circle.attr("fill","black");
    else{
      const colorMap = new Map();
      movieData.forEach( (e,i) =>{
        if( colorMap.has(e[color]))
          return;
        else
          colorMap.set(e[color],i);
      });
      movieData.forEach( (e,i) =>{
        circleSvg.select(`.circle${i}`)
         .attr("fill", e => colors(colorMap.get(e[color])))
      });
    }
    // set brush
    const brushSvg = d3.select(".brushSvg")
    brush.on("start brush end", brushed);                     
    brushSvg.call(brush);

}

function brushed({selection}) {
  const xExtent = d3.extent(movieData.map(d => parseFloat(d[xPosition])));
  const yExtent = d3.extent(movieData.map(d => parseFloat(d[yPosition])));

  const xScale  = d3.scaleLinear().domain(xExtent).range([0, width]);
  const yScale  = d3.scaleLinear().domain(yExtent).range([height, 0]);
  if (selection === null) {
    setBrushedIndex([]);
    return;
  }
  let [[x0, y0], [x1, y1]] = selection;

  const insideBrush = movieData.map((d, i) => {
    const xCoor = xScale(parseFloat(d[xPosition]));
    const yCoor = yScale(parseFloat(d[yPosition]));
    if (xCoor >= x0 && xCoor <= x1 &&
        yCoor >= y0 && yCoor <= y1
    ) return true;
    else return false;
  })

  const insideBrushIdx = insideBrush.reduce((acc, cur, i) => {
    if (cur) acc.push(i);
    return acc;
  }, []);
  setBrushedIndex(insideBrushIdx);
  d3.selectAll("circle").attr("stroke", "none");
  insideBrushIdx.forEach(idx => {
    d3.selectAll(".circle" + idx)
      .attr("stroke", "black")
  });		
}
    
  return (
		<div>
			<svg ref={splotSvg} width={svgWidth} height={svgHeight}> 
			</svg>
    </div>
  )
}
export default Mainplot;