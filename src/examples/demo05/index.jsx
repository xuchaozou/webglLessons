import { useEffect, useRef } from 'react';
import Webgl from '../../components/webgl';

function glsl(code) {
  return code;
}

const Demo05 = (props) => {
  const glRef = useRef(null);

  const points = useRef([]);

  const hook = ({ gl }) => {
    glRef.current = gl;

    const vertexSource = glsl`
        void main() {
            gl_Position = vec4(0.0 , 0.0 , 0.0, 1.0);
            gl_PointSize = 50.0;
        }
    `;

    const fragmentSource = glsl`
        precision mediump float;
        uniform vec4 u_FragColor;
        void main() {
            gl_FragColor = u_FragColor;
        }
    `;

    const vertextShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertextShader, vertexSource);
    gl.compileShader(vertextShader);

    const isVertexCompileShader = gl.getShaderParameter(
      vertextShader,
      gl.COMPILE_STATUS,
    );
    if (!isVertexCompileShader) {
      return console.warn('编译顶点着色器失败');
    }

    const frageShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(frageShader, fragmentSource);
    gl.compileShader(frageShader);

    const isFragmentCompileShader = gl.getShaderParameter(
      frageShader,
      gl.COMPILE_STATUS,
    );
    if (!isFragmentCompileShader) {
      return console.warn('编译片元着色器失败');
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertextShader);
    gl.attachShader(program, frageShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    const isLinkSuccess = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!isLinkSuccess) {
      return console.warn('连接程序失败');
    }

    const u_FragColor = gl.getUniformLocation(program, 'u_FragColor');
    gl.uniform4fv(u_FragColor, new Float32Array([1.0, 0.0, 0.0, 1.0]));
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
  };

  useEffect(() => {}, []);

  return <Webgl hook={hook} />;
};

export default Demo05;
