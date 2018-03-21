const request = require('request');
const cheerio = require('cheerio');

exports.handler = function (event, context, callback) {
    try {
        request('http://www.ribroadcasters.com/News_and_Events/Closings_Delays/', function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

            const $ = cheerio.load(body);
            try {
                var targetRow = $('td:contains("Pawtucket Police")');
                var result = targetRow.children()[0].firstChild.data + "-" + targetRow.children()[1].firstChild.data
                console.log(result);
                callback(null, result);

            } catch (e) {
                console.log('No announcement found');
                callback("No announcement found", null);
            }
        });
    } catch (requestError) {
        console.log('Could not retrieve information from source');
        callback("Could not retrieve information from source", null);
    }
}