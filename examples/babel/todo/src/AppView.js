(function(app, owl) {
    class AppView extends owl.View {
        constructor() {
            super({
                el: document.querySelector('html')
            });
            // update links to data-element
            // and update special events (submit, focus, blur)
            this.update();
        }

        showMain(view) {
            this.elements.main.style.display = 'block';
            this.elements.error.style.display = 'none';
            this.elements.main.innerHTML = '';
            this.elements.main.appendChild(view.getEl());
        }

        showError() {
            this.elements.main.style.display = 'none';
            this.elements.error.style.display = 'block';
        }
    }
    app.AppView = AppView;
})(app, owl);