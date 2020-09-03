<template>
	<div class="box">
		<div class="a-box">
			<div class="message-top">日志操作</div>
			<div class="search">
				<el-select v-model="select" slot="prepend" placeholder="请选择">
				  <el-option label="订单号" value="1"></el-option>
				  <el-option label="学校名称" value="2"></el-option>
				</el-select>
				<el-input placeholder="请输入内容" v-model="search_input" >
				  </el-input>
				  <el-button class="el-icon-search" circle></el-button>
				</div>
			</div>
			
		</div>
	</div>
</template>
<script>
	import user from '../../common/user';
	import {
		adminSelectLog
	} from '@/api/api.js'
	export default {
		data() {
			return {
				color: '',
				tableHeight: 680,
				li: [],
				currentPage:1,
				page:{'pageNum':1,'pageSize':15},
				total:0,
				select:'订单号',
				search_input:'',
				
			};
		},
		methods: {
			// 分页
			handleCurrentChange(val){
				this.page.pageNum=val
				this.log();
			},
			handleSizeChange(){
				
			},
			//查询管理员日志
			log() {
				adminSelectLog(this.page).then(res => {
					this.total=res.data.data.total
					this.page.pageNum=res.data.data.pageNum
					this.page.pageSize=res.data.data.pageSize
					this.li=res.data.data.list
				})
			}
		},
		mounted() {
			this.color = user().color;
			this.log();
		}
	};
</script>

<style scoped src="../../../assets/css/log.css"></style>
