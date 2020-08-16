export default function usertype() {
	let loginUserType = localStorage.getItem('loginUserType');
	let color, items;
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
			break;
		case 'teacher':
			items.splice(2, 0, {
				icon: 'el-icon-position',
				index: `distribution_${loginUserType}`,
				title: '试卷分发'
			})
			color = '#2BBB61'
			break;
		case 'school':

			break;
		case 'user':

			break;
		case 'admin':

			break;
	}

	return {
		color,
		items
	};
}
