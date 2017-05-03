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
        let count = 10;
        let model = this.model("data");
        let datas = [];
        datas[0] = await model.limit(count).where({ "SSID": "TP-LINK_5DE0" }).select();
        datas[1] = await model.limit(count).where({ "SSID": "gaogao" }).select();
        // datas[2] = await model.limit(count).where({"SSID":"ChinaUnicom"}).select();

        let obj = [];
        for (let j = 0; j < datas.length; j++) {
            obj[j] = [];
            obj[j].push([0, 0]);
            for (let i = 1; i < datas[j].length && i < count; i++) {
                let xi_s = datas[j][i].time_s - datas[j][0].time_s;
                let xi_ms = datas[j][i].time_ms - datas[j][0].time_ms;
                console.log(xi_s + ":" + xi_ms);
                let xi = (xi_s * 1000) + (xi_ms / 1000);
                let oi = ((datas[j][i].macTimeStamp - datas[j][0].macTimeStamp) * 1000 - xi);
                // let oi_s = datas[j][i].framTimeStamp
                obj[j].push([xi, oi]);
            }
        }
        console.log(obj);
        this.json(obj);
    }
    async linearAction() {
        return this.display();
    }

}