import React, { FunctionComponentElement } from "react"
import PropTypes from "prop-types"
import * as d3 from 'd3'
import { useChartDimensions } from "./Chart";
import { dimensions } from "./generalTypes";

const axisComponentsByDimension = {
  x: AxisHorizontal,
  y: AxisVertical,
}


type AxisProps = {
  dimension: "x"|"y",
  dimensions:dimensions,
  scale: d3.ScaleTime<number,number>, 
  label: string,
  formatTick: Function,
}

const Axis = (props:AxisProps) => {

  const { dimension} = props;

  const dimensions = useChartDimensions()
  const Component = axisComponentsByDimension[dimension]
  if (!Component) return null

  return (
    <Component {...props}/>
  )
}


export default Axis


type extraDimensions = dimensions &{
  boundedWidth:number;
}


function AxisHorizontal ({ dimensions, label, formatTick, scale, ...props }:AxisProps) {

  dimensions = dimensions??{
    height: 0,
    width: 0,
    marginTop: 0,
    marginRight: 0,
    boundedWidth:0,
    boundedHeight:0

  }
  const numberOfTicks = dimensions.boundedWidth < 600
        ? dimensions.boundedWidth / 100
        : dimensions.boundedWidth / 250

  const ticks = scale.ticks(numberOfTicks)

  return (
    <g className="Axis AxisHorizontal" transform={`translate(0, ${dimensions.boundedHeight})`} {...props}>
      <line
        className="Axis__line"
        x2={dimensions.boundedWidth}
      />

      {ticks.map((tick, i) => (
        <text
          key={tick.toDateString()}
          className="Axis__tick"
          transform={`translate(${scale(tick)}, 25)`}
        >
          { formatTick(tick) }
        </text>
      ))}

      {label && (
        <text
          className="Axis__label"
          transform={`translate(${dimensions.boundedWidth / 2}, 60)`}
        >
          { label }
        </text>
      )}
    </g>
  )
}

function AxisVertical ({ dimensions, label, formatTick, scale, ...props }:AxisProps) {
  const numberOfTicks = dimensions.boundedHeight / 70

  const ticks = scale.ticks(numberOfTicks)

  return (
    <g className="Axis AxisVertical" {...props}>
      <line
        className="Axis__line"
        y2={dimensions.boundedHeight}
      />

      {ticks.map((tick, i) => (
        <text
          key={tick.toDateString()}
          className="Axis__tick"
          transform={`translate(-16, ${scale(tick)})`}
        >
          { formatTick(tick) }
        </text>
      ))}

      {label && (
        <text
          className="Axis__label"
          style={{
            transform: `translate(-56px, ${dimensions.boundedHeight / 2}px) rotate(-90deg)`
          }}
        >
          { label }
        </text>
      )}
    </g>
  )
}
