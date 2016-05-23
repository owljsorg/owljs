(function(app) {
    class AppView {
        show(view) {
            ReactDOM.render(view, document.querySelector('body'));
        }

        showError() {
            ReactDOM.render(<div>Page not found</div>, document.querySelector('body'));
        }
    }
    app.AppView = AppView;
})(app, owl);