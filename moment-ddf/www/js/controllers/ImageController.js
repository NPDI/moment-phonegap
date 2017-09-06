class ImageController {

  constructor() {

    let $ = document.querySelector.bind(document)
    this._inputImage = null;
    this._inputDescription = $('#description');
    this._inputLatitude = $('#latitude');
    this._inputLongitude = $('#longitude');
  }

  add(event) {
    event.preventDefault();
    let name;
    this._inputImage = document.querySelector('#inputImage').files[0];
    this.uploadImage(this._inputImage)
      .then(value => name = value)
      .catch(err => console.log(err));

    const image = new Image(
      null,
      name,
      this._inputDescription.value,
      this._inputLatitude.value,
      this._inputLongitude.value,
    )

    window.alert(JSON.stringify(image));

  }

  async uploadImage(file) {
    var form = new FormData();
    form.append("myfile", file, "mommentImage.jpg");

    let name;

    await $.ajax({
      method: 'POST',
      url: 'http://192.168.20.41:3001/upload',
      data: form,
      processData: false,
      contentType: false
    }).done((result) => name = result.payload.filename)
      .fail((err) => window.alert('Deu Erro na requisiçao'));

    return name;
  }
}
