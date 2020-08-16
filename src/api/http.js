// const local = 'http://10.0.0.13:8085'
import axios from 'axios'

export function get(url, params) {

	return new Promise((resolve, reject) => {
		axios({
			url: url,
			method: 'GET',
			data: params,
			contentType: "application/json; charset=utf-8",
		}).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
			
		})
	})
}
export function post(url, data,header) {
	return new Promise((resolve, reject) => {
		axios({
			url: url,
			method: 'POST',
			data: data,
			contentType: "application/json; charset=utf-8",
			headers: header
		}).then(res => {
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
// var getUniqueKey = function () {
//     //console.log(sessionStorage.getItem('uniqueKey'))
//     if (sessionStorage.getItem('uniqueKey') && (new Date().getTime() - Number(sessionStorage.getItem('uniqueKeyTime')) < 600000)) {
//         return sessionStorage.getItem('uniqueKey')
//     } else {
//         sessionStorage.setItem('uniqueKeyTime', new Date().getTime())
//         sessionStorage.setItem('uniqueKey', new Date().getTime() + String(Math.floor(Math.random() * (999999999 - 100000000 + 1) + 100000000)))
//         return sessionStorage.getItem('uniqueKey')
//     }
// }
