'use strict';

var app = require('ifnode')(),
    _ = require('lodash'),

    m = app.models,
    main_controller = app.Controller({
        name: 'main'
    });

main_controller.get('/login', { access: '?' },
    app.auth.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
    })
);

main_controller.get('/logout', { access: '@' }, function(request, response, next) {
    request.logout();
    response.redirect('/');
});

main_controller.get({ only: '?' }, function(request, response, next) {
    response.ok({ id: -1 });
});
main_controller.get({ only: '@' }, function(request, response, next) {
    response.ok({ id: request.user.id });
});

main_controller.get('/by_role', { access: 'admin' }, function(request, response) {
    response.ok({ is_admin: true });
});

main_controller.access_denied(function(request, response) {
    response.unauthorized();
});
