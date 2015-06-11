'use strict';

var util = require('util');

exports.schema = function(app, MemoryStore) {
    MemoryStore.schema = 'memory';

    MemoryStore.fn.initialize = function(model_config) {
        util._extend(this, model_config);

        this._values = {};
        this.table = this.table || this.name;

        return this;
    };

    MemoryStore.fn.set = function(key, value) {
        return this._values[key] = value;
    };
    MemoryStore.fn.get = function(key) {
        if(typeof key === 'undefined') {
            return this._values;
        } else {
            return this._values[key] || null;
        }
    };
    MemoryStore.fn.remove = function(key) {
        delete this._values[key];
        return true;
    };
    MemoryStore.fn.has = function(key) {
        return key in this._values;
    };

    MemoryStore.fn.compile = function() {
        return this;
    };
};
