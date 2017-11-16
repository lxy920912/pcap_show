/**
 * Created by lxy_920912 on 01/05/2017.
 */
var LineBuild = {
    xData: null,
    yData: null,
    option: null,
    getData: function(linear) {
        var self = this;

        function Series(data) {
            this.type = 'scatter';
            this.data = data;
            this.symbolSize = 5;
            this.label = {
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: 16,
                        color: '#ffffff',
                    },
                    position: 'top'
                }
            };
        }
        $.get("/home/index/line", function(res) {
            console.log(res);
            self.setOption();
            for (key in res) {
                var series = (function(key) {
                    return new Series(res[key].dots);
                })(key);
                self.option.series.push(series);
            }
            // for (var i = 0; i < res.length; i++) {
            //     var series = (function(i) {
            //         return new Series(res[i]);
            //     })(i);
            //     self.option.series.push(series);
            // }
            console.log(self.option)
            linear.setOption(self.option);
        });
    },
    setOption: function() {
        var self = this;
        self.option = {
            title: {
                text: "Beacon Clock Skew",
                textStyle: {
                    color: '#fff',
                    fontSize: 26,
                }
            },
            xAxis: {
                splitLine: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
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
    init: function() {
        var self = this;
        var linear = echarts.init(document.getElementById("linear-content"));
        self.getData(linear);
    }
}
LineBuild.init();