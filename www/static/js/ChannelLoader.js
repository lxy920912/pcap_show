var ChannerModel = {
    xData: null,
    yData: null,
    option: null,
    getData: function() {
        var self = this;
        $.get("/home/index/channelloader", function(res) {
            var data = res.data;
            var start = data.start;
            var end = data.end;
            self.xData = [];
            self.yData = [];
            for (var i = start; i <= end; i++) {
                self.xData.push(i);
                self.yData.push(data[i + ""])
            }
            console.log(self.xData);
            ChannerModel.setOption();
            var loadChar = echarts.init(document.getElementById("content"));
            loadChar.setOption(self.option);
        });

    },
    setOption: function() {
        var self = this;
        self.option = {
            title: {
                text: "信道负载图"
            },
            xAxis: {
                data: self.xData
            },
            yAxis: {},
            series: [{
                type: 'line',
                smooth: true,
                data: self.yData
            }]
        };


    },
    run: function() {
        this.getData();
    }
}
ChannerModel.run();