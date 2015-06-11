'use strict';

var path = require('path'),
    should = require('should'),
    request = require('supertest'),

    app = require('../examples/auth-server/app');

describe('Auth', function() {
    describe('Basic', function() {
        var agent = request.agent(app.listener);

        it('should be unauthorized', function(done) {
            agent
                .get('/logout')
                .expect(401, done);
        });

        it('should redirect after login', function(done) {
            agent
                .get('/login?id=1&password=1')
                .expect(302, done);
        });

        it('should be user', function(done) {
            agent
                .get('/')
                .expect({ id: 1 }, done);
        });

        it('should logout', function(done) {
            agent
                .get('/logout')
                .expect(302, done);
        });
    });

    describe('By role', function() {
        var agent = request.agent(app.listener);

        it('should redirect after login', function(done) {
            agent
                .get('/login?id=2&password=1')
                .expect(302, done);
        });

        it('should be admin', function(done) {
            agent
                .get('/by_role')
                .expect({ is_admin: true }, done);
        });
    });
});
