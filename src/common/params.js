/**
 * @module params
 * @author Rube
 * @date 15/10/27
 * @desc 参数相关操作
 */

export function check(params, query) {
    let flag = false;
    params.forEach(param => {
        if (this.params[param] == null) {
            this.body = RESPONSE_FALSE;
            this.status = 500;
            flag = true;
        }
    });

    query.forEach(param => {
        if (this.query[param] == null) {
            this.body = RESPONSE_FALSE;
            this.status = 500;
            flag = true;
        }
    });
    return flag;
}
