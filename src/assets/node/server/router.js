module.exports = (function(){
    return function(handle,pathname,params = ''){
        if(typeof handle[pathname] === "function") 
            return handle[pathname](params);
    }
})();
