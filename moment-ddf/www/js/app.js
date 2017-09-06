
$('.modal-trigger').leanModal();

var onSuccess = function (position) {
    alert('Latitude: ' + position.coords.latitude + '\n' +
        'Longitude: ' + position.coords.longitude + '\n' +
        'Altitude: ' + position.coords.altitude + '\n' +
        'Accuracy: ' + position.coords.accuracy + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
        'Heading: ' + position.coords.heading + '\n' +
        'Speed: ' + position.coords.speed + '\n' +
        'Timestamp: ' + position.timestamp + '\n');
    return position;
};

function onError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    return false;
}

function myMap() {
    let position = navigator.geolocation.getCurrentPosition(onSuccess, onError);

    if (!position) {
        position = new google.maps.LatLng('-22.255275', '-45.702841')
    } else {
        position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    };

    const mapOptions = {
        center: position,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }
    const map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}

let pictureSource;
let destinationType;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}


function dataURItoBlob(dataURI) {
    const binary = atob(dataURI);
    const array = [];
    for (let i = 0; i < binary.length; i++)
        array.push(binary.charCodeAt(i));
    return new Blob([new Uint8Array(array)], { type: 'image/jpg' });
}

function onPhotoSuccess(imageURI) {

    const imageTag = document.getElementById('image');
    imageTag.style.display = 'block';
    imageTag.src = "data:image/jpeg;base64," + imageURI;

    const inputImage = document.querySelector('#inputImage');
    inputImage.files[0] = dataURItoBlob(imageURI)
    console.log(inputImage.files[0]);

    alert(JSON.stringify(inputImage.files[0]));
}

function openPhoto(source) {
    let sourceType;
    switch (source) {
        case "camera":
            sourceType = pictureSource.CAMERA
            getPhoto(sourceType);
            break;
        case "library":
            const inputFile = document.querySelector('#inputImage');
            inputFile.click();
            break;
        default:
            break;
    };
}

function getPhoto(source) {

    navigator.camera.getPicture(onPhotoSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}

function onFail(message) {
    alert("Error : " + message)
}