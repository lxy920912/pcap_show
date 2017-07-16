'use strict';

import Base from './base.js';
import schedule from 'node-schedule'
import ecStat from './ecStat.js'

// import Math from 'Math'
export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    datas = [];
    ssids = ["alvin"];
    lastIds = [0];
    //    ssids = ["TP-LINK_5DE0", "kexin-228"];
    count = 400;
    constructor(ctx) {
        super(ctx);
        console.log("constructor")
        console.log(ecStat)
    }
    async __before(self) {
        console.log("...........before............");
        let model = this.model("libpcap_data");
        let count = this.count;
        let ssids = this.ssids;
        let lastId = this.lastId;
        await this.getData(self, model, count, ssids);
        let rule = new schedule.RecurrenceRule();
        let time = [];
        for (let i = 0; i < 60; i = i + 3) {
            time.push(i);
        }
        rule.second = time
        schedule.scheduleJob(rule, () => {})
    }
    async getData(self, model, count, ssids) {

        for (let i = 0; i < ssids.length; i++) {
            self.datas[i] = await model.limit(count).where({ "ssid": ssids[i], id: { '>': self.lastIds[0] } }).select();
            let len = self.datas[i].length;
            self.lastIds[0] = self.datas[i][len - 1].id;
        }
        console.log("lastID", this.lastIds);
    }
    indexAction() {
        return this.display();
    }
    async listAction(self) {
        let model = this.model("libpcap_data");
        let data = await model.where({ id: 4 }).find();
        console.log(data);
        return self.success(data);
    }
    async channelloaderAction(self) {
        let model = this.model("libpcap_data");
        let start = await model.min("time_s");
        let end = await model.max("time_s");
        let data = {}
        for (let i = start; i <= end; i++) {
            data[i + ""] = await model.where({ "time_s": i }).count("*");
        }
        data["start"] = start;
        data["end"] = end;
        return self.success(data);

    }
    async clockAction(self) {
        let model = this.model("libpcap_data");
        let start = await model.min("receive_s");
        let end = await model.max("receive_s");
        let obj = {};
        for (let i = start; i <= end; i++) {
            let list = await model.where({ "SSID": "TP-LINK_5DE0", "time_s": i }).count();
            obj[i + ""] = list;
        }
        return self.success(obj);
    }
    echartsTestAction(self) {
        return this.display();
    }
    async lineAction(self) {
        let datas = this.spliceData(this.datas[0], 100);
        let result = {};
        let count = this.count;
        let ssids = this.ssids;
        for (let j = 0; j < datas.length; j++) {
            let obj = {};
            obj.dots = [];
            for (let i = 1; i < datas[j].length; i++) {
                let xi = datas[j][i].sequence - datas[j][0].sequence;
                let ki = datas[j][i].frame_timestamp - datas[j][0].frame_timestamp;
                let vi = this.getReceiveTime(datas[j][i].receive_s, datas[j][i].receive_ms) - this.getReceiveTime(datas[j][0].receive_s, datas[j][0].receive_ms)
                let oi = ki - (vi * 1000000);
                obj.dots.push([xi, oi]);
                // console.log(vi);
            }
            result[ssids[j] + "+" + j] = obj;
            let myRegression = ecStat.regression('linear', obj.dots);
            console.log(myRegression.expression);
            // let sum = 0;
            // for (let i = 1; i < obj[j].length; i++) {
            //     let xi = obj[j][i][0];
            //     let oi = obj[j][i][1] - obj[j][i - 1][1] + sum;
            //     sum = oi;
            //     result[j].push([xi, oi, obj[j][i][2]]);
            // }
        }
        // console.log(".........", result);

        return this.json(result);
    }
    async linearAction() {
        return this.display();
    }
    async borwnLineAction() {

    }
    async brownAction() {
        let model = this.model("libpcap_data");
        let datas = [];
        datas[1] = await model.limit(count).where({ "ssid": "alvin" }).select();
        datas[0] = await model.limit(count).where({ "ssid": "TP-LINK_324" }).select();
        let obj = [];
        for (let j = 0; j < obj.length; j++) {
            obj[j] = [];
            for (let i = 1; i < datas[j].length; i++) {
                let xi = datas[j][i].sequence_nubmer - datas[j][0].sequence_nubmer;
                let ti = (datas[j][i].timestamp - datas[j][i].timestamp) / (xi);
                obj[j].push([xi, ti, data[j][i].sequence_nubmer]);
            }
        }
        return this.display();
    }
    async gaussianAction() {
        let datas = this.datas;
        let count = this.count;
        let ssids = this.ssids;
        datas = this.spliceData(datas[0]);
        let gaussians = {};
        for (let i = 0; i < datas.length; i++) {
            let gaussian = {};
            gaussian.average = 0;
            gaussian.sigma = 0;
            let number = Math.min(datas[i].length, count);
            console.log(number);
            for (let j = 0; j < number; j++) {
                gaussian.average += datas[i][j].ssid_signal;
            }
            gaussian.average = gaussian.average / number;
            for (let j = 0; j < number; j++) {
                gaussian.sigma += Math.pow((datas[i][j].ssid_signal - gaussian.average), 2);
            }
            gaussian.sigma = gaussian.sigma / number;
            gaussian.dots = getGaussian(gaussian.average, gaussian.sigma);
            gaussians[ssids[i] + "+" + i] = gaussian;
        }

        function getGaussian(average, sigma) {
            let T = 1 / (Math.pow(sigma * 2 * Math.PI, (1 / 2)));
            let result = [];
            let min = average - (Math.abs(sigma) * 5);
            let max = average + (Math.abs(sigma) * 5);
            for (let i = min; i < average; i++) {
                let k = -Math.pow((i - average), 2) / (2 * sigma);
                result.push([i, T * Math.pow(Math.E, k)]);
            }
            result.push([average, T]);
            for (let i = Math.ceil(average); i < max; i++) {
                let k = -Math.pow((i - average), 2) / (2 * sigma);
                result.push([i, T * Math.pow(Math.E, k)]);
            }
            return result;
        }
        return this.json(gaussians);
    }
    async showGaussianAction() {
        this.display();
    }
    spliceData(datas, count = 20) {
        var len = datas.length;
        var groupLent = count;
        var result = [];
        let j = 0;
        console.log(len);
        for (let i = 0; i + groupLent <= len; i = i + groupLent) {
            result[j] = datas.slice(i, i + groupLent);
            j++;
        }
        console.log(result.length);
        return result;
    }
    sequenceIncrementsAction() {
        let datas = this.datas;
        let result = [];
        let increments = {};
        for (let i = 0; i < datas.length; i++) {
            result[i] = [];
            let increment = {};
            for (let j = 1; j < datas[i].length; j++) {
                result[i].push([j, datas[i][j].sequence - datas[i][j - 1].sequence])
            }
            increment.dots = result[i];
            increments[this.ssids[i]] = increment;
        }
        console.log(increments);
        return this.json(increments);
    }
    sequenceAction() {
        return this.display();
    }
    getReceiveTime(time_s, time_ms) {
        let ms_str = time_ms + "";
        let len = ms_str.length;
        for (let i = len; ms_str.length < 6; i++) {
            ms_str = '0' + ms_str;
        }
        let times = time_s + "." + ms_str;
        return parseFloat(times);
    }
    testAction() {
        this.display();
    }

}
/*
DROP TABLE IF EXISTS `pcap`.`pcap_data`;
CREATE TABLE  `pcap`.`pcap_data` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `time_s` bigint(20) unsigned NOT NULL,
  `time_ms` bigint(20) unsigned NOT NULL,
  `pLength` int(10) unsigned NOT NULL,
  `radiotapHeadLength` int(10) unsigned DEFAULT NULL,
  `macTimeStamp` bigint(20) unsigned DEFAULT NULL,
  `radFlag` int(10) unsigned DEFAULT NULL,
  `dataRate` int(10) unsigned DEFAULT NULL,
  `channelFlag` int(10) unsigned DEFAULT NULL,
  `ssiSignal` int(10) DEFAULT NULL,
  `noizeSignal` int(10) DEFAULT NULL,
  `frameType` int(10) unsigned DEFAULT NULL,
  `SSID` varchar(200) DEFAULT NULL,
  `framTimeStamp` bigint(20) unsigned DEFAULT NULL,
  `FCS` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1DEFAULT CHARSET=utf8;
*/