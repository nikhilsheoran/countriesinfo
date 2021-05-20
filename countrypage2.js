function getCountryIndex() {
    const params = new URLSearchParams(window.location.search);
    for (const param of params) {
        country_index = param[1];
        return country_index;
    }
}

function apiCall() {
    $.ajax({
        type: "GET",
        url: "https://restcountries.eu/rest/v2/all",
        success: function(result) {
            operate(result);
        },
        error: function(error) {
            console.log(error);
        },
    })
}

function operate(arr) {
    setCountryName(arr);
    setCountryFlag(arr);
    setCountryBorders(arr);
    setCountryCurrency(arr);
    setCountryAlpha3(arr);
    setCountryCapital(arr);
    setCountryRegion(arr);
    setCountryFavIcon(arr);
    setCountryPopulation(arr);
    setCountryArea(arr);
    setCountryMap(arr);
    setCountryOtherDetails(arr);
}

function setCountryName(arr) {
    document.getElementById('title-title').innerText = arr[getCountryIndex()]['name'];
    document.getElementById('title-h4').innerText = arr[getCountryIndex()]['name'];
    document.getElementById('title-span').innerText = arr[getCountryIndex()]['name'];
    document.getElementById('title-2-span').innerText = arr[getCountryIndex()]['nativeName'];
    document.getElementById('title-3-span').innerText = arr[getCountryIndex()]['name'];
    document.getElementById('title-4-span').innerText = arr[getCountryIndex()]['name'];
    document.getElementById('title-em').innerText = arr[getCountryIndex()]['name'];
}

function setCountryFlag(arr) {
    document.getElementById('flag-img').src = arr[getCountryIndex()]['flag'];
    document.getElementById('flag-img-2').src = arr[getCountryIndex()]['flag'];
}

function setCountryBorders(arr) {
    const element = arr[getCountryIndex()]['borders'];
    if (element.length > 0) {
        for (let i = 0; i < element.length; i++) {
            $.ajax({
                type: "GET",
                url: "https://restcountries.eu/rest/v2/alpha/" + element[i],
                success: function(result) {
                    country_name = result['name'];
                    country_flag = result['flag'];
                    document.getElementById('bordering-countries-div').innerHTML += '<div class="col-lg-3 col-sm-6 m-4 p-0"><a href="#"><div class="item wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.3s"><div class="hidden-content"><h4>' + country_name + '</h4></div><div class="showed-content m-4"><img src="' + country_flag + '" alt=""></div></div></a></div>';
                },
                error: function(error) {
                    console.log(error);
                },
            })
        }
    } else {
        document.getElementById('bordering-countries-div').innerHTML += '<div class="col-lg-12 col-sm-6 m-4 p-0"><a href="#"><div class="showed-content m-4">None</div></a></div>';
    }
}

function setCountryCurrency(arr) {
    document.getElementById('currency-span').innerText = arr[getCountryIndex()]['name'] + " is " + arr[getCountryIndex()]['currencies'][0]['name'] + " ( " + arr[getCountryIndex()]['currencies'][0]['symbol'] + " ) ";
}

function setCountryAlpha3(arr) {
    document.getElementById('alpha-3-span').innerText = arr[getCountryIndex()]['name'] + ' is "' + arr[getCountryIndex()]['alpha3Code'] + '"';
}

function setCountryCapital(arr) {
    document.getElementById('capital-span').innerText = arr[getCountryIndex()]['name'] + ' is ' + arr[getCountryIndex()]['capital'];
    document.getElementById('capital-2-span').innerText = arr[getCountryIndex()]['capital'];
}

function setCountryRegion(arr) {
    document.getElementById('region-span').innerText = arr[getCountryIndex()]['name'] + ' lies in ' + arr[getCountryIndex()]['region'];
    document.getElementById('region-2-span').innerText = arr[getCountryIndex()]['region'];
}

function setCountryFavIcon(arr) {
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = arr[getCountryIndex()]['flag'];
}

function setCountryPopulation(arr) {
    document.getElementById('population-span').innerText = arr[getCountryIndex()]['population'];
}

function setCountryArea(arr) {
    document.getElementById('area-span').innerText = arr[getCountryIndex()]['area'];
}

function setCountryMap(arr) {
    document.getElementById('map-iframe').src = 'https://maps.google.com/maps?width=100%25&height=400&hl=en&q=' + arr[getCountryIndex()]['name'] + '&t=&z=3&ie=UTF8&iwloc=B&output=embed';
}

function setCountryOtherDetails(arr) {
    document.getElementById('lat-span').innerText = arr[getCountryIndex()]['latlng'][0];
    document.getElementById('lon-span').innerText = arr[getCountryIndex()]['latlng'][1];
    document.getElementById('calling-code-span').innerText = arr[getCountryIndex()]['callingCodes'][0];
    document.getElementById('time-zone-span').innerText = arr[getCountryIndex()]['timezones'][0];
    document.getElementById('sub-region-span').innerText = arr[getCountryIndex()]['subregion'];
}

$(document).ready(function() {
    apiCall();
})