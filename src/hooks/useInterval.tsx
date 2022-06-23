import { useEffect, useRef } from "react"
/**the hook version of setInterval
 * 
 * @param {Function} callback the callback function 
 * @param {number} timeout the setInterval timeout function
 * @returns {number|null} returns the interval ID or null if it hasn't been set yet somehow.
 */
export const useInterval=(callback:Function, timeout?:number|undefined):number|null=>{

    const intervalID = useRef<number | null> (null);
    const callbackRef = useRef<Function | null>(null);


    useEffect(()=>{
        //this is only for ... functions that can become stale, persistent functions should work without this.
        callbackRef.current = callback;
    }, [callback])

    useEffect(()=>{

        if( typeof(timeout)==='number' 
        && intervalID.current === null 
        && callbackRef.current!==null){

            intervalID.current = setInterval(callbackRef.current, timeout);
        
        }
        return ()=>{
            //type check
            if(intervalID.current)
            {   
                clearInterval(intervalID.current)
                intervalID.current=null;
            }
        }

    }, [timeout])

    return intervalID.current;
}