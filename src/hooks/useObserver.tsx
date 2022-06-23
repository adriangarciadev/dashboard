import { useEffect, useRef, useState } from "react"
import {ResizeObserver} from '@juggle/resize-observer'




const compareDimensions = (a:dimension, b:dimension):boolean=>
{

    return (a.width === b.width && a.height ===b.height);

}



export const useObserver= <T extends Element,>():[ React.MutableRefObject<T|null>, dimension]=>{

    const ref = useRef<T|null>(null)
    
    const [dimensions,setDimensions] = useState<dimension>({width:0, height:0});
  
    useEffect(() => {
     
        const element = ref.current;
        if(!element)
          return;
  
        const resizeObserver = new ResizeObserver(
          entries => {
            if (!Array.isArray(entries)) return
            if (!entries.length) return
            const entry = entries[0]
            if (! compareDimensions(dimensions, {width: entry.contentRect.width, height: entry.contentRect.height}))
                setDimensions({width : entry.contentRect.width , height: entry.contentRect.height})//setWidth(entry.contentRect.width)

          }
        )
        resizeObserver.observe(element)
  
        return () => resizeObserver.unobserve(element)
    }, [])
  
  

  
  
    return [ref,  dimensions ]
}