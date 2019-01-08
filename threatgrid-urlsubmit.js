module.exports = function(RED) {
    function URLSubmitNode(config) {
        RED.nodes.createNode(this,config);
        this.apikey = config.apikey;
        this.url = config.url;
        var node = this;
        node.on('input', function(msg) {
            submitURL = encodeURIComponent(msg.url);
            urlStr = "https://panacea.threatgrid.com/api/v2/search/submissions?q=" + submitURL + "&api_key=" + msg.apikey;

            //msg.payload = urlStr;
            //node.send(msg);

            request = require('request');
            request(urlStr, function(err, res, body) {
                if (err) {
                    msg.payload = err;
                    node.send(msg);
                } else {
                    msg.payload = body;
                    node.send(msg);
                }
            });


        });
    }
    RED.nodes.registerType("threatgrid-urlsubmit",URLSubmitNode);
}