<template>
    <div class="home">
        <div class="index">
            <h4>2019年人教版一年级第一单元考试</h4>
            <div class="left_box_tag">
                <div class="label" v-for="card in tag_list">{{card.text}}</div>
            </div>
        </div>
        <Tabbar /> 
    </div>
</template>
<script>
import Tabbar from '../common/tabbar.vue'  
export default {
    components: {
        Tabbar
    },
}
</script>
<style scoped>
.home{
  background: #f5f5f5;
  min-height: 100vh;
}
</style>
<style scoped src="../../../../assets/css/mobile.css"></style>