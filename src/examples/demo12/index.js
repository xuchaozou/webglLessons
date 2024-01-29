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
        uniform vec4 u_Translation;
        void main() {
            gl_Position = a_Position + u_Translation;
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

    let y = 0
    function animate(){
        y += 0.01
        if(y > 1) {
            y = -1
        }
        const u_Translation = gl.getUniformLocation(gl.program, "u_Translation")
        gl.uniform4fv(u_Translation, new Float32Array([0, y , 0, 0]))
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