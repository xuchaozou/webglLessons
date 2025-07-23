import { useRef } from 'react';
import Webgl from '../../components/webgl';
import Util from '../../utils/Util';

function glsl(code) {
  return code;
}

const Demo16 = (props) => {
  const glRef = useRef(null);

  const hook = ({ gl }) => {
    glRef.current = gl;
    const vertexSource = glsl`
            attribute vec4 a_Position;
            attribute vec4 a_Color;
            varying vec4 f_Color;
            void main() {
                gl_Position = a_Position;
                f_Color = a_Color;
            }
        `;

    const fragmentSource = glsl`
            precision mediump float;
            varying vec4 f_Color;
            uniform vec2 u_CanvasSize;
            float halfW=u_CanvasSize.x/2.0;
            float halfH=u_CanvasSize.y/2.0;

            void main () {
                mat4 m=mat4(
                    255,0,0,255,
                    255,255,0,255,
                    0,255,0,255,
                    0,0,255,255
                  );
                  bool xb= gl_FragCoord.x<halfW;
                  bool yb= gl_FragCoord.y<halfH;
                  if(yb){
                    if(xb){
                      gl_FragColor=m[0]/255.0;
                    }else{
                      gl_FragColor=m[1]/255.0;
                    }
                  }else{
                    if(xb){
                      gl_FragColor=m[2]/255.0;
                    }else{
                      gl_FragColor=m[3]/255.0;
                    }
                  }
            }
        `;

    const isSuccess = Util.initShader(gl, vertexSource, fragmentSource);
    if (!isSuccess) {
      console.log('编译着色器失败');
      return;
    }

    const data = new Float32Array([
      -1.0, 1.0, 0.0, 1.0, 0.0, 1.0, -1.0, -1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0,
      1.0, 1.0, 0.0, 1.0, 1.0, -1.0, 0.0, 0.0, 1.0, 1.0,
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    const a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    const u_CanvasSize = gl.getUniformLocation(gl.program, 'u_CanvasSize');

    gl.vertexAttribPointer(
      a_Position,
      2,
      gl.FLOAT,
      false,
      data.BYTES_PER_ELEMENT * 6,
      0,
    );
    gl.enableVertexAttribArray(a_Position);

    gl.vertexAttribPointer(
      a_Color,
      4,
      gl.FLOAT,
      false,
      data.BYTES_PER_ELEMENT * 6,
      data.BYTES_PER_ELEMENT * 2,
    );
    gl.enableVertexAttribArray(a_Color);

    gl.uniform2fv(
      u_CanvasSize,
      new Float32Array([gl.drawingBufferWidth, gl.drawingBufferHeight]),
    );

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  return <Webgl hook={hook} />;
};

export default Demo16;
