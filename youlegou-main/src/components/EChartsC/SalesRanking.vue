<script setup lang="ts">
import request from '../../router/requestEcharts';
import {useStore} from "vuex";
import * as echarts from 'echarts'
import {onMounted, reactive,ref} from "vue";
const store = useStore()
const box = ref<HTMLElement | null>(null)
let echartsData = reactive({});
const start = ref(0);
const end = ref(5);
const time = ref(null);
const titleSize= ref(0)
onMounted(async () => {
  const {data} = await request.get('/api/stock')
  echartsData = data
  titleSize.value = box.value.offsetWidth / 100 * 3.6
  echartsA(data)
});
/*
* X: 代表x轴数据
* D: 代表对应的值
* */
const echartsA=(Data):void=>{
  console.log(Data)
  const data = Data.slice(start.value,end.value)
  const echartsDome = echarts.init(box.value,`${store.state.bgc}`);
  window.addEventListener('resize', function () {
    titleSize.value = box.value.offsetWidth / 100 * 3.6
    echartsDome.resize()
  })
  echartsDome.on('mouseover',()=>{
    clearInterval(time.value)
  })
  echartsDome.on('mouseout', () => {
    clearInterval(time.value)
    time.value = setInterval(()=>{
      if (end.value === 10) {
        start.value = 0;
        end.value =  5
      }else{
        start.value= 5
        end.value = 10
      }
      echartsA(echartsData)
    },2000)
  });
  const option = {
    title: {
      text: '₮  库存与销量分析',
      left: '5%',
      top: '2%',
      textStyle:{
        fontSize: titleSize.value,
        // color: '#ffffff'
      }
    },

    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}<br/>占比： ({d}%)'
    },
    legend: {
      left: 'center',
      top: 'bottom',
      data: [
        data[0].stock,
        data[0].sales,
      ]
    },
    series: [
      {
        name: data[0].name,
        type: 'pie',
        radius: [titleSize.value * 2.8, titleSize.value * 3.6],
        center: ['35%', '30%'],
        // label: {
        //   show: false
        // },
        emphasis: {
          label: {
            show: false
          }
        },
        data: [
          {value: data[0].stock, name: '销量', itemStyle: {color: '#ffb300'}},
          {value: data[0].sales, name: '库存', itemStyle: {color: '#cccccc'}}
        ],
        label: {//饼图中间文字设置
          normal: {
            show: true,
            position: 'center',
            color: '#9A9EBA',
            formatter: () => {
              return (
                  `${data[0].name}\n${data[0].stock}`
              );
            },
            // emphasis: {//中间文字显示
            //   show: true,
            // }
          },
          rich: {
            a: {
              color: "#ffffff",
              padding: [10, -5, 6, 15],
            },
            b: {
              color: 'red',
              padding: [0, 2, 6, -10],
              borderRadius: 2,
            },
          },
        },
      },
      {
        name: data[1].name,
        type: 'pie',
        emphasis: {
          label: {
            show: false
          }
        },
        radius: [titleSize.value * 2.8, titleSize.value * 3.6],
        center: ['65%', '30%'],
        data: [
          {value: data[1].stock, name: '销量', itemStyle: {color: '#18d9d3'}},
          {value: data[1].sales, name: '库存', itemStyle: {color: '#cccccc'}}
        ],
        label: {//饼图中间文字设置
          normal: {
            show: true,
            position: 'center',
            color: '#9A9EBA',
            formatter: () => {
              return (
                  `${data[1].name}\n${data[1].stock}`
              );
            },
            // emphasis: {//中间文字显示
            //   show: true,
            // }
          },
          rich: {
            a: {
              color: "#ffffff",
              padding: [10, -5, 6, 15],
            },
            b: {
              color: 'red',
              padding: [0, 2, 6, -10],
              borderRadius: 2,
            },
          },
        },
      },
      {
        name: data[2].name,
        type: 'pie',
        emphasis: {
          label: {
            show: false
          }
        },
        radius: [titleSize.value * 2.8, titleSize.value * 3.6],
        center: ['20%', '70%'],
        data: [
          {value: data[2].stock, name: '销量', itemStyle: {color: '#e31515'}},
          {value: data[2].sales, name: '库存', itemStyle: {color: '#cccccc'}}
        ],
        label: {//饼图中间文字设置
          normal: {
            show: true,
            position: 'center',
            color: '#9A9EBA',
            formatter: () => {
              return (
                  `${data[2].name}\n${data[2].stock}`
              );
            },
            // emphasis: {//中间文字显示
            //   show: true,
            // }
          },
          rich: {
            a: {
              color: "#ffffff",
              padding: [10, -5, 6, 15],
            },
            b: {
              color: 'red',
              padding: [0, 2, 6, -10],
              borderRadius: 2,
            },
          },
        },
      },
      {
        name: data[3].name,
        type: 'pie',
        emphasis: {
          label: {
            show: false
          }
        },
        radius: [titleSize.value * 2.8, titleSize.value * 3.6],
        center: ['50%', '70%'],
        data: [
          {value: data[3].stock, name: '销量', itemStyle: {color: '#58d726'}},
          {value: data[3].sales, name: '库存', itemStyle: {color: '#cccccc'}}
        ],
        label: {//饼图中间文字设置
          normal: {
            show: true,
            position: 'center',
            color: '#9A9EBA',
            formatter: () => {
              return (
                  `${data[3].name}\n${data[3].stock}`
              );
            },
            // emphasis: {//中间文字显示
            //   show: true,
            // }
          },
          rich: {
            a: {
              color: "#ffffff",
              padding: [10, -5, 6, 15],
            },
            b: {
              color: 'red',
              padding: [0, 2, 6, -10],
              borderRadius: 2,
            },
          },
        },
      },
      {
        name: data[4].name,
        type: 'pie',
        emphasis: {
          label: {
            show: false
          }
        },
        radius: [titleSize.value * 2.8, titleSize.value * 3.6],
        center: ['80%', '70%'],
        data: [
          {value: data[4].stock, name: '销量', itemStyle: {color: '#4568e3'}},
          {value: data[4].sales, name: '库存', itemStyle: {color: '#cccccc'}}
        ],
        label: {//饼图中间文字设置
          normal: {
            show: true,
            position: 'center',
            color: '#9A9EBA',
            formatter: () => {
              return (
                  `${data[4].name}\n${data[4].stock}`
              );
            },
            // emphasis: {//中间文字显示
            //   show: true,
            // }
          },
          rich: {
            a: {
              color: "#ffffff",
              padding: [10, -5, 6, 15],
            },
            b: {
              color: 'red',
              padding: [0, 2, 6, -10],
              borderRadius: 2,
            },
          },
        },
      }
    ]
  };
  echartsDome.setOption(option)
}
// clearInterval(time.value)
time.value = setInterval(()=>{
  if (end.value === 10) {
    start.value = 0;
    end.value =  5
  }else{
    start.value= 5
    end.value = 10
  }
  echartsA(echartsData)
},2000)
</script>

<template>
  <div id="box" ref="box"></div>
</template>

<style scoped>
#box {
  height: 100%;
  width: 100%;
  background: #4a5064;
  border-radius: 20px;
  overflow: hidden;
}
</style>

