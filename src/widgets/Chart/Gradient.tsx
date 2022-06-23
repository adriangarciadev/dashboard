import React from "react"
import PropTypes from "prop-types"



type GradientType = {

  id:string;
  colors: string[];

  /*others*/


}

const Gradient = (props: GradientType) => {

  const {colors, } = props;

  /*ignore id*/
  return(
  <linearGradient gradientUnits="userSpaceOnUse" spreadMethod="pad" {...props}>
    {colors.map((color, i) => (
      <stop
        key={i}
        offset={`${i * 100 / (colors.length - 1)}%`}
        stopColor={color}
      />
    ))}
  </linearGradient>
  )
}




export default Gradient
