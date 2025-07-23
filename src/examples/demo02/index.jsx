import Webgl from '../../components/webgl';

function glsl(code) {
  return code;
}

const Demo02 = (props) => {
  const hook = ({ gl }) => {
    gl.clearColor(1, 0, 0, 0.5);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vertextSource = glsl`
        void main() {
            gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        gl_PointSize = 100.0;
        }
    `;

    const frageSource = glsl`
        void main() {
            gl_FragColor = vec4(1.0 , 1.0 , 0.0 , 1.0);
        }
    `;

    const vertextShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertextShader, vertextSource);
    gl.compileShader(vertextShader);

    const isCompileVertexShader = gl.getShaderParameter(
      vertextShader,
      gl.COMPILE_STATUS,
    );
    if (!isCompileVertexShader) {
      return console.warn('编译顶点着色器失败');
    }
    const frageShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(frageShader, frageSource);
    gl.compileShader(frageShader);

    const isCompileFragmentShader = gl.getShaderParameter(
      frageShader,
      gl.COMPILE_STATUS,
    );
    if (!isCompileFragmentShader) {
      return console.warn('编译片元着色器失败');
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertextShader);
    gl.attachShader(program, frageShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
  };

  return <Webgl hook={hook} />;
};

export default Demo02;
