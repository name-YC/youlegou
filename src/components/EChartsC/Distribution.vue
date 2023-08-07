<script setup lang="ts">
import request from '../../router/requestEcharts';
import * as echarts from 'echarts'
import {useStore} from 'vuex'
import {onMounted, reactive, ref, watch} from "vue";
const box = ref<HTMLElement | null>()
let echartsData = reactive([]);
const DATALength = ref()
const store =useStore()
const index = ref(0)
const time = ref(null);
const titleSize= ref(0)
onMounted(async () => {
  const {data} = await request.get('/api/hotproduct');
  DATALength.value = data.length
  titleSize.value = box.value.offsetWidth / 100 * 3.6
  const dataA = data[index.value].children.map((item:any) =>{
    return {
      name: item.name,
      value: item.value,
      children: item.children
    }
  })
  echartsData = dataA
  echartsA(dataA)
  // xAxis.value = XData
  // VauData.value = ValDataA
});
/*
* X: 代表x轴数据
* D: 代表对应的值
* */
const echartsA=(data:any):void=>{
  const echartsDome = echarts.init(box.value,`${store.state.bgc}`);
  window.addEventListener('resize', function () {
    titleSize.value = box.value.offsetWidth / 100 * 3.6
    echartsDome.resize()
  })
  echartsDome.on('mouseover',()=>{
    clearInterval(time.value)
  })
  echartsDome.on('mouseout', () => {
  });
  const option = {
    title: {
      text: '热销商品占比',
      left: '15px',
      top: '10px',
      textStyle: {
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: (arg:any)=>{
        let data = arg.data.children;
        let sum = 0;
        let valStr = ''
        data.forEach((item:any)=>{
          sum += item.value
        })
        data.forEach((item:any)=>{
          valStr += `${item.name}:${parseInt(String(item.value / sum * 100))+'%'}<br/>`
        })
        return  valStr
      }
    },
    legend: {
      left: 'center',
      top: '10%',
      icon: 'circle',
      textStyle: {
        // color: 'white'
      },
      orient: 'horizontal'
    },
    grid: {
      top: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        label: {
          // color: 'white'
        },
        radius: '50%',
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  echartsDome.setOption(option)
}
watch(index,async ()=>{
  console.log(index.value)
  const {data} = await request.get('/api/hotproduct');
  // titleSize.value = box.value.offsetWidth / 100 * 3.6
  // echartsA(data[0])
  const dataA = data[index.value].children.map((item:any) =>{
    return {
      name: item.name,
      value: item.value,
      children: item.children
    }
  })
  echartsData = dataA
  echartsA(dataA)
})
const left = ()=>{
  index.value--
  if(index.value<0){
    index.value= DATALength.value-1
  }
  console.log(index.value)
}
const right = ()=>{
  index.value++
  if(index.value>DATALength.value-1){
    index.value= 0
  }
  console.log(index.value)
}
</script>

<template>
  <div id="box" ref="box"></div>
  <span class="left" @click="left">《</span>
  <span class="right" @click="right">》</span>

</template>

<style scoped>
#box {
  height: 100%;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
}
.left {
  position: absolute;
  top: 50%;
  left: 30px;
  z-index: 1000;
  color: white;
  cursor: pointer;
}
.right {
  position: absolute;
  top: 50%;
  right: 30px;
  z-index: 1000;
  color: white;
  cursor: pointer;
}
</style>
