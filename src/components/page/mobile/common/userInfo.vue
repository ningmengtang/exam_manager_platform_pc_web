<template>
<div style="height:100%;background:#f5f5f5">
    <van-nav-bar
        title="我的"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <div class="userInfo">
        <div class="content_title">
            
            <div class="info">
                <van-icon class="icon" name="manager" />
                <h3>{{userInfo.name}}</h3>
                <van-button type="primary" style="margin-top:8px" class="button">教师</van-button>
                <p class="schoolName">{{userInfo.schoolName}}</p>
                <p class="className">{{userInfo.list_cla[0].name}}</p>
                <p>{{userInfo.mobile}}</p>
                <p>{{userInfo.email}}</p>
            </div>
        </div>
        <div style="margin-top:160px;" class="cell">
            <van-cell title="个人信息"  class="icon_info" value="已完善" icon="friends" />
            <van-cell title="手机绑定"  class="icon_tel"  value="已绑定" icon="graphic" />
            <van-cell title="修改密码"  class="icon_pwd"  icon="lock"  is-link />
        </div>
        <div class="info_loginout">
            <p >电脑访问考能网页版，体验所有功能 </p>
            <van-button type="warning" class="button" @click="loginOut">退出登录</van-button>
        </div>
       
    </div>
</div>
</template>
<script>
import {
    schoolSelectTeacher,
    userLoginOut
} from '@/api/api.js'
import { Toast } from 'vant';
export default {
    data(){
        return{
            userInfo:{
                "name":'',
                "list_cla":[{
                  "name":'xxx'
                }] 
            }
        }
    },
    methods:{
        onClickLeft(){
            this.$router.push('/mobile_teacherIndex')
        },
        loginOut(){
            
            // var token = localStorage.getItem('loginToken');
			userLoginOut({}).then(res => {
				// console.log(res.data)
				if (res.data.result) {
                    Toast.success('登出成功');
					localStorage.clear()
					this.$router.push('/login');
				} else {
                    localStorage.clear()
                    Toast.fail('登出失败');
				}
			})
        }
    },
    mounted(){
        schoolSelectTeacher({
            "id":localStorage.getItem('userID')
        }).then(res=>{
            this.userInfo = res.data.data.list[0]
            console.log(this.userInfo)
        })
    }
}
</script>
<style scoped>
.info_loginout{
    margin-top: 10px;
}
.info_loginout p{
    text-align: center;
    font-size: 16px;
    color: #343434;
    margin-bottom: 10px;
}
.info_loginout .button{
    width: 80%;
    margin:10px 10%;
}
.info_loginout .van-button--warning{
    background-color: #E2643C;
    border: 1px solid #E2643C;
    border-radius: 10px;
}
.content_title{
	background-color:#2BBB61 ;
    color: #FFFFFF;
    height: 180px;
	text-align: center;
	width: 100%;
    border-radius:100% 100% 100% 100% / 0% 0% 25% 25%;	
    position: relative;
}
.content_title .icon{
    background: #f5f5f5;
    border-radius: 80px;
    width: 80px;
    height: 80px;
    position: absolute;
    font-size: 54px;
    line-height: 80px;
    bottom: 210px;
    left: 50%;
    margin-left: -40px;
    color: #999;
}
.content_title .info{
    width: 90%;
    background-color: #fff;
    height: 236px;
    position: absolute;
    top: 65px;
    margin: 0px 5%; 
    border-radius: 10px;
    text-align: center;
    padding: 34px 10px 10px 10px;
    margin-top: 20px;
}
.content_title .info p{
    color: #9A9A9A;
    font-size: 18px;
    padding-bottom: 8px;
   
}
.content_title .info .schoolName{
    font-weight: 500;
    color: #343434;

}
.content_title .info .className{
    color: #2BBB61;
}

.content_title .info h3{
    color:#343434 ;
    font-weight: 600;
}
.content_title .info .button{
    width: 118px;
    height: 44px;
    border-radius: 4px;
    background: #2BBB61;
    
}

.userInfo .cell .van-cell {
    line-height: 40px;
    font-size: 16px;

}
.userInfo .cell .van-cell__left-icon{
    line-height: 40px;
    font-size: 25px;
}
.userInfo .cell .icon_info .van-cell__left-icon{
    color: rgb(23, 119, 248);
}
.userInfo .cell .icon_tel .van-cell__left-icon{
     color: rgb(43, 187, 93);
}
.userInfo .cell .icon_pwd .van-cell__left-icon{
     color:rgb(244, 185 , 43);
}
.userInfo .cell  .van-cell__title{
    padding-left: 10px;
}
.userInfo .cell .van-cell__right-icon{
    line-height: 40px;
}
/* .content_title .img{
    width: 120px;
    height: 120px;
    background: #2BBB61;
    display: inline-block;
    border-radius: 120px;
} */
</style>