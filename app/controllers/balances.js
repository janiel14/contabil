module.exports = function(app) {
    const _self = {};
    const Balances = app.models.balances;

    /**
     * insertOrUpdate
     * @param {Object} req
     * @param {Object} res
     * @route /api/balances
     * @method POST
     */
    _self.insertOrUpdate = async (req, res) => {
        try {
            req.check('description', 'Param description not found!').notEmpty();
            req.check('classifier', 'Param classifier not found!').notEmpty();
            req.check('openingBalance', 'Param openingBalance not found!').notEmpty();
            req.check('debit', 'Param debit not found!').notEmpty();
            req.check('credit', 'Param credit not found!').notEmpty();
            req.check('finalBalance', 'Param finalBalance not found!').notEmpty();
            const errors = await req.validationErrors();
            if (errors) {
                res.status(400).json({
                    status: 400,
                    message: 'Params not found',
                    data: errors
                });
            } else {
                const balance = await Balances.findOne({
                    classifier: req.body.classifier
                });
                if (balance) {
                    req.body.updated_date = new Date();
                    await Balances.updateOne({
                        classifier: balance.classifier
                    }, req.body);
                    res.status(200).json({
                        message: 'Balance updated success',
                        data: req.body
                    });
                } else {
                    req.body.created_date = new Date();
                    req.body.updated_date = new Date();
                    const created = await Balances.create(req.body);
                    res.status(200).json({
                        message: 'Balance created success',
                        data: created
                    });
                }
            }
        } catch (error) {
            console.error('app - controllers - balances - insertOrUpdate: ', error);
            app.logger.error('app - controllers - balances - insertOrUpdate: ' + error);
            res.status(500).json({
                message: 'Internal server error',
                data: error
            });
        }
    }

    /**
     * delete
     * @param {Object} req
     * @param {Object} res
     * @route /api/balances/:classifier
     * @method DELETE
     */
    _self.delete = async (req, res) => {
        try {
            await Balances.deleteOne({
                classifier: req.params.classifier
            });
            res.status(200).json({
                message: 'Balance deleted success'
            });
        } catch (error) {
            console.error('app - controllers - balances - delete: ', error);
            app.logger.error('app - controllers - balances - delete: ' + error);
            res.status(500).json({
                message: 'Internal server error',
                data: error
            });
        }
    }

    /**
     * getBalance
     * @param {Object} req
     * @param {Object} res
     * @route /api/balances/:classifier
     * @method GET
     */
    _self.getBalance = async (req, res) => {
        try {
            const balance = await Balances.findOne({
                classifier: req.params.classifier
            });
            res.status(200).json({
                message: 'Balance take it success',
                data: balance
            });
        } catch (error) {
            console.error('app - controllers - balances - getBalance: ', error);
            app.logger.error('app - controllers - balances - getBalance: ' + error);
            res.status(500).json({
                message: 'Internal server error',
                data: error
            });
        }
    }

    /**
     * getBalances
     * @param {Object} req
     * @param {Object} res
     * @route /api/balances/:pag/:limit
     * @method GET
     */
    _self.getBalances = async (req, res) => {
        try {
            req.params.pag = isNaN(req.params.pag) ? 0 : req.params.pag;
            req.params.limit = isNaN(req.params.limit) ? 10 : req.params.limit;
            const count = await Balances.find().countDocuments();
            if (req.params.pag == 2) {
                req.params.pag = req.params.limit; 
            } else if (req.params.pag > 3) {
                req.params.pag = (parseInt(req.params.pag) * parseInt(req.params.limit));
            }
            const balances = await Balances.find().skip(parseInt(req.params.pag))
            .limit(parseInt(req.params.limit))
            .sort({updated_date: -1});
            res.status(200).json({
                message: 'Balances',
                data: {
                    balances: balances,
                    total: count
                }
            });
        } catch (error) {
            console.error('app - controllers - balances - getBalances: ', error);
            app.logger.error('app - controllers - balances - getBalances: ' + error);
            res.status(500).json({
                message: 'Internal server error',
                data: error
            });
        }
    }

    /**
     * getBalancesSearch
     * @param {Object} req
     * @param {Object} res
     * @route /api/balances/:pag/:limit/:search
     * @method GET
     */
    _self.getBalancesSearch = async (req, res) => {
        try {
            req.params.pag = isNaN(req.params.pag) ? 0 : req.params.pag;
            req.params.limit = isNaN(req.params.limit) ? 10 : req.params.limit;
            const count = await Balances.find().countDocuments({
                $text : { 
                    $search : req.params.search 
                }
            });
            if (req.params.pag == 2) {
                req.params.pag = req.params.limit; 
            } else if (req.params.pag > 3) {
                req.params.pag = (parseInt(req.params.pag) * parseInt(req.params.limit));
            }
            const balances = await Balances.find({
                $text : { 
                    $search : req.params.search 
                }
            }).skip(parseInt(req.params.pag))
            .limit(parseInt(req.params.limit))
            .sort({updated_date: -1});
            res.status(200).json({
                message: 'Balances',
                data: {
                    balances: balances,
                    total: count
                }
            });
        } catch (error) {
            console.error('app - controllers - balances - getBalancesSearch: ', error);
            app.logger.error('app - controllers - balances - getBalancesSearch: ' + error);
            res.status(500).json({
                message: 'Internal server error',
                data: error
            });
        }
    }


    return _self;
}