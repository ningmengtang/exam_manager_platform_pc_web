	import {
		studentIndex
	} from '@/api/api.js'
//改变时
 export function handleSizeChange(val) {
 	this.pageSize = val;
 	studentIndex({
 		"pageNum": this.pageNum,
 		"pageSize": this.pageSize
 	}).then(res => {
 		this.papers = res.data.data.list
 		this.total = res.data.data.total
 		this.currentPage = res.data.data.pageNum
 		this.download = res.data.data.download
 		this.disabled = res.data.data.disabled
 	})
 }
 //条目改变时
export function handleCurrentChange(val){
	this.pageNum = val;
	studentIndex({
		"pageNum":this.pageNum,
		"pageSize":this.pageSize
	}).then(res=>{
		console.log(res)
		this.papers = res.data.data.list
		this.total = res.data.data.total
		this.currentPage = res.data.data.pageNum
		this.download = res.data.data.download
		this.disabled = res.data.data.disabled
	})
}

// 首页信息
export function studentIndexData(data){
	studentIndex({
		"pageNum": this.pageNum,
		"pageSize": this.pageSize
	}).then(res => {
		console.log(res)
		this.papers = res.data.data.list
		this.total = res.data.data.total
		this.currentPage = res.data.data.pageNum
		this.download = res.data.data.download
		this.disabled = res.data.data.disabled
	})
}