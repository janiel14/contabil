module.exports = function(app) {
    const controller = app.controllers.upload;
    app.route('/api/upload')
        .post(controller.uploadedFile);
}