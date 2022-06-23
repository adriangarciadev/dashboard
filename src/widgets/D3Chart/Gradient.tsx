type GradientProps = {

  id:string;
  colors:string[];
  rest?: React.SVGAttributes<SVGLinearGradientElement>;//svg attributes
}& React.SVGAttributes<SVGLinearGradientElement>;

export const Gradient = (props: GradientProps) => {
 
  const { id, colors, ...rest} = props;

  return (
 <linearGradient id={id} gradientUnits="userSpaceOnUse" spreadMethod="pad" {...rest}>
    {colors.map((color, i) => (
      <stop
        key={i}
        offset={`${i * 100 / (colors.length - 1)}%`}
        stopColor={color}
      />
    ))}
  </linearGradient>
  );
}