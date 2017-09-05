
$('.modal-trigger').leanModal();

$('#acao-finalizar').on('click', function () {

    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
    });

    function onSuccess(imageURI) {
        var image = document.getElementById('myImage');
        image.src = imageURI;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
})


var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
          return position;
};

function onError(error) {
    console.log('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
    return false;
}

function myMap() {
    let position = navigator.geolocation.getCurrentPosition(onSuccess, onError);
    
    if(!position){
        position = new google.maps.LatLng('-22.255275', '-45.702841')
    }else{
        position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    };

    var mapOptions = {
        center: position,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}

var pictureSource;   
var destinationType; 

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}


function onPhotoFileSuccess(imageData) {
    var smallImage = document.getElementById('image');
    smallImage.src = imageData;
}

function capturePhotoWithFile() {
    navigator.camera.getPicture(onPhotoFileSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
}

function onFail(message) {
    console.log('Occoreu um ero: ' + message);
}