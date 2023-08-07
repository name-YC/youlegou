<!-- <template>
  <div class="com-container">
    <div class="com-chart" ref="hotRef"></div>
    <i class="iconfont icon-left" @click="toLeft" :style="themeStyle">&#xe6ef;</i>
    <i class="iconfont icon-right" @click="toRight" :style="themeStyle">&#xe6ed;</i>
    <span class="cate-name" :style="themeStyle">{{ cateName }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { getThemeValue } from '@/utils/theme_utils'
import _ from 'lodash'

export default {
  name: 'Hot',
  data() {
    return {
      // 图表的实例对象
      chartInstance: null,
      // 从服务器中获取的所有数据
      allData: null,
      // 当前显示的一级分类数据类型
      currentIndex: 0,
      // 字体响应式大小
      titleFontSize: null,
    }
  },
  created() {
    // this.$socket.registerCallBack('hotData', this.getData)
  },
  computed: {
    ...mapState(['theme']),
    cateName() {
      if (!this.allData) return ''
      return this.allData[this.currentIndex].name
    },
    themeStyle() {
      if (!this.titleFontSize) {
        // return { color: getThemeValue(this.theme).titleColor }
      }
      return {
        fontSize: this.titleFontSize + 'px',
        // color: getThemeValue(this.theme).titleColor,
      }
    },
  },
  watch: {
    theme() {
      console.log('主题切换了')
      // 销毁当前的图表
      this.chartInstance.dispose()
      // 以最新主题初始化图表对象
      this.initChart()
      // 屏幕适配
      this.screenAdapter()
      // 渲染数据
      this.updateChart()
    },
  },
  mounted() {
    this.initChart()
    // this.getData()
    this.$socket.send({
      action: 'getData',
      socketType: 'hotData',
      chartName: 'hotproduct',
      value: '',
    })
    window.addEventListener('resize', this.screenAdapter)
    // 主动触发 响应式配置
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
    this.$socket.unRegisterCallBack('hotData')
    this.chartInstance.dispose()
  },
  methods: {
    // 初始化图表的方法
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.hotRef, this.theme)

      const initOption = {
        title: {
          text: '▎热销商品占比',
          left: 20,
          top: 20,
        },
        legend: {
          top: '15%',
          // 图标类型 圆形
          icon: 'circle',
        },
        tooltip: {
          show: true,
          // formatter:'hhh'
          formatter: arg => {
            // console.log('arg: ', arg)
            // 拿到三级分类的数据
            const thirdCategory = arg.data.children
            // 计算所有三级分类的数值总和，才能计算出百分比
            let total = 0
            thirdCategory.forEach(item => {
              total += item.value
            })
            // 显示的文本
            let showStr = ''
            thirdCategory.forEach(item => {
              showStr += `
                ${item.name}：${_.round((item.value / total) * 100, 2)}% <br/>
              `
            })
            return showStr
          },
        },
        series: [
          {
            type: 'pie',
            label: {
              show: true,
              formatter:`{b}{d}%`
            },
            // 高亮状态下的样式
            emphasis: {
              labelLine: {
                // 连接文字的线条
                show: true,
              },
            },
          },
        ],
      }
      this.chartInstance.setOption(initOption)
    },
    // 发送请求，获取数据
    getData(res) {
      // const { data: res } = await this.$http.get('/hotproduct')
      this.allData = res
      console.log(this.allData)
      this.updateChart()
    },
    // 更新图表配置项
    updateChart() {
      // 处理数据
      const legenDateArr = this.allData[this.currentIndex].children.map(item => item.name)
      const seriesDataArr = this.allData[this.currentIndex].children.map(item => {
        return {
          name: item.name,
          value: item.value,
          children: item.children,
        }
      })
      const dataOption = {
        legend: {
          data: legenDateArr,
        },
        series: [
          {
            data: seriesDataArr,
          },
        ],
      }
      this.chartInstance.setOption(dataOption)
    },
    // 不同分辨率的响应式
    screenAdapter() {
      this.titleFontSize = (this.$refs.hotRef.offsetWidth / 100) * 3.6
      console.log('titleFontSize: ', this.titleFontSize)

      const adapterOption = {
        title: {
          textStyle: {
            fontSize: this.titleFontSize,
          },
        },
        legend: {
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          // 图例的间隔
          itemGap: this.titleFontSize / 2,
          textStyle: {
            fontSize: this.titleFontSize / 1.2,
          },
        },
        series: [
          {
            // 饼图的大小 半径
            radius: this.titleFontSize * 4.5,
            // 控制饼图的位置 x,y
            center: ['50%', '60%'],
          },
        ],
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    // 点击左侧按钮
    toLeft() {
      this.currentIndex--
      // 已到达最左边
      if (this.currentIndex < 0) this.currentIndex = this.allData.length - 1
      this.updateChart()
    },
    // 点击右侧按钮
    toRight() {
      this.currentIndex++
      // 已到达最右边
      if (this.currentIndex > this.allData.length - 1) this.currentIndex = 0
      this.updateChart()
    },
  },
}
</script>

<style lang="less" scoped>
.com-container {
  i {
    z-index: 999;
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    cursor: pointer;
  }
  i.icon-left {
    left: 10%;
  }
  i.icon-right {
    right: 10%;
  }
  .cate-name {
    position: absolute;
    right: 10%;
    bottom: 20px;
    z-index: 999;
  }
}
</style> -->
<template>
  <!-- demo -->
  <div class="content-right-table">
    <el-table ref="tableData" :data="data" tooltip-effect="light" style="width: 100%" @expand-change="handle_list">
      <el-table-column prop="children" type="expand" width="100">
        <template slot-scope="slots">
          <el-table ref="subTableData" :data="slots.row.children" tooltip-effect="light" @expand-change="handle_subList">
            <el-table-column prop="children" type="expand" width="100">
              <template slot-scope="scopes">
                <el-table ref="secSubTableData" :data="scopes.row.children" tooltip-effect="light">
                  <el-table-column prop="portNumber" label="编号" />
                  <el-table-column prop="name" label="名称" />
                  <el-table-column prop="ip" label="IP" />
                  <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                      <el-button type="text" class="primary-text" @click="handle_edit(scope.row)">编辑</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="编号" />
            <el-table-column prop="size" label="大小" />
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="text" class="danger-text" @click="handle_delete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column label="ID" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.rtuId }}</template>
      </el-table-column>
      <el-table-column label="名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <div @click="handle_jump(scope.row)">
            <span size="medium">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="数量" />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          "cat_id": 1,
          "cat_name": "大家电",
          "cat_pid": 0,
          "cat_level": 0,
          "cat_deleted": false,
          "children": [
            {
              "cat_id": 3,
              "cat_name": "电视",
              "cat_pid": 1,
              "cat_level": 1,
              "cat_deleted": false,
              "children": [
                {
                  "cat_id": 6,
                  "cat_name": "曲面电视",
                  "cat_pid": 3,
                  "cat_level": 2,
                  "cat_deleted": false
                },
                {
                  "cat_id": 7,
                  "cat_name": "海信",
                  "cat_pid": 3,
                  "cat_level": 2,
                  "cat_deleted": false
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    handle_list(row) {
      getSubTableData({ id: row.id })
        .then(response => {
          if (response.data.result === '1') {
            const tableArr =data
            arr.forEach(element => {
              Vue.set(element, 'children', [])
            })
            row.children = tableArr
          } else {
            this.$message.error(response.data.resultInfo)
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    }
  },
}
</script>

<style></style>