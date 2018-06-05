<template>
	<div class="chart">
		<div class="inner">
			<div id="chart"></div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {}
		},
		methods:{
			fetchCharts(){
				let _this = this;
				var upColor = '#00da3c';
				var downColor = '#ec0000';
				// _this.$http.get().then(res=>{
				// 	const result = res.data;
				// }).catch(err=>console.log(err));
				let myChart = _this.echarts.init(document.getElementById('chart'));
				myChart.setOption({
			        backgroundColor: '#fff',
			        animation: false,
			        tooltip: {
			            trigger: 'axis',
			            axisPointer: {
			                type: 'cross'
			            },
			            backgroundColor: 'rgba(245, 245, 245, 0.8)',
			            borderWidth: 1,
			            borderColor: '#ccc',
			            padding: 10,
			            textStyle: {
			                color: '#000'
			            },
			            position: function (pos, params, el, elRect, size) {
			                var obj = {top: 10};
			                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
			                return obj;
			            }
			            // extraCssText: 'width: 170px'
			        },
			        axisPointer: {
			            link: {xAxisIndex: 'all'},
			            label: {
			                backgroundColor: '#777'
			            }
			        },
			        grid: [
			            {
			                left: '10%',
			                right: '8%',
			                height: '50%'
			            },
			            {
			                left: '10%',
			                right: '8%',
			                top: '63%',
			                height: '16%'
			            }
			        ],
			        xAxis: [
			            {
			                type: 'category',
			                data: ['2016-03-23','2016-04-04'],
			                scale: true,
			                boundaryGap : false,
			                axisLine: {onZero: false},
			                splitLine: {show: false},
			                splitNumber: 20,
			                min: 'dataMin',
			                max: 'dataMax',
			                axisPointer: {
			                    z: 100
			                }
			            },
			            {
			                type: 'category',
			                gridIndex: 1,
			                data: ['2016-03-23','2016-04-04'],
			                scale: true,
			                boundaryGap : false,
			                axisLine: {onZero: false},
			                axisTick: {show: false},
			                splitLine: {show: false},
			                axisLabel: {show: false},
			                splitNumber: 20,
			                min: 'dataMin',
			                max: 'dataMax'
			            }
			        ],
			        yAxis: [
			            {
			                scale: true,
			                splitArea: {
			                    show: true
			                }
			            },
			            {
			                scale: true,
			                gridIndex: 1,
			                splitNumber: 2,
			                axisLabel: {show: false},
			                axisLine: {show: false},
			                axisTick: {show: false},
			                splitLine: {show: false}
			            }
			        ],
			        dataZoom: [
			            {
			                type: 'inside',
			                xAxisIndex: [0, 1],
			                start: 98,
			                end: 100
			            },
			            {
			                show: true,
			                xAxisIndex: [0, 1],
			                type: 'slider',
			                top: '85%',
			                start: 98,
			                end: 100
			            }
			        ],
			        series: [
			            {
			                name: 'Dow-Jones index',
			                type: 'candlestick',
			                data: [17000,18000],
			                itemStyle: {
			                    normal: {
			                        color: upColor,
			                        color0: downColor,
			                        borderColor: null,
			                        borderColor0: null
			                    }
			                },
			                tooltip: {
			                    formatter: function (param) {
			                        param = param[0];
			                        return [
			                            'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
			                            'Open: ' + param.data[0] + '<br/>',
			                            'Close: ' + param.data[1] + '<br/>',
			                            'Lowest: ' + param.data[2] + '<br/>',
			                            'Highest: ' + param.data[3] + '<br/>'
			                        ].join('');
			                    }
			                }
			            }
			        ]
			    }, true);
			}
		},
		mounted(){
			const _this = this;
			_this.fetchCharts();
		}
	}
</script>
<style lang="less" scoped>
	#chart{
		width: 1200px;
		height: 400px;
	}
</style>