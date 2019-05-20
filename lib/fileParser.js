module.exports = function(app) {
    const _self = {};

    _self.level1 = async (data) => {
        try {
            const balances = [];
            data = data.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
            const lines = data.split('\n');
            if (lines.length > 0) {
                lines.forEach(line => {
                    const collumns = line.split(" ");
                    
                });
            }
            return balances;
        } catch (error) {
            console.error('lib - fileParser - level1: ', error);
            app.logger.error('lib - fileParser - level1: ' + error);
            throw error;
        }
    }

    return _self;
}