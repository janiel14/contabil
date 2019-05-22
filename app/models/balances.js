const Mongoose = require('mongoose');
module.exports = function(app) {
    const schema = new Mongoose.Schema({
        created_date: {
            type: Date,
            index: true,
            required: true
        },
        updated_date: {
            type: Date,
            index: true,
            required: true
        },
        description: {
            type: String,
            required: true,
            index: true
        },
        classifier: {
            type: Number,
            required: true,
            index: true
        },
        openingBalance: {
            type: Number,
            required: true
        },
        debit: {
            type: Number,
            required: true
        },
        credit: {
            type: Number,
            required: true
        },
        finalBalance: {
            type: Number,
            required: true
        },
        parent: {
            type:  String,
            default: null
        }
    });
    schema.index({
        "created_date": "text",
        "updated_date": "text",
        "description": "text",
        "classifier": "text",
        "openingBalance": "text",
        "debit": "text",
        "credit": "text",
        "finalBalance": "text"
    });
    return app.mongoose.model('balances', schema);
}