var Sequence = {
    xData: null,
    yData: null,
    option: null,
    getData: function(linear) {
        var self = this;

        function Series(data) {
            this.type = 'scatter';
            this.data = data;
            this.symbolSize = 5;
            this.showSymbol = true;
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
        $.get("/home/index/sequence_increments", function(res) {
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
                text: "the increments of sequence"
            },
            xAxis: {
                splitLine: {
                    show: false
                },
                min: 0,
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
Sequence.init();