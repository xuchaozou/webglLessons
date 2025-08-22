import { Col, Row, Slider, Space } from "antd";
import Webgl from "../../components/webgl";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";

function glsl(code) {
  return code;
}

const data = {
  scale: [{
    name: "x",
    value: 1
  }, {
    name: "y",
    value: 1
  }, {
    name: "z",
    value: 1
  }],
  rotation: [{
    name: "x",
    value: 0
  }, {
    name: "y",
    value: 0
  }, {
    name: "z",
    value: 0
  }],
  tanslate: [{
    name: "x",
    value: 0
  }, {
    name: "y",
    value: 0
  }, {
    name: "z",
    value: 0
  }]
}

const Demo18 = props => {

  const [scale, setScale] = useState({
    x: 1,
    y: 1,
    z: 1
  })

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
              >
                <span>
                  {
                    key + item.name + "轴"
                  }
                </span>
                <Slider min={0} max={10} style={{
                  width: "100%"
                }} />
              </Col>)
            }
          </Row>
        </Col>)
      }
    </Row>
    <Webgl />
  </Fragment>)
}

export default Demo18