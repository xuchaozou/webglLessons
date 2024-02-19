import Webgl from "../../components/webgl";
import { useEffect, useRef } from "react";
import Util from "../../utils/Util";

function glsl(code) { return code }

const Demo16 = props => {
    const glRef = useRef(null)

    const hook = ({gl}) => {
        glRef.current = gl
        const vertexSource = glsl`
            attribute vec4 a_Position;
            attribute vec4 a_Color;
            varying vec4 f_Color;
            void main() {
                gl_Position = a_Position;
                f_Color = a_Color;
            }
        `

        const fragmentSource = glsl`
            precision mediump float;
            varying vec4 f_Color;
            void main () {
                gl_FragColor = f_Color;
            }
        `

        const isSuccess = Util.initShader(gl , vertexSource , fragmentSource)
        debugger
        if(!isSuccess) {
            console.log("编译着色器失败")
            return
        }

        const data = new Float32Array([
            -1.0 , 1.0 , 0.0 , 1.0 , 0.0 , 1.0,
            -1.0 , -1.0 , 1.0, 0.0 , 0.0 , 1.0,
            1.0, 1.0, 1.0 , 1.0, 0.0, 1.0,
            1.0 , -1.0 , 0.0 , 0.0 , 1.0 , 1.0
        ])
        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)

        const a_Position = gl.getAttribLocation(gl.program, "a_Position")
        const a_Color = gl.getAttribLocation(gl.program , "a_Color")

        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, data.BYTES_PER_ELEMENT * 6, 0)
        gl.enableVertexAttribArray(a_Position)

        gl.vertexAttribPointer(a_Color , 4 , gl.FLOAT , false, data.BYTES_PER_ELEMENT * 6 , data.BYTES_PER_ELEMENT * 2)
        gl.enableVertexAttribArray(a_Color)

        gl.clearColor(0, 0, 0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT)

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)


    }
    return <Webgl hook={hook} />
}

export default Demo16