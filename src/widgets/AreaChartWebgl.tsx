/*a webgl custom Area chart*/

import { useEffect, useRef } from "react"

export const AreaChart = ()=>{


    const canvas = useRef<HTMLCanvasElement|null>(null);
    const renderedOnce = useRef<boolean>(false)
    const xScale = useRef<number>(2500);
    const yScale = useRef<number>(1);

    

    useEffect( ()=>{

        
        let x=2500000;
        let y=0;

        if(canvas.current && !renderedOnce.current){

                    
            canvas.current.addEventListener("wheel", event => {
                const s = event.deltaY * 0.003
                if (event.shiftKey) {
                    y += yScale.current * s * (event.clientY / (canvas?.current?.height??0) * devicePixelRatio - 0.5)
                    yScale.current *= 1 + s
                } else {
                    x -= xScale.current * s * (event.clientX / (canvas?.current?.width??0) * devicePixelRatio - 0.5)
                    xScale.current *= 1 + s
                }

                event.preventDefault();
            })
    
            let down = false
            canvas.current.addEventListener("mousedown", () => down = true)
            canvas.current.addEventListener("mouseup", () => down = false)
            canvas.current.addEventListener("mousemove", event => {
                if (!down) return
                x -= event.movementX * xScale.current / (canvas?.current?.width??1)
                y += event.movementY * yScale.current / (canvas?.current?.height??1)
            })

        
            const gl = canvas.current.getContext("webgl", { antialias: false })

            if(gl===null){
                throw new Error("error at Area Chart gl context null @ Area chart");
            }

            const vertexShader = gl.createShader(gl.VERTEX_SHADER)
            if(vertexShader===null){
                throw new Error("Vertex shader null @ Area Chart");
            }

            const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
            if(fragmentShader===null){
                throw new Error("Fragment shader null @ Area Chart");
            }

            gl.shaderSource(vertexShader, /* glsl */`
            attribute vec4 position;
            uniform mat4 matrix;
            void main() {
                gl_Position = position * matrix;
            }
        `)

        gl.shaderSource(fragmentShader, /* glsl */`
            precision mediump float;
            uniform vec4 color;
            void main() {
                gl_FragColor = color;
            }
            
        `)


        const program = gl.createProgram()
        if(program===null){
            throw new Error("program creation failed @ Area Chart");
        }


        for (const shader of [vertexShader, fragmentShader]) {
            gl.compileShader(shader)
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                throw new Error(gl.getShaderInfoLog(shader)??'Error: could not get any shader info')
            }
            gl.attachShader(program, shader)
        }
        
        //link
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(gl.getProgramInfoLog(program)??'Error: could not get any information about the program')
        }

        gl.useProgram(program)


        //attributes
        const posAttr = gl.getAttribLocation(program, "position")
        gl.enableVertexAttribArray(posAttr)

        const matrixU = gl.getUniformLocation(program, "matrix")
        const colorU = gl.getUniformLocation(program, "color")

        let value = 0
        const points = [...Array(5000000)].map((_, i) => [i, value = (Math.random() * 16 - 8 + value * 4095) / 4096])

        const areaArray = new Float32Array(points.length * 4)
        for (let i = 0; i < points.length; i++) {
            const [x, y] = points[i]
            areaArray[i * 4 + 0] = areaArray[i * 4 + 2] = x
            areaArray[i * 4 + 1] = -1
            areaArray[i * 4 + 3] = y
        }

        const areaBuffer = gl.createBuffer()

        gl.bindBuffer(gl.ARRAY_BUFFER, areaBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, areaArray, gl.STATIC_DRAW)

        let avgTime = 0;
        let handle = 0;

        const tick=()=>{

          
            const start = performance.now()

            gl.clearColor(0, 0, 0, 0)
            gl.clear(gl.COLOR_BUFFER_BIT)
        
            gl.uniformMatrix4fv(matrixU, false, [
                2 / xScale.current, 0, 0, -2 / xScale.current * x,
                0, 2 / yScale.current, 0, -2 / yScale.current * y,
                0, 0, 1, 0,
                0, 0, 0, 1
            ])
        
            gl.bindBuffer(gl.ARRAY_BUFFER, areaBuffer)
            gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0)
            gl.uniform4f(colorU, 0.3, 0.4, 0.6, 1)
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, areaArray.length / 2)
        
            const error = gl.getError()
            if (error) throw new Error(`WebGL error code: ${error}`)
        
            const elapsed = performance.now() - start
            avgTime = avgTime == 0 ? elapsed : (avgTime * 7 + elapsed) / 8
           
            handle = requestAnimationFrame(tick)

        }
        handle = requestAnimationFrame(tick)

        renderedOnce.current = true;

        }





    },[])



    return (

        <canvas ref={canvas}>

        </canvas>
    )


}