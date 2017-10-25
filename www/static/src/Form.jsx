import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button, InputNumber } from 'antd';
const FormItem = Form.Item;
class WindowParam extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        var Gaussian = {
            xData: null,
            yData: null,
            option: null,
            size: 40,
            getData: function(linear) {
                var self = this;
        
                function Series(data) {
                    this.type = 'line';
                    this.data = data;
                    this.symbolSize = 5;
                    this.showSymbol = false;
                    this.smooth = true,
                        this.label = {
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: 16,
                                    color: '#aabbcc'
                                },
                                position: 'top'
                            }
                        };
                }
                $.get("/home/index/gaussian?size=" + this.size, function(res) {
                    console.log(res);
                    self.setOption();
                    for (var key in res) {
                        var series = (function(key) {
                            return new Series(res[key].dots);
                        })(key);
                        self.option.series.push(series);
                    }
                    linear.setOption(self.option);
                });
            },
            setOption: function() {
                var self = this;
                self.option = {
                    title: {
                        text: "the Gaussian of signal",
                        textStyle: {
                            fontSize: 26,
                            color: '#dcdddc'
                        },
                    },
                    xAxis: {
                        splitLine: {
                            show: false
                        },
                        min: -90,
                        max: 0,
        
                    },
                    yAxis: {
                        splitLine: {
                            show: false
                        },
                        // scale: true
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    series: []
                };
            },
            init: function(size) {
                var self = this;
                self.size = size;
                var linear = echarts.init(document.getElementById("content"));
                self.getData(linear);
            }
        }
        this.props.form.validateFields((err, values) => {
            if(values.end <= values.start){
                err = "end 必须比 start 大";
            }
            if (!err) {
                console.log('Received values of form: ', values);
                Gaussian.init(values.size);
            }else{
                alert(err);
                return false;
            }
        });
    }
    onChange = (value) => {
        console.log('changed', value);
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return(
            <Form layout="inline" onSubmit={this.handleSubmit}>
            <span>窗口大小:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <FormItem>
                {getFieldDecorator('size', {
                    initialValue: 20,
                    rules: [{ required: true, message: 'Please input window size' }],
                })(<InputNumber min={20} max={200}  step={10} onChange={this.onChange} />)}
            </FormItem>
            <span>窗口开始:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <FormItem>
                {getFieldDecorator('start', {
                    initialValue: 0,
                    rules: [{ required: true,  message: 'Please input window start' }],
                })(<InputNumber min={0} max={200} step={1} onChange={this.onChange} />)}
            </FormItem>
            <span>窗口结束&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <FormItem>
                {getFieldDecorator('end', {
                    initialValue: 0,
                    rules: [{ required: true, message: 'Please input window end' }],
                })(<InputNumber min={0} max={200}  step={1} onChange={this.onChange} />)}
            </FormItem>
            <FormItem>
            <Button
                type="primary"
                htmlType="submit"
            >
                提交
            </Button>
        </FormItem>
        </Form>
        );
        
    }
}
const WindowForm = Form.create()(WindowParam);
ReactDOM.render(<WindowForm />, document.getElementById('params'));