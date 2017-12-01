//调用服务配置
import Qs from 'qs'
export default{

	// url: '/testpost',
	
    //默认接口地址，如果api中传入则用api中的 //上线应讲此处改为上线地址
    // baseURL: 'http://192.168.97.14:8001/frontend-web/frontend/service/getArchByVar',
    dataLoadingUrl : window.location.protocol+"//"+document.domain+":8001/frontend-web/frontend/service/getArchByVar",
    dataLoadingSelectUrl : window.location.protocol+"//"+document.domain+":8001/frontend-web//frontend/service/getDataByChart",
    // dataLoadingUrl : 'http://localhost:8080/frontend-web/frontend/service/getArchByVar',
    // dataLoadingSelectUrl : 'http://localhost:8080/frontend-web//frontend/service/getDataByChart',
    // `method` 是创建请求时使用的方法
	method: 'POST',

    // `transformRequest` 允许在向服务器发送前，修改请求数据
	transformRequest: [
		function(data) {
			//为了避免qs格式化时对内层对象的格式化先把内层的对象转为
			// data.strSQL = base64encode(data.strSQL);
			//由于使用的form-data传数据所以要格式化
            data = Qs.stringify(data);
            // console.log("config 中transformRequest == "+data);
			return data;
		}
	],

    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
	transformResponse: [
		function(data) {
            // console.log("congif 中transformResponse =====>>> "+data);
			return data;
		}
	],

    // `params` 是即将与请求一起发送的 URL 参数
    // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
	params: {

	},

    //序列化params
    // paramsSerializer: function(params) {
    //  return Qs.stringify(params, {arrayFormat: 'brackets'})
    // },

    // `data` 是作为请求主体被发送的数据
    // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
    // 在没有设置 `transformRequest` 时，必须是以下类型之一：
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - 浏览器专属：FormData, File, Blob
    // - Node 专属： Stream
	data: {
		// firstName: 'Fred'
	},


    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
	timeout: 50000,

    // `withCredentials` 表示跨域请求时是否需要使用凭证
	withCredentials: true, // default


	responseType: 'json', // default

    // headers: {'Content-Type' : 'application/json'},
    headers: {
        // 'Access-Control-Allow-Origin':'*',
        // 'Access-Control-Allow-Methods':'GET,POST,PATCH,PUT,OPTIONS',
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        //'Content-Type' : 'application/x-www-form-urlencoded'
    },
    

	// `onUploadProgress` 允许为上传处理进度事件
    onUploadProgress: function (progressEvent) {
        // 对原生进度事件的处理
    },
    
    // `onDownloadProgress` 允许为下载处理进度事件
    onDownloadProgress: function (progressEvent) {
        // 对原生进度事件的处理
    },

    // `maxContentLength` 定义允许的响应内容的最大尺寸
    maxContentLength: 2000,
      
    // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
	validateStatus: function(status) {
		return status >= 200 && status < 300; // default
	},

    // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
    // 如果设置为0，将不会 follow 任何重定向
	maxRedirects: 5, // default
}
