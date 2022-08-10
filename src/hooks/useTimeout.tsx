import { useEffect, useRef } from "react"
/**the hook version of setInterval
 * 
 * @param {Function} callback the callback function 
 * @param {number} timeout the setInterval timeout function
 * @returns {number|null} returns the interval ID or null if it hasn't been set yet somehow.
 */
export const useTimeout=(callback:Function, timeout?:number|undefined, doOnce?:boolean):number|null=>{

    const timeoutID = useRef<number | null> (null);
    const callbackRef = useRef<Function | null>(null);


    useEffect(()=>{
        //this is only for ... functions that can become stale, persistent functions should work without this.
        callbackRef.current = callback;
    }, [callback])

    useEffect(()=>{

        if( typeof(timeout)==='number' 
        && timeoutID.current === null 
        && callbackRef.current!==null){

            timeoutID.current = setTimeout(callbackRef.current, timeout);
        
        }
        return ()=>{
            //type check
            if(timeoutID.current)
            {   
                clearTimeout(timeoutID.current)
                timeoutID.current=null;
            }
        }

    }, [timeout, doOnce])

    return timeoutID.current;
}