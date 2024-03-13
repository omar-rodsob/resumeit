"use client"
import React, { useEffect, useState, useRef } from "react"
import * as d3 from "d3";

import cronJson from '@/data/cron.json';

const ArrayOfTitles = ['HCL','KORSOFT','Internet Brands','Quepasa.com'];

var svgHeight = 200;
var svgWidth = 1500;
var paddingH = 50;
var paddingV = 50;

type cronType = {
    "title": string;
    "startdate": string;
    "duedate":string;
} 

export type datasetArr = Array<cronType>;


var dataset:any = undefined;
var xScale:any, yScale:any;

export default function Chronology() {
  function handleZoom(e: any) {
    d3.select('.svgmain')
    .attr('transform', e.transform);
   }

  function setScales ( ) {
    const firstDate = new Date(cronJson[cronJson.length-1].startdate);
    const lastDate = new Date(cronJson[0].duedate);
    xScale = d3.scaleTime()
        .domain([firstDate,lastDate])
        .range( [ paddingH, innerWidth ] ); 
  
    yScale = d3.scaleBand()
        .domain( ArrayOfTitles )
        .range( [ svgHeight - (paddingV * 2), paddingV ] ); 
  }

  useEffect(() => {
    var svgs = d3.select('#grapg')
                .append('svg')
                .attr('class', 'svgmain')
                .attr('width', svgWidth)
                .attr('height', svgHeight)
                .call(d3.zoom().on('zoom', handleZoom) as any);
      dataset = cronJson;
      renderTheGraph(svgs);
      function renderTheGraph(svg:any) {

        setScales();
        var rect:any = svg.selectAll('rect')
          .data(dataset)
          .enter()
          .append('rect');
      
        rect
        .attr('x', function ( d: cronType ) {
          return  xScale(new Date(d.startdate));
        })
        .attr('y',60)
        .attr('rx',5)
        .attr('ry',5)
        .attr('fill', function ( d: cronType, i=0 ) {
          return i % 2 ? "#2a3463" : "#111f66";
        })
          .attr('width' , function ( d:cronType ) {
            const width = xScale(new Date(d.duedate))-xScale(new Date(d.startdate));
            return width-10;
          })
          .attr('height' ,  paddingV-20 )
          .on('mouseover', function(d: any,e:cronType) {
            document.getElementById(e.title)?.removeAttribute('visibility');
          })
          .on('mouseout', function(d: any,e:cronType) {
            document.getElementById(e.title)?.setAttribute('visibility','hidden');
          });
          
      
        svg.selectAll('text')
          .data(dataset)
          .enter()
          .append('text')	
          .text(function( d: cronType ) {
            return`${d.title}`;
          })
          .attr('x', function ( d: cronType ) {;
            return  xScale(new Date(d.startdate))+5;
          })
          .attr('y', 80)
          .attr('font-size', 11)
          .attr('fill', 'white');

          svg.selectAll('span')
          .data(dataset)
          .enter()
          .append('text')	
          .text(function( d: cronType ) {
            return`${d.startdate} to ${d.duedate}`;
          })
          .attr('x', function ( d: cronType ) {;
            return  xScale(new Date(d.startdate));
          })
          .attr('y', 50)
          .attr('font-size', 11)
          .attr('id', function ( d: cronType ) {
            return d.title;
          })
          .attr('visibility','hidden');
      
        renderAxes(svg);
      }

      function renderAxes(svg: any) {
        svg.append('g')
          .attr('transform', 'translate(' + 0 + ', '+ (svgHeight - paddingV * 2) + ')')
          .call(d3.axisBottom(xScale)
            .ticks(20));      
      }
  }, []);

 
    return (
      <div id="grapg">
      </div>
    );
  }
  