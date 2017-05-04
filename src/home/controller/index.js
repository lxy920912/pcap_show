'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        //auto render template file index_index.html
        return this.display();
    }
    async listAction(self) {
        let model = this.model("data");
        let data = await model.where({ id: 4 }).find();
        console.log(data);
        return self.success(data);
    }
    async channelloaderAction(self) {
        let model = this.model("data");
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
        let model = this.model("data");
        let start = await model.min("time_s");
        let end = await model.max("time_s");
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
        let count = 5;
        let model = this.model("data");
        let datas = [];
        // datas[0] = await model.limit(count).where({ "SSID": "TP-LINK_5DE0" }).select();
        datas[1] = await model.limit(count).where({ "SSID": "gaogao" }).select();
        datas[0] = await model.limit(count).where({ "SSID": "219" }).select();
        datas[2] = await model.limit(count).where({ "SSID": "Netcore_09E8A7" }).select();
        console.log(datas[2].length);

        let obj = [];
        for (let j = 0; j < datas.length; j++) {
            obj[j] = [];
            obj[j].push([0, 0]);
            for (let i = 1; i < datas[j].length && i < count; i++) {
                let xi_s = datas[j][i].time_s - datas[j][0].time_s;
                let xi_ms = datas[j][i].time_ms - datas[j][0].time_ms;
                // console.log(xi_s + ":" + xi_ms);
                let xi = (xi_s * 1000) + (xi_ms / 1000);
                let oi = ((datas[j][i].macTimeStamp - datas[j][0].macTimeStamp) * 1000 - xi);
                // let oi = (datas[j][i].framTimeStamp - datas[j][0].framTimeStamp) * 1000 - xi;
                obj[j].push([xi, oi]);
            }
        }
        // console.log(obj);
        this.json(obj);
    }
    async linearAction() {
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