class ImageController {

  constructor() {

    let $ = document.querySelector.bind(document)

    this.inputImage = null;
    this.inputDescription = $('#description');
    this.inputLatitude = $('#latitude');
    this.inputLongitude = $('#longitude');
    this.userId = 1;

    this.listImage = new Bind(
      new ListImage(),
      new ImagesView($('#imagesView')),
      'add', 'clear'
    )

    this._message = new Bind(
      new Message(),
      new MessagesView($('#messagesView')),
      'text'
    );

  }

  getAll() {
    const images = []

    const promise = fetch("http://192.168.20.41:3001/api/images/all", {
      method: "GET"
    })
      .then(resp => resp.json())
      .catch(err => console.log('Erro GetAll' + err));

    promise.then(data => {
      data.payload.forEach(img => images.push(img));
    })

    return images;
  }

  async add(event) {
    event.preventDefault();

    const promise = fetch("http://192.168.20.41:3001/api/images/create", {
      headers: { 'Content-type': 'application/json' },
      method: "POST",
      body: JSON.stringify(await this._createImage())
    })
      .then(resp => resp.json())
      .catch(err => console.log('Erro addImage - ' + err));

    promise.then(data => {
      this.listImage.add(data.payload);
      this._message.text = 'Imagem adicionada com sucesso!';
      this.clearForm();
    });
  }

  _uploadImage(file) {
    const form = new FormData();
    form.append("myfile", file, "mommentImage.jpg");

    return fetch("http://192.168.20.41:3001/upload", {
      method: "POST",
      body: form
    })
      .then(resp => resp.json())
      .catch(err => console.log('Erro uploadImage - ' + err));
  }

  async _createImage() {

    this.inputImage = document.querySelector('#inputImage').files[0];
    let file = await this._uploadImage(this.inputImage);
    return new Image(
      null,
      file.payload.filename,
      this.inputDescription.value,
      this.inputLatitude.value,
      this.inputLongitude.value,
      this.userId
    )
  }

  clearForm() {
    this.inputDescription.value = '';
    this.inputLatitude.value = '';
    this.inputLongitude.value = '';
  }
}
