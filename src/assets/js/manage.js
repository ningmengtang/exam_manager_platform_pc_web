import {ApiTagSelectList} from '@/api/api.js'
export function getValue(val) {
	console.log(val)

}
export function handleSizeChange(val) {
	console.log(`每页 ${val} 条`);
}
export function handleCurrentChange(val) {
	console.log(`当前页: ${val}`);
}
export function handleClose(done) {
	this.$confirm('确认关闭？')
		.then(_ => {
			done();
		})
		.catch(_ => {});
}
export function getQuery() {

	let obj = ''

	if (this.disStatus != 0 && this.disStatus) {
		obj = obj + 'id=' + this.disStatus + '&'
	}
	if (this.elementTest != 0 && this.elementTest) {
		obj = obj + 'id=' + this.elementTest + '&'
	}
	if (this.purpose != 0 && this.purpose) {
		obj = obj + 'id=' + this.purpose + '&'
	}
	if (this.subject != 0 && this.subject) {
		obj = obj + 'id=' + this.subject + '&'
	}
	if (this.grade != 0 && this.grade) {
		obj = obj + 'id=' + this.grade + '&'
	}
	if (this.version != 0 && this.version) {
		obj = obj + 'id=' + this.version + '&'
	}
	if (this.years != 0 && this.years) {
		obj = obj + 'id=' + this.years + '&'
	}

	paperWithTag(obj, {}).then(res => {
		if (res.data.data) {
			this.paperList = res.data.data
		} else {
			this.paperList = []
		}
	})
	// console.log(obj)
}
export function TagTypePromise(tagType,index){
				return new Promise((resolve,reject)=>{
					ApiTagSelectList({
						"pageSize":999,
						"pageNum":1,
						"parentId":tagType.id
					}).then(res=>{
						let all = [{
							"id":0,
							"sn":0,
							"text":'全部'
						}]
						let children = all.concat(res.data.data.list)
						switch(tagType.text){
							case '分发状态':
								this.DisStatusList = children
							break;
							case '年份':
								this.YearsList = children
							break;
							case '教材版本':
								this.VersionList = children
							break;
							case '学习科目':
								this.SubjectList = children
							break;
							case '学习年级':
								this.GradeList = children
							break;
							case '单元测试':
								this.ElementTextList = children
							break;
							case '试卷用途':
								this.PurposeList= children
							break;
						}
						// console.log(this.SubjectList)
						
						resolve(res)
					})
				})
			}



