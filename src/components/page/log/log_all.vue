<template>
	<div class="box">
		<div class="a-box">
			<div class="message-top">日志操作</div>
			<el-table :data="li" :height="tableHeight" style="width: 100%" element-loading-background="rgba(0, 0, 0, .3)" min-width="12%">
             	<el-table-column  sortable label="ID" prop="id" width="100" min-width="12%"> 
				</el-table-column>
				<el-table-column sortable label="操作人名称" prop="operator_name" width="180"  min-width="12%">
					<template slot-scope="d" >
						<div class="font-i">{{d.row.operator_name}}</div>
					</template>
				</el-table-column>
				<el-table-column  sortable label="操作" prop="type" width="180" min-width="12%" >
				</el-table-column>
				<el-table-column sortable label="操作详细" prop="info"  min-width="240" >
					<template slot-scope="d" >
						<div class="more">{{d.row.info}}</div>
					</template>
				</el-table-column>
				<el-table-column sortable label="操作时间" prop="create_date" width="180"  min-width="12%" >
					<template slot-scope="d" >
						<div class="font-ii">{{d.row.create_date}}</div>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page.sync="currentPage" :page-size="page.pageSize" :total="total">
				</el-pagination>
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
