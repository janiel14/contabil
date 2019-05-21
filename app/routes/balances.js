module.exports = function(app) {
    const controller = app.controllers.balances;
    app.route('/api/balances')
        .post(controller.insertOrUpdate)
        .put(controller.insertOrUpdate);
    app.route('/api/balances/:classifier')
        .delete(controller.delete)
        .get(controller.getBalance);
    app.route('/api/balances/:pag/:limit')
        .get(controller.getBalances);
    app.route('/api/balances/:pag/:limit/:search')
        .get(controller.getBalancesSearch);
}