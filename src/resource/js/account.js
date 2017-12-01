import TopBar from "@/components/topBar.vue";
import singleAxisScatterDiagram from "@/components/echarts/singleAxisScatter.vue"
import clock from "@/components/clock.vue"
import areaLineChartTmp from "@/components/echarts/areaLineChartTmp.vue"
import barChartTmp from "@/components/echarts/barChartTmp.vue"
import Pie from  '@/components/echarts/PieNest.vue'
import API from '@/api/API';
import baseConfig from '@/api/config'
const api = new API();
export default {
  components:{
    TopBar,
    singleAxisScatterDiagram,
    clock,
    areaLineChartTmp,
    barChartTmp,
    Pie
  },
  name:'collection',
  props:{
    topBarData:{
      type:Object,
      default:function(){
        return{
          className:'topBarName',
          value:"营业移网新开户情况监控",
          outLine:'移网'
        }
      }
    },
    tmp:{
      type:String,
      default:"0"
    },
    currentIndex:{
      type:Number,
      default:0
    },
    pageVariables:{
      type:String,
      default:"YW"
    },
    pageCode:{
      type:String,
      default:"KX_P01"
    },
    varPageKey:{
      type:String,
      default:"V_KX_P01"
    },
    varCycleKey:{
      type:String,
      default:"V_KX_CYCLE"
    },
    varCustKey:{
      type:String,
      default:"V_KX_JGK"
    }
   
  },

  data(){
    return{
      color:'black',
      screenWidth:1920,

      // topBarData:{
      //       className:'topBarName',
      //       value:"营业移网新开户情况监控"
      //     },
      // pageVariables:"YW",

      tooltip : {

              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },
              formatter: function(name){
                  var array = name[0].axisValue.split(",");
                  if(array.length>1){
                    return name[0].axisValue.split(",")[1];
                  }else
                    return name[0].axisValue.split(",")[0];
              }
      },
      systooltip:{
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function(name){
            var str = "";
            for(var i in name){
              var value = name[i].value[0];
              if(typeof(name[i].value[1]) != "undefined" &&
                  $.trim(name[i].value[1].toString()) != "" &&
                  $.trim(name[i].value[1].toString()) !="null" &&
                  $.trim(name[i].value[1].toString()) !="undefined"){
                    value = name[i].value[1];
              }
              str += name[i].seriesName+":"+ value + "</br>";
            }
            return str;
        }
      },
      userXAxis: {
        data: '',
        silent: false,
        splitLine: {
          show: false
        },
        axisLabel:{
          interval: 0,
          color:'white',
          formatter: function(name){
              return name.replace("分公司", "");
          }
        },
        axisLine:{
          lineStyle:{color:'#a4a9bc'}
        },
        axisTick:{
          show: true,
          interval: 0
        }
      },
      userYAxis:{
        axisLabel:{
          color:'white'
        },
        name: '',//unit
        nameTextStyle:{
          fontSize: 13,
          fontWeight: 'bold',
          color:'#FFF',
          padding:[0,-1500,19,0]
        },
        type : 'value',
        splitLine: {
          show:true,
          lineStyle: {
            type: 'dotted',
            color: '#57617B' //分隔线颜色设置
          }
        },
        axisTick: {
          show: false //是否显示坐标轴刻度
        },
        axisLine:{
          show: true,
          lineStyle:{
            color:'#a4a9bc'
          }
        }
      },
      userYAxises:{
        axisLabel:{
          color:'white'
        },
        name: '',//unit
        nameTextStyle:{
          fontSize: 13,
          fontWeight: 'bold',
          color:'#FFF',
          padding:[0,-1500,0,0]
        },
        type : 'value',
        splitLine: {
          show:true,
          lineStyle: {
            type: 'dotted',
            color: '#57617B' //分隔线颜色设置
          }
        },
        axisTick: {
          show: false //是否显示坐标轴刻度
        },
        axisLine:{
          show: true,
          lineStyle:{
            color:'#a4a9bc'
          }
        }
      },
      userSeries:{
          type: 'line',
          smooth: true,
          name : '',
          showSymbol: true,
          itemStyle: {
            normal: {
                color: ''
            },
            label: {
                show: true,
                position: "top"
            }
          },
          label: {
            normal: {
                show: true,
                position: 'top'
            }
          },
          data: ''
      },
      xAxis: {
            data: '',
            silent: false,
            splitLine: {
              show: false
            },
            axisLabel:{
              interval: 0,
              color:'white',
              formatter: function(name){
                  return name.split(",")[0];
              }
            },
            axisLine:{
              lineStyle:{color:'#a4a9bc'}
            },
            axisTick:{
              show: true,
              interval: 0
            }
      },
      
      areaLineTitle:{
          text: '',
          x:'left',
          textStyle: {
              fontWeight: 'bold',
              // fontSize: 20,
              color: '#FFFFFF'
          },
          show:false
      },
      arealineXAxis:{
        data: '',
        type: 'value',
        min:0,
        max:24,
        minInterval: 6,
        silent: false,
        splitLine: {
          show: false
        },
        axisLabel:{
          interval: 0,
          color:'white',
          formatter: function(name){
            return name+"点";
          }
        },
        axisLine:{
          lineStyle:{color:'#a4a9bc',width:1}
        },
        axisTick:{
          show: true,
          interval: 0
        },
      },
      pieLengend:{
        show:true,
        itemHeight:4,
        itemWidth:12,
        selectedMode:false,
        top:-5,
        orient: 'horizontal',
        x: 'left',
        y:0,
        data:["a","b"],
        textStyle:{
          color:'#FFFFFF'
        }
      },
      series1Obj:{
        name: '',
        type: 'pie',
        radius : '80%',
        center:["50%","50%"],
        z:2,
        data:[
          {value:325, name:'BSS'},
          {value:310, name:'CBSS'},
          {value:234, name:'沃受理'}
        ],
        label:{
          normal:{
            position:'inner',
            color:'white',
            fontSize:12,
            formatter: function (a) {
              if(a.percent>8.5)
                return a.percent.toFixed(1) +'%';
              else
                return ''
            },
            textShadowColor:'black',
            textShadowBlur:10
          }
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        hoverAnimation: false,
        color:["#9c6bb3","#0fdadd","#b994ff","#50b8ff"]
      },

      seriesObj2:{
            center:["50%","50%"],
            color:['#315b9d'],
            name:'',
            type:'pie',
            radius: '90%',
            z:1,
            labelLine: {
              normal: {
                show: true,
                length:5,
                length2:5,
                smooth:.5
              }
            },
            label:{
              normal:{
                color:'white',
                fontSize:12,
              }
            },
            hoverAnimation: false,
            data:[
              {value:100, name:'所有系统'}
            ]
       },

      rate:'95.58%',
      counts:['207','56,236','4,839,458'],
      jkdata:[["集客","15"],["预付费","7"],["后付费","8"]],
      gzdata:[["公众","192"],["预付费","150"],["后付费","42"]],

      jkdataArray:[[["集客","15"],["预付费","7"],["后付费","8"]],
                    [["集客","15635"],["预付费","221"],["后付费","15414"]],
                    [["集客","2828228"],["预付费","12581"],["后付费","2815647"]]],
      gzdataArray:[[["公众","192"],["预付费","150"],["后付费","42"]],
                  [["公众","40601"],["预付费","22147"],["后付费","18454"]],
                  [["公众","2010999"],["预付费","1356874"],["后付费","654125"]]],
      totalArray:[207,56236,4839227],
      total: 207,

      mapDataArray:[{areas:[["A00","中心","192"],
                    ["A01","东区分公司","5"], 
                    ["A02","南区分公司","5"] ,
                    ["A03","西区分公司","2"],
                    ["A04","北区分公司","2"],
                    ["A05","中区分公司","2"],
                    ["A06","宝山分公司","4"],
                    ["A07","闵行分公司","4"],
                    ["A08","嘉定分公司","5"],
                    ["A09","松江分公司","7"],
                    ["A10","南汇分公司","9"],
                    ["A11","青浦分公司","5"],
                    ["A12","奉贤分公司","7"],
                    ["A13","金山分公司","3"],
                    ["A14","崇明分公司","5"]]},
                    {areas:[["A00","中心","41,005"],
                    ["A01","东区分公司","3,061"], 
                    ["A02","南区分公司","1,160"] ,
                    ["A03","西区分公司","1,220"],
                    ["A04","北区分公司","1,700"],
                    ["A05","中区分公司","1,020"],
                    ["A06","宝山分公司","1,500"],
                    ["A07","闵行分公司","2,140"],
                    ["A08","嘉定分公司","1,250"],
                    ["A09","松江分公司","1,450"],
                    ["A10","南汇分公司","950"],
                    ["A11","青浦分公司","750"],
                    ["A12","奉贤分公司","785"],
                    ["A13","金山分公司","775"],
                    ["A14","崇明分公司","535"]]},
                    {areas:[["A00","中心","4,750,280"],
                    ["A01","东区分公司","82,564"], 
                    ["A02","南区分公司","2,525,636"] ,
                    ["A03","西区分公司","42,562"],
                    ["A04","北区分公司","85,500"],
                    ["A05","中区分公司","6,400"],
                    ["A06","宝山分公司","30,220"],
                    ["A07","闵行分公司","41,245"],
                    ["A08","嘉定分公司","202,563"],
                    ["A09","松江分公司","14,533"],
                    ["A10","南汇分公司","13,922"],
                    ["A11","青浦分公司","14,598"],
                    ["A12","奉贤分公司","50,200"],
                    ["A13","金山分公司","14,025"],
                    ["A14","崇明分公司","2,563"]]} ],
      mapData:{areas:[["A00","中心","192"],
                    ["A01","东区分公司","5"], 
                    ["A02","南区分公司","5"] ,
                    ["A03","西区分公司","2"],
                    ["A04","北区分公司","2"],
                    ["A05","中区分公司","2"],
                    ["A06","宝山分公司","4"],
                    ["A07","闵行分公司","4"],
                    ["A08","嘉定分公司","4"],
                    ["A09","松江分公司","7"],
                    ["A10","南汇分公司","9"],
                    ["A11","青浦分公司","5"],
                    ["A12","奉贤分公司","7"],
                    ["A13","金山分公司","3"],
                    ["A14","崇明分公司","5"]]},
      cycle : ['DAY','MON','ONLINE'],

      chartAreaDataArray:[
        [
          ['{"className":"areaLineChartTmp","text":"开户量排名","hideArea":true,"hideLegend":true,'+
          '"xLabel":["徐汇","宝山区", "普陀区", "闽行区", "虹口区", "青浦区", "松江区", "金山区", "奉贤区", "浦东区"],"yName":"单位:户",'+
          '"color":["yellow"],"data":[[70000, 90000, 80000, 75000, 70000, 60000, 50000, 35000, 45000, 60000]],'+
          '"boundaryGap":true,"show":false,"showSymbol":true}'],
          ['{"className":"areaLineChartTmp","text":"开户量排名","hideArea":true,"hideLegend":true,'+
          '"xLabel":["徐汇区1","宝山区", "普陀区", "闽行区", "虹口区", "青浦区", "松江区", "金山区", "奉贤区", "浦东区"],"yName":"单位:户",'+
          '"color":["yellow"],"data":[[70000, 90000, 80000, 75000, 70000, 60000, 50000, 35000, 45000, 60000]],'+
          '"boundaryGap":true,"show":false,"showSymbol":true}']
        ],
        [
          ['{"className":"areaLineChartTmp","text":"开户量排名","hideArea":true,"hideLegend":true,'+
          '"xLabel":["徐汇区","宝山区", "普陀区", "闽行区", "虹口区", "青浦区", "松江区", "金山区", "奉贤区", "浦东区"],"yName":"单位:户",'+
          '"color":["yellow"],"data":[[70000, 90000, 80000, 75000, 70000, 60000, 50000, 35000, 45000, 60000]],'+
          '"boundaryGap":true,"show":false,"showSymbol":true}'],
          ['{"className":"areaLineChartTmp","text":"开户量排名","hideArea":true,"hideLegend":true,'+
          '"xLabel":["徐汇区","宝山区", "普陀区", "闽行区", "虹口区", "青浦区", "松江区", "金山区", "奉贤区", "浦东区"],"yName":"单位:户",'+
          '"color":["yellow"],"data":[[70000, 90000, 80000, 75000, 70000, 60000, 50000, 35000, 45000, 60000]],'+
          '"boundaryGap":true,"show":false,"showSymbol":true}']
        ],
        [
          ['{"className":"areaLineChartTmp","text":"开户量排名","hideArea":true,"hideLegend":true,'+
          '"xLabel":["徐汇区","宝山区", "普陀区", "闽行区", "虹口区", "青浦区", "松江区", "金山区", "奉贤区", "浦东区"],"yName":"单位:户",'+
          '"color":["yellow"],"data":[[70000, 90000, 80000, 75000, 70000, 60000, 50000, 35000, 45000, 60000]],'+
          '"boundaryGap":true,"show":false,"showSymbol":true}'],
          ['{"className":"areaLineChartTmp","text":"开户量排名","hideArea":true,"hideLegend":true,'+
          '"xLabel":["徐汇区","宝山区", "普陀区", "闽行区", "虹口区", "青浦区", "松江区", "金山区", "奉贤区", "浦东区"],"yName":"单位:户",'+
          '"color":["yellow"],"data":[[70000, 90000, 80000, 75000, 70000, 60000, 50000, 35000, 45000, 60000]],'+
          '"boundaryGap":true,"show":false,"showSymbol":true}']
        ]
      ],


      chartBarDataArray:[
        [
          ['{"className":"barChartTmp","text":"产品用户量","hideLegend":true,"yNameArray":["单位：户"],"show":false,'+
          '"xLabel":["指标1","指标2","指标3","指标4","指标5","指标6","指标7","指标8","指标9","指标10"],"rendColor":true,'+
          '"color":["#2DA4DD","#68D3CE","#F39700","#EB5900","#FFC17C","#AFCB69","#89C897","#8C96CB","#F19EC2","#EDDD15"],"position":"top",'+
          '"data":[[0,0,0,0,0,0,0,0,0,0]]}'],
          ['{"className":"barChartTmp","text":"产品用户量","hideLegend":true,"yNameArray":["单位：户"],"show":false,'+
          '"xLabel":["指标1","指标2","指标3","指标4","指标5","指标6","指标7","指标8","指标9","指标10"],"rendColor":true,'+
          '"color":["#2DA4DD","#68D3CE","#F39700","#EB5900","#FFC17C","#AFCB69","#89C897","#8C96CB","#F19EC2","#EDDD15"],"position":"top",'+
          '"data":[[0,0,0,0,0,0,0,0,0,0]]}']
        ],
        [
          ['{"className":"barChartTmp","text":"产品用户量","hideLegend":true,"yNameArray":["单位：户"],"show":false,'+
          '"xLabel":["指标1","指标2","指标3","指标4","指标5","指标6","指标7","指标8","指标9","指标10"],"rendColor":true,'+
          '"color":["#2DA4DD","#68D3CE","#F39700","#EB5900","#FFC17C","#AFCB69","#89C897","#8C96CB","#F19EC2","#EDDD15"],"position":"top",'+
          '"data":[[0,0,0,0,0,0,0,0,0,0]]}'],
          ['{"className":"barChartTmp","text":"产品用户量","hideLegend":true,"yNameArray":["单位：户"],"show":false,'+
          '"xLabel":["指标1","指标2","指标3","指标4","指标5","指标6","指标7","指标8","指标9","指标10"],"rendColor":true,'+
          '"color":["#2DA4DD","#68D3CE","#F39700","#EB5900","#FFC17C","#AFCB69","#89C897","#8C96CB","#F19EC2","#EDDD15"],"position":"top",'+
          '"data":[[0,0,0,0,0,0,0,0,0,0]]}']
        ],
        [
          ['{"className":"barChartTmp","text":"产品用户量","hideLegend":true,"yNameArray":["单位：户"],"show":false,'+
          '"xLabel":["指标1","指标2","指标3","指标4","指标5","指标6","指标7","指标8","指标9","指标10"],"rendColor":true,'+
          '"color":["#2DA4DD","#68D3CE","#F39700","#EB5900","#FFC17C","#AFCB69","#89C897","#8C96CB","#F19EC2","#EDDD15"],"position":"top",'+
          '"data":[[0,0,0,0,0,0,0,0,0,0]]}'],
          ['{"className":"barChartTmp","text":"产品用户量","hideLegend":true,"yNameArray":["单位：户"],"show":false,'+
          '"xLabel":["指标1","指标2","指标3","指标4","指标5","指标6","指标7","指标8","指标9","指标10"],"rendColor":true,'+
          '"color":["#2DA4DD","#68D3CE","#F39700","#EB5900","#FFC17C","#AFCB69","#89C897","#8C96CB","#F19EC2","#EDDD15"],"position":"top",'+
          '"data":[[0,0,0,0,0,0,0,0,0,0]]}']
        ]
      ],
      
      chartBarDataArrays:[
        [
          ['{"className":"barChartTmps","text":"活动用户量","hideLegend":true,"yNameArray":["单位：户"],"show":false,'+
          '"xLabel":["指标1","指标2","指标3","指标4","指标5","指标6","指标7","指标8","指标9","指标10"],"rendColor":true,'+
          '"color":["#2DA4DD","#68D3CE","#F39700","#EB5900","#FFC17C","#AFCB69","#89C897","#8C96CB","#F19EC2","#EDDD15"],"position":"top",'+
          '"data":[[0,0,0,0,0,0,0,0,0,0]]}'],
          ['{"className":"barChartTmps","text":"活动用户量","hideLegend":true,"yNameArray":["单位：户"],"show":false,'+
          '"xLabel":["指标1","指标2","指标3","指标4","指标5","指标6","指标7","指标8","指标9","指标10"],"rendColor":true,'+
          '"color":["#2DA4DD","#68D3CE","#F39700","#EB5900","#FFC17C","#AFCB69","#89C897","#8C96CB","#F19EC2","#EDDD15"],"position":"top",'+
          '"data":[[0,0,0,0,0,0,0,0,0,0]]}']
        ],
        [
          ['{"className":"barChartTmps","text":"活动用户量","hideLegend":true,"yNameArray":["单位：户"],"show":false,'+
          '"xLabel":["指标1","指标2","指标3","指标4","指标5","指标6","指标7","指标8","指标9","指标10"],"rendColor":true,'+
          '"color":["#2DA4DD","#68D3CE","#F39700","#EB5900","#FFC17C","#AFCB69","#89C897","#8C96CB","#F19EC2","#EDDD15"],"position":"top",'+
          '"data":[[0,0,0,0,0,0,0,0,0,0]]}'],
          ['{"className":"barChartTmps","text":"活动用户量","hideLegend":true,"yNameArray":["单位：户"],"show":false,'+
          '"xLabel":["指标1","指标2","指标3","指标4","指标5","指标6","指标7","指标8","指标9","指标10"],"rendColor":true,'+
          '"color":["#2DA4DD","#68D3CE","#F39700","#EB5900","#FFC17C","#AFCB69","#89C897","#8C96CB","#F19EC2","#EDDD15"],"position":"top",'+
          '"data":[[0,0,0,0,0,0,0,0,0,0]]}']
        ],
        [
          ['{"className":"barChartTmps","text":"活动用户量","hideLegend":true,"yNameArray":["单位：户"],"show":false,'+
          '"xLabel":["指标1","指标2","指标3","指标4","指标5","指标6","指标7","指标8","指标9","指标10"],"rendColor":true,'+
          '"color":["#2DA4DD","#68D3CE","#F39700","#EB5900","#FFC17C","#AFCB69","#89C897","#8C96CB","#F19EC2","#EDDD15"],"position":"top",'+
          '"data":[[0,0,0,0,0,0,0,0,0,0]]}'],
          ['{"className":"barChartTmps","text":"活动用户量","hideLegend":true,"yNameArray":["单位：户"],"show":false,'+
          '"xLabel":["指标1","指标2","指标3","指标4","指标5","指标6","指标7","指标8","指标9","指标10"],"rendColor":true,'+
          '"color":["#2DA4DD","#68D3CE","#F39700","#EB5900","#FFC17C","#AFCB69","#89C897","#8C96CB","#F19EC2","#EDDD15"],"position":"top",'+
          '"data":[[0,0,0,0,0,0,0,0,0,0]]}']
        ]
      ],



      
      areaLineChartTmpData:'{"className":"areaLineChartTmp","text":"开户量排名","hideArea":true,"hideLegend":true,'+
      '"xLabel":["徐汇区","宝山区", "普陀区", "闽行区", "虹口区", "青浦区", "松江区", "金山区", "奉贤区", "浦东区"],"yName":"单位:户",'+
      '"color":["yellow"],"data":[[70000, 90000, 80000, 75000, 70000, 60000, 50000, 35000, 45000, 60000]],'+
      '"boundaryGap":true,"show":false,"showSymbol":true}',
      barChartTmpData:'{"className":"barChartTmp","text":"产品用户量","hideLegend":true,"yNameArray":["单位：户"],"show":false,'+
      '"xLabel":["指标1","指标2","指标3","指标4","指标5","指标6","指标7","指标8","指标9","指标10"],"rendColor":true,"position":"top",'+
      '"color":["#2DA4DD","#68D3CE","#F39700","#EB5900","#FFC17C","#AFCB69","#89C897","#8C96CB","#F19EC2","#EDDD15"],'+
      '"data":[[0,0,0,0,0,0,0,0,0,0]]}',
      barChartTmpDatas:'{"className":"barChartTmps","text":"活动用户量","hideLegend":true,"yNameArray":["单位：户"],"show":false,'+
      '"xLabel":["指标1","指标2","指标3","指标4","指标5","指标6","指标7","指标8","指标9","指标10"],"rendColor":true,"position":"top",'+
      '"color":["#2DA4DD","#68D3CE","#F39700","#EB5900","#FFC17C","#AFCB69","#89C897","#8C96CB","#F19EC2","#EDDD15"],'+
      '"data":[[0,0,0,0,0,0,0,0,0,0]]}',
    
      PieDataArray :[
        {"code": "BSS", "name": "BSS", "sortIndex": 0, "text": 0},
        {"code": "CBSS", "name": "CBSS", "sortIndex": 0, "text": 0},
        {"code": "WOSL", "name:": "沃受理", "sortIndex": 0, "text": 0},
        {"code": "WOYX", "name": "沃易销", "sortIndex": 0, "text": 0}],
      PieData:'[{"className":"PieChart","showAll":"show","radius1":"72%","radius2":"82%"' +
      ',"data":[[115,111,111,124],["BSS","CBSS","沃受理","沃易销"],["BSS","CBSS","WOSL","WOYX"]],"color":["#318852","#24babc","#eaef9b","#b994ff"],"allColor":"#315b9d","allValue":461,"sortName":"所有系统","legendWidth":20,"legendHeight":10,"center":["50%","50%"]}]', // "#b27bcb","#FFFF00", "#FF0000"
      
      areaLineChartTmpDatas:'{"className":"areaLineChartTmps","Top":"15","legend":["当日开户数量","昨日开户数量","上月当日开户数量"],'+
      '"xLabel":["0点","6点", "12点", "18点", "24点"],"legendX":"center","color":["#A65C6D","#789972","#4995A9"],'+
      '"data":[[[2,380],[4,570],[6,400],[8,590],[14,430],[24,23]],[[2,380],[4,570],[6,400],[8,590],[14,430],[24,23]],[[2,380],[4,570],[6,400],[8,590],[14,430],[24,23]]],"boundaryGap":false,'+
      '"show":false,"showSymbol":false,"selectedMode":true,"text":""}',

      sysAreaLineChartArray:['','','','','','','','','','','','',''],
      sysDicCodeArray:['','','','','','','','','','','','',''],
      scatterChartTmpData: '{"className":"scatterChartTmp","data":[[100,100,""],[50,50,""],[50,75,""]]}',
      dataLoadingUrl : baseConfig.dataLoadingUrl,
      dataLoadingSelectUrl : baseConfig.dataLoadingSelectUrl,
      index:0,
      tipBgIndex:0
    }
  },

  methods:{
    init:function(){
      var _this = this;
      // var pageVars = ['YW','GW'];
      // var title = ["营业移网新开户情况监控","营业固网新开户情况监控"];
      var index = 0;
      
      // _this.pageVariables = pageVars[index];
      this.initPageData();//控制循环轮播事件
      this.initCostomData(); //加载左下角图表数据
      this.initSystemData();//加载右下图表信息
      this.initElementData(); //加载地图数据信息
      this.initTopRate(); //加载当日实名率数据
      this.initBarData(); //加载右上三个图表的数据信息
      index = index==0?1:0;
    },
    initPageData:function () {
      let className = "border";
      var _this =this;
      var accountCycle = this.$refs.accountCycle;
      var accountTipBg = this.$refs.accountTipBg;
      var mapDiv = this.$refs.mapDiv;
      var page = this.pageVariables;
      var type = ['JK','GZ'];
      setInterval(()=>{
          if(_this.index>=2){
            _this.index = 0;
          }else
            _this.index++;
          $(accountCycle).children('.contentL1').each(function(temp){
              if(temp == _this.index){
                $(this).addClass('border').siblings().removeClass('border');
                
                _this.jkdata = _this.jkdataArray[temp];
                _this.gzdata = _this.gzdataArray[temp];
                _this.total = _this.totalArray[temp];
                _this.mapData = _this.mapDataArray[_this.index];
                if(_this.index!=2){
                  $(mapDiv).children(".blurPT").hide();
                  $(mapDiv).children(".divPT").hide();
                }else{
                  $(mapDiv).children(".blurPT").show();
                  $(mapDiv).children(".divPT").show();
                }
              }
          });
      },20000);

      setInterval(()=>{
        if(_this.tipBgIndex>=1){
          _this.tipBgIndex = 0;
        }else
        _this.tipBgIndex++;
        $(accountTipBg).children('.tipDiv').each(function(temp){
            var indexTemp = _this.index;
            // if(_this.index==0){
            //   indexTemp = 2;
            // }else{
            //   indexTemp = _this.index-1;
            // }
            if(temp == _this.tipBgIndex){
              $(this).addClass('tipBg').siblings().removeClass('tipBg');
              if(!_this.isblank(_this.chartAreaDataArray[indexTemp][_this.tipBgIndex][0])){
                _this.areaLineChartTmpData = _this.chartAreaDataArray[indexTemp][_this.tipBgIndex][0];
              }
              if(!_this.isblank(_this.chartBarDataArray[indexTemp][_this.tipBgIndex][0])){
                _this.barChartTmpData = _this.chartBarDataArray[indexTemp][_this.tipBgIndex][0];
              }
              if(!_this.isblank(_this.chartBarDataArrays[indexTemp][_this.tipBgIndex][0])){
                _this.barChartTmpDatas = _this.chartBarDataArrays[indexTemp][_this.tipBgIndex][0];
              }
              
            }
        });
    },10000)
    },
    
     //在这里面调用当日实名率
     initTopRate:function(){
            var _this = this;
            var archCode = "KX_P01_A01";
            var pageStr = _this.varPageKey+"="+_this.pageVariables;
            var chartConfig = {
              pageCode : this.pageCode,
              variables : pageStr,
              archCode : archCode,
              elementCode : "",
            };
            api.myPost(_this.dataLoadingUrl, chartConfig).then((res) => {
                //在这里渲染图框的数据
                if(res.statusCode == '1'){
                  var data = res.data;
                  var title = data.archVo.archName;
                  var time = 3000, timeUnit = "ms", elementCode = "", elementTypeCode = "";
                  if(!_this.isblank(data.archVo.timeValRal)){
                    time = data.archVo.timeValRal;
                  }
                  if(!_this.isblank(data.archVo.timeUnit)){
                    timeUnit = data.archVo.timeUnit;
                  }
                  
                  elementCode = data.archVo.archElements[0].elementCode;
                  elementTypeCode = data.archVo.archElements[0].elementTypeCode;
                  //根据图框的数据查询图表的信息并进行渲染,定时请求第二个服务，更新图表信息
                  setInterval(()=>{
                    chartConfig.elementCode = elementCode;
                    api.myPost(_this.dataLoadingSelectUrl, chartConfig).then((resdata) => {
                      if(resdata.statusCode == '1'){
                        var chardata = JSON.parse(resdata.data);
                          _this.rate = chardata.elements[0].text + "%";
                      }
                    },(err) => {
                      console.log("dataLoadingAjax post请求失败"+err)
                    });
                  },time);
                }
      
            }, (err) => {
              console.log("dataLoadingAjax post请求失败"+err)
            });
          },
    setVar:function(tempIndex){
      var accountCycle = this.$refs.accountCycle;
      var _this = this;
      this.index = tempIndex;
      var mapDiv = this.$refs.mapDiv;
      $(accountCycle).children('.contentL1').each(function(temp){
            if(temp == tempIndex){
              $(this).addClass('border').siblings().removeClass('border');
              if(_this.index!=2){
                $(mapDiv).children(".blurPT").hide();
                $(mapDiv).children(".divPT").hide();
              }else{
                $(mapDiv).children(".blurPT").show();
                $(mapDiv).children(".divPT").show();
              }
              _this.jkdata = _this.jkdataArray[temp];
              _this.gzdata = _this.gzdataArray[temp];
              _this.total = _this.totalArray[temp];
              _this.mapData = _this.mapDataArray[_this.index];
            }
        });
        _this.clickFunc(0);
        // var accountTipBg = this.$refs.accountTipBg;
        // $(accountTipBg).children('.tipDiv').each(function(temp){
        //   var indexTemp = _this.index;
        //   if(temp == _this.tipBgIndex){
        //     $(this).addClass('tipBg').siblings().removeClass('tipBg');
        //     if(!_this.isblank(_this.chartAreaDataArray[indexTemp][_this.tipBgIndex][0])){
        //       _this.areaLineChartTmpData = _this.chartAreaDataArray[indexTemp][_this.tipBgIndex][0];
        //     }
        //     if(!_this.isblank(_this.chartBarDataArray[indexTemp][_this.tipBgIndex][0])){
        //       _this.barChartTmpData = _this.chartBarDataArray[indexTemp][_this.tipBgIndex][0];
        //     }
        //     if(!_this.isblank(_this.chartBarDataArrays[indexTemp][_this.tipBgIndex][0])){
        //       _this.barChartTmpDatas = _this.chartBarDataArrays[indexTemp][_this.tipBgIndex][0];
        //     }
        //   }
        // });
    },
    initElementData:function(){
       //请求第一个服务，获取图框信息
       var _this = this;
       var cycle = ['DAY','MON','ONLINE'];
       var pageStr = _this.varPageKey+"="+this.pageVariables;
       var archCode = "KX_P01_A01";
       //当日数据请求服务
       var chartConfigDay = {
         pageCode : this.pageCode,
         variables : pageStr +','+ _this.varCycleKey+'='+"DAY",
         archCode : archCode,
         elementCode : "",
       };
       api.myPost(_this.dataLoadingUrl, chartConfigDay).then((res) => {
           if(res.statusCode == '1'){
             var data = res.data;
             var title = data.archVo.archName;
             var time = 1000, timeUnit = "ms", elementCode = "", elementTypeCode = "", unit = "";
             if(!_this.isblank(data.archVo.timeValRal)){
               time = data.archVo.timeValRal;
             }
             if(!_this.isblank(data.archVo.timeUnit)){
               timeUnit = data.archVo.timeUnit;
             }
             for(var a in data.archVo.archElements ){
              elementCode = data.archVo.archElements[a].elementCode;
              elementTypeCode = data.archVo.archElements[a].elementTypeCode;
              if(elementCode == "KX_P01_A01_E01"){
                var config={
                  pageCode : chartConfigDay.pageCode,
                  variables : chartConfigDay.variables,
                  archCode : chartConfigDay.archCode,
                  elementCode : elementCode,
                }
                _this.initCycleData(config, time , 0);
              }
              if(elementCode == "KX_P01_A01_E05"){
                var config={
                  pageCode : chartConfigDay.pageCode,
                  variables : chartConfigDay.variables,
                  archCode : chartConfigDay.archCode,
                  elementCode : elementCode,
                }
                _this.initCycleMapData(config, time , 0);
              }
             }
           }
       }, (err) => {
         console.log("initElementData post请求失败"+err)
       });

       //当月数据请求服务
       var chartConfigMon = {
        pageCode : this.pageCode,
        variables : pageStr +','+ _this.varCycleKey+'='+"MON",
        archCode : archCode,
        elementCode : "",
      };
      api.myPost(_this.dataLoadingUrl, chartConfigMon).then((res) => {
          //在这里渲染图框的数据
          if(res.statusCode == '1'){
            var data = res.data;
            var title = data.archVo.archName;
            var time = 1000, timeUnit = "ms", elementCode = "", elementTypeCode = "", unit = "";
            if(!_this.isblank(data.archVo.timeValRal)){
              time = data.archVo.timeValRal;
            }
            if(!_this.isblank(data.archVo.timeUnit)){
              timeUnit = data.archVo.timeUnit;
            }
            for(var a in data.archVo.archElements ){
              elementCode = data.archVo.archElements[a].elementCode;
              elementTypeCode = data.archVo.archElements[a].elementTypeCode;
              if(elementCode == "KX_P01_A01_E02"){
                var config={
                  pageCode : chartConfigMon.pageCode,
                  variables : chartConfigMon.variables,
                  archCode : chartConfigMon.archCode,
                  elementCode : elementCode,
                }
                _this.initCycleData(config, time, 1);
              }
              if(elementCode == "KX_P01_A01_E05"){
                var config={
                  pageCode : chartConfigMon.pageCode,
                  variables : chartConfigMon.variables,
                  archCode : chartConfigMon.archCode,
                  elementCode : elementCode,
                }
                _this.initCycleMapData(config, time, 1);
              }
             }
          }
      }, (err) => {
        console.log("initElementData post请求失败"+err)
      });
       //在网数据请求服务
       var chartConfigOnline = {
        pageCode : this.pageCode,
        variables : pageStr +','+ _this.varCycleKey+'='+"ONLINE",
        archCode : archCode,
        elementCode : "",
      };
      api.myPost(_this.dataLoadingUrl, chartConfigOnline).then((res) => {
          if(res.statusCode == '1'){
            var data = res.data;
            var title = data.archVo.archName;
            var time = 1000, timeUnit = "ms", elementCode = "", elementTypeCode = "", unit = "";
            if(!_this.isblank(data.archVo.timeValRal)){
              time = data.archVo.timeValRal;
            }
            if(!_this.isblank(data.archVo.timeUnit)){
              timeUnit = data.archVo.timeUnit;
            }
            elementCode = data.archVo.archElements[0].elementCode;
            elementTypeCode = data.archVo.archElements[0].elementTypeCode;
            for(var a in data.archVo.archElements ){
              elementCode = data.archVo.archElements[a].elementCode;
              elementTypeCode = data.archVo.archElements[a].elementTypeCode;
              if(elementCode == "KX_P01_A01_E03"){
                var config={
                  pageCode : chartConfigOnline.pageCode,
                  variables : chartConfigOnline.variables,
                  archCode : chartConfigOnline.archCode,
                  elementCode : elementCode,
                }
                _this.initCycleData(config, time , 2);
              }
              if(elementCode == "KX_P01_A01_E05"){
                var config={
                  pageCode : chartConfigOnline.pageCode,
                  variables : chartConfigOnline.variables,
                  archCode : chartConfigOnline.archCode,
                  elementCode : elementCode,
                }
                _this.initCycleMapData(config, time , 2);
              }
             }
          }
      }, (err) => {
        console.log("initElementData post请求失败"+err)
      });

    },
     //请求当日当月在网数据的方法
     initCycleData:function(CycleConfig,time,i){
      var _this = this;
      setInterval(()=>{
        api.myPost(_this.dataLoadingSelectUrl, CycleConfig).then((resdata) => {
          if(resdata.statusCode == '1'){
              var chardata = JSON.parse(resdata.data);
              var localString = parseInt(chardata.elements[0].text).toLocaleString();
              _this.counts[i]= localString;
              }
            },(err) => {
          console.log("dataLoadingAjax post请求失败"+err)
        });
      },time);
  },
    //请求地图循环数据的方法
    initCycleMapData:function(CycleConfig,time,i){
      var _this = this;
      setInterval(()=>{
        api.myPost(_this.dataLoadingSelectUrl, CycleConfig).then((resdata) => {
              if(resdata.statusCode == '1'){
                var chardata = JSON.parse(resdata.data);
                var  areasArray=_this.mapDataArray[i] ;
                  for(var temp in areasArray.areas){
                    var PCode = areasArray.areas[temp][0];
                    var PName = areasArray.areas[temp][1];
                    var PText = 0;
                      for(var es in chardata.elements){
                        if(PCode == chardata.elements[es].code){
                          PName = chardata.elements[es].name;
                            // var localString = parseInt(chardata.elements[es].text).toLocaleString();
                            PText = parseInt(chardata.elements[es].text).toLocaleString();
                            break;
                        }
                      }
                      areasArray.areas[temp][2] = PText;
                      areasArray.areas[temp][1] = PName;
                  }
                  _this.mapDataArray[i] = areasArray;
              }
            },(err) => {
          console.log("dataLoadingAjax post请求失败"+err)
        });
      },time);
  },


  //加载右上角三个图表的数据
    initBarData:function(){
      var _this = this;
      var time = 3000;
      //请求第一个服务，获取图框信息
      var cycle = ['DAY','MON','ONLINE'];
      // var cycle = ['DAY','MON'];
      var type = ['JK','GK'];
      var pageStr = _this.varPageKey+"="+_this.pageVariables;
      var cycleStr = _this.varCycleKey+"="+cycle;
      var typeStr = _this.varCustKey;
      var archCode = "KX_P01_A02";

      for(var j in cycle){
        for(var k in type){
          var chartConfig = {
            pageCode : this.pageCode,
            variables : pageStr +','+ _this.varCycleKey+'='+cycle[j] +','+ typeStr+'='+type[k],
            archCode : archCode,
            elementCode : "",
          }
          _this.postChartData(chartConfig, j, k, time);
        }
      }
 },

 postChartData:function(chartConfig, j, k, time){
        var _this = this;
        api.myPost(_this.dataLoadingUrl, chartConfig).then((res) => {
          
          if(res.statusCode == '1'){
            var data = res.data;
            var title = data.archVo.archName;
            var  timeUnit = "ms", elementCode = "", elementTypeCode = "", unit = "";
            if(!_this.isblank(data.archVo.timeValRal)){
              time = data.archVo.timeValRal;
            }
            if(!_this.isblank(data.archVo.timeUnit)){
              timeUnit = data.archVo.timeUnit;
            }
            elementCode = data.archVo.archElements[0].elementCode;
            elementTypeCode = data.archVo.archElements[0].elementTypeCode;
            for(var i in  data.archVo.archElements){
              if('C' == data.archVo.archElements[i].elementTypeCode){
                elementCode = data.archVo.archElements[i].elementCode;
                if(elementCode == "KX_P01_A02_E01"){
                  var config={
                    pageCode : chartConfig.pageCode,
                    variables : chartConfig.variables,
                    archCode : chartConfig.archCode,
                    elementCode : elementCode,
                  }
                 _this.initAreaLineData(config, j, k, time);
              }else if(elementCode == "KX_P01_A02_E02"){
                var config={
                    pageCode : chartConfig.pageCode,
                    variables : chartConfig.variables,
                    archCode : chartConfig.archCode,
                    elementCode : elementCode,
                  }
                _this.initBarChartData(config, j, k, time);
              }else if(elementCode == "KX_P01_A02_E03"){
                var config={
                    pageCode : chartConfig.pageCode,
                    variables : chartConfig.variables,
                    archCode : chartConfig.archCode,
                    elementCode : elementCode,
                  }
                 _this.initBarChartDatass(config, j, k, time);
              }
              }
            }
          }
      }, (err) => {
        console.log("initBarData post请求失败"+err)
      });
 },
    initAreaLineData:function(chartConfig, j, k, time){
            var _this = this;
            setInterval(() => {
              api.myPost(_this.dataLoadingSelectUrl, chartConfig).then((resdata) => {
                // console.log(JSON.stringify(resdata.data));
                if(resdata.statusCode == '1'){
                    var chardata = JSON.parse(resdata.data);
                    var areaLineChart = JSON.parse(_this.areaLineChartTmpData);
                    if(_this.isblank(_this.chartAreaDataArray[j][k][0])){
                      areaLineChart = JSON.parse(_this.chartAreaDataArray[j][k][0]);
                    }
                    areaLineChart.text = "开户量排名";

                    var dataArray = [];
                    for(var a in chardata.seriesData[0].data ){
                      dataArray.push(chardata.seriesData[0].data[a]);
                    }
                    areaLineChart.data[0] = dataArray;

                    var xDataArray = [];
                    for(var b in chardata.xAxis.data ){
                      xDataArray.push(chardata.xAxis.data[b]);
                    }
                    areaLineChart.xLabel = xDataArray;

                    _this.chartAreaDataArray[j][k][0] = JSON.stringify(areaLineChart);
                }
              },(err) => {
                console.log("dataLoadingAjax post请求失败"+err)
              });
            },time)
        },

    initBarChartData:function(chartConfig ,j,k,time){
      var _this = this;
      // console.log(JSON.stringify(chartConfig));
      // setInterval(() => {
        api.myPost(_this.dataLoadingSelectUrl, chartConfig).then((resdata) => {
          if(resdata.statusCode == '1'){
              var chardata = JSON.parse(resdata.data);
              var barChart = JSON.parse(_this.barChartTmpData);
              if(_this.isblank(_this.chartBarDataArray[j][k][0])){
                barChart = JSON.parse(_this.chartBarDataArray[j][k][0]);
              }
              var dataArray = [];
              for(var a in chardata.seriesData[0].data ){
                dataArray.push(chardata.seriesData[0].data[a]);
              }
              barChart.data[0] = dataArray;

              var xDataArray = [];
              for(var b in chardata.xAxis.data ){
                xDataArray.push(chardata.xAxis.data[b]);
              }
              barChart.xLabel = xDataArray;
              _this.chartBarDataArray[j][k][0] = JSON.stringify(barChart);
           }
        },(err) => {
          console.log("dataLoadingAjax post请求失败"+err);
        });
      // },time)
    },

    initBarChartDatass:function(chartConfig ,j,k,time){
      var _this = this;
        api.myPost(_this.dataLoadingSelectUrl, chartConfig).then((resdata) => {

          if(resdata.statusCode == '1'){
            var chardata = JSON.parse(resdata.data);
            var barChart = JSON.parse(_this.barChartTmpDatas);
            if(_this.isblank(_this.chartBarDataArrays[j][k][0])){
              barChart = _this.chartBarDataArrays[j][k][0];
            }
            var dataArray = [];
            for(var a in chardata.seriesData[0].data ){
              dataArray.push(chardata.seriesData[0].data[a]);
            }
            barChart.data[0] = dataArray;

            var xDataArray = [];
            for(var b in chardata.xAxis.data ){
              xDataArray.push(chardata.xAxis.data[b]);
            }
            barChart.xLabel = xDataArray;
            _this.chartBarDataArrays[j][k][0] = JSON.stringify(barChart);
         }
        },(err) => {
          console.log("dataLoadingAjax post请求失败"+err);
        });
    },

    //加载左下图表信息
    initCostomData: function(){
        //请求第一个服务，获取图框信息
      var _this = this;
      var archCode = "KX_P01_A03";
      var cycle = ['DAY','MON','ONLINE'];
      for(var i in cycle){
        var chartConfig = {
          pageCode : this.pageCode,
          variables : _this.varPageKey+"="+_this.pageVariables +','+ _this.varCycleKey+'='+cycle[i],
          archCode : archCode,
          elementCode : "",
        };

        _this.setUserCuntArray(chartConfig, i);
      }
    },
    setUserCuntArray:function(chartConfig, temp){
      var _this = this;
      api.myPost(_this.dataLoadingUrl, chartConfig).then((res) => {
        //在这里渲染图框的数据
        if(res.statusCode == '1'){
          var data = res.data;
          var title = data.archVo.archName;
          var time = 3000, timeUnit = "ms", elementCode = "", elementTypeCode = "", unit = "";
          if(!_this.isblank(data.archVo.timeValRal)){
            time = data.archVo.timeValRal;
          }
          if(!_this.isblank(data.archVo.timeUnit)){
            timeUnit = data.archVo.timeUnit;
          }
          elementCode = data.archVo.archElements[0].elementCode;
          elementTypeCode = data.archVo.archElements[0].elementTypeCode;
          setInterval(()=>{
            chartConfig.elementCode = elementCode;
            api.myPost(_this.dataLoadingSelectUrl, chartConfig).then((resdata) => {
              if(resdata.statusCode == '1'){
                  var chardata = JSON.parse(resdata.data);
                  var a = 0;
                  var b =0;
                  for(var i in chardata.elements ){
                        if(chardata.elements[i].parentCode == "JK"){
                          _this.jkdataArray[temp][0][0] = chardata.elements[i].parentName ;
                             b +=  parseInt(chardata.elements[i].text);
                            if(chardata.elements[i].name =="预付费" ){
                              _this.jkdataArray[temp][1][0] = chardata.elements[i].name ;
                              _this.jkdataArray[temp][1][1] = chardata.elements[i].text ;
                            }
                            if(chardata.elements[i].name =="后付费" ){
                              _this.jkdataArray[temp][2][0] = chardata.elements[i].name ;
                              _this.jkdataArray[temp][2][1] = chardata.elements[i].text ;
                            }
                        }
                        if(chardata.elements[i].parentCode == "GK"){
                          _this.gzdataArray[temp][0][0] = chardata.elements[i].parentName ;
                           a +=  parseInt(chardata.elements[i].text);
                            if(chardata.elements[i].name =="预付费" ){
                              _this.gzdataArray[temp][1][0] = chardata.elements[i].name ;
                              _this.gzdataArray[temp][1][1] = chardata.elements[i].text ;
                            }
                            if(chardata.elements[i].name =="后付费" ){
                              _this.gzdataArray[temp][2][0] = chardata.elements[i].name ;
                              _this.gzdataArray[temp][2][1] = chardata.elements[i].text ;
                            }
                        }
                        _this.gzdataArray[temp][0][1] = a;
                        _this.jkdataArray[temp][0][1] = b;
                        _this.totalArray[temp] = a+b;
                  }

              }
            },(err) => {
              console.log("dataLoadingAjax post请求失败"+err)
            });
          },time);
        }
      }, (err) => {
        console.log("initCostomData post请求失败"+err)
      });
    },
    //加载右下角图表数据
    initSystemData:function(){
      var _this = this;
      var cycleArray  = _this.getTimeArray();
      var a = {
          cycleArray:cycleArray,
          interval:'1'
      }
      var extAttributes =JSON.stringify(a);
      var archCode = "KX_P01_A04";
      var chartConfig = {
        pageCode : this.pageCode,
        variables : _this.varPageKey+"="+_this.pageVariables,
        archCode : archCode,
        elementCode : "",
        // extAttributes:extAttributes,
      };
     
        api.myPost(_this.dataLoadingUrl, chartConfig).then((res) => {
          //在这里渲染图框的数据
          var _this = this;
          if(res.statusCode == '1'){
            var data = res.data;
            var title = data.archVo.archName;
            // console.log(title);
            var time = 2000, timeUnit = "ms", elementCode = "", elementTypeCode = "",unit = "";
            if(!_this.isblank(data.archVo.timeValRal)){
              time = data.archVo.timeValRal;
            }
            if(!_this.isblank(data.archVo.timeUnit)){
              timeUnit = data.archVo.timeUnit;
            }
            elementCode = data.archVo.archElements[0].elementCode;
            elementTypeCode = data.archVo.archElements[0].elementTypeCode;
           
            for(var i in data.archVo.archElements ){
              var elementCodes = '';
              if('C' == data.archVo.archElements[i].elementTypeCode){
                elementCodes = data.archVo.archElements[i].elementCode;
                if(elementCodes == "KX_P01_A04_E01"){
                  
                  var chartConfigs = {
                    pageCode : _this.pageCode,
                    variables : _this.varPageKey+"="+_this.pageVariables,
                    archCode : archCode,
                    elementCode : elementCodes,
                  }
                  setInterval(()=>{
                    api.myPost(_this.dataLoadingSelectUrl, chartConfigs).then((resdata) => {
                      if(resdata.statusCode == '1'){
                        var chardata = _this.PieDataArray;
                        var pieData = JSON.parse(_this.PieData);
                        var TempData = JSON.parse(resdata.data);
                        for(var t1 = 0;t1<pieData[0].data[1].length;t1++){
                             var pName = pieData[0].data[1][t1];
                             var pText = pieData[0].data[0][t1];
                             var flag = true;
                          for(var t2 = 0;t2<TempData.elements.length;t2++){
                            if(pName==TempData.elements[t2].name){
                               pText =TempData.elements[t2].text;
                               flag = false;
                               break;
                            }
                          }
                          if(flag == true){
                            pText = 0;
                          }
                          pieData[0].data[0][t1] = pText
                          _this.sysDicCodeArray[t1] = pieData[0].data[2][t1];
                        }
                        _this.sysDicCodeArray[pieData[0].data[2].length] = "ALL";
                        for(var a in TempData.elements){
                          if("ALL"==TempData.elements[a].code){
                            pieData[0].allValue =TempData.elements[a].text;
                          }
                         }
                         pieData[0].color = ["#318852","#24babc","#eaef9b","#b994ff"];
                         pieData[0].allColor = "#315b9d";
                         _this.PieData = JSON.stringify(pieData);
                      }
                    });
                  },time);
                }
                if(elementCodes == "KX_P01_A04_E02"){
                  var chartConfiges = {
                    pageCode : _this.pageCode,
                    variables : _this.varPageKey+"="+_this.pageVariables,
                    archCode : archCode,
                    elementCode : elementCodes,
                  }
                  setInterval(()=>{
                    api.myPost(_this.dataLoadingSelectUrl, chartConfiges).then((resdata) => {
                      if(resdata.statusCode == '1'){
                          var chardata = JSON.parse(resdata.data);
                          var areaLineChart = JSON.parse(_this.areaLineChartTmpDatas);
                          for(var index in chardata){
                            areaLineChart.text = "";
                            var dataArray = [];
                            for(var x in chardata[index].seriesData){
                              var seriesArray = [];
                              for(var y in chardata[index].seriesData[x].data){
                                var array = [];
                                array.push(chardata[index].xAxis.data[y]);
                                array.push(chardata[index].seriesData[x].data[y]);
                                seriesArray.push(array);
                              }
                              dataArray.push(seriesArray);
                            }
                            areaLineChart.data = dataArray;
                            
                            var lineIndex = _this.sysDicCodeArray.indexOf(chardata[index].dicCode);
                            _this.sysAreaLineChartArray[lineIndex] = JSON.stringify(areaLineChart);
                          }
                       }
                    },(err) => {
                      console.log("dataLoadingAjax post请求失败"+err)
                    });
                  },time);
                }
              }
            }
          }
         }, (err) => {
        console.log("initSystemData post请求失败"+err)
      });
    },

    //判断是否为空
    isblank:function(obj){
      if(obj == null) return true;
      if(typeof(obj) == "undefined") return true;
      if($.trim(obj.toString()) == "") return true;
      if($.trim(obj.toString())=="null")return true;
      if($.trim(obj.toString())=="undefined")return true;
      return false;
    },
    handleResize:function () {
      window.screenWidth = document.body.clientWidth ;
      this.screenWidth = window.screenWidth;
      let scaleSize = this.screenWidth/1920;
      for(var i = 0;i<document.getElementsByClassName('CollectMain').length;i++){
        document.getElementsByClassName('CollectMain')[i].style.WebkitTransform = "scale("+scaleSize+")";
      }
      // document.getElementsByClassName('CollectMain').style.WebkitTransform = "scale("+scaleSize+")";
    },

    getTimeArray: function(){
      var dayList = new Date();
      var year = dayList.getFullYear();  
      var month = dayList.getMonth();  
      if(month==0)  
      {  
          month=12;  
          year=year-1;  
      }  
      if (month < 10) {  
          month = "0" + month;  
      } 
      dayList.setTime(dayList.getTime());
      var day = year +""+ (dayList.getMonth()+1) +""+ dayList.getDate();
      var last = year +""+ (dayList.getMonth()+1) +""+ (dayList.getDate()-1);
      var lastMonDay = year +""+ month +""+ dayList.getDate();
      var myDate = new Date(year, month, 0);  
      var lastDay = year + "" + month + "" + myDate.getDate();
      if(dayList.getDate()==31){
         lastMonDay = lastDay;
      }
      //时间数组，今日，昨日，上月当日
      var cycleArray = [day,last, lastMonDay];
     
      return cycleArray;
      
    },
    show:function () {
      if(!this.clicked){
        
        var GW = document.getElementById('GW');
        var YW = document.getElementById('YW');
        GW.style.marginRight = '80px';
        GW.style.marginTop = '20px';
        YW.style.marginRight = '20px';
        YW.style.marginTop = '80px';
    
      
      }
      if(this.clicked){
        var GW = document.getElementById('GW');
        var YW = document.getElementById('YW');
        GW.style.marginRight = '0px';
        GW.style.marginTop = '0px';
        YW.style.marginRight = '0px';
        YW.style.marginTop = '0px';
     
      }
      this.clicked = !this.clicked;
    },
    clickFunc: function(temp){
      var accountTipBg = this.$refs.accountTipBg;
      this.tipBgIndex = temp;
      var _this = this;
      $(accountTipBg).children('.tipDiv').each(function(temp){
        var indexTemp = _this.index;
        if(temp == _this.tipBgIndex){
          $(this).addClass('tipBg').siblings().removeClass('tipBg');
          if(!_this.isblank(_this.chartAreaDataArray[indexTemp][_this.tipBgIndex][0])){
            _this.areaLineChartTmpData = _this.chartAreaDataArray[indexTemp][_this.tipBgIndex][0];
          }
          if(!_this.isblank(_this.chartBarDataArray[indexTemp][_this.tipBgIndex][0])){
            _this.barChartTmpData = _this.chartBarDataArray[indexTemp][_this.tipBgIndex][0];
          }
          if(!_this.isblank(_this.chartBarDataArrays[indexTemp][_this.tipBgIndex][0])){
            _this.barChartTmpDatas = _this.chartBarDataArrays[indexTemp][_this.tipBgIndex][0];
          }
        }
      });
    },
    changDataIndex:function(index){
      if(!this.isblank(this.sysAreaLineChartArray[index])){
        this.areaLineChartTmpDatas = this.sysAreaLineChartArray[index];
      }
    }

  },

  mounted(){
    this.init();
    // this.getTimeArray();//获取时间数组
    this.handleResize();
    window.addEventListener('resize',this.handleResize);
  }
}
