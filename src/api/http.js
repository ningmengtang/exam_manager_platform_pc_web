// const local = 'http://10.0.0.13:8085'
import axios from 'axios'
import { Message } from 'element-ui'
export function get(url, params) {
    var Base64 = require('js-base64').Base64
    var loginToken = localStorage.getItem('loginToken');
    var authStr = ":" + loginToken;
    var authStr_hex = 'Basic ' + Base64.encode(authStr);
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: 'GET',
            data: params,
            contentType: "application/json; charset=utf-8",
            headers: {
                "uniqueKey": getUniqueKey(),
                "Authorization": loginToken == null ? undefined : authStr_hex
            }
        }).then(res => {

            // if (res.data.stateCode == 300033) {
               

            //     Message({
            //         message: '账号已登录，请重新登录！',
            //         type: 'warning'
            //     });
            //     setTimeout(() => {
            //         localStorage.clear()
            //         window.location.href = '/login'
            //     }, 500)

            // }else if(res.data.stateCode == 300055){
            //     Message({
            //         message: '用户已登录,请重新登录。',
            //         type: 'warning'
            //     });
            //     setTimeout(() => {
            //         localStorage.clear()
            //         window.location.href = '/login'
            //     }, 500)
            // }
            resolve(res)
        }).catch(err => {
            reject(err)

        })
    })
}
export function uploadget(url, params) {
    var Base64 = require('js-base64').Base64
    var loginToken = localStorage.getItem('loginToken');
    var authStr = ":" + loginToken;
    var authStr_hex = 'Basic ' + Base64.encode(authStr);
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: 'GET',
            data: params,
            responseType: 'blob',
            contentType: "application/json; charset=utf-8",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded ',
                "uniqueKey": getUniqueKey(),
                "Authorization": loginToken == null ? undefined : authStr_hex
            }
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)

        })
    })
}
export function post(url, data) {
    var Base64 = require('js-base64').Base64
    var loginToken = localStorage.getItem('loginToken')
    var authStr = ":" + loginToken;
    var authStr_hex = 'Basic ' + Base64.encode(authStr);
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: 'POST',
            data: data,
            contentType: "application/json; charset=utf-8",
            headers: {
                "uniqueKey": getUniqueKey(),
                "Authorization": loginToken == null ? undefined : authStr_hex
            }
        }).then(res => {
            // if (res.data.stateCode == 300033) {
            //     Message({
            //         message: '登录异常！',
            //         type: 'warning'
            //     });
            //     setTimeout(() => {
            //         localStorage.clear()
            //         window.location.href = '/login'
            //     }, 500)
            // }else if(res.data.stateCode == 300055){
            //     Message({
            //         message: '用户已登录,请重新登录。',
            //         type: 'warning'
            //     });
            //     setTimeout(() => {
            //         localStorage.clear()
            //         window.location.href = '/login'
            //     }, 500)
            // }
            resolve(res)
        }).catch(err => {
            console.log(err)
            reject(err)
        })
    })
}
export function getCode(url, params) {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: 'GET',
            data: params,
            contentType: "application/json; charset=utf-8",
            responseType: "blob"
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
var getUniqueKey = function() {
    //console.log(sessionStorage.getItem('uniqueKey'))
    if (sessionStorage.getItem('uniqueKey') && (new Date().getTime() - Number(sessionStorage.getItem('uniqueKeyTime')) < 600000)) {
        return sessionStorage.getItem('uniqueKey')
    } else {
        sessionStorage.setItem('uniqueKeyTime', new Date().getTime())
        sessionStorage.setItem('uniqueKey', new Date().getTime() + String(Math.floor(Math.random() * (999999999 - 100000000 + 1) + 100000000)))
        return sessionStorage.getItem('uniqueKey')
    }
}