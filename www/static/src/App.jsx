
/*
import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message } from 'antd';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
  handleChange(date) {
    message.info('您选择的日期是: ' + date.toString());
    this.setState({ date });
  }
  render() {
    return (
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={value => this.handleChange(value)} />
        <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('content'));

*/
/* eslint global-require: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Menu, Icon, Button } from 'antd';

const SubMenu = Menu.SubMenu;
const navStyle = {
  width:'240px',
  height:'100%',
}
class App extends React.Component {
  state = {
    collapsed: false,
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <div style={{ width: '240px', height:'100%', marginTop:'200px' }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['']}
          mode="inline"
          theme="light"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1">
            <span>信号强度高斯特征</span>
          </Menu.Item>
          <Menu.Item key="2">
            <span>时间戳的二差特征</span>
          </Menu.Item>
          <Menu.Item key="3">
            <span>beacon 序列号波动图</span>
          </Menu.Item>
          <SubMenu key="sub1" title={<span>信道负载图</span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span>检测结果图</span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('navi'));