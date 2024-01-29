import Webgl from "../../components/webgl"
import { useEffect, useRef } from "react"

function glsl(code){return code}

const Demo07 = props => {

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

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vertexSource)
    gl.compileShader(vertexShader)
    const isVertexSuccess = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)
    if(!isVertexSuccess) {
        return console.warn("编译顶点着色器失败")
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fragmentSource)
    gl.compileShader(fragmentShader)
    const isFragemntSuccess = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)
    if(!isFragemntSuccess) {
        return console.warn("编译片元着色器失败")
    }

    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.useProgram(program)

    const isLinkSuccess = gl.getProgramParameter(program, gl.LINK_STATUS)
    if(!isLinkSuccess) {
        return console.warn("连接失败")
    }



    const vertices = new Float32Array([
        0.0 , 0.1,
        -0.1, -0.1,
        0.1, -0.1
    ])

    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices , gl.STATIC_DRAW)

    const a_Position = gl.getAttribLocation(program, "a_Position")
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, true, 0, 0)
    gl.enableVertexAttribArray(a_Position)

    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.LINE_LOOP  , 0 , 3)

}

useEffect(() => {

}, [])

    return (<Webgl  hook = {hook}/>)
}

export default Demo07