/***creates context and shaders */


type AreaChartAttribs = {
    position: number ,
    matrix: WebGLUniformLocation|null ,
    color: WebGLUniformLocation|null,
    area: WebGLUniformLocation| null 

}


export const createContext = (canvas: React.MutableRefObject<HTMLCanvasElement | null>)=>{

    if(canvas === null || canvas.current ===null){
        throw new Error("canvas is not ready?");
    }


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


    return {glcontext : gl, program : program};

   
   // let attribs =   createAttributesArrays(gl,program);
}
/**Creates 4 uniforms and returns their handle. 
 * 
 *  [position, perspectivematrix, color, area]
 * 
 */
export const createAttributesArrays = (gl:WebGLRenderingContext, program:WebGLProgram /*data*/) :AreaChartAttribs=>{

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

    //return [posAttr, matrixU, colorU, areaBuffer];
    
    return {position: posAttr, matrix:matrixU, color: colorU, area: areaBuffer};

}

/**The function that executes every frame
 * 
 * 
 **/

export const tick = (gl: WebGLRenderingContext,
             handle: React.MutableRefObject<number>,
             attribs: AreaChartAttribs,
             areaSize:number,
             xScale: React.MutableRefObject<number>,
             yScale: React.MutableRefObject<number>,
             x: React.MutableRefObject<number>,
             y: React.MutableRefObject<number>)=>{

    console.log("draw chart");

     
  
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.uniformMatrix4fv(attribs.matrix, false, [
        2 / xScale.current, 0, 0, -2 / xScale.current * x.current,
        0, 2 / yScale.current, 0, -2 / yScale.current * y.current,
        0, 0, 1, 0,
        0, 0, 0, 1
    ])

    gl.bindBuffer(gl.ARRAY_BUFFER, attribs.area)
    gl.vertexAttribPointer(attribs.position, 2, gl.FLOAT, false, 0, 0)
    gl.uniform4f(attribs.color, 0.3, 0.4, 0.6, 1)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, areaSize / 2)

    const error = gl.getError()
    if (error) throw new Error(`WebGL error code: ${error}`)

   
    //draw();

   handle.current = requestAnimationFrame(function(){
        //how costly is this?
        tick(gl, handle, attribs, areaSize, xScale, yScale, x, y );
   } );

}

