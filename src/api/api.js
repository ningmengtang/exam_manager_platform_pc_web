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
export function userLoginOut(data){
	const result = post('/api/user/account/logout', data)
	return result;
}
//学生首页试卷
export function studentIndex(data){
	const result =post('/api/student/home/studentExam',data)
	return result;
}
//试卷标签查询
export function selectTag(data){
	const result =get('/api/tag/selectByChild'+'?d=' + new Date() * 1,data)
	return result;
}
// 学生信息
export function StudentAccountInfo(data){
	const result =post('/api/student/account/selectListByOptions',data)
	return result;
}


// 标签查询
export function ApiTagSelectList(data){
	const result =post('/api/tag/selectSelective',data)
	return result;
}


// 教师查询试卷
export function teacherIndex(data){
	const result =post('/api/teacher/distribute/selectMySelf',data)
	return result;
}
//教师个人查询
export function teacherPersonal(){
	const result =get('/api/teacher/distribute/downloadExam',data)
	return result;
}

// 试卷查询
export function paperWithTag(data){
	const result =post('/api/paperWithTag/selectExamByTag'+'?d=' +new Date() * 1 ,data)
	return result;
}
// 通过id查询标签
export function tagSelectId(id,data){
	const result =get('/api/tag/selectById/'+id +'?d=' + new Date() * 1,data)
	return result;
}


// 学校首页查询试卷
export function SchoolIndex(data){
	const result =post('/api/school/exam/selectMyExamine',data)
	return result;
}

// 试卷标签绑定订单项
export function AdminOrderTagAdd(data){
	const result =post('/api/admin/order/tag/insert',data)
	return result;
}
// 新增订单项
export function AdminOrderItemAdd(data){
	const result =post('/api/admin/order/item/insert',data)
	return result;
}
// 
export function AdminOrderAdd(data){
	const result =post('/api/admin/order/insert',data)
	return result;
}

export function AdminOrderUpload(id,data){
	const result =post('/api/admin/order/item/upload/'+id,data)
	return result;
}
// 通过老师id查询的所有学生
export function StudentSelectByTeacher(id,pageNum,pageSize,data){
	const result =get('/api/student/home/selectByTeacher/'+id+'?pageNum='+ pageNum +'&pageSize='+pageSize+'&d=' + new Date() * 1,data)
	return result;
}
// 查询学生班级
export function selectListByOptions(data){
	const result =post('/api/classes/selectListByOptions',data)
	return result;
}
// 试卷绑定学生
export function studentStudentExamAdd(data){
	const result =post('/api/student/studentExam/add',data)
	return result;
}
//新增试卷
export function apiCommonExamAdd(data){
	const result =post('/api/common/exam/insert',data)
	return result;
}

// 上传试卷附件
export function apiCommonExamUpload(id,data){
	const result =post('/api/common/exam/upload/' + id ,data)
	return result;
}

// 管理员-插入大题
export function apiAdminExamBigQuestionInsert(data){
	const result =post("/api/admin/exam/bigQuestion/insert",data)
	return result;
}

// 管理员-插入大题绑定小题
export function apiAdminExamBigQuestionWithChildrenInsert(data){
	const result =post("/api/admin/exam/bigQuestionWithChildren/withQuestionWithChildren/insert",data)
	return result;
}

// 管理员-插入小题
export function apiAdminExamQuestionInsert(data){
	const result =post("/api/admin/exam/question/insert",data)
	return result;
}

// 管理员-插入答案
export function apiAdminExamQuestionAnwserInsert(data){
	const result =post("/api/admin/exam/question/answer/insert",data)
	return result;
}

//插入答题卡
export function apiAdminExamQuestionAnwserSheetInsert(data){
	const result =post("/api/admin/exam/question/answer/sheet/insert",data)
	return result;
}

// 查询管理员订单项
export function apiAdminOrderItemList(data){
	const result =post('/api/admin/order/item/list' ,data)
	return result;
}
// 查询专家
export function apiPaperWithTagList(data){
	const result =post('/api/paperWithTag/selectUserTag' ,data)
	return result;
}

//专家试卷标签查询所有
export function selectAllUserTag(data){
	const result =post('/api/paperWithTag/selectAllUserTag' ,data)
	return result;
}
// /api/admin/order/item/upload/{item_id}














