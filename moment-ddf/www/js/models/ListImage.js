class ListImage {

    constructor() {
        this._images = [];
    }

    add(image) {
        this._images.push(image);
    }

    clear(){
        this._images = [];
    }

    get images() {
        return [].concat(this._images);
    }

}