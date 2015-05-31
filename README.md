#ifnode-auth
Authentication plugin for ifnode

# Usage
Install module:

`npm install ifnode-auth --save`

Create WebUser model:

    webuser.js
    
    var app = require('ifnode')(),
        webuser = app.Model(options, { db: 'virtual' });
        
Options:

    .user_role_field                                        Option name of user role
    .get_role(user: Object, callback: Function)             Method for get user role
    .roles                                                  Set list of user roles
    .roles(callback: Function)                              Set list of user roles
    .strategy                                               Definition of passport`s variants
    
    .userRoleField              Alias of .user_role_field
    .getRole()                  Alias of .get_role
    

Controller`s options:

    access: String|Array                    Set "access" roles. If user has not access, invoke access_denied handler
    only: String|Array                      Set "only" roles. If user has not access, current route will be skipped
    
    .access_denied(callback: Function)      Handler of access denied
    .accessDenied()                         Alias of .access_denied


Run server

    var ifnode = require('ifnode'),
        app = ifnode();
    
    app.register('ifnode-auth');
    app.run();
