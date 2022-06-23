import PropTypes from 'prop-types'
import { useEffect, useState, useRef } from "react"
import ResizeObserver from "resize-observer-polyfill"
import { dimensions } from './generalTypes'

export const accessorPropsType = (
  PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.number,
  ])
)

export const callAccessor = (accessor:(Function| number), d:number, i:number) => (
  typeof accessor === "function" ? accessor(d, i) : accessor
)


export const combineChartDimensions = (dimensions:dimensions) => {
  let parsedDimensions = {
    ...dimensions,
    marginTop: 40,
    marginRight: 30,
    marginBottom: 40,
    marginLeft: 75,
    
  }

  return {
    ...parsedDimensions,
    boundedHeight: Math.max(parsedDimensions.height - parsedDimensions.marginTop - parsedDimensions.marginBottom, 0),
    boundedWidth: Math.max(parsedDimensions.width - parsedDimensions.marginLeft - parsedDimensions.marginRight, 0),
  }
}

export const useChartDimensions = (passedSettings?:any|undefined) => {
  const ref = useRef<null|Element>()
  const dimensions = combineChartDimensions(passedSettings)

  const [width, changeWidth] = useState(0)
  const [height, changeHeight] = useState(0)

  useEffect(() => {
   
   // if (dimensions.width && dimensions.height) return [ref, dimensions]

    const element = ref.current
    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries)) return
      if (!entries.length) return

      const entry = entries[0]

      if (width !== entry.contentRect.width) changeWidth(entry.contentRect.width)
      if (height !== entry.contentRect.height) changeHeight(entry.contentRect.height)
    })
   
    if(!element){
      throw new Error("Error @ useChartDimensions");  
    }
    resizeObserver.observe(element)

    return () => resizeObserver.unobserve(element)
  }, [passedSettings, height, width, dimensions])

  const newSettings = combineChartDimensions({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  })

  return [ref, newSettings]
}

let lastId = 0
export const useUniqueId = (prefix="") => {
  lastId++
  return [prefix, lastId].join("-")
}
