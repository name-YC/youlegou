import * as echarts from 'echarts'

export default function DisplayEC (ref:any, value:string,obj: object) {
    console.log(obj)
    let myChart = echarts.init(ref,'dark')
    // myChart.dispose();
    // 通过ref属性来获取图表的实例
    type EChartsOption = echarts.EChartsOption;
    myChart = echarts.init(ref)
    window.addEventListener('resize', function () {
        myChart.resize()
    })
    // const symbolSize:number = 15

    console.log('echarts', value)
    let option: EChartsOption
    if (value === 'a') {
        option = {
            title: {
                top: '20px',
                left: '30px',
                textStyle: {
                    fontSize: 18,
                    fontWeight: 500
                }
            },
            // 位置
            grid: {
                top: '30%',
                bottom: '10%',
                right: '3%',
                left: '2%',
                containLabel: true
            },
            legend: {
                top: '17%',
                data: ['上海', '北京', '深圳', '广州', '重庆'],
                icon: 'circle',
                textStyle: {
                    // color: 'white'
                }
            },
            // x轴
            xAxis: {
                show: true,
                type: 'category',
                axisTick: {
                    show: false
                },
                axisPointer: {
                    show: true,
                    type: 'line',
                    handle: {
                        show: true,
                        size: 0
                        // icon: ''
                    },
                    lineStyle: {
                        type: 'solid',
                        color: '#f57b00',
                        width: 3
                    }
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                boundaryGap: false,
                data: obj.common.month
            },
            // y轴
            yAxis: {
                type: 'value',
                splitLine:{
                    show: false
                },
                data: [0, 20, 40, 60, 80, 100],
                splitLine: {
                    show: true
                },
                splitNumber: 5,
                axisTick: {
                    show: false
                },
                nameTextStyle: {
                    // color: '#d9cccc'
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        // color: '#d7d7d7',
                        width: 3
                    }
                }
            },
            // 数据
            series: [
                {
                    data: obj.map.data[0].data,
                    type: 'line',
                    name: obj.map.data[0].name,
                    stack: 'Total',
                    top: 0,
                    smooth: true,
                    // symbol: 'circle',
                    symbolSize: 10,
                    showSymbol: false,
                    lineStyle: {
                        color: '#da5400'
                    },
                    areaStyle: {
                        textStyle: {
                            // 文字颜色
                            color: '#e15e0d',
                            // 字体大小
                            fontSize: 18,
                            fontWeight: 500
                        },
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 1,
                                    color: 'rgba(207, 217, 255,0)'
                                },
                                {
                                    offset: 0,
                                    color: 'rgb(225,94,13)'
                                }
                            ],
                            global: false // 缺省为 false
                        }
                    },
                    itemStyle: {
                        color: '#ff6100',
                        borderWidth: 0
                        // borderColo: '#fff'
                    }
                },
                {
                    data: obj.map.data[1].data,
                    type: 'line',
                    name: obj.map.data[1].name,
                    stack: 'Total',
                    top: 0,
                    smooth: true,
                    // symbol: 'circle',
                    symbolSize: 10,
                    showSymbol: false,
                    lineStyle: {
                        color: '#61c43a'
                    },
                    areaStyle: {
                        textStyle: {
                            // 文字颜色
                            color: '#61c43a',
                            // 字体大小
                            fontSize: 18,
                            fontWeight: 500
                        },
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 1,
                                    color: 'rgba(207, 217, 255,0)'
                                },
                                {
                                    offset: 0,
                                    color: 'rgb(59,196,6)'
                                }
                            ],
                            global: false // 缺省为 false
                        }
                    },
                    itemStyle: {
                        color: '#61c43a',
                        borderWidth: 0
                        // borderColo: '#fff'
                    }
                },
                {
                    data: obj.map.data[2].data,
                    type: 'line',
                    name: obj.map.data[2].name,
                    stack: 'Total',
                    top: 0,
                    smooth: true,
                    // symbol: 'circle',
                    symbolSize: 10,
                    showSymbol: false,
                    lineStyle: {
                        color: '#c01313'
                    },
                    areaStyle: {
                        textStyle: {
                            // 文字颜色
                            color: '#d21b1b',
                            // 字体大小
                            fontSize: 18,
                            fontWeight: 500
                        },
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 1,
                                    color: 'rgba(207, 217, 255,0)'
                                },
                                {
                                    offset: 0,
                                    color: 'rgb(211,58,58)'
                                }
                            ],
                            global: false // 缺省为 false
                        }
                    },
                    itemStyle: {
                        color: '#e11d1d',
                        borderWidth: 0
                        // borderColo: '#fff'
                    }
                },
                {
                    data: obj.map.data[3].data,
                    type: 'line',
                    name: obj.map.data[3].name,
                    stack: 'Total',
                    top: 0,
                    smooth: true,
                    // symbol: 'circle',
                    symbolSize: 10,
                    showSymbol: false,
                    lineStyle: {
                        color: '#18d9d3'
                    },
                    areaStyle: {
                        textStyle: {
                            // 文字颜色
                            color: '#18d9d3',
                            // 字体大小
                            fontSize: 18,
                            fontWeight: 500
                        },
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 1,
                                    color: 'rgba(207, 217, 255,0)'
                                },
                                {
                                    offset: 0,
                                    color: 'rgb(39,220,215)'
                                }
                            ],
                            global: false // 缺省为 false
                        }
                    },
                    itemStyle: {
                        color: '#18d9d3',
                        borderWidth: 0
                        // borderColo: '#fff'
                    }
                },
                {
                    data: obj.map.data[4].data,
                    type: 'line',
                    name: obj.map.data[4].name,
                    stack: 'Total',
                    top: 0,
                    smooth: true,
                    // symbol: 'circle',
                    symbolSize: 10,
                    showSymbol: false,
                    lineStyle: {
                        color: '#faca58'
                    },
                    areaStyle: {
                        textStyle: {
                            // 文字颜色
                            color: '#ffb300',
                            // 字体大小
                            fontSize: 18,
                            fontWeight: 500
                        },
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 1,
                                    color: 'rgba(207, 217, 255,0)'
                                },
                                {
                                    offset: 0,
                                    color: 'rgb(238,214,158)'
                                }
                            ],
                            global: false // 缺省为 false
                        }
                    },
                    itemStyle: {
                        color: '#ffb300',
                        borderWidth: 0
                        // borderColo: '#fff'
                    }
                }
            ]
        }
    } else if (value === 'b') {
        option =  {
            title: {
                top: '20px',
                left: '30px',
                textStyle: {
                    fontSize: 18,
                    fontWeight: 500
                }
            },
            // 位置
            grid: {
                top: '30%',
                bottom: '10%',
                right: '3%',
                left: '2%',
                containLabel: true
            },
            legend: {
                top: '17%',
                data: ['女装', '手机数码', '男装', '大家电', '美妆护肤'],
                icon: 'circle',
                textStyle: {
                    color: 'white'
                }
            },
            // x轴
            xAxis: {
                show: true,
                type: 'category',
                axisTick: {
                    show: false
                },
                axisPointer: {
                    show: true,
                    type: 'line',
                    handle: {
                        show: true,
                        size: 0
                        // icon: ''
                    },
                    lineStyle: {
                        type: 'solid',
                        color: '#f57b00',
                        width: 3
                    }
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                boundaryGap: false,
                data:  obj.common.month
            },
            // y轴
            yAxis: {
                type: 'value',
                data: [0, 20, 40, 60, 80, 100],
                splitLine: {
                    show: true
                },
                splitNumber: 5,
                axisTick: {
                    show: false
                },
                nameTextStyle: {
                    color: '#cccccc'
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#c9c9c9',
                        width: 3
                    }
                }
            },
            // 数据
            series: [
                {
                    data: obj.commodity.data[0].data,
                    type: 'line',
                    name: obj.commodity.data[0].name,
                    stack: 'Total',
                    top: 0,
                    smooth: true,
                    // symbol: 'circle',
                    symbolSize: 10,
                    showSymbol: false,
                    lineStyle: {
                        color: '#ea5c00'
                    },
                    areaStyle: {
                        textStyle: {
                            // 文字颜色
                            color: '#ffb300',
                            // 字体大小
                            fontSize: 18,
                            fontWeight: 500
                        },
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 1,
                                    color: 'rgba(207, 217, 255,0)'
                                },
                                {
                                    offset: 0,
                                    color: 'rgb(225,94,13)'
                                }
                            ],
                            global: false // 缺省为 false
                        }
                    },
                    itemStyle: {
                        color: '#e15e0d',
                        borderWidth: 0
                        // borderColo: '#fff'
                    }
                },
                {
                    data: obj.commodity.data[1].data,
                    type: 'line',
                    name: obj.commodity.data[1].name,
                    stack: 'Total',
                    top: 0,
                    smooth: true,
                    // symbol: 'circle',
                    symbolSize: 10,
                    showSymbol: false,
                    lineStyle: {
                        color: '#50cb20'
                    },
                    areaStyle: {
                        textStyle: {
                            // 文字颜色
                            color: '#13d048',
                            // 字体大小
                            fontSize: 18,
                            fontWeight: 500
                        },
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 1,
                                    color: 'rgba(207, 217, 255,0)'
                                },
                                {
                                    offset: 0,
                                    color: 'rgb(97,196,58)'
                                }
                            ],
                            global: false // 缺省为 false
                        }
                    },
                    itemStyle: {
                        color: '#0ccb42',
                        borderWidth: 0
                        // borderColo: '#fff'
                    }
                },
                {
                    data: obj.commodity.data[2].data,
                    type: 'line',
                    name: obj.commodity.data[2].name,
                    stack: 'Total',
                    top: 0,
                    smooth: true,
                    // symbol: 'circle',
                    symbolSize: 10,
                    showSymbol: false,
                    lineStyle: {
                        color: '#c91212'
                    },
                    areaStyle: {
                        textStyle: {
                            // 文字颜色
                            color: '#b61616',
                            // 字体大小
                            fontSize: 18,
                            fontWeight: 500
                        },
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 1,
                                    color: 'rgba(207, 217, 255,0)'
                                },
                                {
                                    offset: 0,
                                    color: 'rgb(217,51,51)'
                                }
                            ],
                            global: false // 缺省为 false
                        }
                    },
                    itemStyle: {
                        color: '#ad2222',
                        borderWidth: 0
                        // borderColo: '#fff'
                    }
                },
                {
                    data: obj.commodity.data[3].data,
                    type: 'line',
                    name: obj.commodity.data[3].name,
                    stack: 'Total',
                    top: 0,
                    smooth: true,
                    // symbol: 'circle',
                    symbolSize: 10,
                    showSymbol: false,
                    lineStyle: {
                        color: '#00bdb8'
                    },
                    areaStyle: {
                        textStyle: {
                            // 文字颜色
                            color: '#18d9d3',
                            // 字体大小
                            fontSize: 18,
                            fontWeight: 500
                        },
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 1,
                                    color: 'rgba(207, 217, 255,0)'
                                },
                                {
                                    offset: 0,
                                    color: 'rgb(74,222,217)'
                                }
                            ],
                            global: false // 缺省为 false
                        }
                    },
                    itemStyle: {
                        color: '#18d9d3',
                        borderWidth: 0
                        // borderColo: '#fff'
                    }
                },
                {
                    data: obj.commodity.data[4].data,
                    type: 'line',
                    name: obj.commodity.data[4].name,
                    stack: 'Total',
                    top: 0,
                    smooth: true,
                    // symbol: 'circle',
                    symbolSize: 10,
                    showSymbol: false,
                    lineStyle: {
                        color: '#faca58'
                    },
                    areaStyle: {
                        textStyle: {
                            // 文字颜色
                            color: '#ffb300',
                            // 字体大小
                            fontSize: 18,
                            fontWeight: 500
                        },
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 1,
                                    color: 'rgba(207, 217, 255,0)'
                                },
                                {
                                    offset: 0,
                                    color: 'rgb(238,214,158)'
                                }
                            ],
                            global: false // 缺省为 false
                        }
                    },
                    itemStyle: {
                        color: '#ffb300',
                        borderWidth: 0
                        // borderColo: '#fff'
                    }
                }
            ]
        }
    } else if (value === 'c') {
        option = {
            title: {
                top: '20px',
                left: '30px',
                textStyle: {
                    fontSize: 18,
                    fontWeight: 500
                }
            },
            // 位置
            grid: {
                top: '30%',
                bottom: '10%',
                right: '3%',
                left: '2%',
                containLabel: true
            },
            legend: {
                top: '17%',
                data: ['商家1', '商家2', '商家3', '商家4', '商家5'],
                icon: 'circle',
                textStyle: {
                    color: 'white'
                }
            },
            // x轴
            xAxis: {
                show: true,
                type: 'category',
                axisTick: {
                    show: false
                },
                axisPointer: {
                    show: true,
                    type: 'line',
                    handle: {
                        show: true,
                        size: 0
                        // icon: ''
                    },
                    lineStyle: {
                        type: 'solid',
                        color: '#f57b00',
                        width: 3
                    }
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                boundaryGap: false,
                data:  obj.common.month
            },
            // y轴
            yAxis: {
                type: 'value',
                data: [0, 20, 40, 60, 80, 100],
                splitLine: {
                    show: true
                },
                splitNumber: 5,
                axisTick: {
                    show: false
                },
                nameTextStyle: {
                    color: '#cecece'
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#d7d7d7',
                        width: 3
                    }
                }
            },
            // 数据
            series: [
                {
                    data:obj.seller.data[0].data,
                    type: 'line',
                    name: obj.seller.data[0].name,
                    stack: 'Total',
                    top: 10,
                    smooth: true,
                    // symbol: 'circle',
                    symbolSize: 10,
                    showSymbol: false,
                    lineStyle: {
                        color: '#ff6200'
                    },
                    areaStyle: {
                        textStyle: {
                            // 文字颜色
                            color: '#e15e0d',
                            // 字体大小
                            fontSize: 18,
                            fontWeight: 500
                        },
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 1,
                                    color: 'rgba(207, 217, 255,0)'
                                },
                                {
                                    offset: 0,
                                    color: 'rgb(211,98,28)'
                                }
                            ],
                            global: false // 缺省为 false
                        }
                    },
                    itemStyle: {
                        color: '#e15e0d',
                        borderWidth: 0
                        // borderColo: '#fff'
                    }
                },
                {
                    data: obj.seller.data[1].data,
                    type: 'line',
                    name: obj.seller.data[1].name,
                    stack: 'Total',
                    top: 0,
                    smooth: true,
                    // symbol: 'circle',
                    symbolSize: 10,
                    showSymbol: false,
                    lineStyle: {
                        color: '#3dce03'
                    },
                    areaStyle: {
                        textStyle: {
                            // 文字颜色
                            color: '#61c43a',
                            // 字体大小
                            fontSize: 18,
                            fontWeight: 500
                        },
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 1,
                                    color: 'rgba(207, 217, 255,0)'
                                },
                                {
                                    offset: 0,
                                    color: 'rgb(97,196,58)'
                                }
                            ],
                            global: false // 缺省为 false
                        }
                    },
                    itemStyle: {
                        color: '#61c43a',
                        borderWidth: 0
                        // borderColo: '#fff'
                    }
                },
                {
                    data: obj.seller.data[2].data,
                    type: 'line',
                    name: obj.seller.data[2].data,
                    stack: 'Total',
                    top: 0,
                    smooth: true,
                    // symbol: 'circle',
                    symbolSize: 10,
                    showSymbol: false,
                    lineStyle: {
                        color: '#cc1212'
                    },
                    areaStyle: {
                        textStyle: {
                            // 文字颜色
                            color: '#cc1313',
                            // 字体大小
                            fontSize: 18,
                            fontWeight: 500
                        },
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 1,
                                    color: 'rgba(207, 217, 255,0)'
                                },
                                {
                                    offset: 0,
                                    color: 'rgb(208,74,74)'
                                }
                            ],
                            global: false // 缺省为 false
                        }
                    },
                    itemStyle: {
                        color: '#d71e1e',
                        borderWidth: 0
                        // borderColo: '#fff'
                    }
                },
                {
                    data:obj.seller.data[3].data,
                    type: 'line',
                    name: obj.seller.data[3].name,
                    stack: 'Total',
                    top: 0,
                    smooth: true,
                    // symbol: 'circle',
                    symbolSize: 10,
                    showSymbol: false,
                    lineStyle: {
                        color: '#00e0d8'
                    },
                    areaStyle: {
                        textStyle: {
                            // 文字颜色
                            color: '#18d9d3',
                            // 字体大小
                            fontSize: 18,
                            fontWeight: 500
                        },
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 1,
                                    color: 'rgba(207, 217, 255,0)'
                                },
                                {
                                    offset: 0,
                                    color: 'rgb(24,217,211)'
                                }
                            ],
                            global: false // 缺省为 false
                        }
                    },
                    itemStyle: {
                        color: '#18d9d3',
                        borderWidth: 0
                        // borderColo: '#fff'
                    }
                },
                {
                    data: obj.seller.data[4].data,
                    type: 'line',
                    name:  obj.seller.data[4].name,
                    stack: 'Total',
                    top: 0,
                    smooth: true,
                    // symbol: 'circle',
                    symbolSize: 10,
                    showSymbol: false,
                    lineStyle: {
                        color: '#faca58'
                    },
                    areaStyle: {
                        textStyle: {
                            // 文字颜色
                            color: '#ffb300',
                            // 字体大小
                            fontSize: 18,
                            fontWeight: 500
                        },
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 1,
                                    color: 'rgba(207, 217, 255,0)'
                                },
                                {
                                    offset: 0,
                                    color: 'rgb(238,214,158)'
                                }
                            ],
                            global: false // 缺省为 false
                        }
                    },
                    itemStyle: {
                        color: '#ffb300',
                        borderWidth: 0
                        // borderColo: '#fff'
                    }
                }
            ]
        }
    }
    // @ts-ignore
    myChart.setOption(option)
}
