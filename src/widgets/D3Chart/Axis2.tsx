import {dimensions} from "./common"
import * as d3 from "d3"
import React from "react";


//a generic scale that servers to let us work with any scale will be parametrized later.
interface genericScale{

  (value: any): any;
  ticks(arg?:any):any[];
  domain(arg?:any):any[];
}
type FormatFunction =  (arg:any) => string;


export type AxisProps = {
    direction?:'x'|'y';
    dimensions: dimensions;
    label: string;
    formatTick: FormatFunction;
    scale: genericScale ;
    children?:React.ReactNode;
}




export const AxisFinal = ( props: AxisProps)=>
{
    const { direction='x', dimensions, label, formatTick, scale,children, ...rest } = props;
    
    const dirX = (direction ==='x');

    const getNumberOfTicks = ()=>{

      if(dirX){ 
        return dimensions.boundedWidth < 600? dimensions.boundedWidth / 100 : dimensions.boundedWidth / 250
      }
      else{
        return dimensions.boundedHeight / 70;
      }

    }
   

    //little shortcut
    
    //configure horizontal or vertical axis.
    const config = {

      numberOfTicks: getNumberOfTicks( ),
     
      gclassName:dirX ? 'Axis AxisHorizontal':'Axis AxisVertical',
     
      gtransform: dirX ? `translate(0, ${dimensions.boundedHeight})`: undefined,
     
      x2: dirX ? dimensions.boundedWidth : undefined,
     
      y2: dirX ? undefined : dimensions.boundedHeight,
     
      tickTransform: dirX? (x:any)=>`translate(${x}, 25)` : (x:any)=>`translate(-16, ${x})` ,
     
      labelStyle: dirX? 
     
                       {transform: `translate(${dimensions.boundedWidth / 2}px, -10px)` }: 
     
                        {transform: `translate(-56px, ${dimensions.boundedHeight / 2}px) rotate(-90deg)`}
    }

    const ticks = scale.ticks(config.numberOfTicks);


    return (
        <g className={config.gclassName} transform={config.gtransform} {...rest}>
          <p>ticks  : {config.numberOfTicks} ; bounded Height : {JSON.stringify(dimensions)} </p>
          <line
            className="Axis__line"
            x2={config.x2}
            y2={config.y2}
          />
          
          {ticks.map((tick, i) => (
            <text
              key={i}
              className="Axis__tick"
              transform={config.tickTransform (scale(tick) )}
            >
              { formatTick(tick) }
            </text>
          ))}
    
          {label && (
            <text
              className="Axis__label"
              style={config.labelStyle}
            >
              { label }
            </text>
          )}
        </g>
      )




}
  
