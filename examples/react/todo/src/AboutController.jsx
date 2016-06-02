(function(app, owl) {
    class AboutController extends owl.Controller {
        constructor() {
            super();
            this.appView = owl.require('appView');
        }
        init() {
            this.appView.show(
                <app.AboutView />
            );
        }
    }
    app.AboutController = AboutController;
})(app, owl);
