var socket;
var url = "http://localhost";
var port = 8000;

socket = io.connect(url + ':' + port);
socket.on('connect', function(weather_data) {
    console.log("socket on");

    var APIKey = '40da6f764aed67b8';
    var my_delay = 10000; //10 seconds delay 
    var year, month, day;

    year = 2013;
    month = 1;
    day = 1;

    $(function() {
        callAjax(year, month, day);
    });

    function callAjax() {
        $.ajax({
            url: "http://api.wunderground.com/api/" + APIKey + "/history_" + year + "0" + month + "0" + day + "/q/UT/Park_City.json",
            dataType: "jsonp",
            success: function(parsed_json) {

                //declaring weather variables
                var condS = (parsed_json)['history']['observations'][0]['conds'];
                var meanTempI = parsed_json['history']['dailysummary'][0]['meantempi'];
                var snowFall = (parsed_json)['history']['observations'][0]['snow'];
                var meanWindSpdI = (parsed_json)['history']['dailysummary'][0]['meanwindspdi'];
                var visibilityI = (parsed_json)['history']['observations'][0]['visi'];
                // var snowDepth = (parsed_json)['history']['dailysummary'][0]['snowdepthi'];
                console.log(parsed_json);

                $('.dayCondition').text(condS);
                $('.temperature').text(meanTempI);
                $('.snow').text(snowFall);
                $('.wind').text(meanWindSpdI);
                $('.visibility').text(visibilityI);
                // $('.snowdepth').text(snowDepth);

                console.log("http://api.wunderground.com/api/f3f7ad387ae1c963/history_" + year + "0" + month + "0" + day + "/q/UT/Park_City.json");
                console.log(year);
                console.log(month);
                console.log(day);

                day += 5;
                if (day > 28) {
                    month++; // Next month
                    day = 1; //reset days
                }
                if (month > 12) {
                    year++
                    month = 1; //reset month?
                };
                if (year > 2015) {
                    return; //stop the execution of this funciton
                }
                setTimeout(callAjax, my_delay);

                socket.emit('weather_data', {year, month, day, cond: condS, temp: meanTempI, snow: snowFall, wind: meanWindSpdI, visi: visibilityI }); //displayed on the local server on Terminal: node app.js from the project folder
                console.log("Sent: " + condS + " " + meanTempI + " " + snowFall + " " + meanWindSpdI + " " + visibilityI); //running the function: callAjax with a 10 sec delay shown on the console
            }
        });
    }
})