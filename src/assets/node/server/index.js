const server=require("./server");
const router=require("./router");
var handle = {
    //不同接口名称，对应不同的文件
    "/": require("./request_commodity"),
    "/request_commodity": require("./request_commodity"),
    "/request_commodity_detail": require("./request_commodity_detail")
};
server(router,handle);