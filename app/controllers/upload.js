module.exports = function(app) {
    const _self = {};
    const Balances = app.models.balances;

    /**
     * processFileData
     * @param {String} data
     * @param {String} type
     */
    const processFileData = async (data, type) => {
        try {
            let response = [];
            if (type === "lv1" || type === 'lv2') {
                response = await app.fileParser.parseInArray(data.toString());
            } else if (type === "lv3") {
                response = await app.fileParser.parseInArrayBalanceContabil(data.toString());
            } else {
                response = await app.fileParser.parseInArrayAnalitycs(data.toString());
            }
            if (response.length > 0) {
                await Promise.all(response.map(async (item) => {
                    const find = await Balances.findOne({
                        classifier: item.classifier
                    });
                    if (find) {
                        item.updated_date = new Date();
                        item = await Balances.updateOne({
                            classifier: item.classifier
                        },item);
                    } else {
                        item.created_date = new Date();
                        item.updated_date = new Date();
                        item = await Balances.create(item);
                    }
                    return item;
                }));
            }
        } catch (error) {
            console.error('app - controllers - upload - processFileData: ', error);
            app.logger.error('aapp - controllers - upload - processFileData:: ' + error);
        }
    }

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
                processFileData(req.files.balance.data, req.query.type);
                res.status(200).json({
                    message: 'File imported success'
                });
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