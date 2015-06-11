'use strict';

let debug = require('debug')('blog:app'),
    ifnode = require('ifnode'),
    ifnode_auth = require('../../'),

    app = ifnode({
        project_folder: require('path').resolve(__dirname, '.'),
        env: 'local'
    });

app.register([
    'ifnode-memorystore',
    ifnode_auth
]);
app.load();
app.models.users.populate();

module.exports = app;
