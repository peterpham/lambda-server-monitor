'use strict';


// external dependencies
const AWS = require('aws-sdk');
const request = require('request');

// PUT YOUR URL HERE
const urls = [
  'http://example.com/'
];
const timeout = 10000; // ms to wait for response
const cloudwatch = new AWS.CloudWatch();

module.exports.index = (event, context, callback) => {

  // ignore invalid SSL certificate
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  
  let i = 0;

  for (i in urls) {
    let url = urls[i];
    
    // call url and if response code is not 200 something is not working
    request.get(url, {timeout: timeout},
      (err, response, body) => {

        let value = 0;
        let statusCode = "unknown";

        if (err) {
            console.log(url, 'Error: ' + err);
            value = 1;
        } 
        else if (response.statusCode !== 200) {
            console.log(url, 'Status Code: ' + response.statusCode);
            value = 1;
            statusCode = response.statusCode;
        } 
        else {
            console.log(url, 'Status Code: 200');
            statusCode = "200";
        }
        
        let params = {
            MetricData: [ /* required */
                {
                    MetricName: 'WebSiteNotResponding', /* required */
                    Dimensions: [
                        {
                            Name: 'url', /* required */
                            Value: url /* required */
                        }
                    ],
                    Timestamp: new Date(),
                    Unit: 'Count',
                    Value: value
                }
            ],
            Namespace: 'WebApps' /* required */
        };

        cloudwatch.putMetricData(params, (err, data) => {
            if (err) console.log(err, 'Not able to put mertric data');           
        });
        
    });

  }

  callback(null, null);
};
