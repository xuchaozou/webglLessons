import Webgl from "../../components/webgl"
import { useEffect, useRef } from "react"
import Util from "../../utils/Util"
import image from './erha.jpg'
function glsl(code){return code}

const Demo10 = props => {

const glRef = useRef(null)

const points = useRef([])

const hook = ({gl}) => {
    const vertexSource = glsl`
        attribute vec4 a_Position;
        attribute vec2 a_Texture;
        varying vec2 v_Texture;
        void main() {
            gl_Position = a_Position;
            v_Texture = a_Texture;
        }
    `

    const fragmentSource = glsl`
        precision mediump float;
        uniform sampler2D u_Sampler;
        varying vec2 v_Texture;
        void main () {
            gl_FragColor = texture2D(u_Sampler , v_Texture);
        }
    `

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vertexSource)
    gl.compileShader(vertexShader)
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        return console.log("编译顶点失败")
    }
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fragmentSource)
    gl.compileShader(fragmentShader)
    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        return console.log("编译片元失败")
    }

    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        return console.log("程序链接失败")
    }
    gl.useProgram(program)

    // const maxUv = 1.0
    // const data = new Float32Array([
    //     -0.5, -0.5, 0.0, 0.0,
    //     0.5, -0.5, 1.0, 0.0,
    //     -0.5, 0.5, 0.0, 1.0 ,
    //     0.5, 0.5, 1.0   , 1.0
    // ])

    const data = new Float32Array([
        -0.5, -0.5 , 0.0 , 0.0,
        0.5, -0.5 ,  1.0 , 0.0,
        -0.5 , 0.5, 0.0 , 1.0,
        0.5 , 0.5 , 1.0 , 1.0
    ])

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)

    const a_Position = gl.getAttribLocation(program, "a_Position")
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, data.BYTES_PER_ELEMENT * 4, 0)
    gl.enableVertexAttribArray(a_Position)

    const a_Texture = gl.getAttribLocation(program, "a_Texture")
    gl.vertexAttribPointer(a_Texture, 2, gl.FLOAT, false, data.BYTES_PER_ELEMENT * 4,  data.BYTES_PER_ELEMENT * 2)
    gl.enableVertexAttribArray(a_Texture)
    const u_Sampler = gl.getUniformLocation(program, "u_Sampler")

    gl.clearColor(0, 0, 0, 1)

    const img = new Image()
    img.onload = () => {
        const texture = gl.createTexture()
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, texture)

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
        gl.texParameteri(gl.TEXTURE_2D , gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D , gl.TEXTURE_MAG_FILTER , gl.LINEAR)
        gl.texParameterf(gl.TEXTURE_2D , gl.TEXTURE_WRAP_S , gl.MIRRORED_REPEAT )
        gl.texParameterf(gl.TEXTURE_2D , gl.TEXTURE_WRAP_T , gl.MIRRORED_REPEAT )

        gl.texImage2D(gl.TEXTURE_2D , 0 , gl.RGBA, gl.RGBA , gl.UNSIGNED_BYTE , img)
        gl.uniform1i(u_Sampler, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    img.src = image



    // glRef.current = gl

    // const vertexSource = glsl`
    //     attribute vec4 a_Position;
    //     uniform float degree;
    //     float angle = radians(degree);
    //     float sinB = sin(angle);
    //     float cosB = cos(angle);
    //     void main() {
    //         gl_Position.x = a_Position.x * cosB - a_Position.y * sinB;
    //         gl_Position.y = a_Position.y * cosB + a_Position.x * sinB;
    //         gl_Position.z = 1.0;
    //         gl_Position.w = 1.0;
            
    //     }
    // `

    // const fragmentSource = glsl`
    //     precision mediump float;
    //     void main() {
    //         gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
    //     }
    // `

    // Util.initShader(gl, vertexSource, fragmentSource)

  
    // const poly = new Util.Poly({
    //     gl, 
    //     types : ['TRIANGLES'],
    //     vertices : [
    //         -0.1 , 0,
    //         0.1 , 0,
    //         0   , 0.1
    //     ]
    // })


    // gl.clearColor(0, 0, 0, 1)
    // gl.clear(gl.COLOR_BUFFER_BIT)
    // poly.draw()

    // let angle = 0
    // function animate(){
    //     angle += 1
    //     const degree = gl.getUniformLocation(gl.program, "degree")
    //    gl.uniform1f(degree, angle)
    //     gl.clear(gl.COLOR_BUFFER_BIT)
    //     poly.draw()
    //     requestAnimationFrame(animate)
    // }

    // animate()
  
      
}

useEffect(() => {

}, [])

    return (<Webgl  hook = {hook}/>)
}

export default Demo10