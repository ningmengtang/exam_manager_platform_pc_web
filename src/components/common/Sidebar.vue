<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
           
            :background-color="bg_color"
            text-color="#fffff"
            active-text-color="#fffff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index"  >
                        <template slot="title">
                            <i :class="item.icon" style="color: #FFFFFF;"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
import user from '../common/user';
export default {
    data() {
        return {
			bg_color:'',
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'index_student',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-s-order',
                    index: 'manage_student',
                    title: '试卷管理'
                },
                {
                    icon: 'el-icon-user',
                    index: 'personal_student',
                    title: '个人中心'
                }
            ]
        };
    },
	mounted() {
		this.bg_color=user().color;
		this.items=user().items;
	},
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        // bus.$on('collapse', msg => {
        //     this.collapse = msg;
        //     bus.$emit('collapse-content', msg);
        // });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
.sidebar>>>.el-menu-item i{
	color: #FFFFFF;
}
.sidebar >>>.el-menu-item{
	color: #FFFFFF;
	text-align: center;
}
</style>
