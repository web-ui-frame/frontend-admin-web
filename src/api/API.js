//调用服务接口
import axios from 'axios'
import config from './config'

class API {
    
    //获取服务统一接口，各图表根据此接口自定义内容
    post (params) {
        // config.data.strSQL = param.param;
        //post[0] URL 如果入参为空则用config中baseURL ，[1] 为Request服务器接受内容。
        //[2] config 为一些默认配置。
        return axios.post(params.paramUrl,params.paramRequest,config);
    };
    //优化后post请求
    myPost(url, params) {
        //let _url = apiUrl + url
        return new Promise((resolve, reject) => {
          axios.post(url, params,config).then(function (response) {
              // console.log("myPost中"+response);
            resolve(response.data)
          })
          .catch(function (err) {
            reject(err)
          })
        })
      };



    generaBarPreprocess(chartConfig,preData,dataLoadingSelectUrl,barPreprocessData){
      var _this = this;
      
      var barTmp = JSON.parse(barPreprocessData);
      
      var tmpBarPre = "";

      //循环四次
      var  valid_tmp = "" ,dup_tmp = "" ,incop_tmp = "",invali_tmp = "";
      var  valid_tmp_name = "" ,dup_tmp_name = "" ,incop_tmp_name = "",invali_tmp_name = "";
      var i = 0;
      // setInterval(()=>{
        //VALID/DUP/INCOR/INVALID
    //有效单，重单，错单，无效单
      // console.log("循环次数 i=" + i + "数值 == " +preData[i])
        chartConfig.variables = preData[0];
        
        _this.myPost(dataLoadingSelectUrl, chartConfig).then((resdata) => {

            if(resdata.statusCode == "1"){
              var tmpData = JSON.parse(resdata.data);
              //得到数据
              // console.log("tmpData<<<<< == " +tmpData.seriesData[0].data);
              
              valid_tmp = tmpData.seriesData[0].data;
              //y轴数据
              valid_tmp_name = tmpData.yAxis[0].data;
              i ++;
              // console.log("resdata 有效单 == " +JSON.stringify(resdata));                  
            }
            

        }, (err) => {
          console.log("预处理 initBarPreprocess 循环post第"+ i +"次请求失败"+err)
        });

        chartConfig.variables = preData[1];
        
        _this.myPost(dataLoadingSelectUrl, chartConfig).then((resdata) => {

            if(resdata.statusCode == "1"){
              var tmpData = JSON.parse(resdata.data);
              //得到数据
              dup_tmp = tmpData.seriesData[0].data;
              //y轴数据
              dup_tmp_name = tmpData.yAxis[0].data;
              i ++;
              // console.log("resdata 重单 == " +JSON.stringify(resdata));              
              
          }

        }, (err) => {
          console.log("预处理 initBarPreprocess 循环post第"+ i +"次请求失败"+err)
        });

        chartConfig.variables = preData[2];
        
        _this.myPost(dataLoadingSelectUrl, chartConfig).then((resdata) => {

            if(resdata.statusCode == "1"){
              var tmpData = JSON.parse(resdata.data);
              //得到数据
              incop_tmp = tmpData.seriesData[0].data;
              //y轴数据
              incop_tmp_name = tmpData.yAxis[0].data;
              i ++;
              // console.log("resdata 错单 == " +JSON.stringify(resdata));              
              
            }              

        }, (err) => {
          console.log("预处理 initBarPreprocess 循环post第"+ i +"次请求失败"+err)
        });
            
        chartConfig.variables = preData[3];
        
        _this.myPost(dataLoadingSelectUrl, chartConfig).then((resdata) => {


          if(resdata.statusCode == "1"){
            var tmpData = JSON.parse(resdata.data);
            //得到数据
            invali_tmp = tmpData.seriesData[0].data;
            //y轴数据
            invali_tmp_name = tmpData.yAxis[0].data;
            i ++;
            // console.log("resdata 无效单 == " +JSON.stringify(resdata));              
          }  
          

        }, (err) => {
          console.log("预处理 initBarPreprocess 循环post第"+ i +"次请求失败"+err)
        });

        
        var a =  setInterval(()=>{
          if(i == 4){
            // console.log("i ==== 4 可以调用服务");
            // console.log("i ==== 4 "+ valid_tmp );
           
            barTmp.data[0] = valid_tmp;
            barTmp.data[1] = dup_tmp;
            barTmp.data[2] = incop_tmp;
            barTmp.data[3] = invali_tmp;            
            barTmp.yLabel = valid_tmp_name;
            tmpBarPre = barTmp;
            clearInterval(a);
           }

          //  console.log("i ====" +JSON.stringify(barTmp));
           return JSON.stringify(tmpBarPre);            
           
        },500);
        
        
        if(!_this.isblank(tmpBarPre)){
          return JSON.stringify(tmpBarPre);                      
        }


    };
    // barPreprocessData:'{ "legend":["有效单","重单","错单","无效单"],"data":[[95,97,97,97,97,97,97,97,97],'+
    // '["","","","","","1","","",""],[1,1,1,1,1,1,1,1,1],[2,2,2,2,2,2,2,2,2]],"className":"barPreprocessIndex","gridShow":true,'+
    // '"yLabel":["SCDR","ISGW","RSGW","NOO5","NOO3","GPRS","GPNR","RPGW","IPGW"],"yName":"单位:%","orient":"horizontal",'+
    // '"xPosition":"center","proportion":["95%","98%","90%","95%","98%","98%","95%","95%","90%"],"color":["#006699","#473C8B","#7CCD7C","#DC143C"]}',

    generalPreprocessTmp(dataTmp,resdata){
      // var codeLegenf = ["ERR_PERCENT","INV_PERCENT","COR_PERCENT","DUP_PERCENT"];
      var dataValue = JSON.parse(dataTmp);

      var chardata = JSON.parse(resdata.data);

      if("000000"==chardata.repcode){

        dataValue.yLabel = chardata.yAxis[0].data;
       

        for(var i=0;i<chardata.seriesData.length;i++){
          var code = chardata.seriesData[i].legendCode;
          var dataTmp = chardata.seriesData[i].data;

          for(var j=0;j<dataTmp.length;j++){
              var tmp1 = parseInt(parseFloat(dataTmp[j]));
              if(tmp1 == 0){
                tmp1 = "";
              }
              dataTmp[j] = tmp1;
          }

          if(code == "COR_PERCENT"){
            dataValue.data[0] = dataTmp;
            dataValue.legend[0] = "有效单";            
          }else if(code == "DUP_PERCENT"){
            dataValue.data[1] = dataTmp; 
            dataValue.legend[1] = "重单";                        
          }else if(code == "ERR_PERCENT"){
            dataValue.data[2] = dataTmp;   
            dataValue.legend[2] = "错单";                                    
          }else if(code == "INV_PERCENT"){
            dataValue.data[3] = dataTmp;  
            dataValue.legend[3] = "无效单";                                                
          }
        }
      }
      return JSON.stringify(dataValue);  

    };

    generalPreprocessData(dataTmp){
      var _this = this;
      
      var dataValue = JSON.parse(dataTmp);

      if(!_this.isblank(dataValue)){
        var tmpProportion = [];
        var yLabelTmp = dataValue.yLabel;

        for(var i = 0;i<yLabelTmp.length;i++){

          if(yLabelTmp[i].toUpperCase() == "IPGW" || yLabelTmp[i].toUpperCase() == "GPNR" || yLabelTmp[i].toUpperCase() == "N003"
           || yLabelTmp[i].toUpperCase() == "N005" || yLabelTmp[i].toUpperCase() == "ISGW" || yLabelTmp[i].toUpperCase() == "RSGW" 
           || yLabelTmp[i].toUpperCase() == "SCDR"){
            tmpProportion[i] = "99%";
            continue;
          }
          if(yLabelTmp[i].toUpperCase() == "RPGW"){
            tmpProportion[i] = "99.95%";            
            continue;
          }
          if(yLabelTmp[i].toUpperCase() == "GPRS"){
            tmpProportion[i] = "90.62%";   //87.62%                     
            continue;
          }          
        }        
        dataValue.proportion = tmpProportion;
      }
      return JSON.stringify(dataValue);  
      
    };

    generalPreprocessSms(dataTmp){
      var _this = this;
      
      var dataValue = JSON.parse(dataTmp);

      if(!_this.isblank(dataValue)){
        var tmpProportion = [];
        var yLabelTmp = dataValue.yLabel;

        for(var i = 0;i<yLabelTmp.length;i++){

        
          if(yLabelTmp[i].toUpperCase() == "PPGJ"){
            tmpProportion[i] = "77.38%";            
            continue;
          }
          if(yLabelTmp[i].toUpperCase() == "PPDX"){
            tmpProportion[i] = "84.87%";                        
            continue;
          }
          if(yLabelTmp[i].toUpperCase() == "PPHT"){
            tmpProportion[i] = "4.71%";                                    
            continue;
          }
          if(yLabelTmp[i].toUpperCase() == "SMMP"){
            tmpProportion[i] = "3%";                        
            continue;
          }
          if(yLabelTmp[i].toUpperCase() == "SMNR"){
            tmpProportion[i] = "45.8%";                                    
            continue;
          }
        }        
        dataValue.proportion = tmpProportion;
      }
      return JSON.stringify(dataValue);  
      
    };

    generalPreprocessVoice(dataTmp){
      var _this = this;
      
      var dataValue = JSON.parse(dataTmp);

      if(!_this.isblank(dataValue)){
        var tmpProportion = [];
        var yLabelTmp = dataValue.yLabel;

        for(var i = 0;i<yLabelTmp.length;i++){

        
          if(yLabelTmp[i].toUpperCase() == "H002"){
            tmpProportion[i] = "99%";            
            continue;
          }
          if(yLabelTmp[i].toUpperCase() == "NOSI"){
            tmpProportion[i] = "86%";                        
            continue;
          }
          if(yLabelTmp[i].toUpperCase() == "GLOV"){
            tmpProportion[i] = "37%";                                    
            continue;
          }
          if(yLabelTmp[i].toUpperCase() == "GNOV"){
            tmpProportion[i] = "98%";                        
            continue;
          }
          if(yLabelTmp[i].toUpperCase() == "GIOV"){
            tmpProportion[i] = "20%";                                    
            continue;
          }
          if(yLabelTmp[i].toUpperCase() == "GBOV"){
            tmpProportion[i] = "67%";                                    
            continue;
          }
        }        
        dataValue.proportion = tmpProportion;
      }
      return JSON.stringify(dataValue);  
      
    };
    //样式
    // post (params) {
    //     return axios.post(params.paramUrl,params.paramRequest,config);
    // };

    generalPreprocessAppre(dataTmp){
      var _this = this;
      
      var dataValue = JSON.parse(dataTmp);

      if(!_this.isblank(dataValue)){
        var tmpProportion = [];
        var yLabelTmp = dataValue.yLabel;

        for(var i = 0;i<yLabelTmp.length;i++){
          if(yLabelTmp[i].toUpperCase() == "CRBT"){
            tmpProportion[i] = "74%";            
            continue;
          }
          if(yLabelTmp[i].toUpperCase() == "VACN"){
            tmpProportion[i] = "12%";                        
            continue;
          }
        }        
        dataValue.proportion = tmpProportion;
      }
      return JSON.stringify(dataValue);  
      
    };
    
    generalPreprocess(dataTmp,resdata){
      
              var dataValue = JSON.parse(dataTmp);
              
              var chardata = JSON.parse(resdata.data);
              
              if("000000"==chardata.repcode){
               // var areaBarPreprocess = JSON.parse(_this.barPreprocessData);
                //y轴单位
                dataValue.yName = chardata.yAxis[0].showName;
                //y轴数值
                var yLableTmp = [], legend = [], color = [], dataArray = [] ,propoArray = [];
                yLableTmp = chardata.yAxis[0].data;
                for(var i=0;i<chardata.seriesData.length;i++){
                  legend[i] = chardata.seriesData[i].legendName;
                  dataArray[i] = chardata.seriesData[i].data;
                  //color[i] = chardata.seriesData[i].areaStylecolor;
                }  
                //legend赋值
                dataValue.legend = legend;
                dataValue.yLabel  = yLableTmp;          
                dataValue.data = dataArray;
                var length1 = dataArray[0].length;
                var length2 = dataArray.length;
                for(var j=0;j<length1;j++){
                  var num = 0 ,num2 = 0;
                  for(var i=0;i<length2;i++){
                    if(i===0){
                      num2 = dataArray[i][j];                        
                    }
                    num = num+dataArray[i][j]
                  }
                  //算出平均值百分百
                  if(num2>0){
                    propoArray[j]=(Math.round(num2 / num * 10000) / 100.00 + "%");
                  }else{
                    propoArray[j] = "0%";
                  }                    
                }
              //   百分比倒叙赋值
                dataValue.proportion = propoArray.reverse();    
              }  
      
              return JSON.stringify(dataValue);  
              
      
          };

          // barChartDataVoiceTmp:'{"className":"voice-barChartVoiceTmp","color":["#0094e4","#45beff","#004eff"],' +
          // '"text":"话单数近3个月对比","data":[[17,15,15,10,17,20],[11,11,15,10,20,10],' +
          // '[11,15,15,20,25,15]],"xLabel":["HOO2","NOSI","GLOV","GIOV","GNOV","GBOV"],"legend":["7月","8月","9月"],"barWidth":"20",'+
          // '"yNameArray":["单位:千万条"],"position":"top","rendColor":false,"show":false}',
      
          generalChartMethod(dataTmp,resdata,title){
              var _this = this;
              var dataValue = JSON.parse(dataTmp);
              // console.log("generalChartMethod ----<<<");
            
              if(! _this.isblank(resdata.data)){
                var chardata = JSON.parse(resdata.data);
                if("000000"==chardata.repcode ){
                  
                    //赋值图框名称  
                    if(_this.isblank(title)){
                      dataValue.text = chardata.title;                       
                    }
                    dataValue.text = title;                      
                    
                    //x轴数值
                    dataValue.xLabel = chardata.xAxis.data;
                    //y轴单位
        
                    // if(!_this.isblank(dataValue.yNameArray)){
                    //     var yNameArray = new Array();                
                    //     for(i in chardata.yAxis){
                    //         yNameArray[i] = chardata.yAxis[i].showName;                    
                    //     }
                    //     console.log("yNameArray----<<< 为数组");
                    //     dataValue.yNameArray = yNameArray;  
        
                    // }
                    // if(!_this.isblank(dataValue.yName)){
                    //     console.log("yName----<<< 为对象");
                    //     dataValue.yName = chardata.yAxis[0].showName;                
                    // }
                    //
                    var legend = [], color = [], dataArray = [];
                    for(var i=0;i<chardata.seriesData.length;i++){
                    legend[i] = chardata.seriesData[i].legendName;
                    color[i] = chardata.seriesData[i].areaStylecolor;
                    // console.log("chardata.seriesData[i].data ==" + chardata.seriesData[i].data);
                    dataArray[i] = chardata.seriesData[i].data;
  
                    // dataArray[i] = [7, 16, 14, 17, 9, 13, 13];
                    }
                    dataValue.legend = legend;
                    // areaLineChart.color = color;
                    dataValue.data = dataArray;
                }
                  
              }
             
                
              return JSON.stringify(dataValue);                      
                
          };
      
      
          //判断是否为空
          isblank(objc){
              if(objc == null) return true;
              if(typeof(objc) == "undefined") return true;
              if($.trim(objc.toString()) == "") return true;
              if($.trim(objc.toString())=="null")return true;
              if($.trim(objc.toString())=="undefined")return true;
              return false;
          };
          
         

    
}
export default API;

