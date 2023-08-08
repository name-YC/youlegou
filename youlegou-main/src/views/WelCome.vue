<template>
  <div class="welCome">
    <!-- 四个卡片 -->
    <el-row :gutter="12">
      <el-col :span="6" v-for="(item, index) in cardData" :key="index">
        <el-card shadow="always" @mouseenter.native="change(item.color, index)" @mouseleave.native="currentIndex = null"
          @click.native="changeLine(index)">
          <div class="left" :style="[currentIndex == index ? bgColor : '']">
            <span :class="['iconfont', , item.icon]" :style="{ color: currentIndex == index ? '#FFF' : item.color }"><img
                :src="item.pic" alt=""></span>
          </div>
          <div class="right">
            <div class="title">{{ item.title }}</div>
            <div class="data">{{ item.data }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div ref="chart" class="chart"></div>
    <!-- <button @click="GoTo"></button> -->
  </div>
</template>

<script lang="ts">
export default {
  name: 'WelCome'
}
</script>

<script lang="ts" setup>
// @ts-ignore
import { ref, reactive, getCurrentInstance, onMounted } from 'vue'
// @ts-ignore
import * as echarts from 'echarts'
// // Vue实例
// const Vue: any = getCurrentInstance()
// // Vue实例上的axios
// const Axios = Vue.appContext.config.globalProperties.$axios
// 四个card的数据
const cardData = reactive([
  {
    icon: 'icon-showpassword',
    title: '总访问量',
    data: null,
    color: '#40C9C6',
    pic: '/img/list1.png'
  },
  {
    icon: 'icon-user',
    title: '昨日访问量',
    data: null,
    color: '#36A3F7',
    pic: '/img/list2.png'
  },
  {
    icon: 'icon-cart',
    title: '总成交量',
    data: '1025018￥',
    color: '#F4516C',
    pic: '/img/list3.png'
  },
  {
    icon: 'icon-checkmark',
    title: '昨日成交量',
    data: '2253￥',
    color: '#34BFA3',
    pic: '/img/list4.png'
  }
])
// 用于设置鼠标悬停在card上的高亮
const currentIndex = ref(null)
// 高亮的背景色
const bgColor = ref({})
const chart = ref(null)
const activeLine = ref(0)
// const GoTo = () => {
//   console.log('点击')
//   Axios.get('reports/type/1').then((res: any) => {
//     console.log(res)
//   })
// }
const changeLine = (index: number) => {
  activeLine.value = index
  // chartInstance.dispose()
}
const change = (color: string, index) => {
  currentIndex.value = index
  console.log(currentIndex.value)
  bgColor.value = {
    backgroundColor: color,
  }
  getChart()
}
var lineData = [
  {
    title: '2020年访问量一览',
    legendData: ['真实访问量', '预估访问量'],
    xData: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月'
    ],
    // 真实数据;;
    realData: [
      1500, 2800, 900, 1000, 800, 700, 1400, 1300, 900, 1000, 800, 600
    ],
    // 推测数据
    guessData: [
      1200, 1400, 1800, 2500, 800, 700, 900, 1000, 800, 600, 2000, 2400
    ],
    icon: ''
  },
  {
    title: '昨日访问量一览',
    legendData: ['真实访问量', '预估访问量'],
    xData: [
      '0:00',
      '02:00',
      '04:00',
      '06:00',
      '08:00',
      '10:00',
      '12:00',
      '14:00',
      '16:00',
      '18:00',
      '20:00',
      '22:00',
      '24:00'
    ],
    // 真实数据
    realData: [150, 280, 90, 100, 80, 70, 140, 130, 90, 100, 420, 60, 120],
    // 推测数据
    guessData: [120, 140, 180, 250, 80, 70, 90, 100, 80, 60, 200, 240, 140],
    icon: ''
  },
  {
    title: '2020年总成交量',
    legendData: ['真实成交量', '预估成交量'],
    xData: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月'
    ],
    // 真实数据
    realData: [
      85418, 95123, 58203, 48415, 48502, 54312, 48561, 18432, 105210, 91062,
      104813, 84510
    ],
    // 推测数据
    guessData: [
      75418, 85123, 68203, 68415, 38502, 64312, 41561, 11432, 85210, 71062,
      114813, 89510
    ],
    // icon
    icon: '￥'
  },
  {
    title: '昨日成交量',
    legendData: ['真实成交量', '预估成交量'],
    xData: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月'
    ],
    // 真实数据
    realData: [
      2418, 3023, 4823, 5815, 6502, 7312, 4525, 8432, 5010, 3106, 8510, 6500
    ],
    // 推测数据
    guessData: [
      1418, 2023, 3823, 6815, 7502, 6312, 4500, 5532, 6610, 4106, 8910, 7483
    ],
    // icon
    icon: '￥'
  }
]
const currentData = lineData[currentIndex.value || 0]
const option = {
  title: {
    text: currentData.title,
    textStyle: {
      fontSize: '28'
    }
  },
  legend: {
    left: 'center',
    top: '5%',
    // data: ['真实访问量', '预估访问量'],
    data: currentData.legendData
  },
  grid: {
    top: '20%',
    left: '0%',
    right: '2%',
    bottom: '0%',
    // 把x轴和y轴纳入 grid
    containLabel: true
  },
  // 工具提示
  tooltip: {
    // 当鼠标移入坐标轴的显示提示
    trigger: 'axis',
    // 鼠标放上去十字交叉指示器
    axisPointer: {
      type: 'cross'
    }
  },
  xAxis: {
    type: 'category',
    // data: xDataArr,
    data: currentData.xData,
    // 紧挨边缘
    boundaryGap: false
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: currentData.legendData[0],
      smooth: true,
      type: 'line',
      animationDuration: 2800,
      data: currentData.realData,
      animationEasing: 'quadraticOut',
      markPoint: {
        // 最大最小值的相关配置
        label: {
          show: true,
          formatter: '{c}' + currentData.icon
        },
        data: [
          {
            type: 'max',
            name: '最大值'
          },
          {
            type: 'min',
            name: '最小值'
          }
        ],
        animationDuration: 2800,
        animationEasing: 'quadraticOut'
      }, areaStyle: {
        color: '#f3f8ff'
      },
      lineStyle: {
        color: '#3888fa',
        width: 2
      },
      itemStyle: {
        color: '#3888fa',
      }
    },
    {
      name: currentData.legendData[1],
      smooth: true,
      type: 'line',
      animationDuration: 2800,
      data: currentData.guessData,
      animationEasing: 'cubicInOut',
      markPoint: {
        // 最大最小值的相关配置
        label: {
          show: true,
          formatter: '{c}' + currentData.icon
        },
        data: [
          {
            type: 'max',
            name: '最大值'
          },
          {
            type: 'min',
            name: '最小值'
          }
        ],
        animationDuration: 2800,
        animationEasing: 'quadraticOut'
      },
      lineStyle: {
        color: '#FF005A',
        width: 2
      },
      itemStyle: {
        color: '#FF005A',
      }
    }
  ]
}
const getChart = () => {
  const myChart2 = echarts.init(chart.value)
  myChart2.setOption(option)
  option && myChart2.setOption(option)
  window.onresize = function () {
    myChart2.resize()
  }
  cardData[0].data = lineData[currentIndex.value || 0].realData.filter(item => item).reduce((sum, item) => sum += item, 0) + '￥'
  cardData[1].data = lineData[currentIndex.value || 0].guessData.filter(item => item).reduce((sum, item) => sum += item, 0) + '￥'
}
onMounted(() => {
  getChart()
})
</script>

<style lang="less" scope>
.welCome {
  margin-top: 10px;
  padding: 0 10px;

  .el-row {
    .el-card__body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;

      .iconfont {
        font-size: 48px;
      }

      div.left {
        padding: 10px;
        border-radius: 5px;
      }

      div.right {
        height: 68px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
      }
    }

    .el-card__body:hover {
      cursor: pointer;
    }
  }

  #line {
    margin-top: 15px;
  }

  .chart {
    width: 100%;
    height: 400px;
    margin-top: 40px;
    background-color: #fff;
  }
}
</style>