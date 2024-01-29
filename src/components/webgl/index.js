import { forwardRef, useEffect, useRef } from 'react'

const Webgl = forwardRef((props, ref) => {
    const canvas = useRef(null)
    const div = useRef(null)

    useEffect(() => {
        const {width , height} = div.current.getBoundingClientRect()
        canvas.current.width = width
        canvas.current.height = height
        const gl=canvas.current.getContext('webgl');
        props.hook && props.hook({
            gl, 
            canvas : canvas.current
        })

    }, [])
    return (<div
        style={{
            width: "100%",
            height: "500px"
        }}
        ref = {div}
    >
        <canvas style={props.style || {}} ref = {canvas} height={"100%"} width={"100%"} id="canvas"></canvas>
    </div>)
})

export default Webgl