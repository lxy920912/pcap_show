'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    __before() {
        console.log("...........before............");
    }
    indexAction() {
        //auto render template file index_index.html
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
        let count = 100;
        let model = this.model("libpcap_data");
        let datas = [];
        datas[0] = await model.limit(count).where({ "ssid": "360免费WiFi-24" }).select();
        datas[1] = await model.limit(count).where({ "ssid": "TP-LINK_324" }).select();
        datas[0].splice(0, 80);
        datas[1].splice(0, 80);
        let obj = [];
        let result = [];
        for (let j = 0; j < datas.length; j++) {
            obj[j] = [];
            result[j] = [];
            for (let i = 1; i < datas[j].length && i < count; i++) {
                let xi = datas[j][i].sequence - datas[j][0].sequence;
                let ki = datas[j][i].frame_timestamp - datas[j][i - 1].frame_timestamp;
                let vi = datas[j][i].sequence - datas[j][i - 1].sequence;
                let oi = ki / vi;
                obj[j].push([xi, oi, datas[j][i].ssid_signal]);
            }
            let sum = 0;
            for (let i = 1; i < obj[j].length; i++) {
                let xi = obj[j][i][0];
                let oi = Math.abs(obj[j][i][1] - obj[j][i - 1][1]) + sum;
                sum = oi;
                result[j].push([xi, oi, obj[j][i][2]]);
            }

        }
        // console.log(obj);
        this.json(result);
    }
    async linearAction() {
        return this.display();
    }
    async borwnLineAction() {

    }
    async brownAction() {
        let model = this.model("data");
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