'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
    type: 'mysql',
    adapter: {
        mysql: {
            host: 'localhost',
            port: '',
            database: 'pcap',
            user: 'root',
            password: 'root',
            prefix: '',
            encoding: 'utf8'
        },
        mongo: {

        }
    }
};