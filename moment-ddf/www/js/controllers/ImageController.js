class ImageController {

  constructor() {

    let $ = document.querySelector.bind(document)
    this.inputImage = null;
    this.inputDescription = $('#description');
    this.inputLatitude = $('#latitude');
    this.inputLongitude = $('#longitude');
  }

  async add(event) {
    event.preventDefault();
    this.inputImage = document.querySelector('#inputImage').files[0];

    let file = await this.uploadImage(this.inputImage);

    const image = new Image(
      null,
      file.payload.filename,
      this.inputDescription.value,
      this.inputLatitude.value,
      this.inputLongitude.value,
    )

    console.log(JSON.stringify(image));

  }

  uploadImage(file) {
    const form = new FormData();
    form.append("myfile", file, "mommentImage.jpg");

    return fetch("http://192.168.20.41:3001/upload", {
      method: "POST",
      body: form
    })
    .then(resp => resp.json())
    .catch(err => console.log(err));
  }
}
