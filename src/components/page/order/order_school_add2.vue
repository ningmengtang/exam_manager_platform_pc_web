<template>
	<div class="box">
		<!-- 左边 -->
		<div class="left-box">
			<div class="box-card">
				<div class="card-top">
					<img src="../../../assets/img/img.jpg" class="user-img" />
					<div class="user-top">
						<div class="username">
							<div class="name">{{userName}}</div>
							<div class="user-id">ID:{{userID}}</div>
							<div class="identity" :style="{'background-color':color}">学校负责人</div>
						
						</div>
					</div>
				</div>
			</div>
			<el-form ref="form" :model="form" label-width="80px" class="form">
				<el-form-item label="订购总数">
					<el-input v-model="Allsubscriptions" readonly>
						<template slot="append">份</template>
					</el-input>
				</el-form-item>
				<el-form-item label="订购类型">
					<el-input v-model="orderList.length" readonly>
						<template slot="append">种</template>
					</el-input>
				</el-form-item>
				<el-form-item label="联系电话">
					<el-input v-model="form.contact_phone"></el-input>
				</el-form-item>
				<el-form-item label="收货人员">
					<el-input v-model="form.contacts"></el-input>
				</el-form-item>
				<el-form-item label="收货地址">
					<el-input v-model="form.contact_address"></el-input>
				</el-form-item>
			</el-form>
			<div class="buttom-box">
				<el-button class="buttom-true" :style="{'background-color':color}" @click="placeOrder">确认订购</el-button>
				<el-button class="buttom-false" @click="black()">取消订购</el-button>
			</div>
		</div>
		<!-- 右边 -->
		<div class="right-box">
			<div class="message-top" :style="{'border-color':color}">订单详细
				<el-button type="success" class="buttom" @click="addOrderItem " :style="{'background-color': color, 'border-color': color }"><span
					 class="el-icon-plus"></span>
					编辑订购单</el-button>
			</div>

			<!--订单列表 -->
			<div class="upload-papers">
				<div class="li-box" v-for="(item,i) in orderList ">
					<div class="ranking">{{i+1}}</div>
					<div class="papers-box">
						<div class="p-title">{{item.name}}
							<div class="label-box">
								<div class="label" v-for="d in item.childrenName ">
									{{d}}
								</div>
							</div>
						</div>
						<div class="p-particular">
							<div>数量{{item.updateNum}}份</div>
							<!-- <div>单价{{item.price}}元</div>
							<div>总价{{item.total_price }}元</div> -->
							<!-- <div class="fault" @click="upload(i)"  v-if="!item.uploadFile">学生信息未导入，点击重导</div> -->
						</div>
					</div>
					<!-- <i class="close el-icon-close" :style="{'color':color}"></i> -->
				</div>
			</div>


			<div class="bottom-box">
				<!-- <div class="discount">
					<div class="i">总价：</div>
					<div class="ii">{{Alltotalmoney}}</div>
				</div> -->
				<div class="last">
					<div class="remind">不同年级、不同科目价格不同，购买的数量越多，价格越优惠</div>
					<div class="discount">
						<div class="i">总价(元)：</div>
						<div class="ii">{{Alltotalmoney}}</div>
					</div>
				</div>
                <!-- <div class="last">

                </div> -->
			</div>
		</div>
		<!-- 操作1 -->
		<el-dialog title="添加订购" :visible.sync="dialogTableVisible" width="1600px">
            <div class="dialogTop" >
                <span > 年份：</span>
                <el-select v-model="paper.year" placeholder="请选择年份" @change="changeYear">
                    <el-option
                        v-for="item in tagList.years"
                        :label="item.text"
                        :value="item.id">
                    </el-option>
                </el-select>
                <span style="margin-left:8px">
                    学期：
                </span>
                <el-select v-model="paper.test" placeholder="请选择单元" @change="changeTest">
                    <el-option
                        v-for="item in tagList.semester"
                        :label="item.text"
                        :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <!-- <el-row :gutter="20">
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        年份
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-select v-model="paper.year" placeholder="请选择年份">
                            <el-option
                                v-for="item in tagList.years"
                                :label="item.text"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        单元
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-select v-model="paper.test" placeholder="请选择单元">
                            <el-option
                                v-for="item in tagList.element_test"
                                :label="item.text"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row> -->
            
            <el-row :span="24">
               <table>
                <tr>
                    <td style="width:80px">
                        年级
                    </td>
                    <td v-for="(item,index) in tagList.grade"  :key="index"> 
                        {{item.text}}
                        <el-checkbox-group v-model="subject[index]" @change="changeSub(index,item.id)">
                            <el-checkbox :label="val.subNameCh" v-for="val in selectiveList" >{{val.subNameCh}}</el-checkbox>
                        </el-checkbox-group>
                    </td>
                    
                </tr>
                <tr>
                    <td style="width:80px">
                        增订人数（年级人数尾数需是0或5）
                    </td>
                    <td v-for="(item,index) in tagList.grade"  :key="index"> 
                        <el-input-number v-model="UpdatenNum[index]"  :min="5" :step="5"  step-strictly @change="changeNum(index)"></el-input-number>
                    </td>
                </tr>
                <tr>
                    <td style="width:80px">
                        费用（元）
                    </td>
                    <td v-for="(item,index) in tagList.grade"  :key="index"> 
                        <el-input
                            style="width:180px"
                            v-model="Allmoney[index]"
                            :disabled="true"
                            >
                        </el-input>
                    </td> 
                </tr>
               </table>
               <div class="detailsListP">
                    <p v-for="(item,index) in tagList.grade">
                        <span>
                            {{item.text}}：
                        </span>
                        <span v-if="subject[index]">
                            已选：{{subject[index]}}
                        </span>
                        <span v-if="Allmoney[index]">
                            合计：{{Allmoney[index]}}元
                        </span>
                    </p>   
               </div>
               <div style="float:right;margin: 10px;" >
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button @click="dialogTableVisible = false">取消</el-button>
               </div>
            </el-row>
		</el-dialog>
	</div>
</template>
<script>
	import Schart from 'vue-schart'
	import ICountUp from 'vue-countup-v2'
	import user from '../../common/user'
	import {AdminOrderPriceSelect,selectTag,AdminOrderTagAdd,AdminOrderItemAdd,ApiTagSelectList,AdminOrderAdd,AdminOrderUpload} from '@/api/api.js'
import { forEach } from 'jszip'

	export default {
		data() {
			return {
                userName:localStorage.getItem('userName'),
                userID:localStorage.getItem('userID'),
                color: '',
                tagList:[],
                selectiveList:[],
                dialogTableVisible:false,
				form: {
					count:0,
					style_count: 0,
					contacts:'凯里' ,
					contact_phone: '1888888',
					contact_address: '北京市海淀区北京路1号',
					total_price:0
                },
                paper:{
                    year:'',
                    test:'',
                    class:''
                },
                chineseId:'',
                chineseName:'',
                mathId:'',
                mathName:'',
                englishId:'',
                englishName:'',
                orderList:[],
                subject:[],   //年级
                UpdatenNum:[],
                Allmoney:[],  //
                subjectName:[],
                orderItemList:[],
                Allsubscriptions:0,
                Alltotalmoney:0,
                chinesemMinCount:'',
                englishMinCount:'',
                mathMinCount:'',
                detailsList:[]  //订单明细
			};
		},
		components: {
			Schart,
			ICountUp
		},
		methods: {
            addOrderItem(){
                this.dialogTableVisible = true
                for(var i=0;i<this.tagList.grade.length;i++){
                    this.subject.push([])
                }

                for(var a=0;a<this.tagList.grade.length;a++){
                    this.orderItemList.push({
                        "children":[],
                        "childrenName":[],
                        "classId":'',
                        "updateNum":'',
                        "total":'',
                        "year":'',
                        "test":'',
                        "className":'',
                        "yearName":'',
                        "testName":'',
                        "name":'',

                    })
                }
                // console.log(this.subject)
            },
            // 改变年份
            changeYear(){
                let yearName = ''
                 // 获取年份名称
                this.tagList.years.forEach(element=>{
                    if(element.id == this.paper.year){
                        yearName = element.text
                    }
                })
                for(var i=0;i<this.orderItemList.length;i++){
                    this.orderItemList[i].year = this.paper.year
                    this.orderItemList[i].yearName = yearName
                }
               
                // console.log(this.orderItemList)
            },
            // 改变单元
            changeTest(){
                let testName = ''
                this.tagList.semester.forEach(element=>{
                    if(element.id == this.paper.test){
                        testName = element.text
                    }
                })
                for(var i=0;i<this.orderItemList.length;i++){
                    this.orderItemList[i].test = this.paper.test
                    this.orderItemList[i].testName = testName
                }
                // console.log(this.orderItemList)
            },
            // 年级
            changeSub(index,id){

                this.orderItemList[index].classId = id
                let className = ''
                this.tagList.grade.forEach(element=>{
                    if(element.id == id){
                        this.orderItemList[index].className = element.text
                        className = element.text
                    }
                })
                this.orderItemList[index].children = []
                this.orderItemList[index].childrenName = []
               
                for(var i=0;i<this.subject[index].length;i++){
                    this.orderItemList[index].childrenName.push(this.subject[index][i])
                    
                }
                for(var a=0;a<this.orderItemList[index].childrenName.length;a++){
                    let item = this.orderItemList[index].childrenName[a]

                    this.tagList.subject.forEach(element => {
                        if(element.text == item){
                            this.orderItemList[index].children.push(element.id)
                        }
                    });
                }
                this.getMoney(index)
            },
            // 征订人数
            changeNum(index){
                this.orderItemList[index].updateNum =  this.UpdatenNum[index]
                this.getMoney(index)
            },
            // 计算总数和折扣
            getMoney(index){
                this.orderItemList[index].total = 0
                this.Allmoney[index] = 0
                for(var i=0;i<this.selectiveList.length;i++){
                    // console.log( this.selectiveList[i].tag_id)
                    this.orderItemList[index].childrenName.forEach(element => {
                        if(element == this.selectiveList[i].subNameCh){
                            this.orderItemList[index].total = Number(this.orderItemList[index].total)  + Number(this.selectiveList[i].priceForOne * this.orderItemList[index].updateNum)
                        }
                    });
                }
                if(this.orderItemList[index].children.length == 2){
                    // 两份打9折
                    this.orderItemList[index].total =  this.orderItemList[index].total  * 0.9
                }else if(this.orderItemList[index].children.length > 2){
                    // 两份以上打8折
                    this.orderItemList[index].total =  this.orderItemList[index].total  * 0.8
                }
                this.Allmoney[index] = this.orderItemList[index].total
                this.$forceUpdate();
                
            },
            // 确定订单项
            onSubmit(){
                this.orderList = []
                this.Allsubscriptions = 0
                this.Alltotalmoney = 0
                for(var i=0;i<this.orderItemList.length;i++){

                    if(this.orderItemList[i].children.length == 0 && this.orderItemList[i].updateNum =='' && this.orderItemList[i].total ==''){
                        continue
                    }else{
                        let item = this.orderItemList[i]
                        for(var a=0;a<item.childrenName.length;a++){
                            if(item.childrenName[a] == '语文'){
                                this.orderList.push({
                                    "name":item.yearName + item.className + item.testName + item.childrenName[a] ,
                                    "children":[item.year,item.classId,item.test,item.children[a],this.chineseId],
                                    "childrenName":[item.yearName,item.className,item.testName,item.childrenName[a],this.chineseName],
                                    "updateNum":item.updateNum,
                                    "total_price":item.total   
                                })
                            }else if(item.childrenName[a] == '数学'){
                                this.orderList.push({
                                    "name":item.yearName + item.className +item.testName + item.childrenName[a] ,
                                    "children":[item.year,item.classId,item.test,item.children[a],this.mathId],
                                    "childrenName":[item.yearName,item.className,item.testName,item.childrenName[a],this.mathName],
                                    "updateNum":item.updateNum,
                                    "total_price":item.total,
                                    "uploadFile":''  
                                })
                            }else if(item.childrenName[a] == '英语'){
                                this.orderList.push({
                                    "name":item.yearName + item.className + item.testName + item.childrenName[a] ,
                                    "children":[item.year,item.classId,item.test,item.children[a],this.englishId],
                                    "childrenName":[item.yearName,item.className,item.testName,item.childrenName[a],this.englishName],
                                    "updateNum":item.updateNum,
                                    "total_price":item.total,
                                    "uploadFile":''
                                })
                            } 
                        }
                        // for(var a=0;a<item.childrenName.length;a++){
                        //     if(item.childrenName[a] == '语文'){
                        //         for(let k=0;k<this.chinesemMinCount;k++){
                        //             this.orderList.push({
                        //                 "name":item.yearName + item.className + item.testName + item.childrenName[a] + this.tagList.element_test[k].text,
                        //                 "children":[item.year,item.classId,item.test,item.children[a],this.chineseId,this.tagList.element_test[k].id],
                        //                 "childrenName":[item.yearName,item.className,item.testName,item.childrenName[a],this.chineseName,this.tagList.element_test[k].text],
                        //                 "updateNum":item.updateNum,
                        //                 "total_price":item.total,
                                        
                        //             })
                        //         }
                        //     }else if(item.childrenName[a] == '数学'){
                        //         for(let j=0;j<this.mathMinCount;j++){
                        //             this.orderList.push({
                        //                 "name":item.yearName + item.className +item.testName + item.childrenName[a] + this.tagList.element_test[j].text,
                        //                 "children":[item.year,item.classId,item.test,item.children[a],this.mathId,this.tagList.element_test[j].id],
                        //                 "childrenName":[item.yearName,item.className,item.testName,item.childrenName[a],this.mathName,this.tagList.element_test[j].text],
                        //                 "updateNum":item.updateNum,
                        //                 "total_price":item.total,
                        //                 "uploadFile":''
                                        
                        //             })
                        //         }
                                

                        //     }else if(item.childrenName[a] == '英语'){
                        //         for(let l=0;l<this.englishMinCount;l++){
                        //             this.orderList.push({
                        //                 "name":item.yearName + item.className + item.testName + item.childrenName[a] + this.tagList.element_test[l].text,
                        //                 "children":[item.year,item.classId,item.test,item.children[a],this.englishId,this.tagList.element_test[l].id],
                        //                 "childrenName":[item.yearName,item.className,item.testName,item.childrenName[a],this.englishName,this.tagList.element_test[l].text],
                        //                 "updateNum":item.updateNum,
                        //                 "total_price":item.total,
                        //                 "uploadFile":''
                        //             })
                        //         }
                        //     } 
                        // }
                        this.Allsubscriptions =this.Allsubscriptions +  this.orderItemList[i].updateNum
                        this.Alltotalmoney = this.Alltotalmoney +  this.orderItemList[i].total
                    }
                }
                console.log(this.orderList)
                this.dialogTableVisible = false
            },
            // 新建订单项
            // getOrderItem(id,sn,orderItem){
            //     AdminOrderItemAdd({
            //         "count":orderItem.updateNum,
            //         "title":orderItem.name,
            //         "order_sn":sn,
            //         "order_id":id
            //     }).then(res=>{
            //         if(res.data.result){
            //             let itemId = res.data.data.id
            //             if(orderItem.uploadFile){
            //                 AdminOrderUpload(itemId,orderItem.uploadFile).then(res=>{
			// 					if(res.data.result){
			// 						for(var i=0;i<orderItem.children.length;i++){
			// 							let item = orderItem.children[i]
			// 							AdminOrderTagAdd({
			// 								"item_id":itemId,
			// 								"tag_id":item
			// 							}).then(res=>{
			// 								if(res.data.result){

			// 								}else{
			// 									this.$message.error(res.data.message)
			// 								}
			// 							})
			// 						}
			// 						// this.$message.success('新增成功')
								
			// 					}else{
			// 						this.$message.error(res.data.message)
			// 					}
			// 				})
            //             }else{
            //                 for(var i=0;i<orderItem.children.length;i++){
			// 					let item = orderItem.children[i]
			// 					AdminOrderTagAdd({
			// 						"item_id":itemId,
			// 						"tag_id":item
			// 					}).then(res=>{
			// 						if(res.data.result){

			// 						}else{
			// 							this.$message.error(res.data.message)
            //                         }


			// 					})
			// 				}
            //             }
            //         }
            //     })
            // },
            // 确认订单
            placeOrder(){
                const loading = this.$loading({
                    lock: true,
                    text: '正在提交订单',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let orderItems = []
                
                for(var i=0;i<this.orderList.length;i++){
                    let item = this.orderList[i].children
                    let tag_list = []
                    for(var j=0;j<item.length;j++){
                        tag_list.push({
                            "id":item[j]
                        })
                    }
                    orderItems.push({
                        "count":this.orderList[i].updateNum,
                        "title":this.orderList[i].name,
                        "tag_list":tag_list      
                    })
                }
                
               
                AdminOrderAdd({
                    "count":this.Allsubscriptions,
                    "style_count":this.orderList.length,
                    "contact_phone":this.form.contact_phone,
                    "contacts":this.form.contacts,
                    "contact_address":this.form.contact_address,
                    "total_price":this.Alltotalmoney,
                    "orderItems":orderItems
                }).then(res=>{
                    loading.close();
                    if(res.data.result){
                        this.$message.success('提交成功')
                        this.$router.push('/order_school');
                    }else{
                        this.$message.error(res.data.message)
                    }
                }).catch(()=>{
                     loading.close();
                })
            }
		},
		mounted() {
			this.color = user().color;
			// 获取各个标签
			selectTag().then(res=>{
                this.tagList = res.data.data
                // console.log(this.tagList)
            })

            // 获取订购数量管理
            AdminOrderPriceSelect({}).then(res=>{
                this.selectiveList = res.data.data.list
                for(var i=0;i<this.selectiveList.length;i++){
                    if(this.selectiveList[i].subNameCh == '语文'){
                      
                        this.chinesemMinCount = this.selectiveList[i].minCount
                     
                    }else if(this.selectiveList[i].subNameCh == '英语'){
                        
                        this.englishMinCount = this.selectiveList[i].minCount
                     
                    }else if(this.selectiveList[i].subNameCh == '数学'){
                        
                        this.mathMinCount = this.selectiveList[i].minCount
                      
                    }
                }
            })
            
            // 获取语文、数学、英语版本
            ApiTagSelectList({
                "pageNum": 1,
                "pageSize": 999,
                "text":"部编版"
            }).then(res=>{
                this.chineseId = res.data.data.list[0].id
                this.chineseName = res.data.data.list[0].text

            })
            ApiTagSelectList({
                "pageNum": 1,
                "pageSize": 999,
                "text":"人教版"
            }).then(res=>{
                this.mathId = res.data.data.list[0].id
                this.mathName = res.data.data.list[0].text
            })
            ApiTagSelectList({
                "pageNum": 1,
                "pageSize": 999,
                "text":"人教新起点"
            }).then(res=>{
                this.englishId = res.data.data.list[0].id
                this.englishName = res.data.data.list[0].text
            })

		},
		watch:{
		}
	};
</script>
<style scoped src="../../../assets/css/order-add.css"></style>
