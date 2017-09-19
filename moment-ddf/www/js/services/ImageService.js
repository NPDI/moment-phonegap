class ImageService {

    constructor() {
        this._http = new HttpService();
    }

    getAll() {

        return this._http
            .get('http://192.168.20.41:3001/api/images/all')
            .then(resp => {
                return resp.payload.map(img =>
                    new Image(img.id, img.name, img.description, img.latitude, img.longitude, img.UserId));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as imagens do servidor.');
            });
    }

    create(img) {

        return this._http
            .get('http://192.168.20.41:3001/api/images/create', img)
            .then(resp => {
                return resp.data.payload
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível cadastrar uma nova imagem no servidor.');
            });

    }

    upload(file) {
        const form = new FormData();
        form.append("myfile", file, "mommentImage.jpg");

        return fetch("http://192.168.20.41:3001/upload", {
            method: "POST",
            body: form
        })
            .then(resp => resp.json())
            .catch(err => err);
    }
}