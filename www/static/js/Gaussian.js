var Gaussian = {
    xData: null,
    yData: null,
    option: null,
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
                            fontSize: 16
                        },
                        position: 'top'
                    }
                };
        }
        $.get("/home/index/gaussian", function(res) {
            console.log(res);


            self.setOption();
            for (var key in res) {
                var series = (function(key) {
                    console.log(res[key].dots);
                    return new Series(res[key].dots);
                })(key);
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
                text: "the Gaussian of signal"
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
    init: function() {
        var self = this;
        var linear = echarts.init(document.getElementById("content"));
        self.getData(linear);
    }

}
Gaussian.init();