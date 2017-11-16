import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button, InputNumber } from 'antd';
const FormItem = Form.Item;
const Gaussian = {
    xData: null,
    yData: null,
    option: null,
    size: 40,
    slide:20,
    time_start:0,
    time_size:20,
    linear:echarts.init(document.getElementById("gaussian-content")),
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
        $.get("/home/index/gaussian?size=" + this.size+"&slide=" + this.slide
        +'&time_start='+this.time_start+'&time_size='+this.time_size, function(res) {
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
                axisLabel:{
                    textStyle:{
                        color:'#fff'
                    }
                }
            },
            yAxis: {
                splitLine: {
                    show: false
                },
                axisLabel:{
                    textStyle:{
                        color:'#fff'
                    }
                }
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
    init: function(size,slide,time_start,time_size) {
        var self = this;
        self.size = size;
        self.slide = slide
        self.time_start = time_start;
        self.time_size = time_size;
        self.getData(this.linear);
    }
}
class WindowParam extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            timer:null,
        };
      }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(values.end <= values.start){
                err = "end 必须比 start 大";
            }
            if (!err) {
                console.log('Received values of form: ', values);
                Gaussian.init(values.size,values.slide,0,10);
                clearInterval(this.state.timer);
                start_time = 0;
                this.state.timer =  setInterval(function () {
                    if(time_start > 40){
                        time_start = 20;
                    }
                    Gaussian.init(form.getFieldValue("size"),form.getFieldValue("slide"),time_start,10);
                    time_start = time_start + 2;
                }, 2000);
            }else{
                alert(err);
                return false;
            }
        });
    }
    onChange = (value) => {
        const form = this.props.form;
        setTimeout(function() {
            if(form.getFieldValue("size") < form.getFieldValue("slide")){
                console.info("窗口必须大于滑动值")
            }
        }, 1000);
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
                })(<InputNumber min={20} max={200}  step={10} />)}
            </FormItem>
            <span>窗口滑动值:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <FormItem>
                {getFieldDecorator('slide', {
                    initialValue: 20,
                    rules: [{ required: true, message: 'Please input window size' }],
                })(<InputNumber min={20} max={200}  step={10} />)}
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
                    initialValue: 100,
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
    componentDidMount(){
        const form = this.props.form;
        let time_start = 0;
        let time_size = 10;
        this.state.timer =  setInterval(function () {
            if(time_start > 40){
                time_start = 20;
            }
            Gaussian.init(form.getFieldValue("size"),form.getFieldValue("slide"),time_start,10);
            time_start = time_start + 2;
        }, 2000);
    }
}
const WindowForm = Form.create()(WindowParam);
ReactDOM.render(<WindowForm />, document.getElementById('params'));