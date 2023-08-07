<script setup lang="ts">
import {ref, onMounted, watch, reactive} from 'vue';
//
import axios from '../../router/requestEcharts.ts';
import echartsA from '../../views/ECharts/Tendency.ts'
const box = ref<HTMLElement | null>(null);
let echartsData:object = reactive({})
const select = ref('a')

onMounted(async () => {
  const {data} = await axios.get('/api/trend')
  echartsData = data
  echartsA(box.value, select.value,echartsData)
})

watch(select,(oldVal:object)=>{
  console.log(oldVal)
  echartsA(box.value, select.value,echartsData)
})
</script>

<template>
  <div ref="box" id="box">
  </div>
  <el-select id="select" v-model="select" class="m-2" placeholder="Select">
    <el-option
        label="地区销量趋势"
        value="a"
    />
    <el-option
        label="商品销量趋势"
        value="b"
    />
    <el-option
        label="商家销量趋势"
        value="c"
    />
  </el-select>
</template>

<style lang="scss" scoped>
#box {
  height: 100%;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
}
.el-select{
  position: absolute;
  top: 15px;
  left: 15px;
  background: transparent!important;
  ::v-deep .el-input__wrapper{
    background: transparent!important;
    border-left: 3px solid white;
    border-right: 3px solid white;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    box-shadow: 0 0 0 0px var(--el-input-border-color,var(--el-border-color)) inset;
    .el-input__inner{
      color: white;
      width: 100px;
    }
  }
}
</style>
