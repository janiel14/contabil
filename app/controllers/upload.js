module.exports = function(app) {
    const _self = {};
    const Balances = app.models.balances;

    /**
     * uploadedFile
     * @param {Object} req
     * @param {Object} res
     * @route /api/upload
     * @method POST
     */
    _self.uploadedFile = async (req, res) => {
        try {
            if (Object.keys(req.files).length == 0) {
                res.status(400).json({
                    message: 'File not uploaded!'
                });
            } else {
                const data = req.files.balance.data;
                let response = [];
                if (req.params.type === "lv1" || req.params.type === 'lv2') {
                    response = app.fileParser.parseInArray(data);
                } else if (req.params.type === "lv3") {
                    response = app.fileParser.parseInArrayBalanceContabil(data);
                } else {
                    response = app.fileParser.parseInArrayAnalitycs(data);
                }
                if (response.length > 0) {
                    await Promise.all(response.map(async (item) => {
                        item = await Balances.create(item);
                    }));
                    res.status(200).json({
                        message: 'File imported success',
                        data: response
                    });
                } else {
                    res.status(500).json({
                        message: 'Fatal error on read file!',
                        data: {
                            file: data,
                            parser: response
                        }
                    });
                }
            }
        } catch (error) {
            console.error('app - controllers - upload - uploadedFile: ', error);
            app.logger.error('app - controllers - upload - uploadedFile: ' + error);
            res.status(500).json({
                message: 'Internal server error',
                data: error
            });
        }
    }

    return _self;
}