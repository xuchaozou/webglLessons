import Webgl from "../../components/webgl"
import { useEffect, useRef } from "react"

const Demo01 = props => {

const hook = ({gl}) => {
    gl.clearColor(1, 0, 0, 0.5)
    gl.clear(gl.COLOR_BUFFER_BIT)
    
}

    return (<Webgl hook = {hook}/>)
}

export default Demo01