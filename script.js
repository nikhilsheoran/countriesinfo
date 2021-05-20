$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://restcountries.eu/rest/v2/all",
        success: function(result) {
            tableFiller(result);
        },
        error: function(error) {
            console.log(error);
        },
    })
})

function tableFiller(arr) {
    for (let i = 0; i < arr.length; i++) {
        const onecountry = arr[i];
        document.getElementById("tbody").innerHTML += '<tr><th scope="row">' + (i + 1) + '</th><td><a href="/template/index.html?country=' + i + '" class="btn btn-outline-danger">' + onecountry['name'] + '</a></td><td>' + onecountry['capital'] + '</td><td>' + onecountry['region'] + '</td></tr>';
        console.log(arr[i]);
    }
    $('#nametable').DataTable();
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = "/world-map.png";
}