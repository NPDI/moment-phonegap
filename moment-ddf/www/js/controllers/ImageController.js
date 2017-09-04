class ImageController {

  constructor() {

    let $ = document.querySelector.bind(document)
    this.name = '';
    this._inputImage = null;
    this._inputDescription = $('#description');
    this._inputLatitude = $('#latitude');
    this._inputLongitude = $('#longitude');
  }

  add(event) {
    event.preventDefault();
    let image;
    this._inputImage = document.querySelector('#inputImage').files[0];
    const promisse = this.uploadImage(this._inputImage);

    promisse
      .then(function (value) {
        this.name = value;
      });

  }

  async uploadImage(file) {
    var form = new FormData();
    form.append("myfile", file);

    let name;

    await $.ajax({
      method: 'POST',
      url: 'http://192.168.20.41:3001/upload',
      data: form,
      processData: false,
      contentType: false
    }).done((result) => name = result.payload.filename)
      .fail((err) => console.log('Deu Erro na requisiçao'));

    return name;
  }
}
