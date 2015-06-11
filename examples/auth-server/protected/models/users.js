'use strict';

var app = require('ifnode')(),

    users = app.Model({
        name: 'users'
    });

users.populate = function() {
    var self = this;

    [
        { id: 1, nick: 'lalka', role: 'user' },
        { id: 2, nick: 'tralivalka', role: 'admin' }
    ].forEach(function(user) {
            self.set(user.id, user);
        });
};
