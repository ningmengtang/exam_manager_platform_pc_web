<template>
	<div class="header" >
		<!-- 折叠按钮 -->
		<!-- <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div> -->
		<div class="logo" :style="{ 'background-color': bg_color }" @click="collapseChage">考试综合管理平台</div>
		<div class="header-right">
			<div class="header-user-con">
				<!-- 全屏显示 -->
				<div class="btn-fullscreen" @click="handleFullScreen">
					<el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom"><i class="el-icon-rank"></i></el-tooltip>
				</div>
				<!-- 消息中心 -->
				<!-- <div class="btn-bell">
					<el-tooltip effect="dark" :content="message ? `有${message}条未读消息` : `消息中心`" placement="bottom">
						<router-link to="/login"><i class="el-icon-bell"></i></router-link>
					</el-tooltip>
					<span class="btn-bell-badge" v-if="message"></span>
				</div> -->
				<!-- 用户信息 -->

				<!-- 用户名下拉菜单 -->
				<el-dropdown class="user-name" trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						<!-- <i class="el-icon-caret-bottom"></i> -->
						<div class="user-message">
							<div class="username">{{ username }}</div>
							<div class="user-school">{{school}} {{userType}}</div>
						</div>
					</span>
					<el-dropdown-menu slot="dropdown"><el-dropdown-item divided command="loginout">退出登录</el-dropdown-item></el-dropdown-menu>
				</el-dropdown>
				<!-- 用户头像 -->
				<div class="user-avator"><img src="../../assets/img/img.jpg" /></div>
			</div>
		</div>
	</div>
</template>
<script>
import bus from '../common/bus';
import { userLoginOut } from '@/api/api.js';
import user from '../common/user';
import axios from 'axios';
export default {
	data() {
		return {
			collapse: false,
			fullscreen: false,
			username: '',
			message: 2,
			bg_color: '',
			getColor:'',
			userType:'',
			school:'',
		};
	},
	methods: {
		// 用户名下拉菜单选择事件
		handleCommand(command) {

			var token = localStorage.getItem('loginToken');
			userLoginOut({}).then(res=>{
				console.log(res.data)
				if(res.data.result){
					 localStorage.clear();
					 this.$message.success('登出成功！')
					 this.$router.push('/login');
				}else{
						 localStorage.clear();
					// this.$message.error('登出失败！');
					this.$router.push('/login');
				}
			})
		},
		// 侧边栏折叠
		collapseChage() {
			this.collapse = !this.collapse;
			bus.$emit('collapse', this.collapse);
		},
		// 全屏事件
		handleFullScreen() {
			let element = document.documentElement;
			if (this.fullscreen) {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
			} else {
				if (element.requestFullscreen) {
					element.requestFullscreen();
				} else if (element.webkitRequestFullScreen) {
					element.webkitRequestFullScreen();
				} else if (element.mozRequestFullScreen) {
					element.mozRequestFullScreen();
				} else if (element.msRequestFullscreen) {
					// IE11
					element.msRequestFullscreen();
				}
			}
			this.fullscreen = !this.fullscreen;
		},
		// getColor(){

		// }
	},
	mounted() {
		this.username = localStorage.getItem('userName');
		this.loginUserType = localStorage.getItem('loginUserType')
		if (document.body.clientWidth < 1500) {
			this.collapseChage();
		}
		if(this.loginUserType == 'student'){
			this.getColor ='rgb(25, 174, 251)'
		}
		// switch (this.loginUserType){
		// 	case 'student':
		// 	this.getColor ='rgb(25, 174, 251)'
		// 	this.userType ='学生'
		// 	break;
			
		// }
		this.bg_color = user().color;
		this.userType=user().type;
		this.school=user().school;
	}
};
</script>
<style scoped>
.header {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 70px;
	font-size: 22px;
	color: #fff;
	background-color: #fff;
}
.collapse-btn {
	float: left;
	padding: 0 21px;
	cursor: pointer;
	line-height: 70px;
}
.header .logo {
	float: left;
	width: 250px;
	line-height: 70px;
	text-align: center;
}
.header-right {
	float: right;
	padding-right: 50px;
}
.header-user-con {
	display: flex;
	height: 70px;
	align-items: center;
}
.btn-fullscreen {
	transform: rotate(45deg);
	margin-right: 5px;
	font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
	position: relative;
	width: 30px;
	height: 30px;
	text-align: center;
	border-radius: 15px;
	cursor: pointer;
	/* color: #409eff; */
}
.btn-bell-badge {
	position: absolute;
	right: 0;
	top: -2px;
	width: 8px;
	height: 8px;
	border-radius: 4px;
	background: #f56c6c;
	color: #fff;
}
.btn-bell .el-icon-bell {
	color: #fff;
}
.user-message {
	text-align: right;
	margin-left: 8px;
}
.username {
	font-size: 18px;
	/* color: #333333; */
}
.user-school {
	font-size: 14px;
	color: rgba(166, 166, 166, 1);
}

.user-name {
	margin-left: 10px;
}
.user-avator {
	margin-left: 20px;
}
.user-avator img {
	display: block;
	width: 40px;
	height: 40px;
	border-radius: 50%;
}
.el-dropdown-link {
/* 	color: #fff; */
	cursor: pointer;
}
.el-dropdown-menu__item {
	text-align: center;
}
</style>
