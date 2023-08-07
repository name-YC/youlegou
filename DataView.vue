<script lang="ts" setup>
import {ref} from 'vue';
import {mapState , useStore} from 'vuex'
import Tendency from '../components/ECharts/Tendency.vue'
import Map from '../components/ECharts/Map.vue'
import MerchantSales from '../components/ECharts/MerchantSales.vue'
import RegionalSales from '../components/ECharts/RegionalSales.vue'
import Distribution from '../components/ECharts/Distribution.vue'
import SalesRanking from '../components/ECharts/SalesRanking.vue'
const flag = ref(true);
const store = useStore()
const Toggle = ()=>{
  // flag.value = !flag.value
  // store.commit('bgc')
}


//动态时间
const time = ref('')
/*
* 时间函数制定一个时间函数之后用定时器调用即可
* */
const updateTime= ()=> {
  const currentTime = new Date();
  let hours:number = currentTime.getHours();
  let minutes:number = currentTime.getMinutes();
  let seconds:number = currentTime.getSeconds();

  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;

  let timeString = hours + ":" + minutes + ":" + seconds;
  time.value = timeString
}
// 每秒更新时间
setInterval(updateTime, 1000);
</script>



<template>
<div class="box" :class="flag?'blackBox': 'whiteBox'">
  <header>
    <img style="height: 40px;width: 40px" src="../../public/img/login.png" alt="">
    <h2 :class="flag?'white': 'black'">电商平台实时监控系统</h2>
    <div style="font-size: 20px;display: flex;align-items: center" :class="flag?'white': 'black'">{{time}}<el-icon :class="flag?'white': 'black'" @click="Toggle"  style="font-size: 30px"><Refresh /></el-icon></div>
  </header>
  <div class="headerBgc">
    <img v-if="flag" src="../../public/img/headerA.png" alt="">
    <img v-else src="../../public/img/headerB.png" alt="">
  </div>
  <div class="main">
    <!--    左-->
    <div class="left">
      <!--    地区销量趋势-->
      <div class="tendency" style="position: relative"><Tendency/></div>
      <!--      商家统计图-->
      <div class="merchant" style="position: relative"><MerchantSales/></div>
    </div>
    <!--    中-->
    <div class="center">
      <!--  商家分布  -->
      <div class="distribution" style="position: relative">
        <Map/>
      </div>
      <!--  商家分布  -->
      <div class="SalesRanking" style="position: relative"><RegionalSales/></div>
    </div>
    <!--    右-->
    <div class="right">
      <!--  热销商品占比  -->
      <div class="distribution" style="position: relative"><Distribution/></div>
      <!--  库存与销量分析  -->
      <div class="SalesRanking" style="position: relative"><SalesRanking/></div>
    </div>
  </div>
</div>
</template>



<style lang="scss" scoped>
.blackBox{
  background: #161522;
}
.whiteBox{
  background: white;
}
.box {
  height: 100vh;
  width: 100vw;
  padding: 0 20px;
  box-sizing: border-box;

  header {
    display: flex;
    height: 70px;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    z-index: 10;
    position: relative;

    .white {
      color: white;
    }

    .black {
      color: #1a1a1a;
    }
  }

  .headerBgc {
    width: 100%;
    position: absolute;
    top: 10px;
    height: 80px;
    left: 0;
  }

  .main {
    padding: 20px 0;
    box-sizing: border-box;
    height: calc(100% - 80px);
    display: flex;
    justify-content: space-between;
    .center{
      width: 40%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-between;
      .distribution{
        height: 60%;
        border: 1px solid #100c2a;
        border-radius: 20px;
      }
      .SalesRanking{
        height: 38%;
        border: 1px solid #100c2a;
        border-radius: 20px;
      }
    }
    .left,  .right {
      width: 27%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-between;

      .tendency, .merchant,.distribution,.SalesRanking {
        height: 49%;
        //background: #222733;
        border-radius: 20px;
        border: 1px solid #100c2a;
      }
    }
  }
}
</style>
