const express = require("express");
const consign = require("consign");
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const logger = require("./logger")();
const helpers = require("./helpers");
const expressValidator = require('express-validator');
const compression = require('compression');
const fileUpload = require('express-fileupload');
const mongoose = require("./mongoose")();
const fileParser = require('./fileParser');
module.exports = function() {
    const app = express();
    app.logger = logger.getLogger();
    app.debugging = logger.getDebug();
    app.helpers = helpers(app);
    app.helpers.checkBasicFolders();
    app.set('port', process.env.NODE_PORT || 7000);
    app.env = process.env.NODE_ENV || 'development';
    app.debug = process.env.NODE_DEBUG || false;
    app.use(compression());
    app.use(bodyParser.urlencoded({limit: '1024mb',extended: true}));
    app.use(bodyParser.json({limit: '1024mb'}));
    app.use(require('method-override')());
    app.use(cors());
    app.use(expressValidator());
    app.use(helmet());
    app.use(express.static('./public'));
    app.use(fileUpload({
        limits: { 
            fileSize: 50 * 1024 * 1024 
        }
    }));
    mongoose.getConnection((conn) => {
        if (conn) {
            app.mongoose = conn;
            app.fileParser = new fileParser();
            consign({cwd: 'app', verbose: false})
                .include("models")
                .then("controllers")
                .then("routes")
                .into(app);
            app.get('*', function(req, res) {
                res.status(404).send("<h1>Page not found</h1>");
            });
        } else {
            app.logger.log("error", "Erro on connect mongodb!");
            process.exit(0);
        }
    });      
    return app;
}