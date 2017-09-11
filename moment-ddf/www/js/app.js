const URL_API = 'http://192.168.20.41:3001/'
const imageController = new ImageController();

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

async function myMap() {
    let position = navigator.geolocation.getCurrentPosition(onSuccess, onError);

    if (!position) {
        position = new google.maps.LatLng('-22.255275', '-45.702841')
    } else {
        position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    };

    const mapOptions = {
        center: position,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }
    const map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    const reponseImages = await imageController.getAll()
    const images = reponseImages.payload;
    let markers = [];
    let contentString = [];

    images.forEach(img => {
        contentString.push(['<div class="info_content">' +
            '<h3>User ' + img.UserId + '</h3>' +
            '<p>Description - ' + img.description + '</p>' +
            '<img src="' + URL_API + img.name + '" style="widht:150px;height:150px;">' +
            '</div>']
        );
        markers.push([img.name, parseFloat(img.latitude), parseFloat(img.longitude)]);
    });


    markers.forEach(mark => {
        const position = new google.maps.LatLng(mark[1], mark[2]);
        console.log('POSITION' + position);

        contentString.forEach(content => {
            const infowindow = new google.maps.InfoWindow({
                content: content.toString()
            });

            const marker = new google.maps.Marker({
                position: position,
                map: map,
                title: mark[0]
            });

            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
        });

    })




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
            const image = document.querySelector('#image');
            inputFile.click();
            break;
        default:
            break;
    };
}

function onFileSelected(event) {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    const imgtag = document.getElementById("image");
    imgtag.title = selectedFile.name;

    reader.onload = function (event) {
        imgtag.src = event.target.result;
    };

    reader.readAsDataURL(selectedFile);
}

function getPhoto(source) {

    navigator.camera.getPicture(onPhotoSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}

function onFail(message) {
    openPhoto('library');
}