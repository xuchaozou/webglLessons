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
        uniform float degree;
        float angle = radians(degree);
        float sinB = sin(angle);
        float cosB = cos(angle);
        void main() {
            gl_Position.x = a_Position.x * cosB - a_Position.y * sinB;
            gl_Position.y = a_Position.y * cosB + a_Position.x * sinB;
            gl_Position.z = 1.0;
            gl_Position.w = 1.0;
            
        }
    `

    const fragmentSource = glsl`
        precision mediump float;
        void main() {
            gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
        }
    `

    Util.initShader(gl, vertexSource, fragmentSource)

  
    const poly = new Util.Poly({
        gl, 
        types : ['TRIANGLES'],
        vertices : [
            -0.1 , 0,
            0.1 , 0,
            0   , 0.1
        ]
    })


    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    poly.draw()

    let angle = 0
    function animate(){
        angle += 1
        const degree = gl.getUniformLocation(gl.program, "degree")
       gl.uniform1f(degree, angle)
        gl.clear(gl.COLOR_BUFFER_BIT)
        poly.draw()
        requestAnimationFrame(animate)
    }

    animate()
  
      
}

useEffect(() => {

}, [])

    return (<Webgl  hook = {hook}/>)
}

export default Demo10