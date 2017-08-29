// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    //execute code when device is ready
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

myApp.onPageInit('map', function (page) {
    // Do something here for "map" page
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})

$$('.list-panel').on('click', function (e) {
    myApp.closePanel();
});

function login(){
    var formData = myApp.formToJSON('#login');    
    mainView.router.loadPage('map.html');
}

function saveUser(){    
    var formData = myApp.formToJSON('#my-form');   
    myApp.alert(JSON.stringify(formData), 'Dados inseridos');     
};


function onSuccess(position) {
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    var latLong = new google.maps.LatLng(latitude, longitude);

    var locations = [
        ['Mercado Municipal', -22.253749, -45.704170, 'https://68.media.tumblr.com/avatar_ba21ec6b0cb5_128.png'],
        ['ETE FMC', -22.255957, -45.702666, 'https://68.media.tumblr.com/avatar_149303a9b9dc_128.png'],
        ['Inatel', -22.257121, -45.696493, 'http://static.ziggi.uol.com.br/imagens_programas/icone_7407451d6b7090af7d12afef46843e4f_paisagem_de_natureza.jpg']
    ];

    var mapOptions = {
        center: latLong,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    setMarkers(map, locations);
    infowindow = new google.maps.InfoWindow({
        content: "loading..."
    });
};

function onError(error) {
    alert('erro');
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
};


function setMarkers(map, markers) {

    for (var i = 0; i < markers.length; i++) {
        var sites = markers[i];
        var siteLatLng = new google.maps.LatLng(sites[1], sites[2]);
        var marker = new google.maps.Marker({
            position: siteLatLng,
            map: map,
            title: sites[0]
            //zIndex: sites[3]
            //html: sites[4]
        });

        var contentString = '<img src="' + sites[3] + '">';

        google.maps.event.addListener(marker, "click", function () {
            //alert(this.html);
            infowindow.setContent(contentString);
            infowindow.open(map, this);
        });
    }
};