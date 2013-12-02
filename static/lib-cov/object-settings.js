// instrument by jscoverage, do not modifly this file
(function () {
  var BASE;
  if (typeof global === 'object') {
    BASE = global;
  } else if (typeof window === 'object') {
    BASE = window;
  } else {
    throw new Error('[jscoverage] unknow ENV!');
  }
  if (!BASE._$jscoverage) {
    BASE._$jscoverage = {};
    BASE._$jscoverage_cond = {};
    BASE._$jscoverage_done = function (file, line, express) {
      if (arguments.length === 2) {
        BASE._$jscoverage[file][line] ++;
      } else {
        BASE._$jscoverage_cond[file][line] ++;
        return express;
      }
    };
    BASE._$jscoverage_init = function (base, file, lines) {
      var tmp = [];
      for (var i = 0; i < lines.length; i ++) {
        tmp[lines[i]] = 0;
      }
      base[file] = tmp;
    };
  }
})();
_$jscoverage_init(_$jscoverage, "lib/object-settings.js",[8,11,12,15,16,17,20,32,33,35,37,46,62,64,67,68,71,73,85,86,89,99,110,111,120,121,124,127,140,143,144,153,154,158,161,164,166,171,173,176,177,178,184,195,196,204,215,221,222]);
_$jscoverage_init(_$jscoverage_cond, "lib/object-settings.js",[11,67,67,85,110,120,143,153,161,161,161,171,171,177,195]);
_$jscoverage["lib/object-settings.js"].source = ["/**"," * Create custom objects and methods by aggregating and abstracting esources."," *"," * @version 0.1.0"," * @class Settings"," * @constractor"," */","require( 'abstract' ).createModel( module.exports = function Settings( exports ) {","","  // Construct Model only once.","  if( module.loaded ) {","    return Settings;","  }","","  var util        = require( 'util' );","  var inherits    = require( 'util' ).inherits;","  var _extend     = require( 'lodash' ).extend;","","  // Constructor Properties","  Settings.defineProperties( Settings, {","    inject: {","      /**","       * Force / Override properties","       *","       * If object not provided will bind to context.","       *","       * @param {Object} obj","       * @return {Object}","       */","      value: function inject( obj ) {","","        var target = obj || this;","        var Instance = new Settings.create();","","        Object.getOwnPropertyNames( Settings.prototype ).forEach( function( key ) {","","          Object.defineProperty( target, key, {","            value: Instance[ key ],","            enumerable: false,","            writable: true,","            configurable: true","          });","","        });","","        return target;","","      },","      enumerable: true,","      configurable: true,","      writable: true","    },","    mixin: {","      /**","       * Mixin the Emitter properties.","       *","       * @param {Object} obj","       * @return {Object}","       */","      value: function mixin( obj ) {","","        for( var key in Settings.prototype ) {","","          var descriptor = Object.getOwnPropertyDescriptor( obj, key );","","          // Detect if a property is not configurable.","          if( descriptor && !descriptor.configurable ) {","            break;","          }","","          try {","","            Object.defineProperty( obj, key, {","              value: obj[ key ] || Settings.prototype[ key ],","              enumerable: false,","              writable: true,","              configurable: true","            });","","          } catch( error ) {}","","        }","","        // Ensure we have an listener container.","        if( !obj._events ) {","          obj._events = {};","        }","","        return obj;","","      },","      enumerable: true,","      configurable: true,","      writable: true","    }","  });","","  // Prototypal Properties","  Settings.properties( Settings.prototype, {","","    /**","     * Get or create and get storage","     *","     * @param key {String}","     * @returns {*|undefined}","     */","    get: function get( key, fallback ) {","","      // Create object meta if it does not exist","      if( !this._meta ) {","        Object.defineProperty( this, '_meta', {","          value: {},","          enumerable: false,","          writable: true,","          configurable: true","        });","      }","","      // Return empty full meta object if no key specified","      if( 'undefined' === typeof key ) {","        return this._meta || {};","      }","","      var value = require( 'abstract' ).utility.query( this._meta, arguments[0] );","","      // Return the found value or the fallback value","      return value || fallback;","","    },","","    /**","     * Set Key & Value pair, or pass an object","     *","     * @method key","     * @param key {String|Object}","     * @param value {Any}","     * @returns {Object} Context.","     */","    set: function set( key, value ) {","      console.log( 'set', arguments[0] );","","      // Create object meta if it does not exist","      if( !this._meta ) {","        Object.defineProperty( this, '_meta', {","          value: {},","          enumerable: false,","          writable: true,","          configurable: true","        });","      }","","      // Not passing any arguments can be used to instantiate","      if( !arguments ) {","        return this;","      }","","      // Wrapper for Emit","      var emit = this.emit ? this.emit.bind( this ) : function emit() {};","","      // Key & Value Passed","      if( Object.keys( arguments ).length === 2 && ( 'string' === typeof arguments[0] || 'number' === typeof arguments[0] ) ) {","","        // Honor dot notation","        require( 'abstract' ).utility.unwrap( arguments[0], arguments[1], this._meta );","","        emit( [ 'set', arguments[0] ], null, arguments[1], arguments[0] );","","      }","","      // Object Passed, extend","      if( Object.keys( arguments ).length === 1 && 'object' === typeof arguments[0] ) {","","        require( 'util' )._extend( this._meta, arguments[0] );","","        // @todo Get object path using dot notation","        for( var key in arguments[0] ) {","          if( arguments[0].hasOwnProperty( key ) ) {","            emit( [ 'set', key ], null, arguments[0][key], key );","          }","        }","","      }","","      return this;","","    },","","    /**","     * Enable an Option","     *","     * @param key","     */","    enable: function enable( key ) {","","      if( !this._meta ) {","        Object.defineProperty( this, '_meta', {","          value: {},","          enumerable: false,","          writable: true,","          configurable: true","        });","      }","","      this._meta[ key ] = true;","","    },","","    /**","     * Disable an Option","     *","     * @param key","     * @returns {boolean}","     */","    disable: function disable( key ) {","      return this._meta ? this._meta[ key ] = false : null;","    }","","  });","","  // Define instance constructor and bind to module.exports","  Settings.defineConstructor( function( defaults ) {","    this.set( defaults );","  });","","});","",""];
_$jscoverage_done("lib/object-settings.js", 8);
require("abstract").createModel(module.exports = function Settings(exports) {
    _$jscoverage_done("lib/object-settings.js", 11);
    if (_$jscoverage_done("lib/object-settings.js", 11, module.loaded)) {
        _$jscoverage_done("lib/object-settings.js", 12);
        return Settings;
    }
    _$jscoverage_done("lib/object-settings.js", 15);
    var util = require("util");
    _$jscoverage_done("lib/object-settings.js", 16);
    var inherits = require("util").inherits;
    _$jscoverage_done("lib/object-settings.js", 17);
    var _extend = require("lodash").extend;
    _$jscoverage_done("lib/object-settings.js", 20);
    Settings.defineProperties(Settings, {
        inject: {
            value: function inject(obj) {
                _$jscoverage_done("lib/object-settings.js", 32);
                var target = obj || this;
                _$jscoverage_done("lib/object-settings.js", 33);
                var Instance = new Settings.create;
                _$jscoverage_done("lib/object-settings.js", 35);
                Object.getOwnPropertyNames(Settings.prototype).forEach(function(key) {
                    _$jscoverage_done("lib/object-settings.js", 37);
                    Object.defineProperty(target, key, {
                        value: Instance[key],
                        enumerable: false,
                        writable: true,
                        configurable: true
                    });
                });
                _$jscoverage_done("lib/object-settings.js", 46);
                return target;
            },
            enumerable: true,
            configurable: true,
            writable: true
        },
        mixin: {
            value: function mixin(obj) {
                _$jscoverage_done("lib/object-settings.js", 62);
                for (var key in Settings.prototype) {
                    _$jscoverage_done("lib/object-settings.js", 64);
                    var descriptor = Object.getOwnPropertyDescriptor(obj, key);
                    _$jscoverage_done("lib/object-settings.js", 67);
                    if (_$jscoverage_done("lib/object-settings.js", 67, descriptor) && _$jscoverage_done("lib/object-settings.js", 67, !descriptor.configurable)) {
                        _$jscoverage_done("lib/object-settings.js", 68);
                        break;
                    }
                    _$jscoverage_done("lib/object-settings.js", 71);
                    try {
                        _$jscoverage_done("lib/object-settings.js", 73);
                        Object.defineProperty(obj, key, {
                            value: obj[key] || Settings.prototype[key],
                            enumerable: false,
                            writable: true,
                            configurable: true
                        });
                    } catch (error) {}
                }
                _$jscoverage_done("lib/object-settings.js", 85);
                if (_$jscoverage_done("lib/object-settings.js", 85, !obj._events)) {
                    _$jscoverage_done("lib/object-settings.js", 86);
                    obj._events = {};
                }
                _$jscoverage_done("lib/object-settings.js", 89);
                return obj;
            },
            enumerable: true,
            configurable: true,
            writable: true
        }
    });
    _$jscoverage_done("lib/object-settings.js", 99);
    Settings.properties(Settings.prototype, {
        get: function get(key, fallback) {
            _$jscoverage_done("lib/object-settings.js", 110);
            if (_$jscoverage_done("lib/object-settings.js", 110, !this._meta)) {
                _$jscoverage_done("lib/object-settings.js", 111);
                Object.defineProperty(this, "_meta", {
                    value: {},
                    enumerable: false,
                    writable: true,
                    configurable: true
                });
            }
            _$jscoverage_done("lib/object-settings.js", 120);
            if (_$jscoverage_done("lib/object-settings.js", 120, "undefined" === typeof key)) {
                _$jscoverage_done("lib/object-settings.js", 121);
                return this._meta || {};
            }
            _$jscoverage_done("lib/object-settings.js", 124);
            var value = require("abstract").utility.query(this._meta, arguments[0]);
            _$jscoverage_done("lib/object-settings.js", 127);
            return value || fallback;
        },
        set: function set(key, value) {
            _$jscoverage_done("lib/object-settings.js", 140);
            console.log("set", arguments[0]);
            _$jscoverage_done("lib/object-settings.js", 143);
            if (_$jscoverage_done("lib/object-settings.js", 143, !this._meta)) {
                _$jscoverage_done("lib/object-settings.js", 144);
                Object.defineProperty(this, "_meta", {
                    value: {},
                    enumerable: false,
                    writable: true,
                    configurable: true
                });
            }
            _$jscoverage_done("lib/object-settings.js", 153);
            if (_$jscoverage_done("lib/object-settings.js", 153, !arguments)) {
                _$jscoverage_done("lib/object-settings.js", 154);
                return this;
            }
            _$jscoverage_done("lib/object-settings.js", 158);
            var emit = this.emit ? this.emit.bind(this) : function emit() {};
            _$jscoverage_done("lib/object-settings.js", 161);
            if (_$jscoverage_done("lib/object-settings.js", 161, Object.keys(arguments).length === 2) && (_$jscoverage_done("lib/object-settings.js", 161, "string" === typeof arguments[0]) || _$jscoverage_done("lib/object-settings.js", 161, "number" === typeof arguments[0]))) {
                _$jscoverage_done("lib/object-settings.js", 164);
                require("abstract").utility.unwrap(arguments[0], arguments[1], this._meta);
                _$jscoverage_done("lib/object-settings.js", 166);
                emit([ "set", arguments[0] ], null, arguments[1], arguments[0]);
            }
            _$jscoverage_done("lib/object-settings.js", 171);
            if (_$jscoverage_done("lib/object-settings.js", 171, Object.keys(arguments).length === 1) && _$jscoverage_done("lib/object-settings.js", 171, "object" === typeof arguments[0])) {
                _$jscoverage_done("lib/object-settings.js", 173);
                require("util")._extend(this._meta, arguments[0]);
                _$jscoverage_done("lib/object-settings.js", 176);
                for (var key in arguments[0]) {
                    _$jscoverage_done("lib/object-settings.js", 177);
                    if (_$jscoverage_done("lib/object-settings.js", 177, arguments[0].hasOwnProperty(key))) {
                        _$jscoverage_done("lib/object-settings.js", 178);
                        emit([ "set", key ], null, arguments[0][key], key);
                    }
                }
            }
            _$jscoverage_done("lib/object-settings.js", 184);
            return this;
        },
        enable: function enable(key) {
            _$jscoverage_done("lib/object-settings.js", 195);
            if (_$jscoverage_done("lib/object-settings.js", 195, !this._meta)) {
                _$jscoverage_done("lib/object-settings.js", 196);
                Object.defineProperty(this, "_meta", {
                    value: {},
                    enumerable: false,
                    writable: true,
                    configurable: true
                });
            }
            _$jscoverage_done("lib/object-settings.js", 204);
            this._meta[key] = true;
        },
        disable: function disable(key) {
            _$jscoverage_done("lib/object-settings.js", 215);
            return this._meta ? this._meta[key] = false : null;
        }
    });
    _$jscoverage_done("lib/object-settings.js", 221);
    Settings.defineConstructor(function(defaults) {
        _$jscoverage_done("lib/object-settings.js", 222);
        this.set(defaults);
    });
});