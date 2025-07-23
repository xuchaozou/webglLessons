import { useEffect, useRef } from 'react';
import Webgl from '../../components/webgl';

function glsl(code) {
  return code;
}

const Demo04 = (props) => {
  const glRef = useRef(null);

  const points = useRef([]);

  const hook = ({ gl }) => {
    glRef.current = gl;

    const vertexSource = glsl`
        attribute vec4 a_Position;
        attribute float a_PointSize;
        void main(){
            gl_Position = a_Position;
            gl_PointSize = a_PointSize;
        }
    `;

    const fragmentSource = glsl`
        void main() {
            gl_FragColor = vec4(1.0 , 1.0 , 0.0, 1.0);
        }
    `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexSource);
    gl.compileShader(vertexShader);

    const isCompileVertexShader = gl.getShaderParameter(
      vertexShader,
      gl.COMPILE_STATUS,
    );
    if (!isCompileVertexShader) {
      return console.warn('编译顶点着色器失败');
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);

    const isCompileFragmentShader = gl.getShaderParameter(
      fragmentShader,
      gl.COMPILE_STATUS,
    );
    if (!isCompileFragmentShader) {
      return console.warn('编译片元着色器失败');
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    const isLinkSuccess = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!isLinkSuccess) {
      return console.warn('连接程序失败');
    }
    gl.program = program;
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  };

  useEffect(() => {
    const linkEvent = (e) => {
      const { width, height } = gl.canvas.getBoundingClientRect();
      const { offsetX, offsetY } = e;
      const x = (offsetX - width / 2) / (width / 2);
      const y = (height / 2 - offsetY) / (height / 2);
      points.current.push({ x, y, z: Math.random() * 50 });
      const a_Position = glRef.current.getAttribLocation(
        glRef.current.program,
        'a_Position',
      );
      const a_PointSize = glRef.current.getAttribLocation(
        glRef.current.program,
        'a_PointSize',
      );
      glRef.current.clear(gl.COLOR_BUFFER_BIT);
      points.current.forEach(({ x, y, z }) => {
        gl.vertexAttrib2f(a_Position, x, y);
        gl.vertexAttrib1f(a_PointSize, z);
        gl.drawArrays(gl.POINTS, 0, 1);
      });
    };

    glRef.current.canvas.addEventListener('click', linkEvent);
  }, []);

  return <Webgl hook={hook} />;
};

export default Demo04;
