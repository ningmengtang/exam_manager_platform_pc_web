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
	const result = post(`/api/${type}/account/login`, data)
	return result;
}
//登出
export function userLoginOut(data) {
	const result = post('/api/user/account/logout', data)
	return result;
}
//学生首页试卷
export function studentIndex(data) {
	const result = post('/api/student/home/studentExam', data)
	return result;
}
//试卷标签查询
export function selectTag(data) {
	const result = get('/api/tag/selectByChild' + '?d=' + new Date() * 1, data)
	return result;
}
// 学生信息
export function StudentAccountInfo(data) {
	const result = post('/api/student/account/selectListByOptions', data)
	return result;
}

export function teacherSelectTag(data) {
	const result = post('/api/paperWithTag/selectTeacherTag', data)
	return result;
}

// 标签查询
export function ApiTagSelectList(data) {
	const result = post('/api/tag/selectSelective', data)
	return result;
}

//教师首页状态查询
export function teacherIndexStatus(data) {
	const result = get('/api/teacher/teacherExam/selectTeacherPapersCountByTeacherIdAndPutInto', data)
	return result;
}
// 教师查询试卷
export function teacherIndex(data) {
	const result = post('/api/teacher/distribute/selectMySelf', data)
	return result;
}
//教师统计
export function teacherSelectCount(data) {
	const result = post('/api/teacher/distribute/selectCount', data)
	return result;
}
//教师个人查询
export function teacherPersonal() {
	const result = get('/api/teacher/distribute/downloadExam', data)
	return result;
}

// 试卷查询
export function paperWithTag(data) {
	const result = post('/api/paperWithTag/selectExamByTag' + '?d=' + new Date() * 1, data)
	return result;
}
// 通过id查询标签
export function tagSelectId(id, data) {
	const result = get('/api/tag/selectById/' + id + '?d=' + new Date() * 1, data)
	return result;
}


// 学校首页查询试卷
export function SchoolIndex(data) {
	const result = post('/api/school/exam/selectMyExamine', data)
	return result;
}
//学校标签查询试卷
export function selectSchoolTag(data) {
	const result = post('/api/paperWithTag/selectSchoolTag', data)
	return result;
}
//教师管理查询老师
export function schoolSelectTeacher(data) {
	const result = post('/api/teacher/account/selectSelective', data)
	return result;
}

// 试卷标签绑定订单项
export function AdminOrderTagAdd(data) {
	const result = post('/api/admin/order/tag/insert', data)
	return result;
}
// 新增订单项
export function AdminOrderItemAdd(data) {
	const result = post('/api/admin/order/item/insert', data)
	return result;
}
// 
export function AdminOrderAdd(data) {
	const result = post('/api/admin/order/insert', data)
	return result;
}

export function AdminOrderUpload(id, data) {
	const result = post('/api/admin/order/item/upload/' + id, data)
	return result;
}
// 通过老师id查询的所有学生
export function StudentSelectByTeacher(id, pageNum, pageSize, data) {
	const result = get('/api/student/home/selectByTeacher/' + id + '?pageNum=' + pageNum + '&pageSize=' + pageSize + '&d=' +
		new Date() * 1, data)
	return result;
}
// 查询学生班级
export function selectListByOptions(data) {
	const result = post('/api/classes/selectListByOptions', data)
	return result;
}
// 试卷绑定学生
export function studentStudentExamAdd(data) {
	const result = post('/api/student/studentExam/add', data)
	return result;
}


// 试卷列表修改
export function apiCommonExamSelectUpdate(data) {
	const result = post('/api/common/exam/update', data)
	return result;
}

//新增试卷
export function apiCommonExamAdd(data) {
	const result = post('/api/common/exam/insert', data)
	return result;
}

// 上传试卷附件
export function apiCommonExamUpload(id, data) {
	const result = post('/api/common/exam/upload/' + id, data)
	return result;
}

// 管理员-插入大题
export function apiAdminExamBigQuestionInsert(data) {
	const result = post("/api/admin/exam/bigQuestion/insert", data)
	return result;
}

// 管理员-插入大题绑定小题
export function apiAdminExamBigQuestionWithChildrenInsert(data) {
	const result = post("/api/admin/exam/bigQuestionWithChildren/withQuestionWithChildren/insert", data)
	return result;
}

// 管理员-插入小题
export function apiAdminExamQuestionInsert(data) {
	const result = post("/api/admin/exam/question/insert", data)
	return result;
}

// 管理员-插入答案
export function apiAdminExamQuestionAnwserInsert(data) {
	const result = post("/api/admin/exam/question/answer/insert", data)
	return result;
}

//插入答题卡
export function apiAdminExamQuestionAnwserSheetInsert(data) {
	const result = post("/api/admin/exam/question/answer/sheet/insert", data)
	return result;
}

//通过id查看试卷标签
export function apiCommonExamSelectById(data) {
	const result = get('/api/common/exam/selectById/' + data)
	return result;
}

//更新试卷
export function apiAdminExamUpdate(data) {
	const result = post("/api/common/exam/update", data)
	return result;
}

// 查询管理员订单项
export function apiAdminOrderItemList(data) {
	const result = post('/api/admin/order/item/list', data)
	return result;
}
//查询管理员管理专家角色查询
export function adminSelectRoleUser(data) {
	const result = post('/api/admin/user/manage/selectListByOptions', data)
	return result;
}
//查询管理员管理管理员角色查询
export function adminSelectRoleAdmin(data){
	const result = post('/api/admin/account/selectSelective',data)
    return result;	
}
//查询管理员管理通过学校id查询学校名称
export function adminSelectRoleSchoolId(data){
	const result = get(`/api/admin/user/manage/selectSchoolById/${data}`)
	return result;
}
// -----------------------管理员新增账号------------------------------------
//管理员新增学生账号
export function adminAddStuednt(data){
	const result =post('/api/admin/user/manage/addStudent',data)
	return result;
}
//管理员新增老师账号
export function adminAddTeacher(data){
	const result =post('/api/admin/user/manage/addTeacher',data)
	return result;
}
//管理员新增学校账号
export function adminAddSchool(data){
	const result =post('/api/admin/user/manage/insertSchool',data)
	return result;
}
//管理员新增专家账号
export function adminAddUser(data){
	const result =post('/api/admin/user/manage/addUser',data)
	return result;
}
//管理员新增管理员账号
export function adminAddAdmin(data){
	const result =post('/api/admin/user/manage/addAdmin',data)
	return result;
}
//-------------------------------------------------------
// -----------------------管理员删除账号------------------------------------
//-------------------------------------------------------

// 查询专家
export function apiPaperWithTagList(data) {
	const result = post('/api/paperWithTag/selectUserTag', data)
	return result;
}

//专家试卷标签查询所有
export function selectAllUserTag(data) {
	const result = post('/api/paperWithTag/selectAllUserTag', data)
	return result;
}
// 管理员订单列表
export function apiAdminOrderList(data) {
	const result = post('/api/admin/order/list', data)
	return result;
}

// 导入已上传的学生信息
export function improtSchoolAndTeachersAndStudentsInfoByAlredyUpload(orderItemId, parperId, data) {
	const result = post('/api/admin/improt/excel/improtSchoolAndTeachersAndStudentsInfoByAlredyUpload/' + orderItemId +
		'/' + parperId, data)
	return result;
}
export function apiAdminOrderUpdate(data) {
	const result = post('/api/admin/order/updateById', data)
	return result;
}

// /api/admin/order/item/upload/{item_id}

//根据条件查询试卷列表
export function apiCommonExamSelectListByOptions(data) {
	const result = post('/api/common/exam/selectListByOptions/', data)
	return result;
}

/**
 * 通过id查询教师信息
 * @param {*} id 
 */
export function apiTeacherAccountSelectByPrimaryKey(id) {
	const result = get('/api/teacher/account/selectByPrimaryKey/' + id)
	return result;
}

/**
 * 更新教师信息
 */
export function apiTeacherAccountUpdate(data) {
	const result = post('/api/teacher/account/update', data)
	return result;
}

/**
 * 获取手机验证码
 */
export function apiSendSmsCode(phone) {
	const result = get('/api/send/smsCode?sendNum=' + phone)
	return result;
}


/**
 * 修改教师密码
 */
export function apiTeacherAccountUpdatePwd(data) {
	const result = post('/api/teacher/account/updatePwd', data)
	return result;
}

/**
 * 修改教师手机
 */
export function apiTeacherAccountUpdateMobile(data) {
	const result = post('/api/teacher/account/updateMobile', data)
	return result;
}

/**
 * 更新管理员信息
 */
export function apiAdminAccountUpdate(data) {
	const result = post('/api/admin/account/update', data)
	return result;
}

/**
 * 通过id查询管理员信息
 * @param {*} id 
 */
export function apiAdminAccountSelect(id) {
	const result = post('/api/admin/account/select/' + id)
	return result;
}

/**
 * 修改管理员密码
 */
export function apiAdminAccountUpdatePwd(data) {
	const result = post('/api/admin/account/updatePwd', data)
	return result;
}

/**
 * 修改管理员手机
 */
export function apiAdminAccountUpdateMobile(data) {
	const result = post('/api/admin/account/updateMobile', data)
	return result;
}

//-------------------------------------------------------------

/**
 * 更新用户信息
 */
export function apiUserAccountUpdate(data) {
	const result = post('/api/user/account/update', data)
	return result;
}

/**
 * 通过id查询用户信息
 * @param {*} id 
 */
export function apiUserAccountSelectById(id) {
	const result = post('/api/user/account/selectById/' + id)
	return result;
}

/**
 * 修改用户密码
 */
export function apiUserAccountUpdatePwd(data) {
	const result = post('/api/user/account/updatePwd', data)
	return result;
}

/**
 * 修改用户手机
 */
export function apiUserAccountUpdateMobile(data) {
	const result = post('/api/user/account/updateMobile', data)
	return result;
}

//--------------------------------------------------------------

/**
 * 更新学生信息
 */
export function apiStudentAccountUpdate(data) {
	const result = post('/api/student/account/update', data)
	return result;
}

/**
 * 通过id查询学生信息
 * @param {*} id 
 */
export function apiStudentAccountSelectById(id) {
	const result = get('/api/student/account/selectById/' + id)
	return result;
}

/**
 * 修改学生密码
 */
export function apiStudentAccountUpdatePwd(data) {
	const result = post('/api/student/account/updatePwd', data)
	return result;
}

/**
 * 修改学生手机
 */
export function apiStudentAccountUpdateMobile(data) {
	const result = post('/api/student/account/updateMobile', data)
	return result;
}

/**
 * 绑定学生手机
 * @param {*} data 
 */
export function apiStudentAccountBindMobile(data) {
	const result = post('/api/student/account/bindMobile', data)
	return result;
}


//----------------------------------------------------------------

/**
 * 更新学校信息
 */
export function apiSchoolAccountUpdate(data) {
	const result = post('/api/school/account/update', data)
	return result;
}

/**
 * 通过id查询学校信息
 * @param {*} id 
 */
export function apiSchoolAccountSelectByPrimaryKey(id) {
	const result = get('/api/school/account/selectByPrimaryKey/' + id)
	return result;
}

/**
 * 修改学校密码
 */
export function apiSchoolAccountUpdatePwd(data) {
	const result = post('/api/school/account/updatePwd', data)
	return result;
}

// 学校账号
export function apiSchoolAccountSelectByOptions(data) {
	const result = post('/api/school/account/selectByOptions', data)
	return result;
}
/**
 * 修改学校手机
 */
export function apiSchoolAccountUpdateMobile(data) {
	const result = post('/api/school/account/updateMobile', data)
	return result;
}


// 试卷查询列表
export function apiCommonExamSelectList(data) {
	const result = post('/api/common/exam/selectListByOptions', data)
	return result;
}


// 通过标签查询所有试卷
export function ExamSelectPapersWithTagsForAllPapers(data) {
	const result = post('/api/common/exam/selectPapersWithTagsForAllPapers', data)
	return result;
}


// 多条件查询学生信息
export function selectBySchoolIdAndPaperIdAndClassId(pageNum, pageSize, id, data) {
	const result = get('/api/student/home/selectBySchoolIdAndPaperIdAndClassId?pageNum=' + pageNum + '&pageSize=' +
		pageSize + '&paper_id=' + id + '&d=' + new Date() * 1, data)
	return result;
}

// 学校列表
export function ApiSchoolAccountSelectByOptions(data) {
	const result = post('/api/school/account/selectByOptions', data)
	return result;
}

// 班级列表
export function ApiClassSelectListByOptions(data) {
	const result = post('/api/classes/selectListByOptions', data)
	return result;
}
// 通过教师id与试卷ID查询固定或不固定班级的学生信息
export function selectStudentWithPaperAllotByTeacherIdAndPaperId(classId, paperId, teacherId, data) {
	const result = get('/api/teacher/manager/selectStudentWithPaperAllotByTeacherIdAndPaperId?class_id=' + classId +
		'&paper_id=' + paperId + '&teacher_id=' + teacherId + '&d=' + new Date() * 1, data)
	return result;
}
