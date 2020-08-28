export default function usertype() {
    let loginUserType = localStorage.getItem('loginUserType');
    let school = localStorage.getItem('userSchoolName');
    let loginUserRoleList = JSON.parse(localStorage.getItem('roleList'))
    let color, items, type;
    items = [{
            icon: 'el-icon-lx-home',
            index: `index_${loginUserType}`,
            title: '系统首页'
        },
        {
            icon: 'el-icon-s-order',
            index: `manage_${loginUserType}`,
            title: '试卷管理'
        },
        {
            icon: 'el-icon-user',
            index: `personal_${loginUserType}`,
            title: '个人中心'
        }
    ];
    switch (loginUserType) {
        case 'student':
            color = '#19AEFB'
            type = '学生'
            break;
        case 'teacher':
            items.splice(2, 0, {
                icon: 'el-icon-position',
                index: `distribution_${loginUserType}`,
                title: '试卷分发'
            }, {
                icon: 'el-icon-s-custom',
                index: `manage_${loginUserType}_subordinate`,
                title: '学生管理'
            })
            color = '#2BBB61'
            type = '教师'
            break;
        case 'school':
            items.splice(2, 0, {
                icon: 'el-icon-sell',
                index: `order_${loginUserType}`,
                title: '订购管理'
            }, {
                icon: 'el-icon-s-custom',
                index: `manage_${loginUserType}_subordinate`,
                title: '用户管理'
			}, {
				icon: 'el-icon-thirdxuexiao_banji',
				index: `manage_${loginUserType}_subordinate`,
				title: '班级管理'
			}
			// {
            //     icon: 'el-icon-data-line',
            //     index: `distribution_${loginUserType}`,
            //     title: '分配试卷'
			// }
			)
            color = '#2BBB61'
            type = '学校负责人'
            break;
        case 'user':
            items.splice(2, 0, {
                icon: 'el-icon-position',
                index: `examine_${loginUserType}`,
                title: '审核管理'
            })
            color = '#2BBB61'
            type = '题库专家'
            break;
        case 'admin':
            // items.splice(2, 0, {
            // 	icon: 'el-icon-sell',
            // 	index: `order_${loginUserType}`,
            // 	title: '订购管理'
            // }, {
            // 	icon: 'el-icon-position',
            // 	index: `distribution_${loginUserType}`,
            // 	title: '试卷分发'
            // }, 
            // {
            // 	icon: 'el-icon-position',
            // 	index: `examine_${loginUserType}`,
            // 	title: '审核管理'
            // },
            // {
            // 	icon: 'el-icon-s-custom',
            // 	index: `user_control`,
            // 	title: '用户管理'
            // }
            // )
            color = '#2BBB61'
            type = '平台管理员'
            school = '考试综合管理平台'
            break;
    }
    if (loginUserRoleList) {
        // let adminItem = items
        for (var i = 0; i < loginUserRoleList.length; i++) {
            if (loginUserRoleList[i].roleName == '试卷订购管理员') {
                items.push({
                        icon: 'el-icon-sell',
                        index: `order_${loginUserType}`,
                        title: '订购管理'
                    }

                )

            } else if (loginUserRoleList[i].roleName == '试卷题库管理员') {
                items.push({
                    icon: 'el-icon-position',
                    index: `examine_${loginUserType}`,
                    title: '审核管理'
                }, {
                    icon: 'el-icon-position',
                    index: `distribution_${loginUserType}`,
                    title: '试卷分发'
                })

            } else if (loginUserRoleList[i].roleName == '超级管理员') {
                items.push({
                    icon: 'el-icon-s-custom',
                    index: `user_control`,
                    title: '用户管理'
                })
            }
        }
    }



    return {
        color,
        items,
        type,
        school
    };
}