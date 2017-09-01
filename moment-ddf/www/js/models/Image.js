class Image{
    constructor(name, description, latitude, longitude) {

        this._name = name;
        this.description = description;
        this._latitude = latitude;
        this._longitude = longitude;
        Object.freeze(this);
    }
        
    get name() {
        return this._name;
    }
    
    get latitude() {
        return this._latitude;
    }
    
    get longitude() {
        return this._longitude;
    }
}