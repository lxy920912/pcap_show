'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '',
      database: 'pcap',
      user: 'root',
      password: 'root',
      prefix: 'pcap_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};