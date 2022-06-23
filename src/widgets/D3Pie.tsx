import { useChartDimensions } from "./D3Chart/common"
import * as d3 from 'd3';
import { useEffect, useRef, useState } from "react";
import "./scss/D3PieChart.scss"
import Card from "./Card";
import { useInterval, useObserver } from "../hooks/hooks";
import { config } from "process";


type dataTest = number;


const useAnimatePieChart = (callback:Function, startValue:number, endValue:number, animationTime:number, deps:any)=>{


    //after being called again only runs useEffect

    const previousTimeRef = useRef(0);
    const requestRef = useRef(0);
    const elapsedTime = useRef(0);
    const [value, setValue] = useState(0.001);
    //this didn't get restarted
    

    const animate = (time:number) => {
     
        if (previousTimeRef.current !== 0) {
  
            const deltaTime = time - previousTimeRef.current;
            elapsedTime.current += deltaTime/1000;
            
            if(elapsedTime.current > animationTime && requestRef.current!==0)
            {
                setValue(endValue);
                return;
            }
            setValue(lerp(startValue, endValue, elapsedTime.current /animationTime));
            callback(deltaTime);
            console.log("rendering " + value);

        }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate); 
    }

    useEffect(()=>{

        requestRef.current = requestAnimationFrame(animate);
        //console.log("use effect at weird place")

        return ()=>{
            cancelAnimationFrame(requestRef.current)
            //reset and restart.
            setValue(0.0001);
            previousTimeRef.current = 0;
            elapsedTime.current = 0;
            //console.log("was ummounted");

        }

    },[deps])

    return value;

}

const createData=()=>{

    const points =d3.randomInt(5 ,8)();
    const values =d3.randomInt(40, 200);
    const dataPoints =new Array(points).fill(0).map(curr=>values()); 
    const total = dataPoints.reduce((prev,current)=>prev+current, 0);
    return dataPoints.map(curr=>(curr/total)*100);
}


const chartCONFIG = {
    preferedRatio : 0.6,
    aspectRation:0.3,
    widthCutoff: 800
}

const D3PieChartSize =(dimension:dimension)=> {

    if(dimension.width >= chartCONFIG.widthCutoff)
    {

        return {
            width: dimension.width*chartCONFIG.preferedRatio,
            height:dimension.width*chartCONFIG.preferedRatio
        }

    }
    else return {
        width: dimension.width,
        height:dimension.width
    }

}

const D3PieChartStyles = {

    getChartDimensions:(dimension:dimension)=>{

        if(dimension.width >= chartCONFIG.widthCutoff )
        {
            return {
                width:`${ chartCONFIG.preferedRatio * 100}%`
            }
        }
        else{
            return {
                width:'100%'
            }
        }

    },
    getLabelDimensions:(dimension:dimension)=>{

        if(dimension.width>chartCONFIG.widthCutoff)
        {
            return {
                width:`${ (1-chartCONFIG.preferedRatio)*100 }%`
            }
        }
        
        else{
            return {
                width:'100%'
            }
        }

        

    }
}


export const D3PieChart = ({labels, dataArray, shouldRestart}:{labels?:string[] , dataArray?:number[], shouldRestart?:boolean})=>{


   // const [ref, dimensions] = useChartDimensions()
    const [ref, dimension] = useObserver<HTMLDivElement>()

    const dimensions = {
        width: dimension.width,
        height:dimension.height,
        marginTop:50,
        marginRight:50,
        marginLeft:50,
        marginBottom:50,
        boundedWidth: dimension.width - 50 -50,
        boundedHeight:dimension.height -50 -50 
    }
    
    //reset by default.
    if ( typeof(shouldRestart) === 'undefined'){
        shouldRestart=true;
    }
    
    //if no data passed get random data.
    if(!dataArray)
        dataArray = createData();

    //data    
    const [data, setData] = useState(dataArray);

    //refetch data for showcase purposes every T seconds, or pass undefined to disable the hook.
    useInterval(()=>{setData(createData())}, shouldRestart ? 10000 : undefined)

    //another changing value to animate the Chart.
    const targetValue = useAnimatePieChart(()=>null, 0, 2*Math.PI  , 0.5 , data);

    //random labels.
    if(!labels)
        labels = ["project finished" ,"under construction","pending aproval" ,"starting","restarting" ,"paused","cancelled" ,"pending payment"];

   
    //let data = [20, 60, 10, 10] //random test data
    let piedata = d3.pie<dataTest>().startAngle(0).endAngle(targetValue)(data);
   
    //let colors  = ['red','blue','orange', 'green']; //random test colors
    let colors = d3.schemeCategory10 ;

    const size = D3PieChartSize(dimension);
    
    let arc2 =  d3.arc<d3.PieArcDatum<dataTest>>()
    .innerRadius(size.height/2-20-size.height*0.2)
    .outerRadius(size.height/2-20);


/*    let targetHeight = dimensions.width *9/16+dimensions.marginTop;

    let arc2 = d3.arc<d3.PieArcDatum<dataTest>>()
    .innerRadius(targetHeight/2-20-targetHeight*0.2)
    .outerRadius(targetHeight/2-20);
  */  

    console.log(JSON.stringify(dimension))
  
    return (
            <Card>
                <h1>{JSON.stringify(dimension)}</h1>
                <div style={{display:'flex', flexWrap: 'wrap'}} ref={ref}>
                    <div style={D3PieChartStyles.getChartDimensions(dimension) }>
                                <svg className="Pie-Chart" width={size.width} height={size.height}>
                                    <g transform={`translate(${size.width/2-10}, ${size.height/2 -10})`} stroke="white" stroke-linejoin="round">
                                    <text textAnchor="middle" dominant-baseline="middle" className="fw-bold" fontSize='2em'>100%</text>

                                    {
                                        piedata.map( (arc,index)=>(
                                            <g>
                                            <path d={arc2(arc)!} fill={colors[index]}></path>
                                            </g>
                                            
                                            ))

                                    }
                                    </g>
                                </svg>
                            </div>
                        <div style={D3PieChartStyles.getLabelDimensions(dimension)}>
                            <div>
                                <ChartLabels colors={colors} labels={labels} data={data} ></ChartLabels>
                            </div>
                        </div>

                </div>  
            </Card> 

         );
}

const ChartLabels = ({colors, labels, data}:{colors:readonly string [], labels:string[], data:number[]})=>{


    return (
        <ul className="data-labels">
            {
            data.map((_ele,index)=>(
                <LabelElement labelColor={colors[index]} label={labels[index]} data={data[index]}></LabelElement>

            ))
           }
        </ul>

    );

}


const LabelElement = ({labelColor, label, data }: {labelColor:string, label:string, data:number})=>(
    <>
        <li className="color" style={{backgroundColor:labelColor}}>
        </li>

        <li className="label">
            {label}
        </li>
        
        <li className="data">
            {data.toFixed(2)}%
        </li>
    </>
  
)



const lerp = (x:number, y:number, a:number) => x * (1 - a) + y * a;
