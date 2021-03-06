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
                    console.log(res[key].dots);
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
var size = 100;
Gaussian.init(size);