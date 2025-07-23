import Webgl from '../../components/webgl';

function glsl(code) {
  return code;
}
const Demo17 = (props) => {
  // VertexPoint vertexPoint = VertexPoint(
  //     a_Position,
  //     a_PointSize
  // );
  // gl_Position = vertexPoint.s_Position;
  // gl_PointSize = vertexPoint.s_PointSize

  const hook = ({ gl }) => {
    const vertexSource = glsl`
        struct VertexPoint{
            vec4 a_Position;
            float a_PointSize;
          };
          attribute float a_PointSize;
          attribute vec4 a_Position;
            void main () {  
                VertexPoint vertexPoint = VertexPoint(
                    a_Position,
                    a_PointSize
                );
                gl_Position =   vertexPoint.a_Position;
                gl_PointSize =  vertexPoint.a_PointSize;
            }
        `;

    const fragmentSource = glsl`
            precision mediump float;
            void main(){
                gl_FragColor = vec4(1.0 , 0.0 , 0.0, 1.0);
            }
        `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexSource);
    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      return console.warn('编译顶点着色器失败');
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      return console.warn('编译片元着色器失败');
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return console.warn('链接程序失败');
    }
    gl.useProgram(program);

    const data = new Float32Array([0, 0, 40]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(program, 'a_Position');
    const a_PointSize = gl.getAttribLocation(program, 'a_PointSize');

    gl.vertexAttribPointer(
      a_Position,
      2,
      gl.FLOAT,
      false,
      data.BYTES_PER_ELEMENT * 3,
      0,
    );
    gl.enableVertexAttribArray(a_Position);

    gl.vertexAttribPointer(
      a_PointSize,
      1,
      gl.FLOAT,
      false,
      data.BYTES_PER_ELEMENT * 3,
      data.BYTES_PER_ELEMENT * 2,
    );
    gl.enableVertexAttribArray(a_PointSize);

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
  };

  return <Webgl hook={hook} />;
};

export default Demo17;
