
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


function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.12),
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