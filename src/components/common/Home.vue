<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content" >
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
               <el-backtop target=".content"></el-backtop>
            </div>
			 
        </div>
		<div class="bottom">
			<div class="bottom-li">
				<span>版权声明</span>
				<span>单位名称</span>
				<span>版权所有</span>
				<span>网站备案号</span>
			</div>
		</div>
		
    </div>
	
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    }
};
</script>
<style>
	.content-box{bottom: 58px}
	.content{background-color: #f5f5f5;position: relative;}
	.tags{border-top: 1px solid rgb(72 48 84 / 8%);}
	.bottom{background-color: #282828;position: fixed;width: 100%;height: 58px;bottom: 0;display: flex;z-index: 9999;color: #999999;align-items: center;font-size: 14px;}
	.bottom-li{margin-left: 320px;display: flex;}
	.bottom-li span:first-child{border: none;padding-left: 0;}
	.bottom-li span{border-left: 1px solid #999999;padding: 0 30px;cursor: pointer;}
	.el-backtop{bottom: 62px!important;}
</style>