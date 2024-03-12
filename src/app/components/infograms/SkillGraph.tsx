"use client"
import React, { useRef, useEffect, useState } from "react";
// libraries
import * as d3 from "d3";
// redux
import { connect } from "react-redux";

let radius = 360;

let padding = 5;

let fillOpacity = 1;

let fill;

let linkTarget = '';

let marginRight = 10;
let marginLeft = 10;

let marginBottom = 10;
let marginTop = 10;

export default function SkillGraph() {
    const data = {
        name: "Tools",
        children: [
          {
            name: "Development",
            children: [
              {
                name: "Front End",
                children: [
                  { name: "React",
                   size: 1000,
                   children: [
                    { name:"React", size: 10000, },
                    { name:"React Native", size: 4938, },
                    { name:"Redux TookKit", size: 5938, },
                    { name:"Nextjs", size: 8000, }
                   ] 
                },
                  { name: "ElectronJs", size: 3812 },
                  { 
                    name: "HTML", 
                    size: 1000,
                    children: [
                        { name:"CSS",size: 3938,},
                        { name:"html5",size: 3938,}
                       ] 
                },
                  { name: "Jquery", size: 3938 },
                ],
              },
              {
                name: "Back End",
                children: [
                  { name: "Nodejs", size: 7840 },
                  { name: "Restful API", size: 5731 },
                  { name: "java", size: 3534 }
                ],
              }
            ],
          },
          {
            name: "Agile Tools",
            children: [
              { name: "Scrum", size: 5000 },
              { name: "Kanban", size: 5000 },
              { name: "Jira", size: 5000, },
              { name: "Trello", size: 5000 },
            ],
          },
          {
            name: "QA Tools",
            children: [
                {name: "Cypress",size: 10066 },
                { name: "PostMan", size: 8833 },
                { name: "PlayWrigth", size: 1732 },
                { name: "QTest", size: 3623 }
              ],
          },
          {
            name: "CI/CD Tools",
            children: [
              { name: "git", size: 10066 },
              { name: "gitLab", size: 8833 },
              { name: "GitHub", size: 3623 },
              { name: "PipeLines", size: 1732 },
            ],
          },
        ],
      };
 // Element References
 const svgRef = useRef(null);
 const svgContainer = useRef(null); // The PARENT of the SVG

 // State to track width and height of SVG Container
 const [width, setWidth] = useState(800);
 const [height, setHeight] = useState(600);

 function handleZoom(e) {
  d3.selectAll('a')
  .attr('transform', e.transform);
 }

 // calculate width and height of container
 const getSvgContainerSize = () => {
   const newWidth = svgContainer.current.clientWidth;
   setWidth(newWidth);

   const newHeight = svgContainer.current.clientHeight;
   setHeight(newHeight);
 };

 // resizer
 useEffect(() => {
   // get 'width' and 'height' on render
   getSvgContainerSize();
   // listen for resize changes
   window.addEventListener("resize", getSvgContainerSize);
   // cleanup event listener
   return () => window.removeEventListener("resize", getSvgContainerSize);
 }, []);

 // draw chart
 useEffect(() => {
   // D3 Code
   const root = d3.hierarchy(data);
   
   const valueAccessor = (d) => d.size;
   valueAccessor == null
        ? root.count()
        : root.sum((d) => Math.max(0, valueAccessor(d)));
    // sort leaves by value
    
    root.sort((a, b) => d3.descending(a.value, b.value));
    // Dimensions
    let dimensions = {
        width: width,
        height: height,
        margins: 50,
    };
    dimensions.radius =
        Math.min(
            dimensions.containerWidth,
            dimensions.containerHeight
        ) / 2;
    d3.partition().size([2 * Math.PI, radius])(root);

   

   dimensions.containerWidth = dimensions.width - dimensions.margins * 2;
   dimensions.containerHeight = dimensions.height - dimensions.margins * 2;

   // construct color scale
const defaultFill = "#ccc"
const colorScheme = d3.interpolateSpectral
const color = d3
  .scaleSequential([0, root.children.length - 1], colorScheme)
  .unknown(defaultFill);
// give all children of root an identical index for coloration  
root.children.forEach((child, i) => (child.index = i));

const arc = d3.arc()
  .startAngle(d => d.x0)
  .endAngle(d => d.x1)
  .padAngle(d => Math.min((d.x1 - d.x0) / 2, 2 * padding /  dimensions.radius))
  .padRadius(radius / 2)
  .innerRadius(d => d.y0)
  .outerRadius(d => d.y1 - padding);


  const  link = (d, n) => n.children
  ? `#`
  : `#`
  
     const svg = d3.create("svg")
     .attr("viewBox", [
        marginRight - marginLeft - width / 2,
        marginBottom - marginTop - height / 2,
        width,
        height
      ])
     .attr("width", width)
     .attr("height", height)
     .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
     .attr("font-family", "sans-serif")
     .attr("font-size", 10)
     .attr("text-anchor", "middle")
    .attr("class", "zoomit")
     .call(d3.zoom().on("zoom", handleZoom));
    
 const cell = svg
  .selectAll("a")
  .data(root.descendants())
  .join("a");

cell.append("path")
    .attr("d", arc)
    .attr("fill", color ? d => color(d.ancestors().reverse()[1]?.index) : fill)
    .attr("fill-opacity", fillOpacity);



    // label is simply the given name  
const labelAccessor = (d) => d.name
const label = labelAccessor  

const node = svg
// add labels  
if (label != null)
 cell
    // filter cells without room for label
    .filter((d) => ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10)
    .append("text")
    .classed("sunburst-node-label", true)
    // rotate and position labels
    .attr("transform", (d) => {
      // except base node
     
      if (!d.depth) return;
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = (d.y0 + d.y1) / 2;
      return `rotate(${x - 90}) translate(${y},0) rotate(${
        x < 180 ? 0 : 180
      })`;
    })
    .attr("dy", "0.32em")
    .text((d) => label(d.data, d));

// title builder (title is hover text)    
const title = (d, n) => `${n.ancestors().reverse().map(d => d.data.name).join(">")}\n${n.value.toLocaleString("en")}`
// add title    

if (title != null) {
    cell.append("title").text((d) => {
        title(d.data, d)
    });
} 
     
    document.getElementById("estoyTonto")?.appendChild(svg.node());
  

   
  /* cell.append("path")
       .attr("d", arc)
       .attr("fill", color ? d => color(d.ancestors().reverse()[1]?.index) : fill)
       .attr("fill-opacity", fillOpacity); */
 
   // clear all previous content on refresh
   /*const everything = svg.selectAll("*");
   everything.remove();

   const container = svg
     .append("g")
     .classed("sunburst-chart-inner-container", true)
     .attr(
       "transform",
       `translate(${dimensions.margins}, ${dimensions.margins})`
     );*/

   // rest of d3 code ...

   // const someElement = container.append('g')
   //  ...
 }, []); // redraw chart if data or dimensions change // redraw chart if data or dimensions change

  return (
    <div className="sunburst-chart-container">
    <div ref={svgContainer} id="estoyTonto" className="sunburst-chart-svg-container">
      
    </div>
  </div>
  );
}


