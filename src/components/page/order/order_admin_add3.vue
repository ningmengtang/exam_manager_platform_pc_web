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
							<div class="identity" :style="{'background-color':color}">试卷订购管理员</div>
						
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
                <el-form-item label="选择学校">
                <el-select v-model="form.school_id" placeholder="请选择">
                        <el-option
                        v-for="item in schoolList"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
				<el-form-item label="联系电话">
					<el-input v-model="form.contact_phone" ></el-input>
				</el-form-item>
				<el-form-item label="收货人员">
					<el-input v-model="form.contacts" ></el-input>
				</el-form-item>
				<el-form-item label="收货地址">
					<el-input v-model="form.contact_address" ></el-input>
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
				<div class="li-box" v-for="(item,i) in detailsList ">
					<div class="ranking">{{i+1}}</div>
					<div class="papers-box">
						<div class="p-title">
                            <span>
                                {{item.class}} ： 已选
                            </span>
                            <span>
                                {{item.subject}}
                            </span>
						</div>
						<div class="p-particular">
							<div>数量：各{{item.updateNum}}份</div>
						    <!-- <div>单价{{item.price}}元</div> -->
							<div>总价：{{item.Allmoney }}元</div>
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
		<el-dialog title="添加订购" :visible.sync="dialogTableVisible" width="1700px">
            <el-alert
                title="1、购买一科期末试卷加20元/送学校一科测评服务，购买两科期末试卷加10元/送学校两科科测评服务，购买三科期末试卷免费赠送三科测评服务。"
                type="warning">
            </el-alert>
            <div class="dialogTop" >
                <span > 年份：</span>
                <el-select v-model="paper.year" placeholder="请选择年份" @change="changeYear">
                    <el-option
                        v-for="item in tagList.years"
                        :label="item.text"
                        :value="item.id">
                    </el-option>
                </el-select>
            </div>
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
                        40张/袋
                    </td>
                    <td v-for="(item,index) in tagList.grade"  :key="index"> 
                        <el-input-number v-model="bagNum[index].sheet_40_bug"  :min="0" :step="1"  step-strictly @change="changeNum(index)"></el-input-number>
                    </td>
                </tr>
                <tr>
                    <td style="width:80px">
                        30张/袋
                    </td>
                    <td v-for="(item,index) in tagList.grade"  :key="index"> 
                        <el-input-number v-model="bagNum[index].sheet_30_bug"  :min="0" :step="1"  step-strictly @change="changeNum(index)"></el-input-number>
                    </td>
                </tr>
                 <tr>
                    <td style="width:80px">
                       20张/袋
                    </td>
                    <td v-for="(item,index) in tagList.grade"  :key="index"> 
                        <el-input-number v-model="bagNum[index].sheet_20_bug"  :min="0" :step="1"  step-strictly @change="changeNum(index)"></el-input-number>
                    </td>
                </tr>
                <tr>
                    <td style="width:80px">
                        5张/袋
                    </td>
                    <td v-for="(item,index) in tagList.grade"  :key="index"> 
                        <el-input-number v-model="bagNum[index].sheet_5_bug"  :min="0" :step="1"  step-strictly @change="changeNum(index)"></el-input-number>
                    </td>
                </tr>
                <tr>
                    <td style="width:80px">
                        费用（元）
                    </td>
                    <td v-for="(item,index) in tagList.grade"  :key="index"> 
                        <el-input
                            style="width:180px"
                            v-model="orderItemList[index].allTotal"
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
                        <span v-if="orderItemList[index].allTotal">
                            合计：{{orderItemList[index].allTotal}}元
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
	import {AdminOrderEndOfTermAddList,AdminOrederEndOfTermDetailsAdd,apiAdminUseManageSelect,SchoolOrederEndOfTermDetailsAdd,SchoolOrederEndOfTermDetailsList,AdminOrderPriceSelect,selectTag,AdminOrderTagAdd,AdminOrderItemAdd,ApiTagSelectList,AdminOrderAdd,AdminOrderUpload,AdminOrderEndOfTermAdd} from '@/api/api.js'
    import { forEach } from 'jszip'

	export default {
		data() {
			return {
                schoolList:[],
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
                    total_price:0,
                    school_id:''
                },
                paper:{
                    year:'',
                    test:'',
                    class:''
                },
                bagNum:[],
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
                for(var i=0;i<this.tagList.grade.length + 1;i++){
                    this.subject.push([])
                }
                
                
               
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
            },
            // // 改变单元
            // changeTest(){
            //     let testName = ''
            //     this.tagList.semester.forEach(element=>{
            //         if(element.id == this.paper.test){
            //             testName = element.text
            //         }
            //     })
            //     for(var i=0;i<this.orderItemList.length;i++){
            //         this.orderItemList[i].test = this.paper.test
            //         this.orderItemList[i].testName = testName
            //     }
            // },
            // 年级
            changeSub(index,id){
                this.orderItemList[index].classId = id
                this.orderItemList[index].need_appraisal = false
                this.tagList.grade.forEach(element=>{
                    if(element.id == id){
                        this.orderItemList[index].className = element.text
                    }
                })

                this.orderItemList[index].children = []
                this.orderItemList[index].childrenName = []
               
                for(var i=0;i<this.subject[index].length;i++){
                    if(this.subject[index][i] == '测评'){
                        if(this.subject[index].length <= 1 ){
                            this.$message.warning('不能单选测评')
                            this.orderItemList[index].allTotal = 0
                            return
                        }else{
                            this.orderItemList[index].need_appraisal = true
                        }
                    }else{
                        this.orderItemList[index].childrenName.push(this.subject[index][i])
                    }
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
                // 计算总人数
                this.orderItemList[index].allPeppleNum = 0
                this.orderItemList[index].sheet_5_bug = this.bagNum[index].sheet_5_bug
                this.orderItemList[index].sheet_20_bug = this.bagNum[index].sheet_20_bug
                this.orderItemList[index].sheet_30_bug = this.bagNum[index].sheet_30_bug
                this.orderItemList[index].sheet_40_bug = this.bagNum[index].sheet_40_bug
                this.orderItemList[index].allPeppleNum = Number(this.bagNum[index].sheet_5_bug*5) + Number(this.bagNum[index].sheet_20_bug*20) + Number(this.bagNum[index].sheet_30_bug*30) + Number(this.bagNum[index].sheet_40_bug*40)
                this.getMoney(index)
            },
            // 计算总数和折扣
            getMoney(index){
                // 判断选了几门科目
                // 一到三 8元
                // 四到六 15元
                this.orderItemList[index].allTotal = 0

                // console.log(this.orderItemList[index].children)
                if(this.orderItemList[index].children.length == 1){
                     
                    // 是否勾选了评测
                    if(this.orderItemList[index].need_appraisal){
                        // 判断几年级
                        if(this.orderItemList[index].className == '一年级' || this.orderItemList[index].className == '二年级' || this.orderItemList[index].className == '三年级'){
                            // 一到三 8元 + 20元评测
                            this.orderItemList[index].allTotal = (this.orderItemList[index].allPeppleNum  * 8) + (this.orderItemList[index].allPeppleNum  * 20)
                        }else if(this.orderItemList[index].className == '四年级' || this.orderItemList[index].className == '五年级' || this.orderItemList[index].className == '六年级'){
                            // 四到六 15元 + 20元评测
                            this.orderItemList[index].allTotal = (this.orderItemList[index].allPeppleNum  * 15) + (this.orderItemList[index].allPeppleNum  * 20)
                        }
                    }else{
                        // this.orderItemList[index].need_apprai
                        // 判断几年级
                        if(this.orderItemList[index].className == '一年级' || this.orderItemList[index].className == '二年级' || this.orderItemList[index].className == '三年级'){
                            // 一到三 8元 
                            this.orderItemList[index].allTotal = this.orderItemList[index].allPeppleNum  * 8
                        }else if(this.orderItemList[index].className == '四年级' || this.orderItemList[index].className == '五年级' || this.orderItemList[index].className == '六年级'){
                            // 四到六 15元
                            this.orderItemList[index].allTotal = this.orderItemList[index].allPeppleNum  * 15
                        }
                    }
                }else if(this.orderItemList[index].children.length == 2){
                    // 是否勾选了评测
                   
                    if(this.orderItemList[index].need_appraisal){
                        // 判断几年级
                        if(this.orderItemList[index].className == '一年级' || this.orderItemList[index].className == '二年级' || this.orderItemList[index].className == '三年级'){
                            // 一到三 8元 + 20元评测
                            this.orderItemList[index].allTotal = (this.orderItemList[index].allPeppleNum  * 8 * 2) + (this.orderItemList[index].allPeppleNum   * 10)
                        }else if(this.orderItemList[index].className == '四年级' || this.orderItemList[index].className == '五年级' || this.orderItemList[index].className == '六年级'){
                            // 四到六 15元 + 20元评测
                            this.orderItemList[index].allTotal = (this.orderItemList[index].allPeppleNum  * 15 * 2 ) + (this.orderItemList[index].allPeppleNum  * 10)
                        }
                    }else{
                        // 判断几年级
                        if(this.orderItemList[index].className == '一年级' || this.orderItemList[index].className == '二年级' || this.orderItemList[index].className == '三年级'){
                            // 一到三 8元 
                            this.orderItemList[index].allTotal = this.orderItemList[index].allPeppleNum  * 8 * 2
                        }else if(this.orderItemList[index].className == '四年级' || this.orderItemList[index].className == '五年级' || this.orderItemList[index].className == '六年级'){
                            // 四到六 15元
                            this.orderItemList[index].allTotal = this.orderItemList[index].allPeppleNum  * 15 * 2
                        }
                    }
                }else if(this.orderItemList[index].children.length == 3){
                   
                    // 判断几年级
                    // 默认勾选测评
                    // console.log(this.subject[index])
                    if(this.subject[index].length == 3){
                        this.subject[index].push('测评')
                    }
                    this.orderItemList[index].need_appraisal = true
                    // if()

                    if(this.orderItemList[index].className == '一年级' || this.orderItemList[index].className == '二年级' || this.orderItemList[index].className == '三年级'){
                        // 一到三 8元 
                        this.orderItemList[index].allTotal = this.orderItemList[index].allPeppleNum  * 8 *3
                    }else if(this.orderItemList[index].className == '四年级' || this.orderItemList[index].className == '五年级' || this.orderItemList[index].className == '六年级'){
                        // 四到六 15元
                        this.orderItemList[index].allTotal = this.orderItemList[index].allPeppleNum  * 15 * 3
                    } 
                }else{
                    // console.log(this.orderItemList[index].children.length)
                    this.orderItemList[index].allTotal = 0
                    this.bagNum[index].sheet_5_bug = 0
                    this.bagNum[index].sheet_20_bug = 0
                    this.bagNum[index].sheet_30_bug = 0
                    this.bagNum[index].sheet_40_bug = 0
                }
            },
            // 确定订单项
            onSubmit(){
                // console.log(this.orderItemList)
                this.orderList = []
                this.Allsubscriptions =0
                this.Alltotalmoney = 0
                for(var i=0;i<this.orderItemList.length;i++){
                    if(this.orderItemList[i].children.length <=0 || this.orderItemList[i].allTotal <= 0){
                        continue
                    }else{
                        let item = this.orderItemList[i]
                        for(var a=0;a<item.childrenName.length;a++){
                            if(item.childrenName[a] == '语文'){
                                this.orderList.push({
                                    'name':item.yearName + item.className + item.childrenName[a] + item.testName + this.chineseName ,
                                    "children":[item.year,item.classId,item.children[a],item.test,this.chineseId],
                                    "count":item.allPeppleNum,
                                    "sheet_20_bug": item.sheet_20_bug,
                                    "sheet_30_bug": item.sheet_30_bug,
                                    "sheet_40_bug": item.sheet_40_bug,
                                    "sheet_5_bug": item.sheet_5_bug,
                                    "need_appraisal":item.need_appraisal
                                })
                            }else if(item.childrenName[a] == '数学'){
                                this.orderList.push({
                                    'name':item.yearName + item.className + item.childrenName[a] + item.testName + this.mathName ,
                                    "children":[item.year,item.classId,item.children[a],item.test,this.mathId],
                                    "count":item.allPeppleNum,
                                    "sheet_20_bug": item.sheet_20_bug,
                                    "sheet_30_bug": item.sheet_30_bug,
                                    "sheet_40_bug": item.sheet_40_bug,
                                    "sheet_5_bug": item.sheet_5_bug,
                                    "need_appraisal":item.need_appraisal
                                })
                            }else if(item.childrenName[a] == '英语'){
                                this.orderList.push({
                                    'name':item.yearName + item.className + item.childrenName[a] + item.testName + this.englishName ,
                                    "children":[item.year,item.classId,item.children[a],item.test,this.englishId],
                                    "count":item.allPeppleNum,
                                    "sheet_20_bug": item.sheet_20_bug,
                                    "sheet_30_bug": item.sheet_30_bug,
                                    "sheet_40_bug": item.sheet_40_bug,
                                    "sheet_5_bug": item.sheet_5_bug,
                                    "need_appraisal":item.need_appraisal
                                })
                            }  
                        }
                        this.Allsubscriptions =Number(this.Allsubscriptions)  +Number(this.orderList[i].count) 
                        this.Alltotalmoney = Number(this.Alltotalmoney) +  Number(this.orderItemList[i].allTotal)
                    }
                    
                }
                this.detailsList = []
                for(var k=0;k<this.tagList.grade.length;k++){
                    if(this.orderItemList[k].allTotal){
                        this.detailsList.push({
                            "class":this.tagList.grade[k].text,
                            "subject":this.subject[k],
                            "Allmoney":this.orderItemList[k].allTotal,
                            "updateNum":this.orderItemList[k].allPeppleNum
                        })
                    }else{
                        continue
                    }
                }
                this.dialogTableVisible = false


            },
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
                        "count":this.orderList[i].count,
                        "title":this.orderList[i].name,
                        "tag_list":tag_list,
                        "need_appraisal": this.orderList[i].need_appraisal,
                        "sheet_20_bug": this.orderList[i].sheet_20_bug,
                        "sheet_30_bug": this.orderList[i].sheet_30_bug,
                        "sheet_40_bug": this.orderList[i].sheet_40_bug,
                        "sheet_5_bug": this.orderList[i].sheet_5_bug
                    })
                }
                
               
                AdminOrderEndOfTermAddList({
                    "count":this.Allsubscriptions,
                    "style_count":this.orderList.length,
                    "contact_phone":this.form.contact_phone,
                    "contacts":this.form.contacts,
                    "contact_address":this.form.contact_address,
                    "total_price":this.Alltotalmoney,
                    "orderItems":orderItems,
                    "school_id": this.form.school_id,
                }).then(res=>{
                    loading.close();
                    if(res.data.result){
                        let id = res.data.data.id
                        let sn = res.data.data.sn
                        let orderItems = res.data.data.orderItems
                        let one = ''
                        let two = ''
                        let three = ''
                        let four = ''
                        let five = ''
                        let six = ''
                        for(var b=0;b<orderItems.length;b++){
                            if(orderItems[b].title.indexOf("一年级" ) != -1){ 
                                one = orderItems[b].id
                            }else if(orderItems[b].title.indexOf("二年级" ) != -1){
                                two = orderItems[b].id
                            }else if(orderItems[b].title.indexOf("三年级" ) != -1){
                                three = orderItems[b].id
                            }
                            else if(orderItems[b].title.indexOf("四年级" ) != -1){
                                four = orderItems[b].id
                            }
                            else if(orderItems[b].title.indexOf("五年级" ) != -1){
                                five = orderItems[b].id
                            }
                            else if(orderItems[b].title.indexOf("六年级" ) != -1){
                                six = orderItems[b].id
                            }
                        }
                        for(var a=0;a<this.detailsList.length;a++){
                            // let order_item_ids = ''
                            if(this.detailsList[a].class == '一年级'){
                                this.getDetailsList(this.detailsList[a],id,sn,one)
                            }else if(this.detailsList[a].class == '二年级'){
                                this.getDetailsList(this.detailsList[a],id,sn,two)
                            }else if(this.detailsList[a].class == '三年级'){
                                this.getDetailsList(this.detailsList[a],id,sn,three)
                            }
                            else if(this.detailsList[a].class == '四年级'){
                                this.getDetailsList(this.detailsList[a],id,sn,four)
                            }else if(this.detailsList[a].class == '五年级'){
                                this.getDetailsList(this.detailsList[a],id,sn,five)
                            }
                            else if(this.detailsList[a].class == '六年级'){
                                this.getDetailsList(this.detailsList[a],id,sn,six)
                            } 
                        }
                        this.$message.success('提交成功')
                        this.$router.push('/order_admin')
                        loading.close();
                    }else{
                        this.$message.error(res.data.message)
                    }
                }).catch(()=>{
                     loading.close();
                })
            },
            async getDetailsList(item,id,sn,order_item_ids){
                await this.detailsPromise(item,id,sn,order_item_ids)
            },
            detailsPromise(item,id,sn,order_item_ids){
                return new Promise((resolve,reject)=>{
                    AdminOrederEndOfTermDetailsAdd({
                        "order_id": id,
                        "order_sn": sn,
                        "classes":item.class,
                        "subject":JSON.stringify(item.subject),
                        "total_price":item.Allmoney,
                        "count":item.updateNum,
                        "order_item_ids":order_item_ids
                    }).then(res=>{
                        if(res.data.result){
                            resolve(res)
                        }else{
                            this.$message.error(res.data.message)
                        }
                        
                    })
                })
            }
		},
		mounted() {
			this.color = user().color;
			// 获取各个标签
			selectTag().then(res=>{
                this.tagList = res.data.data
                for(var k=0;k<this.tagList.grade.length;k++){
                    this.bagNum.push({
                        sheet_40_bug:'',
                        sheet_30_bug:'',
                        sheet_20_bug:'',
                        sheet_5_bug:''
                    })
                }
                for(var a=0;a<this.tagList.grade.length;a++){
                    this.orderItemList.push({
                        "children":[],
                        "childrenName":[],
                        "classId":'',
                        "allTotal":0,
                        "year":'',
                        "test":37,
                        "className":'',
                        "yearName":'',
                        "testName":'期末考试',
                        "name":'',
                        "need_appraisal":false,
                        "allPeppleNum":0,
                        "sheet_20_bug": 0,
                        "sheet_30_bug": 0,
                        "sheet_40_bug": 0,
                        "sheet_5_bug": 0,
                    })
                }
            })
            // 获取订购数量管理
            AdminOrderPriceSelect({}).then(res=>{
                this.selectiveList = res.data.data.list
                // console.log(this.selectiveList)
                this.selectiveList.push({
                    "subNameCh":'测评',
                    "price":20,
                    "id":'test'
                })
               
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
            apiAdminUseManageSelect({
                "userType":3
            }).then(res=>{
                this.schoolList = res.data.data.list
            })
		},
		watch:{
		}
	};
</script>
<style scoped src="../../../assets/css/order-add.css"></style>
<style scoped>
table tr td {
    height: 100px;
    line-height: 30px;
    border: 1px solid #ccc;
    width: 265px;
    text-align: center;
}
</style>
