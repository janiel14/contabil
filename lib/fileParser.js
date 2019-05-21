module.exports = function() {
    const _self = {};


    /**
     * toDecimal
     * @param {String} value 
     * @retrun {Float} value
     */
    const toDecimal = (value) => {
        value = value.replace(".", "");
        value = value.replace(",", ".");
        if (value.indexOf("D") > -1) {
            value = value.replace("D", "");
            value = parseFloat(value);
            value = parseFloat(value)-(parseFloat(value)*2)
            return value;
        } else {
            value = value.replace("C", "");
            value = parseFloat(value);
            return value;
        }
    }

    /**
     * replaceAll
     * @param {String} value 
     * @param {String} search 
     * @param {String} replace 
     * @return {String} valueReplaced
     */
    const replaceAll = (value, search, replace) => {
        for (let i = value.length - 1; i >= 0; i--) {
            value = value.replace(search,replace);
        }
        return value;
    }

    /**
     * cleanClassifier
     * @param {String} classifier 
     * @return {String} Classifier
     */
    const cleanClassifier = (classifier) => {
        return replaceAll(classifier, ".", "");
    }

    /**
     * getParent
     * @param {Array} list 
     * @param {Number} classifier 
     */
    const getParent = (list, classifier) => {
        let parent = null;
        if (list.length > 0) {
            list.forEach(item => {
                const c1 = item.classifier.toString();
                const c2 = classifier.toString();
                let i = 0
                while(i <= c1.length) {
                    let a = c1.substring(0, i);
                    let b = c2.substring(0, i)
                    if (a.length > 0) {
                        if (a === b) {
                            parent = c1;
                        } else {
                            return parent;
                        }
                    }
                    i++;
                }
            });
        }
        return parent;
    }

    /**
     * level1
     * @param {String} data
     * @return {Array} balances
     */
    _self.parseInArray = async (data) => {
        try {
            const balances = [];
            const lines = data.split('\n');
            if (lines.length > 0) {
                lines.forEach(line => {
                    line = line.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
                    line = replaceAll(line, "\t", " ");
                    const collumns = line.split(" ");
                    if (collumns.length >= 5) {
                        if (!isNaN(cleanClassifier(collumns[0]))) {
                            if (collumns.length > 6) {
                                let adds = parseInt(collumns.length)-6;
                                let model = {
                                    description: ''
                                };
                                let i = 1;
                                let x = 0
                                while (x <= adds) {
                                    model.description = model.description + ' ' + collumns[i];
                                    i++;
                                    x++;
                                }
                                model.classifier = parseInt(cleanClassifier(collumns[0]));
                                model.openingBalance = toDecimal(collumns[i]);
                                i++;
                                model.debit = toDecimal(collumns[i]);
                                i++;
                                model.credit = toDecimal(collumns[i]);
                                i++;
                                model.finalBalance = toDecimal(collumns[i]);
                                model.parent= getParent(balances, parseInt(cleanClassifier(collumns[0])))
                                balances.push(model);
                            } else {
                                balances.push({
                                    description: collumns[1],
                                    classifier: parseInt(cleanClassifier(collumns[0])),
                                    openingBalance: toDecimal(collumns[2]),
                                    debit: toDecimal(collumns[3]),
                                    credit: toDecimal(collumns[4]),
                                    finalBalance: toDecimal(collumns[5]),
                                    parent: getParent(balances, parseInt(cleanClassifier(collumns[0])))
                                });
                            }
                        }
                    }
                });
            }
            return balances;
        } catch (error) {
            console.error('lib - fileParser - level1: ', error);
            throw error;
        }
    }


    return _self;
}