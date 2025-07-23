import { useEffect, useRef } from 'react';
import Webgl from '../../components/webgl';
import Util from '../../utils/Util';

function glsl(code) {
  return code;
}

const Demo10 = (props) => {
  const glRef = useRef(null);

  const points = useRef([]);

  const hook = ({ gl }) => {
    glRef.current = gl;

    const vertexSource = glsl`
        attribute vec4 a_Position;
        void main() {
            gl_Position = a_Position;
            gl_PointSize = 20.0;
        }
    `;

    const fragmentSource = glsl`
        precision mediump float;
        void main() {
            gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
        }
    `;

    Util.initShader(gl, vertexSource, fragmentSource);

    const poly = new Util.Poly({
      gl,
      types: ['POINTS', 'LINE_STRIP'],
    });

    gl.clearColor(0, 0, 0, 1);

    gl.canvas.addEventListener('click', (event) => {
      const { x, y } = Util.getMousePosInWebgl(event, gl.canvas);
      poly.addVertice(x, y);
      gl.clear(gl.COLOR_BUFFER_BIT);
      poly.draw();
    });
  };

  useEffect(() => {}, []);

  return <Webgl hook={hook} />;
};

export default Demo10;
