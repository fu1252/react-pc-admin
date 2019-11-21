import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input,Button,Icon} from "antd";


function Main() {
  let history = useHistory();



  return (
    <div>
      <h2>我是home组件</h2>
      <Form  >
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
      <Icon type="down" />

      <button className="custom-btn" onClick={() => history.push("/chart")}>
        去图表页面
      </button>
      <button className="custom-btn" onClick={() => history.push("/login")}>
        登录
      </button>
      <button className="custom-btn" onClick={() => history.push("/about")}>
        去about
      </button>
    </div>
  );
}

export default Main;
