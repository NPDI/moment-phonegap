class ListImage {
    
    constructor() {
        
        this._images = [];
    }
    
    add(image) {
        
        this._images.push(image);
    }
    
    get images() {
        
        return [].concat(this._images);
    }
}