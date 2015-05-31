'use strict';

var _ = require('lodash'),
    passport = require('passport'),

    error = function(message) {
        throw new Error('[auth-component] ' + message);
    },
    push = function(array, items) {
        var args = [].slice.call(arguments, 1);

        if(args.length > 0) {
            [].push.apply(array, args);
        }
    };

module.exports = function(app, Component) {
    var webuser_model = app.models.webuser,
        auth = Component({
            name: 'auth'
        }),

        _initialize_strategy = function(name, config, process) {
            var module_name = 'passport-' + name,
                module = require(module_name),
                strategy,

                default_passport_strategy = 'Strategy',
                custom_passport_strategy = config.passport_strategy || config.passportStrategy;

            strategy = module[custom_passport_strategy || default_passport_strategy];

            if(!strategy) {
                error('Cannot find passport Strategy for [' + module_name + ']');
            }

            passport.use(new strategy(config, process));
        },
        _initialize_passport = function(webuser_strategies) {
            var supported_strategies = this.config,
                supported_strategies_names = Object.keys(supported_strategies),

                name, process,
                i;

            passport.serializeUser(webuser_model.serialize);
            passport.deserializeUser(webuser_model.deserialize);

            for(i = supported_strategies_names.length; i--; ) {
                name = supported_strategies_names[i];
                process = webuser_strategies[name];

                if(!process) {
                    error('Cannot find Strategy handler for [' + name + ']');
                }

                _initialize_strategy.call(this, name, supported_strategies[name], process);
            }
        };

    auth.initialize = function() {
        var self = this,
            webuser_strategies = webuser_model.strategy,
            webuser_get_role = webuser_model.get_role || webuser_model.getRole,
            auth_roles;

        this.default_roles = {
            all: '*',
            guest: '?',
            authenticated: '@'
        };
        this.roles = auth_roles = _.values(this.default_roles);

        if(typeof webuser_get_role === 'function') {
            this.get_role = webuser_get_role.bind(webuser_model);
        }

        if(typeof webuser_model.roles === 'function') {
            webuser_model.roles(function(err, roles) {
                if(err) {
                    roles = [];
                }

                self.user_role_field = webuser_model.user_role_field || webuser_model.userRoleField;
                push(auth_roles, roles);
                _initialize_passport.call(this, webuser_strategies);
            });
        } else {
            push(auth_roles, webuser_model.roles);
            _initialize_passport.call(this, webuser_strategies);
        }

        return this;
    };
    auth.authenticate = function(strategy, options, cb) {
        return passport.authenticate(strategy, options, cb);
    };
    auth.attach = function(listener) {
        listener.use(passport.initialize(passport));
        listener.use(passport.session(passport));

        return this;
    };
};
