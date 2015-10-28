/**
 * @module params
 * @author Rube
 * @date 15/10/27
 * @desc 参数相关操作
 */

export function check(params, query) {
    let flag = true;
    params.forEach(param => {
        if (this.params[param] == null) {
            flag = false;
        }
    });

    query.forEach(param => {
        if (this.query[param] == null) {
            flag = false;
        }
    });
    return flag;
}

export function checkGroupKey(groupKey) {
    if (!(/^[0-9a-zA-Z]+$/).exec(groupKey) || groupKey.length != 32) {
        return false;
    }
    return true;
}

/***
 * 转换对于的参数
 * @param params  eg. {w:1}
 * @param transformTable eg. {'w':'window'}
 * @returns eg. {window:1}
 */
export function transform(params, transformTable) {
    let transformed = {};
    for (let key in params) {
        transformed[transformTable[key]] = params[key];
    }
    return transformed;
}