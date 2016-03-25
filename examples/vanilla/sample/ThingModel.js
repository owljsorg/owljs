(function(app, owl) {
    function ThingModel(data) {
        owl.Model.call(this, data, {
            baseUrl: 'thing'
        });
    }
    ThingModel.prototype = Object.create(owl.Model.prototype);
    app.ThingModel = ThingModel;
})(app, owl);