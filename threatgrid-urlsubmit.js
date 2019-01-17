module.exports = function(RED) {
    function URLSubmitNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            submitURL = encodeURIComponent(msg.url);
            //node.send(msg);

            request = require('request');

            var options = { method: 'POST',
            url: 'https://panacea.threatgrid.com/api/v2/samples',
            qs: { api_key: 'g1gkukoavkk76g9fjj0qcbkjfg' },
            headers:
             {'Postman-Token': '10eb7bac-26c6-4f9f-953b-7cb085896b8a',
              'Cache-Control': 'no-cache',
              'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
            formData:
             {sample:
              {value: '[InternetShortcut]\r\n\URL=' + submitURL + '\r\n',
               options:
               {filename: 'sample',
                contentType: null } } } };

            request(options, function(error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
                if (error) {
                    msg.payload = error;
                    node.send(msg);
                } else {
                    msg.payload = body;
                    node.send(msg);
                }
            });


        });
    }
    function ThreatGrid(n) {
        RED.nodes.createNode(this,n);
        this.apikey = n.apikey;
        this.scanwait = n.scanwait;
    }
    RED.nodes.registerType("threatgrid-urlsubmit",URLSubmitNode);
    RED.nodes.registerType("threat-grid",ThreatGrid);

}