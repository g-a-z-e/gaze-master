/**
 * @module
 * @author Rube
 * @date 15/10/26
 * @desc
 */
export function checkStatus(response) {
    if (response.url.indexOf('login') != -1) {
        window.location = '/login';
    }
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error
    }
}

export function parseJSON(response) {
    return response.json()
}