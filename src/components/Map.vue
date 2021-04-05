<template>
	<div id="map">
		
	</div>
</template>

<script>
	import echarts from 'echarts' //导入echarts --- 报错：Cannot read property 'getAttribute' of null 必须放到 </body> 之前，不能放到head里面。在 vue 中需要放到 钩子函数中。
	import 'echarts/map/js/china' //导入中国地图
	import vintage from 'echarts/theme/vintage' //导入主题
	
	export default {
		name: "Map",
		data() {
			return {
				real_time_data: [] ,//定义一个存放数据的数组
				latest_date_statistics: 0
			}
		},
		methods: {
			set_map(){
				var myChart = echarts.init(document.getElementById('map'),'vintage');
				myChart.showLoading();
				let option = {
				   title: {
				        text: '\n中国新型肺炎疫情实时数据\n',
				        subtext: `新型肺炎疫情实时数据来自阿克布斯科技\n\n最新统计日期：${this.latest_date_statistics}`,
				        sublink: 'http://www.baidu.com'
				    },
				    tooltip: {
				        trigger: 'item',
				        formatter: '{b}<br/>{c} (人)'
				    },
				    toolbox: {
				        show: true,
				        orient: 'vertical',
				        left: 'right',
				        top: 'center',
				        feature: {
				            dataView: {readOnly: false},
				            restore: {},
				            saveAsImage: {}
				        }
				    },
				    visualMap: {
						type: 'piecewise', // 定义为分段型 visualMap
				        // min: 800,
				        // max: 50000,
				        // text: ['High', 'Low'],
				        realtime: false,
				        calculable: true,
				        inRange: {
				            color: ['lightskyblue', 'yellow', 'orangered']
				        },
						pieces: [
						    {gt: 1500},            // (1500, Infinity]
						    {gt: 1000, lte: 1500},  // (900, 1500]
						    {gt: 300, lte: 1000},  // (310, 1000]
						    {gt: 200, lte: 300},   // (200, 300]
						    {gt: 10, lte: 200},       // (10, 200], label: '10 到 200'
						    {value: 123, label: '123（自定义特殊颜色）', color: 'grey'},  // [123, 123]
						    {lt: 10}                 // (-Infinity, 5)
						]
				    },
				    series: [
				        {
				            name: '中国新型冠状病毒',
							type: 'map',
							map: 'china',
				            label: {
				                show: true
				            },
							zoom: 1,
							roam: true,
				            data: JSON.parse(JSON.stringify(this.real_time_data)) //得到深拷贝的原始数据对象
				        }
				    ]
				};
				myChart.setOption(option);
				return myChart;
			}
		},
		mounted(){
			new Promise((resolve,reject) => {
				
				//跨域 --- 协议 域议 端口 三块有一个没有满足，就成为跨域。
				//jsonp --- 可以解决跨域
				// this.$jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427',(error,data) => {
				// 	for(let item of data.data.list){ //使用for .. of .. 遍历数据
				// 		let {name,value} = item; //通过结构的方式解析数据
				// 		this.real_time_data.push({name,value}); //对象ES6写法 对象中，当属性值和属性相同时，可以省略属性名。
				// 	}
				// 	resolve();
				// });
				
				this.$.ajax('https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427',{
					data:{
						
					},
					dataType:'jsonp',//服务器返回json格式数据
					type:'post',//HTTP请求类型
					success: data => { //箭头函数 指向的是声明时的对象 也就是 Vue 实例
						for(let item of data.data.list){ //使用 for .. of .. 遍历数据
							let {name,value} = item; //通过结构的方式解析数据
							this.real_time_data.push({name,value}); //对象ES6写法 对象中，当属性值和属性相同时，可以省略属性名。
						}
						this.real_time_data.push({name: '南海诸岛',value: 0});
						this.latest_date_statistics = data.data.mtime;
						resolve();
					},
					error:function(xhr,type,errorThrown){
						reject();
					}
				});
							
			}).then(data => {
				var myChart = this.set_map();
				setTimeout(() => {
					myChart.hideLoading();
				},1500);
			},error => {
				console.log('网络中断！');
			});
		}
	}
</script> 

<style>
	*{
		margin: 0;
		padding: 0;
		list-style: none;
		text-decoration: none;
		color: black;
	}
	html,
	body{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: rgb(254,248,239);
	}
	#map{
		width: calc(100% - 40px);
		height: calc(100vh - 40px);
		margin: 20px auto;
	}
	#map canvas{
		width: 100% !important;
		height: 100%;
	}
</style>
