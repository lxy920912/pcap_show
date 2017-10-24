import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button, InputNumber } from 'antd';
const FormItem = Form.Item;
class WindowParam extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
        }
        });
    }
    onChange = (value) => {
        console.log('changed', value);
    }
    render() {
        return(
            <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem 
            label="窗口大小"
            >
                <InputNumber min={20} max={200} defaultValue={20}  step={10} onChange={this.onChange} />
            </FormItem>
            <FormItem 
            label="窗口开始"
            >
                <InputNumber min={0} max={200} defaultValue={0}  step={1} onChange={this.onChange} />
            </FormItem>
            <FormItem 
            label="窗口结束"
            >
                <InputNumber min={0} max={200} defaultValue={0}  step={1} onChange={this.onChange} />
            </FormItem>
        </Form>
        );
        
    }
}
const WindowForm = Form.create()(WindowParam);
ReactDOM.render(<WindowForm />, document.getElementById('window-params'));