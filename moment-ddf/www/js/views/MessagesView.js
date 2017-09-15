class MessagesView extends View {
    constructor(props) {
        super(props)
    }

    template(model) {
        return model.text ? `<a class="btn" onclick="Materialize.toast('${model.text}', 4000)">Toast!</a>` : '<p></p>';
    }

    update(model) {
        this._element.innerHTML = this.template(model);
        this._element.children[0].click();
        this._element.style.display = 'none';
    }
}