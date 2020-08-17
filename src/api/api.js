import axios from 'axios';
import {
	get,
	post,
	getCode
} from './http.js'
//登录验证码
export function userCode(data) {
	const result = getCode('/api/user/account/vcodeimg', data)
	return result;
}
//登录信息
export function userLogin(type, data) {
	// const result = post(url, data) 
	const result =post(`/api/${type}/account/login`,data)
	return result;
}
//登出
export function userLoginOut(data,header){
	const result = post('/api/user/account/logout', data,header)
	return result;
}
//学生首页
export function studentIndex(data){
	const result =post('/api/student/exam/studentExam',data)
	return result;
}
//试卷标签查询
export function selectTag(data){
	const result =get('/api/tag/selectByChild',data)
	return result;
}
