class ImageController {

  constructor() {

    let $ = document.querySelector.bind(document)
    this.inputImage = null;
    this.inputDescription = $('#description');
    this.inputLatitude = $('#latitude');
    this.inputLongitude = $('#longitude');
    this.userId = 1;
    let self = this;
    this.listImage = new Proxy(new ListImage(), {
      get(target, prop, receiver) {
        if ((['add', 'clear'].includes(prop) && typeof (target[prop]) == typeof (Function))){
          return function () {
            console.log(`interceptando ${prop}`);
            Reflect.apply(target[prop], target, arguments);
            self._imagesView.update(target);
          }
        }
        return Reflect.get(target, prop, receiver);
      }
    })

    this._imagesView = new ImagesView($('#imagesView'));
    this._imagesView.update(this.listImage);

    this._message = new Message();
    this._messagesView = new MessagesView($('#messagesView'));
    this._messagesView.update(this._message);

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

      this._cleanForm();

      this._message.text = 'Imagem adicionada com sucesso!';
      this._messagesView.update(this._message);
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

  _cleanForm() {
    this.inputImage = null;
    this.inputDescription = '';
    this.inputLatitude = '';
    this.inputLongitude = '';
  }
}
