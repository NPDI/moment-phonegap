class ImageController {

  constructor() {

    let $ = document.querySelector.bind(document)
    this.inputImage = null;
    this.inputDescription = $('#description');
    this.inputLatitude = $('#latitude');
    this.inputLongitude = $('#longitude');
    this.userId = 1;
    this._listImage = new ListImage();
  }

  getAll() {

    return fetch("http://192.168.20.41:3001/api/images/all", {
      method: "GET"
    })
      .then(resp => resp.json())
      .catch(err => console.log('Erro GetAll' + err));
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
      this.userId
    )

    fetch("http://192.168.20.41:3001/api/images/create", {
      headers: { 'Content-type': 'application/json' },
      method: "POST",
      body: JSON.stringify(image)
    })
      .then(resp => this._cleanForm())
      .catch(err => console.log('Erro addImage - ' + err));
  }

  uploadImage(file) {
    const form = new FormData();
    form.append("myfile", file, "mommentImage.jpg");

    return fetch("http://192.168.20.41:3001/upload", {
      method: "POST",
      body: form
    })
      .then(resp => resp.json())
      .catch(err => console.log('Erro uploadImage - ' + err));
  }

  _createImage() {
    return new Image();
  }

  _cleanForm() {

    this.inputImage = null;
    this.inputDescription = '';
    this.inputLatitude = '';
    this.inputLongitude = '';
    this.inputDescription.focus();
  }
}
