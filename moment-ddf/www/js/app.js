
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
    alert('code: '    + error.code    + '\n' +
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


function onPhotoDataSuccess(imageData) {
    var smallImage = document.getElementById('smallImage');
    smallImage.style.display = 'block';
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

function onPhotoFileSuccess(imageData) {
    // Get image handle
    console.log(JSON.stringify(imageData));

    var smallImage = document.getElementById('smallImage');
    smallImage.style.display = 'block';
    smallImage.src = imageData;
}

function onPhotoURISuccess(imageURI) {
     console.log(imageURI);
    var largeImage = document.getElementById('image');
    largeImage.style.display = 'block';
    largeImage.src = "data:image/jpg;base64," + imageURI;
}

function capturePhotoWithData() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
}
function capturePhotoWithFile() {
    navigator.camera.getPicture(onPhotoFileSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
}


function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}

function onFail(message) {
    alert('Occoreu um ero: ' + message);
}