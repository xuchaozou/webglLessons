import { Col, Row, Slider, Space } from "antd";
import Webgl from "../../components/webgl";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { mat4 } from 'gl-matrix'

const glsl = x => x;

const data = {
  scale: [{
    name: "x",
    value: 1,
    min: 0,
    max: 10
  }, {
    name: "y",
    value: 1,
    min: 0,
    max: 10
  }, {
    name: "z",
    value: 1,
    min: 0,
    max: 10
  }],
  rotation: [{
    name: "x",
    value: 0,
    min: 0,
    max: 360
  }, {
    name: "y",
    value: 0,
    min: 0,
    max: 360
  }, {
    name: "z",
    value: 0,
    min: 0,
    max: 360
  }],
  translate: [{
    name: "x",
    value: 0,
    min: 0,
    max: 1,
    step: 0.1
  }, {
    name: "y",
    value: 0,
    min: 0,
    max: 1,
    step: 0.1
  }, {
    name: "z",
    value: 0,
    min: 0,
    max: 1,
    step: 0.1
  }]
}

const Demo18 = props => {
  const glRef = useRef(null)
  const [scale, setScale] = useState({
    x: 1,
    y: 1,
    z: 1
  })
  const [rotation, setRotation] = useState({
    x: 0,
    y: 0,
    z: 0
  })
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0,
    z: 0
  })

  const changeSlider = ({
    target,
    name
  }, value) => {
    let handle
    if (target == "scale") {
      handle = setScale
    } else if (target == "rotation") {
      handle = setRotation
    } else if (target == "translate") {
      handle = setTranslate
    }
    handle(item => ({
      ...item,
      [name]: value
    }))
  }

  useEffect(() => {
    const gl = glRef.current
    let model = mat4.create(); // 单位矩阵

    // 平移
    mat4.translate(model, model, [translate.x, translate.y, translate.z]);

    const tanslateMat = gl.getUniformLocation(gl.program, "tanslateMat")

    gl.uniformMatrix4fv(tanslateMat, false, model);
   render(gl)
  }, [translate])

    useEffect(() => {
    const gl = glRef.current
    let model = mat4.create(); // 单位矩阵

    // 平移
    mat4.scale(model, model, [scale.x, scale.y, scale.z]);

    const scaleMat = gl.getUniformLocation(gl.program, "scaleMat")

    gl.uniformMatrix4fv(scaleMat, false, model);
   render(gl)
  }, [scale])

  /**
   * 
   * @param {object} option
   * @param {WebGL2RenderingContext} option.gl 
   */
  const hook = ({
    gl
  }) => {
    glRef.current = gl
    const vertexSource = glsl`
      attribute vec4 a_position;
      attribute vec3 a_color;
      varying vec3 f_color;
       uniform mat4 scaleMat;
      uniform mat4 tanslateMat;
      void main () {
        gl_Position = scaleMat * tanslateMat * a_position;
        f_color = a_color;
      }
    `

    const fragmentSource = glsl`
      precision mediump float;
       varying vec3 f_color;
      void main () {
        gl_FragColor = vec4(f_color , 1.0);
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
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      return console.warn("编译片元着色器失败")
    }

    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return
    }
    gl.useProgram(program)
    gl.program = program
    const data = new Float32Array([
      -0.1, 0.0, 0.0, 1.0, 0.0, 0.0,
      0.1, 0.0, 0.0, 0.0, 0.0, 1.0,
      0.0, 0.1, 0.0, 0.0, 1.0, 0.0
    ])

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)

    const a_position = gl.getAttribLocation(program, 'a_position')
    const a_color = gl.getAttribLocation(program, 'a_color')

    gl.vertexAttribPointer(
      a_position,
      3,
      gl.FLOAT,
      false,
      data.BYTES_PER_ELEMENT * 6,
      0
    )
    gl.enableVertexAttribArray(a_position)

    gl.vertexAttribPointer(
      a_color,
      3,
      gl.FLOAT,
      false,
      data.BYTES_PER_ELEMENT * 6,
      data.BYTES_PER_ELEMENT * 3,
    )
    gl.enableVertexAttribArray(a_color)
    render(gl)
  }

  const render = (gl) => {
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  return (<Fragment>
    <Row
      justify={"space-between"}
    >
      {
        Object.entries(data).map(([key, value], index) => <Col
          span={7}
          key={key}
        >
          <Row>
            {
              value.map(item => <Col
                span={24}
                key={item.name}
              >
                <span>
                  {
                    key + ":" + item.name + "轴"
                  }
                </span>
                <Slider value={
                  key == "scale" ? scale[item.name] :
                    key == "rotation" ? rotation[item.name] :
                      key == "translate" ? translate[item.name] : null
                }
                  min={item.min}
                  max={item.max}
                  step={item.step ?? 1}
                  onChange={changeSlider.bind(this, {
                    target: key,
                    name: item.name
                  })}
                  style={{
                    width: "100%"
                  }} />
              </Col>)
            }
          </Row>
        </Col>)
      }
    </Row>
    <Webgl hook={hook} />
  </Fragment>)
}

export default Demo18