/**
 * Node.js 认为每个文件都是一个独立的模块。如果你的包有两个文件，假设是“a.js” 和“b.js”，然后“b.js” 要使用“a.js” 的功能，“a.js” 必须要通过给 exports 对象增加属性来暴露这些功能。
 */

//加载http模块
const http = require("http");

//加载url模块
const url = require("url");

//加载querystring模块
const qs = require('querystring');
 
module.exports = (function(){
    var res,route,handle;
    return function(_route,_handle){
        route = _route;
        handle = _handle;
        var server=http.createServer(setServer);
        server.listen(5978,"localhost",function(){
            console.log("服务已开启...");
        })
    }
    function setServer(request,response){
        res = response;
        let body = "";
        request.on("data",function(data){
            body += data;
        });
        request.on("end",function(){
			
            // 关闭nodejs 默认访问 favicon.ico
            if(request.url.indexOf("favicon.ico") > -1) return;
			
            //获取请求路径
            let pathname = url.parse(request.url).pathname;
			
			//判断请求方式
			let url_params = url.parse(request.url).query;
			let transmit_params = '';
			
			if(url_params == null){ //代表请求方式是 post 请求
				let post_params = qs.parse(body);
					transmit_params = post_params;
			}else{ //代表请求方式是 get 请求
				let get_params = qs.parse(url_params);
					transmit_params = get_params;
			}
						
            //返回处理的数据
            let result = route(handle,pathname,transmit_params);
					
            //发送给客户端
            setData(result);
			
        });
    }
    function setData(result){ //只负责发送数据，其他事情交给其他模块来做。
        res.writeHead(200,{
            "content-type":"text/html;charset=utf-8",
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Headers":"*",
			'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'
        })
        res.write(result);
        res.end();
    }
})();
