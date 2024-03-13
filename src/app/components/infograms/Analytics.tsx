"use client"
import { useEffect } from "react";
import { Tree } from "@/app/tools/tools";

import mapJson from '@/data/map.json';


export default function Analytics() {
  useEffect(()=>{
   const chart = Tree(mapJson, {label: (d:any) => d.name,width: 800,height:300,dyNode: 10,});
  //document.getElementById("dataMind")?.appendChild(chart);
  },[]);
  
    return (
      <> 
        <div id="dataMind"></div>
      </>
    );
  }
  