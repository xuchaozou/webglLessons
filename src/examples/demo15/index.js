import Webgl from "../../components/webgl";
import { useEffect, useRef } from "react";

function glsl(code) { return code }

const Demo15 = props => {

    const glRef = useRef(null)

    const hook = ({ gl }) => {
        glRef.current = gl
        const vertexSource = glsl`
            attribute float a_PointSize;
            attribute vec4 a_Position;
            void main() {
                gl_Position = a_Position;
                gl_PointSize = a_PointSize;
            }
        `

        const fragmentSource = glsl`
            precision mediump float;
            mat4 m = mat4(
                255 , 0, 0, 255,
                255 , 255 , 0, 255,
                0 , 255 , 0 , 255,
                0, 0, 255 , 255
            );
            void main() {
                float dist = distance(gl_PointCoord, vec2(0.5 , 0.5));
                if(dist >= 0.0 && dist < 0.125) {
                    gl_FragColor = m[0] / 255.0;
                } else if(dist < 0.25) {
                    gl_FragColor = m[1] / 255.0;
                } else if(dist < 0.375) {
                    gl_FragColor = m[2] / 255.0;
                } else if(dist < 0.5) {
                    gl_FragColor = m[3] / 255.0;
                } else {
                    discard;
                } 
            }
        `

        const vertexShader = gl.createShader(gl.VERTEX_SHADER)
        gl.shaderSource(vertexShader, vertexSource)
        gl.compileShader(vertexShader)
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            return console.warn("编译顶点着色器失败")
        }
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(fragmentShader, fragmentSource)
        gl.compileShader(fragmentShader)
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            return console.warn("编译片元着色器失败")
        }

        const program = gl.createProgram()
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            return console.warn("链接程序失败")
        }
        gl.useProgram(program)

        const data = new Float32Array([0, 0, 400])

        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)

        const a_Position = gl.getAttribLocation(program, "a_Position")
        const a_PointSize = gl.getAttribLocation(program, "a_PointSize")

        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, data.BYTES_PER_ELEMENT * 3, 0)
        gl.enableVertexAttribArray(a_Position)

        gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, data.BYTES_PER_ELEMENT * 3, data.BYTES_PER_ELEMENT * 2)
        gl.enableVertexAttribArray(a_PointSize)


        gl.clearColor(0, 0, 0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT)

        gl.drawArrays(gl.POINTS, 0, 1)

    }

    const logPixel = (offset = 0) => {
        const pixel = new Uint8Array(4)
        const gl = glRef.current
        gl.readPixels(
            gl.canvas.width / 2 + offset,
            gl.canvas.height / 2,
            1,
            1,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            pixel)
        // console.log(pixel)
    }

    useEffect(() => {
        const vw = 400 / 8;
        for (let i = 0; i < 4; i++) {
            logPixel(vw * i + vw / 2)
        }
    }, [])

    return <Webgl hook={hook} />
}

export default Demo15