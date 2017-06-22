'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
    type: 'mysql',
    adapter: {
        mysql: {
            host: '10.108.41.39',
            port: '',
            database: 'libpcap',
            user: 'root',
            password: 'root',
            prefix: '',
            encoding: 'utf8'
        },
        mongo: {

        }
    }
};