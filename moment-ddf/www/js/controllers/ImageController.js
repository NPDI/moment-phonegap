class ImageController {

  constructor() {

    let $ = document.querySelector.bind(document)

    this.inputImage = null;
    this.tagImg = $('#image');
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

    let service = new ImageService();

    service.getAll()
      .then(data => {
        data.forEach(img => this.listImage.add(img));
        this._message.text = 'Imagens carregadas com sucesso!';
      })
      .catch(err => {
        console.log(err);
        this._message.text = 'Ocorre um erro ao carregar as imagens!';
      });
  }

  add(event) {
    event.preventDefault();

    this.inputImage = document.querySelector('#inputImage').files[0];

    let service = new ImageService();

    service
      .upload(this.inputImage)
      .then(file => {
        let image = this._createImage(file.payload.filename);
        service
          .create(image)
          .then(data => {
            this.listImage.add(data.payload);
            this._message.text = 'Imagem adicionada com sucesso!';
            this.clearForm();
          })
          .catch(err => this._message.text = 'Ocorre um erro ao adicionar a imagem!')
      })
      .catch(err => this._message.text = 'Ocorre um erro ao fazer o upload da imagem!');
  }

  _createImage(name) {
    return new Image(
      null,
      name,
      this.inputDescription.value,
      this.inputLatitude.value,
      this.inputLongitude.value,
      this.userId
    )
  }

  clearForm() {
    this.inputImage = null;
    this.tagImg.src = 'https://github.com/NPDI/moment-phonegap/blob/7f14c54b54455920665651fb9dc9d943a2699124/moment-ddf/resources/logo.png?raw=true';
    this.inputDescription.value = '';
    this.inputLatitude.value = '';
    this.inputLongitude.value = '';
  }
}
