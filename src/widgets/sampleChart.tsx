import { useEffect, useRef, useState } from "react";
import {initGl, initShaderProgram,  initBuffers, drawScene} from './sampleChart/commonFunctions'
import {vertexShader as vsSource, fragmentShader as fsSource} from './sampleChart/shaders'


type buffers = ReturnType<typeof initBuffers>;



const useAnimationFrame = (callback:Function) => {

    const requestRef = useRef<number | null>(null);
    const previousTimeRef = useRef<number | null>(null);

  
    
    const animate = (time:number) => {
      if (previousTimeRef.current !== null) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime)
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    }
    
    useEffect(() => {
      requestRef.current = requestAnimationFrame(animate);

      return () => {
            //clean up if it managed to get a frame request. 

            if(requestRef.current!==null){
                
                cancelAnimationFrame(requestRef.current);
            }
        }
    }, []); // Make sure the effect runs only once
  }


  function usePrevious<T>(value:T): T | undefined  {
    
    const ref = useRef<T>();
    
    useEffect(() => {
      ref.current = value;
    },[value]);

    return ref.current;
  }

export const Chart1 = ()=>{

    //buffer allt he rendering depends on the recalculation of the buffer.
    const [buf, setBuf] = useState<[]|buffers>([]);
    //cube rotation must be changed.
    const cubeRotation =useRef<number>(0.0);
    //ref to the canvas element.
    const canvas = useRef<HTMLCanvasElement|null>(null);
    //previous contexxt
    const previous = usePrevious(canvas);



    //const glContext = useRef<WebGLRenderingContext | null | undefined>(null);


    useEffect(()=>{

      console.log(typeof ( previous )) 
      

      if (previous === undefined/*undefined instead of null*/ && canvas.current) {
        const gl = canvas.current.getContext("webgl");

      

        if(gl===null){
          throw new Error('gl context creation error @ sampleChart useEffect')
        }
  
        initGl(canvas.current);

   
        const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
       
        const programInfo = {
          program: shaderProgram,
          attribLocations: {
            vertexPosition: gl.getAttribLocation(
              shaderProgram!,//we already checked for non-nullity in the source function
              "aVertexPosition"
            ),
            vertexColor: gl.getAttribLocation(shaderProgram!, "aVertexColor")
          },
          uniformLocations: {
            projectionMatrix: gl.getUniformLocation(
              shaderProgram!,//we already checked for non-nullity in the source function
              "uProjectionMatrix"
            ),
            modelViewMatrix: gl.getUniformLocation(
              shaderProgram!,//we already checked for non-nullity in the source function
              "uModelViewMatrix"
            )
          }
        };
  
        const buffers = initBuffers(gl);
    
        setBuf(buffers);
        //can control render through taking buf at drawScene.
        var then = 0;
  
        // Draw the scene repeatedly


        const render = (now:number)=> {
          console.log("render cube");
          now *= 0.001; // convert to seconds
          const deltaTime = now - then;
          then = now;
  
          cubeRotation.current = drawScene(
            gl,
            programInfo,
            buffers,
            deltaTime,
            cubeRotation.current
          );
            
          requestAnimationFrame(render);
        }
       
        const requestID = requestAnimationFrame(render);
  
        return function cleanup() {
          // console.log(requestID);
           cancelAnimationFrame(requestID);
        };
      }
 

       


    },[])


    return(

    <canvas ref={canvas}></canvas>
    );
}