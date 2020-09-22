<template>
    <div>
    <div class="home_tabber">
        <van-tabbar v-model="active"  :active-color="activeColor" :fixed="false" route>
                <van-tabbar-item :to="type == 'teacher'?'/mobile_teacherIndex':'/mobile_examination_manage'" icon="wap-home">首页</van-tabbar-item>
                <van-tabbar-item to="/mobile/car" icon="shop-o">考试</van-tabbar-item>
                <van-tabbar-item to="/mobile/user" icon="orders-o">练习</van-tabbar-item>
                <van-tabbar-item :to="type == 'teacher'?'/mobile_teacherIndex':'/mobile_personal_student'" icon="manager-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
        <div class="tabbar--placeholder" style="width:100%;height:55px"></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            active: 0,
            activeColor:'#2BBB61',
            type:''
        }
    },
    mounted(){
       this.type = localStorage.getItem('loginUserType')
       console.log(this.type)
    }
}
</script>
<style scoped>
.home_tabber {
    z-index: 999;
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 2px solid #f5f5f5;
}
</style>