<script setup lang="ts">
import request from '../../router/requestEcharts';
import {useStore} from 'vuex'
import * as echarts from 'echarts'
import {onMounted, reactive,ref} from "vue";
const store = useStore()
const box = ref<HTMLElement | null>(null)
let echartsData = reactive([]);
const xAxis = ref([]);
const VauData = ref([])
const start = ref(0);
const end = ref(8);
const time = ref(null);
const titleSize= ref(0)
onMounted(async () => {
  const {data} = await request.get('/api/rank');
  console.log(data)
  echartsData = data
  data.sort((a,b)=>{
    return b.value -a.value
  })
  const XData = data.map((item: any) => {
    return item.name
  });
  const ValDataA = data.map((item: any) => {
    return item.value
  });
  titleSize.value = box.value.offsetWidth / 100 * 3.6
  echartsA(XData,ValDataA)
  xAxis.value = XData
  VauData.value = ValDataA
});
/*
* X: 代表x轴数据
* D: 代表对应的值
* */
const echartsA=(X:any,D:any):void=>{

  const colorArr = [
      ['#f10909', '#d57d7d'],
        ['#e8d400', '#d5ce7d'],
        ['#18d54d', '#7ece5e']
  ];
  const echartsDome = echarts.init(box.value,`${store.state.bgc}`);
  window.addEventListener('resize', function () {
    titleSize.value = box.value.offsetWidth / 100 * 3.6
    // pointA()
    echartsDome.resize()
  })
  echartsDome.on('mouseover',()=>{
    console.log(555)
    clearInterval(time.value)
  })
  echartsDome.on('mouseout', () => {
    clearInterval(time.value)
    // time.value =
    time.value = setInterval(()=>{
      start.value++;
      end.value++;
      console.log(echartsData.length - 1)
      if (end.value > echartsData.length - 1) {
        start.value = 0;
        end.value = 8
      }
      echartsA(xAxis.value,VauData.value)
    },2000)
  });
  const option = {
    title: {
      text: '₮  地区销售排行',
      textStyle:{
        // color: 'white',
        fontSize: titleSize.value
      },
      left: 20,
      top: 20
    },
    dataZoom: {
      show: false,
      startValue: start.value,
      endValue: end.value
    },
    grid: {
      top: '30%',
      left: '5%',
      right: '5%',
      bottom: '5%',
      containLabel: true
    },
    tooltip: {
      show: true
    },
    xAxis: {
      type: 'category',
      data: X,
      axisLabel:{
        // color: 'white'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        // color: 'white'
      },
      splitLine:{
        show: false
      }
    },
    series: [
      {
        type: 'bar',
        data: D,

        itemStyle: {
          barBorderRadius: [20, 20, 0, 0],
          color: (arg:any) => {
            let Color:string[] = ['']
            if (arg.data > 300) {
              Color = colorArr[0]
            } else if (arg.data > 200) {
              Color = colorArr[1]
            } else {
              Color = colorArr[2]
            }
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: Color[0]
              },
              {
                offset: 1,
                color: Color[1]
              }
            ]);
          }
        }
      }
    ]
  }
  echartsDome.setOption(option)
}
time.value = setInterval(()=>{
  // if(time.value){
  //   clearInterval(time.value)
  // }
  start.value++;
  end.value++;
  console.log(echartsData.length - 1)
  if (end.value > echartsData.length - 1) {
    start.value = 0;
    end.value = 8
  }
  echartsA(xAxis.value,VauData.value)
},2000)
</script>

<template>
<div id="box" ref="box"></div>
</template>

<style scoped>
#box {
  height: 100%;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
}
</style>
