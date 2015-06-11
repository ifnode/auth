module.exports = {
    site: {
        local: {
            host: 'localhost',
            port: 3000
        }
    },

    application: {
        middleware: {
            'express-session': {
                'name': 'local.sid',
                'secret': 'keyboard cat',
                'resave': false,
                'saveUninitialized': true
            }
        }
    },

    db: {
        memory: {
            schema: 'memory'
        }
    },

    components: {
        auth: {
            local: {
                usernameField: 'id'
            }
        }
    }
};
