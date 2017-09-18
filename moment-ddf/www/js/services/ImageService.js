class ImageService {

    getAll() {
        return fetch("http://192.168.20.41:3001/api/images/all", {
            method: "GET"
        })
            .then(resp => resp.json())
            .catch(err => console.log('Erro GetAll' + err));
    }

    create(img) {
        return fetch("http://192.168.20.41:3001/api/images/create", {
            headers: { 'Content-type': 'application/json' },
            method: "POST",
            body: JSON.stringify(img)
        })
            .then(resp => resp.json())
            .catch(err => err);

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