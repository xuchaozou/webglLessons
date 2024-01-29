import Webgl from "../../components/webgl"
import { useEffect, useRef } from "react"
import Util from "../../utils/Util"

function glsl(code){return code}

const Demo10 = props => {

const glRef = useRef(null)

const points = useRef([])

const hook = ({gl}) => {
    glRef.current = gl

    const vertexSource = glsl`
        attribute vec4 a_Position;
        void main() {
            gl_Position = a_Position;
            gl_PointSize = 20.0;
        }
    `

    const fragmentSource = glsl`
        precision mediump float;
        void main() {
            gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
        }
    `

    Util.initShader(gl, vertexSource, fragmentSource)

    // const points = new Float32Array([
    //     0.1, 0.2
    // ])

    // const buffer = gl.createBuffer()
    // gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    // gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)
    // const a_Position = gl.getAttribLocation(gl.program, "a_Position")
    // gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    // gl.enableVertexAttribArray(a_Position)

    // gl.clearColor(0, 0, 0, 1)
    // gl.clear(gl.COLOR_BUFFER_BIT)

    // gl.drawArrays(gl.POINTS, 0, 1)

    // setTimeout(() => {
    //     points[2] = -0.1
    //     points[3] = -0.2
    //     gl.bufferData(gl.ARRAY_BUFFER , points, gl.STATIC_DRAW)
    //     gl.clear(gl.COLOR_BUFFER_BIT)

    //     gl.drawArrays(gl.POINTS, 0, 2)
    
    // }, 1500)

    // setTimeout(() => {
    //     gl.clear(gl.COLOR_BUFFER_BIT)

    //     gl.drawArrays(gl.POINTS, 0, 2)
    //     gl.drawArrays(gl.LINES , 0, 2)
    // }, 3000)
    const poly = new Util.Poly({
        gl, 
        vertices : [0.1 , 0.2]
    })
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT);
    poly.draw(['POINTS'])

    setTimeout(()=>{
        poly.addVertice(-0.2,-0.1)
        gl.clear(gl.COLOR_BUFFER_BIT);
        poly.draw(['POINTS'])
      },1000)
      
      setTimeout(()=>{
        gl.clear(gl.COLOR_BUFFER_BIT);
        poly.draw(['POINTS','LINE_STRIP'])
      },2000)
      
}

useEffect(() => {

}, [])

    return (<Webgl  hook = {hook}/>)
}

export default Demo10