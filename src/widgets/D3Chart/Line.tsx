import * as d3 from 'd3';


export type LineProps = {

    type?: 'line'|'area';
    style?:React.CSSProperties;
    data:any[];
    xAccessor : (args:any)=>any;
    yAccessor:(args:any)=>any;
    y0Accessor?: (args:any)=>any;
    interpolation? :(args:any)=>any;
    rest?:any[];

}

export const Line = (props : LineProps) => {

        const { type ='line', data, xAccessor, yAccessor, y0Accessor, interpolation=d3.curveMonotoneX, ...rest} = props;

        let lineGenerator;// = type==='line'? d3.line(): d3.area();

        if(type ==='area')
        {
            lineGenerator = d3.area();
        }
        else {

           lineGenerator = d3.line();
        }

        lineGenerator.x(xAccessor)
        .y(yAccessor)
        .curve(interpolation)

        if (type === "area") {
            (lineGenerator as any)
            .y0(y0Accessor)
            .y1(yAccessor)
        }

        if(lineGenerator===null){
            console.error("Line generator is null @ Line @ D3Chart");
            return null;
        }

        
      
        return (
          <path {...rest}
            className={`Line Line--type-${type}`}
            d={lineGenerator(data)!}
          />
        )
      }

      

      



