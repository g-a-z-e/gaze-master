/**
 * @module baseInfo
 * @author Rube
 * @date 15/10/27
 * @desc 获取基本信息
 */

export function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};