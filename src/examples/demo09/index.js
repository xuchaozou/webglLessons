import Webgl from "../../components/webgl"
import { useEffect, useRef } from "react"
import Util from "../../utils/Util"

function glsl(code){return code}

const Demo09 = props => {

const glRef = useRef(null)

const points = useRef([])

const hook = ({gl}) => {
    glRef.current = gl

    const vertexSource = glsl`
        attribute vec4 a_Position;
        void main() {
            gl_Position = a_Position;
            gl_PointSize = 25.0;
        }
    `

    const fragmentSource = glsl`
        precision mediump float;
        void main() {
            gl_FragColor = vec4(1.0 , 1.0, 0.0, 1.0);
        }
    `
    Util.initShader(gl, vertexSource, fragmentSource)

    const vertices = new Float32Array([
        0.0 , 0.0,
        0.2 , 0.0,
        0.1 , 0.1,
        0.2 , 0.0,
        0.4 , 0.0 , 
        0.3 , 0.1
    ])

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const a_Position = gl.getAttribLocation(gl.program, "a_Position")
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0 , 0)
    gl.enableVertexAttribArray(a_Position)

    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.TRIANGLES, 0, 6)


}

useEffect(() => {

}, [])

    return (<Webgl  hook = {hook}/>)
}

export default Demo09