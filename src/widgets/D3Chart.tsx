//import { Axis } from "./D3Chart/Axis"
import * as d3 from "d3";
import { AxisProps,  AxisFinal} from "./D3Chart/Axis2"
import { getTimelineData, useChartDimensions, useUniqueId } from "./D3Chart/common";
import { Line, LineProps } from "./D3Chart/Line";
import { Gradient } from "./D3Chart/Gradient";
import './D3Chart/chart.scss'
import { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import Card from "./Card";
import { useObserver } from "../hooks/useObserver";


interface data{
    date:string,
    temperature:number
}

export const D3Chart = ()=>{
        
       const [ref, dimensions] = useChartDimensions()
       const [data,setData] = useState(getTimelineData());

       useInterval(()=>setData(getTimelineData()), 10000);
    
        //const data= getTimelineData();
        const parseDate = d3.timeParse("%m/%d/%Y")
        const dateAccessor = (d:data, index?:number,array?:Iterable<{ date: string; temperature: number; }> ) => parseDate(d.date)
        const temperatureAccessor = (d:data, index?:number,array?:Iterable<{ date: string; temperature: number; }> ) => d.temperature
        
        //const [ref, dimensions] = useChartDimensions()
        //const [ref, dimension] = useObserver()


        
        const gradientId = useUniqueId("Timeline-gradient")
       // const gradientColors = ["rgb(226, 222, 243)", "#f8f9fa"]
       const gradientColors = ["#0076C6", "white"]



        if(dimensions === null || typeof dimensions === 'undefined')
            return null;

        const domain = d3.extent(data, dateAccessor );
        const domain2 =d3.extent(data, temperatureAccessor);


       let AxisXProps:AxisProps ={
           scale: d3.scaleTime()
               .domain(domain as [Date, Date])
               .range([0, dimensions.boundedWidth]),
                label: "sample data x axis",
                dimensions: dimensions,
                formatTick: d3.timeFormat("%-b %-d"),
        }

        let AxisYProps:AxisProps = {
                scale: d3.scaleLinear()
                .domain(domain2 as [number, number])
                .range([dimensions.boundedHeight,0])
                .nice(),

            label: "sample data y axis",
            
            dimensions: dimensions,
            
            formatTick: (a:any)=>a,
            
        }   
        const xAccessorScaled = (d:data) => AxisXProps.scale(dateAccessor(d))
        const yAccessorScaled = (d:data) => AxisYProps.scale(temperatureAccessor(d))
        const y0AccessorScaled = AxisYProps.scale.domain()[0];


        let line1Props:LineProps = {
            
            data: data,
            xAccessor: xAccessorScaled,
            yAccessor: yAccessorScaled,
            y0Accessor: y0AccessorScaled,
        }

        
        let line2Props:LineProps = {
            
            data: data,
            xAccessor: xAccessorScaled,
            yAccessor: yAccessorScaled,
        }

        let targetHeight = dimensions.width *9/16+dimensions.marginTop;


        return (
            <div className="row">
                <div className="col-md-8" ref={ref}>
                    <Card> 
                        <svg className="Chart" width={dimensions.width} height={targetHeight}>
                            <g transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`} >
                            <defs>
                            <Gradient
                                id={gradientId}
                                colors={gradientColors}
                                x2="0"
                                y2="100%"
                            />
                            </defs>
                            <AxisFinal {...AxisXProps} {...{dimension:'x'}}  />
                            <AxisFinal direction='y'{...AxisYProps}   />
                            <Line {...line1Props}  />
                            <Line {...line2Props} style={{fill: `url(#${gradientId})`}} />

                        
                            </g>
                        </svg>
                
                    </Card>  
            
                </div>
            </div>
            )
}