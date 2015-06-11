'use strict';

var debug = require('debug')('blog:webuser'),
    app = require('ifnode')(),

    webuser = app.Model({
        name: 'webuser'
    }, {
        db: 'virtual'
    });

webuser.serialize = function(user, callback) {
    callback(null, user.id);
};
webuser.deserialize = function(id, callback) {
    callback(null, app.models.users.get(id));
};

webuser.get_role = function(user, callback) {
    callback(null, user.role);
};

webuser.strategy = {
    local: function(_id, password, callback) {
        var user = app.models.users.get(_id);

        callback(null, user);
    }
};
