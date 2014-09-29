
$(document).ready(function () {

    /* Does your browser support geolocation? */
    if (navigator.geolocation) {
        $(".js-geolocation").show();
    } else {
        $(".js-geolocation").hide();
    }

    /* Put the cursor in the search box */
    $("#search-location").focus();

    /* Check for a query string param. If so, load that location */
    var location = GetQueryStringParams("location");

    if (location != null) {
        loadWeather(location + ", AUS");
    }
    else {
        if (navigator.geolocation && location != "geo") {
            navigator.geolocation.getCurrentPosition(function (position) {
            // window.location.href = window.location.href.split('?')[0] + "?location=geo"; //remove the current query string
            loadWeather(position.coords.latitude + ',' + position.coords.longitude); //load weather using your lat/lng coordinates
            });
        }
        else {
            loadWeather("Sydney, AUS", "");
        }
    }
});

$(".js-geolocation").on("click", function () {
    window.location.href = window.location.href.split('?')[0]; // this will cause the geo to be used.
});

function loadWeather(location, woeid) {
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: "c",
        success: function (weather) {
            html = '<h2><i class="icon-' + weather.code + '"></i> ' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
            html += '<ul><li>' + weather.city + ', ' + weather.region + '</li>';
            html += '<li class="currently">' + weather.currently + '</li>';
            html += '<li>' + weather.wind.direction + ' ' + weather.wind.speed + ' ' + weather.units.speed + '</li></ul>';

          
            /* could add a high low block */

            /* could add a sunrise and subset block */

            // window.location.href = window.location.href.split('?')[0] + "?location=" + weather.city; //remove the current query string

            /* update the page title */
            document.title = weather.title;

            /* update the weather forecast */
            $("#weather").html(html);


            /* update the page background */
            switch (weather.region.toLowerCase()) {
                case ("qld"):
                    $("html").css("background-image", "url(images/qld.jpg)");
                    break;

                case ("nsw"):
                    $("html").css("background-image", "url(images/nsw.jpg)");
                    break;

                case ("act"):
                    $("html").css("background-image", "url(images/act.jpg)");
                    break;

                case ("vic"):
                    $("html").css("background-image", "url(images/vic.jpg)");
                    break;

                case ("sa"):
                    $("html").css("background-image", "url(images/sa.jpg)");
                    break;

                case ("wa"):
                    $("html").css("background-image", "url(images/wa.jpg)");
                    break;

                case ("nt"):
                    $("html").css("background-image", "url(images/nt.jpg)");
                    break;

                case ("tas"):
                    $("html").css("background-image", "url(images/tas.jpg)");
                    break;

                default:
                    $("html").css("background-image", "url(images/vic.jpg)");
                    break;
            }

        },
        error: function (error) {
            $("#weather").html('<p>' + error + '</p>');
        }
    });
}

function GetQueryStringParams(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split("&");
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split("=");
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}