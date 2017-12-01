import API from '@/api/API';
const api = new API();
export default {
        data () {
            const validateCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('不能为空'));
                } else if(value !== this.formCustom.pageCode){
                    callback(new Error('The two input passwords do not match!'));
                } else {
                    callback();
                }
            };
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('不能为空'));
                } else if(value !== this.formCustom.pageName){
                    callback(new Error('The two input passwords do not match!'));
                } else {
                    callback();
                }
            };
            const validateParentGreenCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('不能为空'));
                } else if(value !== this.formCustom.parentGreenCode){
                    callback(new Error('The two input passwords do not match!'));
                } else {
                    callback();
                }
            };
            const validateStaytimeValue = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('不能为空'));
                } else if(value !== this.formCustom.staytimeValue){
                    callback(new Error('The two input passwords do not match!'));
                } else {
                    callback();
                }
            };
            const validateState = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('状态不能为空'));
                }
                console.log(value);
                // 模拟异步验证效果
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('Please enter a numeric value1'));
                    } else {
                        if (value < 18) {
                            callback(new Error('Must be over 18 years of age2'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            return {
                isDown:false,
                isDrop:false,
                pageCodelabel:'',
                archCodelabel:'',
                nowIndex:0,
                pageCodeArray:[
                    {
                        pageCode:'KX_P01',
                        keyId: 1,
                    },
                    {
                        pageCode:'KX_P02',
                        keyId: 2,
                    },
                    {
                        pageCode:'KX_P03',
                        keyId: 3,
                    },
                    {
                        pageCode:'KX_P04',
                        keyId: 4,
                    },
                     {
                        pageCode:'KX_P05',
                        keyId: 5,
                    },
                ],
                archCodeArray:[
                    {
                        archCode:'KX_P01_A01',
                        keyId: 1,
                    },
                    {
                        archCode:'KX_P01_A02',
                        keyId: 2,
                    },
                    {
                        archCode:'KX_P01_A03',
                        keyId: 3,
                    },
                    {
                        archCode:'KX_P01_A04',
                        keyId: 4,
                    },
                ],
                formPage:{
                    type: 'td_view_page',
                    keyId: '11',
                    pageCode: '',
                    pageName: '',
                    pageUrl: '',
                    pageType: '',
                    parentGreenCode: '',
                    pageState: '',
                    staytimeValue: '',
                    staytimeUnit: ''
                },
                formArch: {
                    type: 'td_view_arch',
                    keyId: '',
                    pageCode: '',
                    archCode: '',
                    archName: '',
                    state: '',
                    staytimeValue: '',
                    staytimeUnit: ''
                    },
                ruleCustom: {
                    pageCode: [{ validator: validateCode, trigger: 'blur' }],
                    pageName: [{ validator: validateName, trigger: 'blur' }],
                    pageUrl: [{ validator: '', trigger: 'blur' }],
                    pageType: [{ validator: '', trigger: 'blur' }],
                    parentGreenCode: [{ validator: validateParentGreenCode, trigger: 'blur' }],
                    pageState: [{ validator: validateState, trigger: 'blur' }],
                    staytimeValue: [{ validator: validateStaytimeValue, trigger: 'blur' }],
                    staytimeUnit: [{ validator: '', trigger: 'blur' }]
                },
                columns1: [
                    {
                        title: 'greenCode',
                        key: 'greenCode'
                    },
                    {
                        title: 'greenName',
                        key: 'greenName'
                    },
                    {
                        title: 'greenType',
                        key: 'greenType'
                    },
                    {
                        title: 'greenState',
                        key: 'greenState'
                    }
                ],
                data1: [
                    {
                        greenCode: 'ES_001',
                        greenName: '电子大屏',
                        greenType: '',
                        greenState: 'Y'
                    }
                ],
                tableInfo: [{
                                "keyId": 5,
                                "pageCode": "PRE_P01",
                                "pageName": "计费预处理数据页面",
                                "pageUrl": "",
                                "pageType": "",
                                "parentGreenCode": "ES_001",
                                "pageState": "Y",
                                "staytimeValue": 0,
                                "staytimeUnit": ""
                            },{
                                "keyId": 8,
                                "pageCode": "PRE_P04",
                                "pageName": "计费预处理增值页面",
                                "pageUrl": "",
                                "pageType": "",
                                "parentGreenCode": "ES_001",
                                "pageState": "Y",
                                "staytimeValue": 0,
                                "staytimeUnit": ""
                            }],
                configUrl : "http://localhost:8080/frontend-admin/config/service/getConfigInfo",
            }
        },
        methods: {
            toggleDrop () {
                var _this = this; 
                var params = {
                    type:this.formPage.type,
                    pageCode:this.formPage.pageCode,
                    archCode:this.formArch.archCode,
                }
                // this.getConfigInfoBlurry(params);
                this.isDrop = true; 
            },
            toggleDown () {
                var _this = this;
                var params = {
                    type:this.formArch.type,
                    pageCode:this.formPage.pageCode,
                    archCode:this.formArch.archCode,
                }
                // this.getConfigInfoBlurry(params);
                this.isDown = true; 
            },
            choosePage(index){
                var _this= this;
                _this.formPage.pageCode = _this.pageCodeArray[index].pageCode;
                this.isDrop = false
                var params = {
                    type:_this.formPage.type,
                    pageCode:_this.formPage.pageCode,
                    archCode:_this.formArch.archCode,
                }
                this.getConfigInfoValue(params);
                
            },
            chooseArch(index){
                var _this= this;
                _this.formArch.archCode = _this.archCodeArray[index].archCode;
                this.isDown = false
                var params = {
                    type:_this.formArch.type,
                    pageCode:_this.formPage.pageCode,
                    archCode:_this.formArch.archCode,
                }
                this.getConfigInfoValue(params);
            },
            addArch () {
                alert(1);
                
            },
            handleSubmit () {
                var _this = this;
                var config = _this.formPage;
                api.myPost("http://localhost:8080/frontend-admin/config/service/getConfigInfo", config).then((res) => {
                     if (valid) {
                        this.$Message.success('Success!');
                        this.$refs[name].resetFields();
                    } else {
                        this.$Message.error('Fail!');
                    }
                }, (err) => {
                    console.log("getConfigInfoBlurry post请求失败"+err)
                });
            },
            handleUpdate (name) {
                console.log(name)
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        this.$refs[name].resetFields();
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            getConfigInfoAll:function (params) {
              var tableCode="";
              var conditionsCode="all";
              var fieldCode="";
              var config = {
                tableCode : tableCode,
                conditionsCode : conditionsCode,
                fieldCode : fieldCode,
              }
              api.myPost(configUrl, config).then((res) => {
                  if(res.rtnCode == '1'){
                    
                  }
              }, (err) => {
                console.log("getConfigInfoAll post请求失败"+err)
              });
            },
            getConfigInfoBlurry:function (params) {
                console.log(params);
                var tableCode=params.type;
                var conditionsCode="blurry";
                if (tableCode=="td_view_page") {
                    var fieldCode="page_code="+params.pageCode+"%";
                }else if(tableCode=="td_view_arch"){
                    var fieldCode="page_code="+params.pageCode+",arch_code="+params.archCode+"%";
                }
            //   console.log(tableCode);
            //   console.log(conditionsCode);
            //   console.log(fieldCode);
              var config = {
                tableCode : tableCode,
                conditionsCode : conditionsCode,
                fieldCode : fieldCode,
              }
              api.myPost("http://localhost:8080/frontend-admin/config/service/getConfigInfo", config).then((res) => {
                  if(res.rtnCode == '1'){
                    // var tableInfo = res.tableInfos.tableInfo;
                    var tableInfos = [];
                    for (var i = 0; i < tableInfo.length; i++) {
                      tableInfos = {
                          pageCode:tableInfo[i].pageCode,
                          keyId:tableInfo[i].tableInfo,
                      }
                    }
                    this.pageCodeArray = tableInfos;
                  }
              }, (err) => {
                console.log("getConfigInfoBlurry post请求失败"+err)
              });
            },
            getConfigInfoValue:function (params) {
              var tableCode=params.type;
              var conditionsCode="value";
              if (tableCode=="td_view_page") {
                  var fieldCode="page_code="+params.pageCode;
              }else if(tableCode=="td_view_arch"){
                  var fieldCode="page_code="+params.pageCode+",arch_code="+params.archCode;
              }
              console.log(tableCode);
              console.log(conditionsCode);
              console.log(fieldCode);
              var config = {
                tableCode : tableCode,
                conditionsCode : conditionsCode,
                fieldCode : fieldCode,
              }
              api.myPost("http://localhost:8080/frontend-admin/config/service/getConfigInfo", config).then((res) => {
                  if(res.rtnCode == '1'){
                    if(this.formPage.type == res.tableInfos.tableCode){
                        // var tableInfo = res.tableInfos.tableInfo;
                        for (var i = 0; i < tableInfo.length; i++) {
                        
                        }
                    }
                  }
              }, (err) => {
                console.log("getConfigInfoValue post请求失败"+err)
              });
            }
        }
    }
