window.Model = function (options) {
    let resourceName = options.resourceName  //表名
    return {
        init: function () {
            var APP_ID = 'RP5jB6H5do4sn5yIDjUcaJ1X-gzGzoHsz';
            var APP_KEY = '4UzFg7PmGSk8n4Kd49sjYnw4';
            AV.init({appId: APP_ID,appKey: APP_KEY});
        },
        fetch: function () {
            var query = new AV.Query(resourceName)
            return query.find()
        },
        save: function (object) {
            var X = AV.Object.extend(resourceName) //查表
            var x = new X()
            return x.save(object)
        }
    }
}