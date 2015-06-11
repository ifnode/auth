'use strict';

var app = require('ifnode')(),

    users = app.models.users,
    user_controller = app.Controller({
        name: 'user',
        root: '/u'
    });

user_controller.param('user', function(request, response, next, user_id) {
    users.findOne({ _id: user_id }).lean().exec(function(err, user) {
        if(err) { return next(err); }

        if(!user) {
            return response.redirect('/');
        }

        request.params.user = user;
        next();
    });
});

user_controller.get('/:user', function(request, response, next) {
    response.render('user/index', {
        user: request.params.user
    });
});

user_controller.end();
