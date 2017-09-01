// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var urlApi = "http://192.168.20.41:3001/";
var imgName = "";

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    //execute code when device is ready
});

myApp.onPageInit('map', function (page) {
    // Do something here for "map" page
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
})

myApp.onPageInit('upload', function (page) {
    //on init page upload        
})

myApp.onPageInit('upload-description', function (page) {
    myApp.alert('Now, enter a description for your image if necessary...', 'Success =)');
})

$$('.list-panel').on('click', function (e) {
    myApp.closePanel();
});

function login() {
    mainView.router.loadPage('map.html');
    var formData = myApp.formToJSON('#login');
    $.post(urlApi + 'token', formData, function (data) {
        if (data.token) {
            window.localStorage.setItem("userId", data.user.id);
            window.localStorage.setItem("token", data.token);
            $.ajaxSetup({
                headers: { "Authorization": data.token }
            });
            mainView.router.loadPage('map.html');
        } else {
            myApp.alert('Email or password are incorrect =(', 'Ohh...');
        }
    }).fail(function (err) {
        myApp.alert('Some error occurred =(', 'Ohh...');
    });
}

function saveUser() {
    var formData = myApp.formToJSON('#my-form');
    $.post(urlApi + 'api/users/create', formData, function (data) {
        myApp.alert('Registered with success', 'Ok');
        mainView.router.loadPage('index.html');
    }).fail(function (err) {
        myApp.alert('Some error occurred =(', 'Ohh...');
    });
};

function onSuccess(position) {
    $.get(urlApi + 'api/images/all', function (data) {        
        var images = data.payload;        
        var infoWindowContent = [];
        var markers = [];
        images.forEach(function (image) {
            infoWindowContent.push(['<div class="info_content">' +
                '<h3>User ' + image.UserId + '</h3>' +
                '<p>Description - ' + image.description + '</p>' +
                '<img src="' + urlApi + image.name + '" style="widht:150px;height:150px;">' +
                '</div>']
            );            
           markers.push(['Hello',parseFloat(image.latitude), parseFloat(image.longitude)]);
        });        
        createMap(position, infoWindowContent, markers);
    }).fail(function(error){

    });

};

function createMap(position, infoWindowContent, markers){
    /*var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>Brooklyn Museum</h3>' +
        '<p>The Brooklyn Museum is an art museum located in the New York City borough of Brooklyn.</p>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>Brooklyn Public Library</h3>' +
        '<p>The Brooklyn Public Library (BPL) is the public library system of the borough of Brooklyn, in New York City.</p>' +
        '</div>'],
        ['<div class="info_content">' +
        '<h3>Prospect Park Zoo</h3>' +
        '<p>The Prospect Park Zoo is a 12-acre (4.9 ha) zoo located off Flatbush Avenue on the eastern side of Prospect Park, Brooklyn, New York City.</p>' +
        '</div>']
    ];*/

    

    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    var latLong = new google.maps.LatLng(latitude, longitude);
    var bounds = new google.maps.LatLngBounds();

    /*var markers = [
        ['Brooklyn Museum, NY', 40.671531, -73.963588],
        ['Brooklyn Public Library, NY', 40.672587, -73.968146],
        ['Prospect Park Zoo, NY', 40.665588, -73.965336]
    ];*/
    alert(JSON.stringify(markers));
    alert(JSON.stringify(infoWindowContent));

    var mapOptions = {
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    map.setTilt(50);
    
    // Add multiple markers to map
    var infoWindow = new google.maps.InfoWindow(), marker, i;

    for (i = 0; i < markers.length; i++) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]           
        });

        // Add info window to marker    
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Center the map to fit all markers on the screen
        map.fitBounds(bounds);
    }
    // Set zoom level
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
        this.setZoom(13);
        google.maps.event.removeListener(boundsListener);
    });
}

function onError(error) {
    alert('erro');
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
};

function uploadImage() {
    var opa = $("#img-file")[0].files[0];
    var formd = new FormData();
    formd.append("myfile", opa);

    $.ajax({
        method: 'POST',
        url: urlApi + "upload",
        data: formd,
        processData: false,
        contentType: false
    }).done(function (result) {
        imgName = result.payload.filename;
        mainView.router.loadPage('upload-description.html');
    }).fail(function (err) {
        myApp.alert(JSON.stringify(err));
    });
}

function photoChanged(files) {
    if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg)$/)) {
        var file = files[0];
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function (e) {
            $('#my-image').attr('src', e.target.result);
        };
    } else {
        //TODO: error type file
    }
}

function saveImage() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    function onSuccess(position) {
        var formImage = myApp.formToJSON('#form-description');
        formImage.UserId = window.localStorage.getItem("userId");
        formImage.name = imgName;
        formImage.latitude = position.coords.latitude;
        formImage.longitude = position.coords.longitude;
        $.post(urlApi + 'api/images/create', formImage, function (data) {
            mainView.router.loadPage('map.html');
        }).fail(function (err) {
            myApp.alert('Some error occurred =(', 'Ohh...');
        });
    }

    function onError(error) {
        myApp.alert(error.message, 'Error =(');
        console.log('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }
}