/**
 * @module webIn
 * @author Rube
 * @date 15/10/27
 * @desc web信息入口
 */
const fs = require('fs');
const config = require('./config');
const {findGroupDataByGroupKey} = require('../../proxy/group');
const sdk = fs.readFileSync(config.sdkPath, 'utf-8');
const {check, checkGroupKey, transform} = require('../../common/params');
import {RESPONSE_FALSE, RESPONSE_TRUE} from '../../common/response';

let pattern = /^(?:(\w+):\/\/)?(?:(\w+):?(\w+)?@)?([^:\/\?#]+)(?::(\d+))?(\/[^\?#]+)?(?:\?([^#]+))?(?:#(\w+))?/;
let paramsListGIF = ['w'];
let paramsTableGIF = {
    'window': 'w'
};
let paramsList = [];
let paramsTable = {};

export const init = (router)=> {
    //get script
    router.get('/i/web.js', function *(next) {
        let header = this.request.header;
        if (check.call(this, [], ['s']) && checkGroupKey.call(this, this.query.s) && header['referer'] && header['host']) {

            let groupKey = this.query.s;
            let group = yield findGroupDataByGroupKey(groupKey);

            let refererAddress = pattern.exec(header['referer'])[4];
            let serverAddress = group.groupServerAddress;

            if (serverAddress === refererAddress) {
                this.body = sdk;
            } else {
                this.body = '';
            }
        } else {
            this.body = '';
        }
    });

    //get browser info , ip and more
    router.get('/i/web.gif', function *(next) {
        if (check.call(this, [], paramsListGIF)) {
            let params = transform(this.query, paramsTableGIF);
        } else {
            this.body = '';
        }
    });

    //get log and more
    router.get('i/web', function *(next) {
        if (check.call(this, [], paramsList)) {
            let params = transform(this.query, paramsTable);
        } else {
            this.body = '';
        }
    });
};