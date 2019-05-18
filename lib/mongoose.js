const Mongoose = require('mongoose');
module.exports = function() {
    const _self = {};
    const _options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: true, // Don't build indexes
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
        auth: {
            user: null,
            password: null
        }
    };

    /**
     * getConfig
     * @return {Object} config
     */
    const getConfig = () => {
        const config = {
            database: process.env.NODE_MONGO_DBNAME || "contabil",
            host: process.env.NODE_MONGO_HOST || 'machineevents-daw7r.mongodb.net',
            user: process.env.NODE_MONGO_USER || 'contabil',
            pass: process.env.NODE_MONGO_PASS || '8456de1f1w56',
            port: process.env.NODE_MONGO_PORT || ''
        };
        return config;
    }

    /**
     * getConnection
     * @return {Object} connection
     */
    _self.getConnection = (cb) => {
        try {
            const config = getConfig();
            _options.auth.user = config.user;
            _options.auth.password = config.pass;
            Mongoose.connect('mongodb+srv://' + config.host +':' + config.port + '/' + config.database, _options, (error, conn) => {
                if (error) {
                    console.error("Can't connect mongodb!");
                    cb(null);
                } else {
                    console.log("Mongo connected")
                    cb(conn);
                }
            });
        } catch (error) {
            console.error(error);   
        }
    }
    return _self;
}