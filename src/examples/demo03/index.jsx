import Webgl from '../../components/webgl';

function glsl(code) {
  return code;
}

const Demo03 = (props) => {
  const hook = ({ gl }) => {
    const vertexSource = glsl`
        attribute vec4 a_Position;
        void main(){
            gl_Position = a_Position;
            gl_PointSize = 50.0;
        }
    `;

    const fragmentSource = glsl`
        void main() {
            gl_FragColor = vec4(1.0, 1.0 , 0.0, 1.0);
        }
    `;

    const vertextShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertextShader, vertexSource);
    gl.compileShader(vertextShader);
    const isVertextSuccess = gl.getShaderParameter(
      vertextShader,
      gl.COMPILE_STATUS,
    );
    if (!isVertextSuccess) {
      return console.warn('创建顶点着色器失败');
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);
    const isSuccessFragment = gl.getShaderParameter(
      fragmentShader,
      gl.COMPILE_STATUS,
    );
    if (!isSuccessFragment) {
      return console.warn('创建片元着色器失败');
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertextShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    const isLinkStatus = gl.getProgramParameter(program, gl.VALIDATE_STATUS);

    const a_Position = gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttrib3f(a_Position, 0, 0.5, 0);

    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
  };

  return <Webgl hook={hook} />;
};

export default Demo03;
