import {ResizeObserver} from '@juggle/resize-observer'
import { useEffect, useState, useRef } from 'react'
import * as d3 from 'd3';

export type dimensions = {

    width:number;
    height:number;
    marginTop:number;
    marginRight:number;
    marginLeft:number;
    marginBottom:number;
    boundedWidth:number;
    boundedHeight:number;
}

type boundedDimensions = {
    boundedWidth:number;
    boundedHeight:number;
}&dimensions;


export const useChartDimensions = (passedSettings?:dimensions):[any,any]=> {

  const ref = useRef<HTMLElement|null>(null)
  
  const dimensions = combineChartDimensions(
    passedSettings
  )
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
      //basically do once these start at 0
      if (dimensions.width && dimensions.height)
        return;// [ref, dimensions]
      const element = ref.current
      if(!element)
        return;

      const resizeObserver = new ResizeObserver(
        entries => {
          if (!Array.isArray(entries)) return
          if (!entries.length) return
          const entry = entries[0]
          if (width !== entry.contentRect.width)
            setWidth(entry.contentRect.width)
          if (height !== entry.contentRect.height)
            setHeight(entry.contentRect.height)
        }
      )
      resizeObserver.observe(element)

      return () => resizeObserver.unobserve(element)
  }, [])


  const newSettings:dimensions = combineChartDimensions({
      ...dimensions,
      width: dimensions.width || width,
      height: dimensions.height || height,
  })




  return [ref, newSettings]
}

const combineChartDimensions = (dimensions?:dimensions) => {
    const parsedDimensions = {
        ...dimensions,
        marginTop: dimensions?.marginTop ?? 10,
        marginRight: dimensions?.marginRight ?? 10,
        marginBottom: dimensions?.marginBottom ?? 10,
        marginLeft: dimensions?.marginLeft ?? 15,
        height: dimensions?.height?? 0,
        width: dimensions?.width??0
    }
    return {
        ...parsedDimensions,
        boundedHeight: Math.max(
          parsedDimensions.height
          - parsedDimensions.marginTop
          - parsedDimensions.marginBottom,
          0,
        ),
        boundedWidth: Math.max(
          parsedDimensions.width
          - parsedDimensions.marginLeft
          - parsedDimensions.marginRight,
          0,
        ),
    }
  }


const today = new Date()
const formatDate = d3.timeFormat("%m/%d/%Y")

export const getTimelineData = (length = 100) => {
  let lastTemperature = randomAroundMean(70, 20)
  const firstTemperature = d3.timeDay.offset(today, -length)

  return new Array(length).fill(0).map((d, i) => {
    lastTemperature += randomAroundMean(0, 2)
    return {
      date: formatDate(d3.timeDay.offset(firstTemperature, i)),
      temperature: lastTemperature,
    }
  })
}

const randomAroundMean = (mean:number, deviation:number) => mean + boxMullerRandom() * deviation
const boxMullerRandom = () => (
  Math.sqrt(-2.0 * Math.log(Math.random())) *
  Math.cos(2.0 * Math.PI * Math.random())
)


let lastId = 0
export const useUniqueId = (prefix="") => {
  lastId++
  return [prefix, lastId].join("-")
}

