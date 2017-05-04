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
                    formatter: function(param) {
                        return param[1];
                    },
                    position: 'top'
                }
            };
        }
        $.get("/home/index/line", function(res) {
            // console.log(res);
            self.setOption();
            for (var i = 0; i < res.length; i++) {
                var series = (function(i) {
                    return new Series(res[i]);
                })(i);
                self.option.series.push(series);
            }

            console.log(self.option)
            linear.setOption(self.option);
        });
    },
    setOption: function() {
        var self = this;
        self.option = {
            title: {
                text: "Beacon Clock Skew"
            },
            xAxis: {
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                splitLine: {
                    show: false
                },
                // scale: true
            },
            series: []
        };
    },
    init: function() {
        var self = this;
        var linear = echarts.init(document.getElementById("content"));
        self.getData(linear);

    }
}
LineBuild.init();