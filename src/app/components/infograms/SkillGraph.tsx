"use client"
import React, { useRef, useEffect, useState } from "react";
// libraries
import * as d3 from "d3";


let radius = 360;

let padding = 5;

let fillOpacity = 1;

let fill:"#ccc";

let linkTarget = '';

let marginRight = 10;
let marginLeft = 10;

let marginBottom = 10;
let marginTop = 10;

export default function SkillGraph() {
    const data = {
        name: "Tools",
        index:0,
        children: [
          {
            name: "Development",
            index:0,
            children: [
              {
                name: "Front End",
                index:0,
                children: [
                  { name: "React",
                  index:0,
                   size: 1000,
                   children: [
                    { name:"React",index:0, size: 10000, },
                    { name:"React Native",index:0, size: 4938, },
                    { name:"Redux TookKit",index:0, size: 5938, },
                    { name:"Nextjs",index:0, size: 8000, }
                   ] 
                },
                  { name: "ElectronJs",index:0, size: 3812 },
                  { 
                    name: "HTML", 
                    index:0,
                    size: 1000,
                    children: [
                        { name:"CSS",index:0,size: 3938,},
                        { name:"html5",index:0,size: 3938,}
                       ] 
                },
                  { name: "Jquery",index:0, size: 3938 },
                ],
              },
              {
                name: "Back End",
                index:0,
                children: [
                  { name: "Nodejs",index:0, size: 7840 },
                  { name: "Restful API",index:0, size: 5731 },
                  { name: "java",index:0, size: 3534 }
                ],
              }
            ],
          },
          {
            name: "Agile Tools",
            index:0,
            children: [
              { name: "Scrum",index:0, size: 5000 },
              { name: "Kanban",index:0, size: 5000 },
              { name: "Jira",index:0, size: 5000, },
              { name: "Trello",index:0, size: 5000 },
            ],
          },
          {
            name: "QA Tools",
            index:0,
            children: [
                {name: "Cypress",index:0,size: 10066 },
                { name: "PostMan",index:0, size: 8833 },
                { name: "PlayWrigth",index:0, size: 1732 },
                { name: "QTest",index:0, size: 3623 }
              ],
          },
          {
            name: "CI/CD Tools",
            index:0,
            children: [
              { name: "git",index:0, size: 10066 },
              { name: "gitLab",index:0, size: 8833 },
              { name: "GitHub",index:0, size: 3623 },
              { name: "PipeLines",index:0, size: 1732 },
            ],
          },
        ],
      };
 // Element References
 const svgRef = useRef(null);
 const svgContainer = useRef<HTMLDivElement>(null); // The PARENT of the SVG

 // State to track width and height of SVG Container
 const [width, setWidth] = useState(1500);
 const [height, setHeight] = useState(800);

 function handleZoom(e: any) {
  d3.selectAll('a')
  .attr('transform', e.transform);
 }

 // calculate width and height of container
 const getSvgContainerSize = () => {
   const newWidth = svgContainer?.current?.clientWidth ? svgContainer.current.clientWidth:800;
   setWidth(newWidth);

   const newHeight = svgContainer?.current?.clientHeight ? svgContainer.current.clientHeight:800;
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
   const root:any = d3.hierarchy(data);
   
   const valueAccessor = (d:any) => d.size;
   valueAccessor == null
        ? root.count()
        : root.sum((d:any) => Math.max(0, valueAccessor(d)));
    // sort leaves by value
    
    root.sort((a:any, b:any) => d3.descending(a.value, b.value));
    // Dimensions
    let dimensions = {
        width: width,
        height: height,
        margins: 50,
        radius:0,
    };
    dimensions.radius =
        Math.min(
            dimensions.width,
            dimensions.height
        ) / 2;
    d3.partition().size([2 * Math.PI, radius])(root);

   

   dimensions.width = dimensions.width - dimensions.margins * 2;
   dimensions.height = dimensions.height - dimensions.margins * 2;

   // construct color scale
const defaultFill = "#ccc"
const colorScheme = d3.interpolateSpectral
const childrenLength = root?.children?.length ? root?.children?.length:0;
const color = d3
  .scaleSequential([0, childrenLength - 1], colorScheme)
  .unknown(defaultFill);
// give all children of root an identical index for coloration  
root?.children?.forEach((child:any, i:number) => (child.index = i));

const arc = d3.arc()
  .startAngle((d:any) => d.x0)
  .endAngle((d:any) => d.x1)
  .padAngle((d:any) => Math.min((d.x1 - d.x0) / 2, 2 * padding /  dimensions.radius))
  .padRadius(radius / 2)
  .innerRadius((d:any) => d.y0)
  .outerRadius((d:any) => d.y1 - padding);


  const  link = `#`;
  
     //const svg = d3.create("svg")
     var svg:any = d3.select('#sunburst')
      .append('svg')
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
    .call(d3.zoom().on('zoom', handleZoom) as any);
    
 const cell = svg
  .selectAll("a")
  .data(root.descendants())
  .join("a");

cell.append("path")
    .attr("d", arc)
    .attr("fill", color ? (d:any) => color(d.ancestors().reverse()[1]?.index) : fill)
    .attr("fill-opacity", fillOpacity);



    // label is simply the given name  
const labelAccessor = (d:any) => d.name
const label = labelAccessor  

const node = svg
// add labels  
if (label != null)
 cell
    // filter cells without room for label
    .filter((d:any) => ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10)
    .append("text")
    .classed("sunburst-node-label", true)
    // rotate and position labels
    .attr("transform", (d:any) => {
      // except base node
     
      if (!d.depth) return;
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = (d.y0 + d.y1) / 2;
      return `rotate(${x - 90}) translate(${y},0) rotate(${
        x < 180 ? 0 : 180
      })`;
    })
    .attr("dy", "0.32em")
    .text((d:any) => label(d.data));

// title builder (title is hover text)    
const title = (d:any, n:any) => `${n.ancestors().reverse().map((d:any) => d.data.name).join(">")}\n${n.value.toLocaleString("en")}`
// add title    

if (title != null) {
    cell.append("title").text((d:any) => {
        title(d.data, d)
    });
} 
     
   // document.getElementById("estoyTonto")?.appendChild(svg.node());
  

   
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
    <div ref={svgContainer} id="sunburst" className="sunburst-chart-svg-container">
      
    </div>
  </div>
  );
}


