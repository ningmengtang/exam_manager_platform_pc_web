import axios from 'axios';
import {
	get,
	post,
	getCode,
	uploadget,
	uploadpost
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
// 人脸录入
export function faceInsert(data){
	const result = post ('/api/face/insert',data)
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
//教师查询学生
export function PaperAllotByTeacherIdAndPaperId(data){
	const result =get(`/api/teacher/manager/selectStudentWithPaperAllotByTeacherIdAndPaperId?teacher_id=${data}`)
	return result;
}
//教师新增学生
export function teacherAddStudent(data){
	const result =post('/api/student/account/insert',data)
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
// -----------------------班级操作---------------------------
//新增班级
export function ApiClassAdd(data){
	const result =post('/api/classes/add',data)
	return result;
}
//修改班级
export function ApiClassUpdate(data){
	const result =post('/api/classes/update',data)
	return result;
}
//删除班级
export function ApiClassDelete(data){
	const result =get(`/api/classes/delId/${data}`)
	return result;
}
//-------------------------------------------------

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
// 新建订单
export function AdminOrderAdd(data) {
	const result = post('/api/admin/order/insert', data)
	return result;
}
// 新建订单
export function SchoolOrderAdd(data) {
	const result = post('/api/school/order/insert', data)
	return result;
}
// 新建期末考试订单
export function AdminOrderEndOfTermAdd(data) {
	const result = post('/api/school/orderEndOfTerm/insert', data)
	return result;
}

// 新建期末考试订单管理员
export function AdminOrderEndOfTermAddList(data) {
	const result = post('/api/admin/orderEndOfTerm/insert', data)
	return result;
}
// 期末考试订单查询
export function AdminOrderEndOfTermList(data) {
	const result = post('/api/school/orderEndOfTerm/list', data)
	return result;
}


// 上传订单项文件
export function AdminOrderUpload(id, data) {
	const result = post('/api/admin/order/item/upload/' + id, data)
	return result;
}
// 上传订单项文件(期末)
export function AdminOrderEndOfTermUpload(id, data) {
	const result = post('/api/school/orderEndOfTerm/item/upload/' + id, data)
	return result;
}

//学校新增老师
export function schoolAddTeacher(data){
	const result =post('/api/school/teacher/insertAndupdate',data)
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
// 试卷修改
export function CommonExamUpdateTime(data){
	const result =post('/api/common/exam/updateTime',data)
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
	const result = get('/api/common/exam/selectById/' + data+"?d="+new Date()* 1)
	return result;
}
//通过id查看试卷element
export function apiCommonExamSeleElementTestById(data) {
	const result = get('/api/common/exam/selectElementTestById/' + data+"?d="+new Date()* 1)
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
//查询管理员管理的角色全部权限
export function adminSelectRoleadminPower(data){
	const result =post('/api/role/selectListByOptions',data)
	return result;
}
// -----------------------管理员通过角色id查询全部------------------------------------
// "1.专家2.管理员3.学校4.教师5.学生"
export function adminSelectRoleType(data){
	const result =post('/api/admin/user/manage/userSelect',data)
	return result;
}
//-------------------------------------------------------
// -----------------------管理员通过id查询账号------------------------------------
//查询管理员管理通过学生id查询
export function adminSelectRoleStudentId(data){
	const result = get(`/api/admin/user/manage/selectStudentById/${data}`)
	return result;
}
//查询管理员管理通过老师id查询
export function adminSelectRoleTeacherId(data){
	const result = get(`/api/admin/user/manage/selectTeacherById/${data}`)
	return result;
}
//查询管理员管理通过学校id查询学校名称
export function adminSelectRoleSchoolId(data){
	const result = get(`/api/admin/user/manage/selectSchoolById/${data}`)
	return result;
}
//查询管理员管理通过专家id
export function adminSelectRoleUserId(data){
	const result = get(`/api/admin/user/manage/selectUserById/${data}`)
	return result;
}
//查询管理员管理通过管理员id
export function adminSelectRoleAdminId(data){
	const result = get(`/api/admin/user/manage/selectAdminById/${data}`)
	return result;
}
//-------------------------------------------------------
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
// -----------------------管理员重置账号密码------------------------------------
//重置学生密码
export function adminResetPasswordStudent(data){
	const result =get(`/api/pwd/reset/resetStudent/${data}`)
	return result;
}
//重置教师密码
export function adminResetPasswordTeacher(data){
	const result =get(`/api/pwd/reset/resetTeacher/${data}`)
	return result;
}
//重置学校密码
export function adminResetPasswordSchool(data){
	const result =get(`/api/pwd/reset/resetSchool/${data}`)
	return result;
}
//重置专家密码
export function adminResetPasswordUser(data){
	const result =get(`/api/pwd/reset/resetUser/${data}`)
	return result;
}
//重置管理员密码
export function adminResetPasswordAdmin(data){
	const result =get(`/api/pwd/reset/resetAdmin/${data}`)
	return result;
}
//-------------------------------------------------------

// -----------------------管理员删除账号------------------------------------
//管理员删除学生账号
export function adminDeleteStuednt(data){
	const result =get(`/api/admin/user/manage/deleteStudent/${data}`)
	return result;
}
//管理员删除老师账号
export function adminDeleteTeacher(data){
	const result =get(`/api/admin/user/manage/deleteTeacher/${data}`)
	return result;
}
//管理员删除学校账号
export function adminDeleteSchool(data){
	const result =get(`/api/admin/user/manage/deleteSchool/${data}`)
	return result;
}
//管理员删除专家账号
export function adminDeleteUser(data){
	const result =get(`/api/admin/user/manage/deleteUser/${data}`)
	return result;
}
//管理员删除管理员账号
export function adminDeleteAdmin(data){
	const result =get(`/api/admin/user/manage/deleteAdmin/${data}`)
	return result;
}
//-------------------------------------------------------
// -----------------------管理员通过id查询账号------------------------------------
//管理员更新学生账号
export function adminUpdateStudent(data){
	const result=post('/api/admin/user/manage/updateStudent',data)
	return result;
}
//管理员更新老师账号
export function adminUpdateTeacher(data){
	const result=post('/api/admin/user/manage/updateTeacher',data)
	return result;
}
//管理员更新学校账号
export function adminUpdateSchool(data){
	const result=post('/api/admin/user/manage/updateSchool',data)
	return result;
}
//管理员更新专家账号
export function adminUpdateUser(data){
	const result=post('/api/admin/user/manage/updateUser',data)
	return result;
}
//管理员更新管理员账号
export function adminUpdateAdmin(data){
	const result=post('/api/admin/user/manage/updateAdmin',data)
	return result;
}
//-------------------------------------------------------
// 管理员查询日志
export function adminSelectLog(data){
	const result =post('/api/log/selectListByOptions',data)
	return result;
	
}
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
// 修改订单信息
export function apiAdminOrderUpdate(data) {
	const result = post('/api/admin/order/updateById', data)
	return result;
}
// 修改订单信息（期末）
export function apiAdminOrderEndOfTermUpdate(data) {
	const result = post('/api/admin/orderEndOfTerm/updateById', data)
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
export function selectBySchoolIdAndPaperIdAndClassId(pageNum, pageSize, paper_id,class_id,school_id,data) {
	const result = get('/api/student/home/selectBySchoolIdAndPaperIdAndClassId?pageNum=' + pageNum + '&pageSize=' +
		pageSize + '&paper_id=' + paper_id + '&class_id=' +class_id+'&school_id=' +school_id+'&d=' + new Date() * 1, data)
	return result;
}
//查询教师查询班级
export function teacherSelectListByOptions(data){
	const result = post('/api/teacher/teacherClasses/selectListByOptions',data)
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
// 管理员订购-数量管理接口
export function AdminOrderPriceSelect(data){
    const result =post('/api/admin/order/price/selectSelective' ,data)
	return result;
}

// 下载合同
export function AdminOrderGetFile(id,data){
    const result =uploadget('/api/admin/order/getFile/' +id +'?d=' + new Date() * 1 ,data)
	return result;
}
// 上传合同

export function AdminOrderUploadFile(id,data){
    const result =post('/api/admin/order/upload/'+id ,data)
	return result;
}

// 删除订单
export function AdminOrderDel(id,data){
    const result =get('/api/admin/order/delete/' +id +'?d=' + new Date() * 1 ,data)
	return result;
}


// 删除订单(期末)
export function AdminOrderEndOfTermDel(id,data){
    const result =get('/api/school/orderEndOfTerm/delete/' +id +'?d=' + new Date() * 1 ,data)
	return result;
}
// 允许学生下载
export function schoolStudentAllow(id,data){
    const result =get('/api/school/student/allow/' +id +'?d=' + new Date() * 1 ,data)
	return result;
}
// 不允许学生下载
export function schoolStudentUnAllow(id,data){
    const result =get('/api/school/student/un_allow/' +id +'?d=' + new Date() * 1 ,data)
	return result;
}


// 试卷附件下载
export function apicommonExamGetFile(id,data){
    const result =uploadget('/api/common/exam/getFile/' +id +'?d=' + new Date() * 1 ,data)
	return result;
}

// 订购申请详情
export function SchoolOrederDetailsAdd(data){
    const result =post('/api/school/order/details/insert'+'?d=' + new Date() * 1 ,data)
	return result;
}
// 订购申请详情
export function AdminOrederDetailsAdd(data){
    const result =post('/api/admin/order/details/insert'+'?d=' + new Date() * 1 ,data)
	return result;
}


// 订购申请查询
export function SchoolOrederDetailsList(data){
    const result =post('/api/school/order/details/list'+'?d=' + new Date() * 1 ,data)
	return result;
}
// 订购申请取消
export function SchoolOrederDel(id,data){
    const result =get('/api/school/order/delete/'+id+'?d=' + new Date() * 1 ,data)
	return result;
}

// 订购申请查询(期末)
export function SchoolOrderEndOfTermDetailsList(data){
    const result =post('/api/school/orderEndOfTerm/details/list'+'?d=' + new Date() * 1 ,data)
	return result;
} 
// 订购申请详情管理员列表
export function AdminOrderDetailsList(data){
    const result =post('/api/admin/order/details/list'+'?d=' + new Date() * 1 ,data)
	return result;
} 

// 订购申请期末详管理员列表
export function AdminOrderEndOfTermDetailsList(data){
    const result =post('/api/admin/orderEndOfTerm/details/list'+'?d=' + new Date() * 1 ,data)
	return result;
} 

// 订购申请详情管理员（期末）
export function AdminOrederEndOfTermDetailsAdd(data){
    const result =post('/api/admin/orderEndOfTerm/details/insert'+'?d=' + new Date() * 1 ,data)
	return result;
}

// 订购申请详情（期末）
export function SchoolOrederEndOfTermDetailsAdd(data){
    const result =post('/api/school/orderEndOfTerm/details/insert'+'?d=' + new Date() * 1 ,data)
	return result;
}
// 订购申请查询（期末）
export function SchoolOrederEndOfTermDetailsList(data){
    const result =post('/api/school/orderEndOfTerm/details/list'+'?d=' + new Date() * 1 ,data)
	return result;
}

// 附件下载（期末）
export function SchoolOrderEndOfTermGetFile(id,data){
    const result =uploadget('/api/school/orderEndOfTerm/getFile/'+id+'?d=' + new Date() * 1 ,data)
	return result;
}
// 上传合同（期末）
export function SchoolOrderEndOfTermUploadFile(id,data){
    const result =post('/api/school/orderEndOfTerm/upload/'+id ,data)
	return result;
}

// 管理员订单列表
export function AdminOrderEndOfTermListAll(data){
    const result =post('/api/admin/orderEndOfTerm/list' ,data)
	return result;
}

// 管理员订单删除
export function AdminOrderEndOfTermDelAll(id,data){
    const result =get('/api/admin/orderEndOfTerm/delete/'+id+'?d=' + new Date() * 1 ,data)
	return result;
}
// 管理员下载合同（期末）
export function AdminlOrderEndOfTermGetFile(id,data){
    const result =uploadget('/api/admin/orderEndOfTerm/getFile/'+id+'?d=' + new Date() * 1 ,data)
	return result;
}

// 管理员上传合同（期末）
export function AdminOrderEndOfTermUploadFile(id,data){
    const result =post('/api/admin/orderEndOfTerm/upload/'+id ,data)
	return result;
}
// 管理员订单项（期末）
export function AdminOrderEndOfTermItemList(data){
    const result =post('/api/admin/orderEndOfTerm/item/list' ,data)
	return result;
}
// 导入已上传的学生信息
export function AdmindistributionOfTestPaperByOrderEndOfTerm(orderItemId, parperId, data) {
	const result = post('/api/admin/improt/excel/distributionOfTestPaperByOrderEndOfTerm/' + orderItemId +
		'/' + parperId, data)
	return result;
}

// 管路员上传学生信息
export function AdminOrderEndOfTermItemUpload(id,data){
    const result =post('/api/admin/orderEndOfTerm/item/upload/'+id ,data)
	return result;
}


// 试卷管理修改试卷开始结束时间
export function apiCommonExamUpdateTime(data){
    const result =post('/api/common/exam/updateTime' ,data)
	return result;
}


// 管理员用户管理接口
export function apiAdminUseManageSelect(data){
    const result =post('/api/admin/user/manage/userSelect' ,data)
	return result;
}

// 新增教师阅卷任务
export function TeacherTaskAdd(data){
    const result =post('/api/teacher/task/insert' ,data)
	return result;
}
// 教师阅卷任务列表
export function TeacherTaskList(data){
    const result =post('/api/teacher/task/select' ,data)
	return result;
}
// 通过标签查询教师阅卷任务列表
export function TeacherTaskSelectTask(data){
    const result =post('/api/teacher/task/selectTask' ,data)
	return result;
}
// 通过标签查询教师阅卷任务列表详情
export function TeacherQuestionExamList(data){
    const result =post('/api/teacher/question/examManagement' ,data)
	return result;
}
// 组长老师分配题目任务给教师
export function TeacherQuestionAdd(data){
    const result =post('/api/teacher/question/insert' ,data)
	return result;
}
// 老师批阅阅卷
export function TeacherQuestionList(data){
    const result =post('/api/teacher/question/select'+'?d=' + new Date() * 1 ,data)
	return result;
}
// 查询学生试题
export function studentQuestionList(data){
    const result =post('/api/student/question/selectStudentQuestion' ,data)
	return result;
}

// 老师批改答案图片
export function studentQuestionteacherFile(id,is_typical_case,score,data){
    const result =post('/api/student/question/teacherFile?id='+id+'&is_typical_case='+is_typical_case+'&score='+score+'&status=1' ,data)
	return result;
}


// 老师导入答题卡信息
export function teacherImportSheet(paper_id,data){
    const result =post('/api/teacher/importSheet/importSheet/3000'+'/'+paper_id ,data)
	return result;
}
// 查询老师已完成批改的集合
export function getTeacherPaperfinishQuestionArr(paper_id,data){
    const result =get('/api/student/question/getTeacherPaperfinishQuestionArr/'+paper_id ,data)
	return result;
}


// 查询教师答题卡日志
export function teacherAnswerSheetLogList(data){
    const result =post('/api/teacher/answerSheetLog/list' ,data)
	return result;
}

// 查询试卷批阅进度
export function getCorrectRateByPaperId(id,data){
    const result =get('/api/student/question/getCorrectRateByPaperId/'+id+'?d=' + new Date() * 1 ,data)
	return result;
}
// 查询当前试卷已经导入答题卡的总数与已分发的份数
export function getAlreadySheetCountAndDispenseCount(id,data){
    const result =get('/api/student/question/getAlreadySheetCountAndDispenseCount/'+id+'?d=' + new Date() * 1 ,data)
	return result;
}
// 教师修改阅卷操作接口
export function TeacherQuestionUpdate(data){
    const result =post('/api/teacher/question/update' ,data)
	return result;
}
// 修改试卷任务接口

export function TeacherTaskUpdate(data){
    const result =post('/api/teacher/task/update' ,data)
	return result;
}
// 下载导出答题卡详情
export function importSheetGetFiles(sn,data){
    const result =uploadget('/api/student/importSheet/getFiles/'+sn+'?d=' + new Date() * 1,data)
	return result;
}

// 查询当前老师阅卷任务完成进度
export function selectTeacheresCountAndUpdateCount(task_id,data){
    const result =post('/api/teacher/question/selectTeacheresCountAndUpdateCount/'+task_id+'?d=' + new Date() * 1,data)
	return result;
}


// 当前试卷重新分配
export function TeacherQuestionReset(task_id,data){
    const result =get('/api/teacher/question/reset/'+task_id+'?d=' + new Date() * 1,data)
	return result;
}

// 重置上一题数据
export function teacherQuestionResetBefore(data){
    const result =post('/api/teacher/question/resetBefore'+'?d=' + new Date() * 1,data)
	return result;
}


// 教师分配任务
export function teacherTaskSelectByTag(data){
    const result =post('/api/teacher/task/selectByTag'+'?d=' + new Date() * 1,data)
	return result;
}

// 查询试卷信息
export function studentQuestionSelect(data){
    const result =post('/api/student/question/select'+'?d=' + new Date() * 1,data)
	return result;
}

//----------------------------------------------------------------
//二维码操作方法

/**
 * 新增二维码
 */
export function basicQrcInsert(data){
    const result =post('/api/basic/qrc/insert' ,data)
	return result;
}

/**
 * 删除二维码
 */
export function basicQrcDelete(data){
    const result =get('/api/basic/qrc/delete/'+data+'?d=' + new Date() * 1)
	return result;
}

/**
 * 查询二维码，一般不会修改二维码内容，所以直接缓存使用就行
 */
export function basicQrcSelectByPrimaryKey(data){
    const result =get('/api/basic/qrc/selectByPrimaryKey/ '+data)
	return result;
}
// -------学生试题--------------------------
// 学生开始考试
export function studentTestQuestionsStart(data){
    const result =post('/api/student/studentExam/startExam',data)
	return result;
}
// 试卷下载图片
export function studentTestQuestionsdowonLogImg(data){
    const result =post('/api/student/question/getImage',data)
	return result;
}
// 查询试题上传日志
export function studentTestQuestionsLog(data){
    const result =post('/api/student/question/select',data)
	return result;
}
// 学生试题答案新增
export function studentTestQuestionsAdd(data){
    const result =post('/api/student/question/insert',data)
	return result;
}
// 学生上传图片答案
export function studentTestQuestionsImg(id,data){
    const result =post('/api/student/question/studentFile/'+id,data)
	return result;
}
// 学生上传String答案
export function studentTestQuestionsString(id,data){
    const result =get('/api/student/question/studentStr?'+'answer_test='+id+'&id='+data)
	return result;
}
// 查询上传成功后的id
export function studentTestQuestionsSelectId(data){
    const result =post('/api/student/question/select',data)
	return result;
}
// 学生上传答题卡
export function studentTestQuestionsAnswerSheet(denoise,id,data){
    const result =post('/api/student/importSheet/importSheet/'+denoise+'/'+id,data)
	return result;
}
// 学生获取试卷分数
export function studentPerformance(p_id,s_id){
    const result =get('/api/student/question/getStudentScoreByPaperId/'+p_id+'/'+s_id)
	return result;
}
// 读取试题图片
export function studentTestQuestionsUpImg(sn){
    const result =get('/api/student/question/getImageList/'+sn)
	return result;
}
// 删除试题试卷图片
export function studentTestQuestionsDelImg(id){
    const result =get('/api/studentWithTeacher/image/delId/'+id)
	return result;
}

