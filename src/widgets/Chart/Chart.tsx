import  React, { createContext, useContext } from "react"
import {dimensions} from './generalTypes'


import "./Chart.scss"

const ChartContext = createContext({
  /*default */
  height: 0,
  width: 0,
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft : 0,
  
})

export const useChartDimensions = () => useContext(ChartContext)

type ChartType = {
  dimensions: dimensions,
  children?:React.ReactNode;
}

const Chart = ({ dimensions, children }: ChartType) => (
  <ChartContext.Provider value={dimensions}>
    <svg className="Chart" width={dimensions.width} height={dimensions.height}>
      <g transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}>
        { children }
      </g>
    </svg>
  </ChartContext.Provider>
)




export default Chart
