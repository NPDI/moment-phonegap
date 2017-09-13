class ImagesView {
    constructor(element) {
        this._element = element;
    }

    _template(list) {
        return `   
        <div class="row">
        ${list.images.map(img => {
                console.log('VIEW:' + img)
                return `<div class="col s12 m12">
                            <div class="card">
                                <div class="card-image">
                                <img src="http://192.168.20.41:3001/${img.name}">
                                <span class="card-title">${img.UserId}</span>
                                </div>
                                <div class="card-content">
                                <p>${img.description}</p>
                                </div>
                            </div>
                        </div>`
            }).join('')}
        </div>`;
    }

    update(list) {
        this._element.innerHTML = this._template(list);
    }
}