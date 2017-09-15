class ImagesView extends View {
    constructor(props) {
        super(props)
    }

    template(list) {
        return `   
        <div class="row">
        ${list.images.map(img => {
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

}