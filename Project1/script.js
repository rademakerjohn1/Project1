$(docment).ready(function(){
var button = "translate";

$.getJSON("http://api.languagelayer.com/detect?access_key=5413814db0cfa3e2903177d8d87997e3", function()

{

});

// set endpoint and your access key
// var access_key = 'YOUR_ACCESS_KEY';
// var query = 'Hello my friend, how are you?';

// AJAX call
$.ajax({
    url: 'http://api.languagelayer.com/detect?access_key=' + access_key + '&query=' + encodeURIComponent(query),   
    dataType: 'json',
    success: function(json) {

    // Access and use your preferred validation result objects
    console.log(json.success);
    }

});

