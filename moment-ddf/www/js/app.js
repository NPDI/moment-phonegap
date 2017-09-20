const URL_API = 'http://192.168.20.41:3001'

$('.modal-trigger').leanModal();

function myMap() {

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    function onSuccess(position = false) {
        /*  alert('Latitude: ' + position.coords.latitude + '\n' +
             'Longitude: ' + position.coords.longitude + '\n' +
             'Altitude: ' + position.coords.altitude + '\n' +
             'Accuracy: ' + position.coords.accuracy + '\n' +
             'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
             'Heading: ' + position.coords.heading + '\n' +
             'Speed: ' + position.coords.speed + '\n' +
             'Timestamp: ' + position.timestamp + '\n'); */
        createMap(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    };

    function onError(error) {
        alert('Not found geolocation');
        createMap(new google.maps.LatLng('-22.255275', '-45.702841'));
    }
}

async function createMap(position) {
    await imageController.getAll();

    const inputLatitude = document.querySelector('#latitude');
    const inputLongitude = document.querySelector('#longitude');

    inputLatitude.value = position.lat();
    inputLongitude.value = position.lng();

    const mapOptions = {
        center: position,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }

    const map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    let service = new ImageService();
    await service
        .getAll()
        .then(images => {
            images.forEach(img => {
                const contentString =
                    `<div class="info_content">
                          <h5>${img.description} </h5>
                          <p>Usuario: ${img.UserId} </p>
                          <img src="${URL_API}/${img.name}" class="responsive-img" style="widht:150px;height:180px;">
                    </div>`;
                const position = new google.maps.LatLng(parseFloat(img.latitude), parseFloat(img.longitude));
                const infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                const marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: img.name
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
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
}

function onPhotoSuccess(imageURI) {

    const imageTag = document.getElementById('image');
    imageTag.src = "data:image/jpeg;base64," + imageURI;

    const inputImage = document.querySelector('#inputImage');
    inputImage.files[0] = dataURItoBlob(imageURI)
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

function getPhoto(source) {
    navigator.camera.getPicture(onPhotoSuccess, onFail, {
        quality: 30,
        targetWidth: 180,
        targetHeight: 180,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true
    });
}

function onFail(message) {
    openPhoto('library');
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