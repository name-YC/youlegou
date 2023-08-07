<script setup lang="ts">
import axios from '../../router/requestEcharts';
import {useStore} from 'vuex'
import {onMounted, reactive, ref, watch,computed} from "vue";
import * as echarts from 'echarts'
import { pinyin } from 'pinyin-pro';

const store = useStore();
const zt = computed(()=>{
  //返回的是ref对象
  return store.state.bgc;
})
const box = ref<HTMLElement | null>(null);
let titleSize = ref(0);
let mapA = reactive({})
let pointData:object = reactive({})
onMounted(async ()=>{
  const {data:map} = await axios.get('/api/map/china');
  const {data:point} = await axios.get('/api/map');
  titleSize.value = box.value.offsetWidth / 100 * 3.6
  pointA(point)
  chartA(map);
  mapA = map
  pointData = point
})
/*
* 去除字符串中间的空格字符
* */
const removeMiddleSpaces=(string:string)=> {
  return string.replace(/\s/g, '');
}
// 图表显示
/*
* 1.1：map表示中国地图的所有数据
* */
const chartA=(map:any)=>{
  const chartDome = echarts.init(box.value)
  echarts.registerMap('china',map)
  window.addEventListener('resize', function () {
    titleSize.value = box.value.offsetWidth / 100 * 3.6
    // pointA()
    chartDome.resize()
  })
  // 点击时的回调
  chartDome.on('click',async (arg:any):Promise<void>=>{
    const chartDome = echarts.init(box.value,`${store.state.bgc}`)
    // 点击时某地区的对象详情
    const name = pinyin(arg.name, {toneType: 'none'})
    const str = removeMiddleSpaces(name);
    const data = await axios.get(`/api/map/province/${str}`);
    console.log(data)
    if(data.data.status==='404'){
      return
    }
    echarts.registerMap(str, data.data);
    const option = {
      geo: {
        map: str,
        roam: true,
      }
    };
    chartDome.setOption(option)
  })
  const option={
    geo: {
      type: 'map',
      map: 'china',
      itemStyle: {normal: {areaColor: 'rgb(142,168,220)',}}
    }
  }
  chartDome.setOption(option)
}
/*
* 1.1:图表闪点函数
* 地图配置
* */
const pointA = (point: any) => {
  const chartDome = echarts.init(box.value,`${store.state.bgc}`)
  const series = point.map((item: any) => {
    return {
      type: 'effectScatter',
      rippleEffect: {
        scale: 5,
        brushType: 'stroke'
      },
      name: item.name,
      data: item.children,
      coordinateSystem: 'geo'
    }
  })
  const legendArr = point.map((item: any) => {
    return item.name
  })
  // 基本配置项
  const option = {
    series: series,
    title: {
      textStyle: {
        fontSize: titleSize.value,
        // color: '#ffffff'
      },
      top: '5%',
      left: '5%',
      text: '商家分布'
    },
    legend: {
      data: legendArr,
      orient: 'vertical',
      bottom: '5%',
      left: '5%',
      itemWidth: titleSize.value / 2,
      itemHeight: titleSize.value / 2,
      textStyle: {
        // color: '#ffffff',
        fontSize: titleSize.value / 2
      }
    }
  };
  chartDome.setOption(option)
};
const resetMap = ()=>{
  const chartDome = echarts.init(box.value)
  const revertOption = {
    geo: {
      map: 'china'
    }
  };
  chartDome.setOption(revertOption)
}

watch(titleSize,()=>{
  pointA(pointData)
})
watch(zt,()=>{
  let chartDome = echarts.init(box.value,`${store.state.bgc}`)
  chartDome.dispose()
  // chartDome = echarts.init(box.value,`${store.state.bgc}`)
  pointA(pointData)
  resetMap()
  chartA(mapA)
})
</script>

<template>
  <div @dblclick="resetMap" ref="box" id="box"></div>
<!--  <h3>商家分布</h3>-->
</template>

<style scoped>
#box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 20px;
}
h3 {
  position: absolute;
  top: 15px;
  left: 15px;
  color: white;
  margin: 0;
}
</style>
