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
_$jscoverage_init(_$jscoverage, "lib/object-settings.js",[8,11,12,15,16,17,18,21,33,35,36,41,43,45,54,55,59,61,70,86,88,91,92,95,97,109,111,120,136,148,149,152,155,156,160,162,167,168,177,178,181,184,197,198,201,202,211,212,216,219,221,222,228,230,232,235,237,240,242,244,246,260,271,272,280,291,297,298]);
_$jscoverage_init(_$jscoverage_cond, "lib/object-settings.js",[11,35,54,54,59,91,91,109,152,152,155,167,177,201,211,216,216,216,221,228,228,232,237,242,271]);
_$jscoverage["lib/object-settings.js"].source = ["/**"," * Create custom objects and methods by aggregating and abstracting esources."," *"," * @version 0.1.0"," * @class Settings"," * @constractor"," */","require( 'abstract' ).createModel( module.exports = function Settings( exports ) {","","  // Construct Model only once.","  if( module.loaded ) {","    return Settings;","  }","","  var util        = require( 'util' );","  var inherits    = require( 'util' ).inherits;","  var _extend     = require( 'abstract' ).utility.extend;","  var _unwrap     = require( 'abstract' ).utility.unwrap;","","  // Constructor Properties","  Settings.defineProperties( Settings, {","    inject: {","      /**","       * Force / Override properties","       *","       * If object not provided will bind to context.","       *","       * @param {Object} obj","       * @return {Object}","       */","      value: function inject( obj, property ) {","","        var Instance = new Settings.create();","","        if( !obj ) {","          obj = this;","        }","","        //console.log( 'property', typeof obj[ property ] );","","        Object.getOwnPropertyNames( Settings.prototype ).forEach( function( key ) {","","          var descriptor = Object.getOwnPropertyDescriptor( obj, key );","","          Object.defineProperty( obj, key, {","            value: Instance[ key ],","            enumerable: descriptor ? descriptor.enumerable : false,","            writable: true,","            configurable: true","          });","","        });","","        if( property && 'object' === typeof obj[ property ] ) {","          Instance.set( obj[ property ] );","        }","","        // Ensure we have an listener container.","        if( !obj._events ) {","","          Object.defineProperty( obj, '_events', {","            value: {},","            enumerable: true,","            configurable: true,","            writable: true","          });","","        }","","        return obj;","","      },","      enumerable: true,","      configurable: true,","      writable: true","    },","    mixin: {","      /**","       * Mixin the Emitter properties.","       *","       * @param {Object} obj","       * @return {Object}","       */","      value: function mixin( obj ) {","","        for( var key in Settings.prototype ) {","","          var descriptor = Object.getOwnPropertyDescriptor( obj, key );","","          // Detect if a property is not configurable.","          if( descriptor && !descriptor.configurable ) {","            break;","          }","","          try {","","            Object.defineProperty( obj, key, {","              value: obj[ key ] || Settings.prototype[ key ],","              enumerable: false,","              writable: true,","              configurable: true","            });","","          } catch( error ) {}","","        }","","        // Ensure we have an listener container.","        if( !obj._events ) {","","          Object.defineProperty( obj, '_events', {","            value: {},","            enumerable: true,","            configurable: true,","            writable: true","          });","","        }","","        return obj;","","      },","      enumerable: true,","      configurable: true,","      writable: true","    },","    version: {","      value: require( '../package' ).version,","      enumerable: true,","      configurable: true,","      writable: true","    }","  });","","  // Prototypal Properties","  Settings.properties( Settings.prototype, {","","    /**","     * Get or create and get storage","     *","     * Recognized Express application context and forwards to this._router.","     *","     * @param key {String}","     * @param fallback {Function}","     * @returns {*|undefined}","     */","    get: function get( key, fallback ) {","      var self = this;","      var args = Array.prototype.slice.call( arguments );","","      // Support Express Application \"get\" method.","      if( 'function' === typeof arguments[1] && 'object' === typeof this._router ) {","","        // if no router attached yet, attach the router","        if( !this._usedRouter ) {","          this.use( this.router );","        }","","        // setup route","        this._router[ key ].apply( this._router, arguments );","","        return this;","","      }","","      // Create object meta if it does not exist","      if( !this._meta ) {","        Object.defineProperty( this, '_meta', {","          value: {},","          enumerable: false,","          writable: true,","          configurable: true","        });","      }","","      // Return empty full meta object if no key specified","      if( 'undefined' === typeof key ) {","        return this._meta || {};","      }","","      var value = require( 'abstract' ).utility.query( this._meta, arguments[0] );","","      // Return the found value or the fallback value","      return value || fallback;","","    },","","    /**","     * Set Key & Value pair, or pass an object","     *","     * @method key","     * @param key {String|Object}","     * @param value {Any}","     * @returns {Object} Context.","     */","    set: function set( key, value ) {","      var self = this;","      var args = Array.prototype.slice.call( arguments );","","      // Create object meta if it does not exist","      if( !this._meta ) {","        Object.defineProperty( this, '_meta', {","          value: {},","          enumerable: false,","          writable: true,","          configurable: true","        });","      }","","      // Not passing any arguments can be used to instantiate","      if( !arguments ) {","        return this;","      }","","      // Key & Value Passed","      if( Object.keys( arguments ).length === 2 && ( 'string' === typeof arguments[0] || 'number' === typeof arguments[0] ) ) {","","        // Honor dot notation","        _unwrap( arguments[0], arguments[1], this._meta );","","        if( 'function' === typeof self.emit ) {","          self.emit( [ 'set', arguments[0] ].join( '.' ), null, arguments[1], arguments[0] );","        }","","      }","","      // Object Passed, extend","      if( Object.keys( arguments ).length === 1 && 'object' === typeof arguments[0] ) {","","        _extend( this._meta, arguments[0] );","","        if( 'function' === typeof self.emit ) {","","          // @todo Get object path using dot notation, only goes two levels deep right now for emitting.","          for( var _key in args[0] ) {","","            if( args[0][ _key  ] ) {","","              // console.log( 'emitting', [ 'set', _key  ].join( '.' ), args[0][_key ] );","              self.emit( [ 'set', _key  ].join( '.' ), null, args[0][_key ], _key  );","","              if( 'object' === typeof args[0][_key ] ) {","","                for( var __key  in args[0][_key ] ) {","                  // console.log( 'emitting', [ 'set', _key , __key  ].join( '.' ),  args[0][_key ][__key ]);","                  self.emit( [ 'set', _key, __key  ].join( '.' ), null, args[0][_key ][__key ], [ _key , __key  ].join( '.' ) );","                }","","              }","","","            }","","          }","","        }","","      }","","      return this;","","    },","","    /**","     * Enable an Option","     *","     * @param key","     */","    enable: function enable( key ) {","","      if( !this._meta ) {","        Object.defineProperty( this, '_meta', {","          value: {},","          enumerable: false,","          writable: true,","          configurable: true","        });","      }","","      this._meta[ key ] = true;","","    },","","    /**","     * Disable an Option","     *","     * @param key","     * @returns {boolean}","     */","    disable: function disable( key ) {","      return this._meta ? this._meta[ key ] = false : null;","    }","","  });","","  // Define instance constructor and bind to module.exports","  Settings.defineConstructor( function( defaults ) {","    this.set( defaults );","  });","","});","",""];
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
    var _extend = require("abstract").utility.extend;
    _$jscoverage_done("lib/object-settings.js", 18);
    var _unwrap = require("abstract").utility.unwrap;
    _$jscoverage_done("lib/object-settings.js", 21);
    Settings.defineProperties(Settings, {
        inject: {
            value: function inject(obj, property) {
                _$jscoverage_done("lib/object-settings.js", 33);
                var Instance = new Settings.create;
                _$jscoverage_done("lib/object-settings.js", 35);
                if (_$jscoverage_done("lib/object-settings.js", 35, !obj)) {
                    _$jscoverage_done("lib/object-settings.js", 36);
                    obj = this;
                }
                _$jscoverage_done("lib/object-settings.js", 41);
                Object.getOwnPropertyNames(Settings.prototype).forEach(function(key) {
                    _$jscoverage_done("lib/object-settings.js", 43);
                    var descriptor = Object.getOwnPropertyDescriptor(obj, key);
                    _$jscoverage_done("lib/object-settings.js", 45);
                    Object.defineProperty(obj, key, {
                        value: Instance[key],
                        enumerable: descriptor ? descriptor.enumerable : false,
                        writable: true,
                        configurable: true
                    });
                });
                _$jscoverage_done("lib/object-settings.js", 54);
                if (_$jscoverage_done("lib/object-settings.js", 54, property) && _$jscoverage_done("lib/object-settings.js", 54, "object" === typeof obj[property])) {
                    _$jscoverage_done("lib/object-settings.js", 55);
                    Instance.set(obj[property]);
                }
                _$jscoverage_done("lib/object-settings.js", 59);
                if (_$jscoverage_done("lib/object-settings.js", 59, !obj._events)) {
                    _$jscoverage_done("lib/object-settings.js", 61);
                    Object.defineProperty(obj, "_events", {
                        value: {},
                        enumerable: true,
                        configurable: true,
                        writable: true
                    });
                }
                _$jscoverage_done("lib/object-settings.js", 70);
                return obj;
            },
            enumerable: true,
            configurable: true,
            writable: true
        },
        mixin: {
            value: function mixin(obj) {
                _$jscoverage_done("lib/object-settings.js", 86);
                for (var key in Settings.prototype) {
                    _$jscoverage_done("lib/object-settings.js", 88);
                    var descriptor = Object.getOwnPropertyDescriptor(obj, key);
                    _$jscoverage_done("lib/object-settings.js", 91);
                    if (_$jscoverage_done("lib/object-settings.js", 91, descriptor) && _$jscoverage_done("lib/object-settings.js", 91, !descriptor.configurable)) {
                        _$jscoverage_done("lib/object-settings.js", 92);
                        break;
                    }
                    _$jscoverage_done("lib/object-settings.js", 95);
                    try {
                        _$jscoverage_done("lib/object-settings.js", 97);
                        Object.defineProperty(obj, key, {
                            value: obj[key] || Settings.prototype[key],
                            enumerable: false,
                            writable: true,
                            configurable: true
                        });
                    } catch (error) {}
                }
                _$jscoverage_done("lib/object-settings.js", 109);
                if (_$jscoverage_done("lib/object-settings.js", 109, !obj._events)) {
                    _$jscoverage_done("lib/object-settings.js", 111);
                    Object.defineProperty(obj, "_events", {
                        value: {},
                        enumerable: true,
                        configurable: true,
                        writable: true
                    });
                }
                _$jscoverage_done("lib/object-settings.js", 120);
                return obj;
            },
            enumerable: true,
            configurable: true,
            writable: true
        },
        version: {
            value: require("../package").version,
            enumerable: true,
            configurable: true,
            writable: true
        }
    });
    _$jscoverage_done("lib/object-settings.js", 136);
    Settings.properties(Settings.prototype, {
        get: function get(key, fallback) {
            _$jscoverage_done("lib/object-settings.js", 148);
            var self = this;
            _$jscoverage_done("lib/object-settings.js", 149);
            var args = Array.prototype.slice.call(arguments);
            _$jscoverage_done("lib/object-settings.js", 152);
            if (_$jscoverage_done("lib/object-settings.js", 152, "function" === typeof arguments[1]) && _$jscoverage_done("lib/object-settings.js", 152, "object" === typeof this._router)) {
                _$jscoverage_done("lib/object-settings.js", 155);
                if (_$jscoverage_done("lib/object-settings.js", 155, !this._usedRouter)) {
                    _$jscoverage_done("lib/object-settings.js", 156);
                    this.use(this.router);
                }
                _$jscoverage_done("lib/object-settings.js", 160);
                this._router[key].apply(this._router, arguments);
                _$jscoverage_done("lib/object-settings.js", 162);
                return this;
            }
            _$jscoverage_done("lib/object-settings.js", 167);
            if (_$jscoverage_done("lib/object-settings.js", 167, !this._meta)) {
                _$jscoverage_done("lib/object-settings.js", 168);
                Object.defineProperty(this, "_meta", {
                    value: {},
                    enumerable: false,
                    writable: true,
                    configurable: true
                });
            }
            _$jscoverage_done("lib/object-settings.js", 177);
            if (_$jscoverage_done("lib/object-settings.js", 177, "undefined" === typeof key)) {
                _$jscoverage_done("lib/object-settings.js", 178);
                return this._meta || {};
            }
            _$jscoverage_done("lib/object-settings.js", 181);
            var value = require("abstract").utility.query(this._meta, arguments[0]);
            _$jscoverage_done("lib/object-settings.js", 184);
            return value || fallback;
        },
        set: function set(key, value) {
            _$jscoverage_done("lib/object-settings.js", 197);
            var self = this;
            _$jscoverage_done("lib/object-settings.js", 198);
            var args = Array.prototype.slice.call(arguments);
            _$jscoverage_done("lib/object-settings.js", 201);
            if (_$jscoverage_done("lib/object-settings.js", 201, !this._meta)) {
                _$jscoverage_done("lib/object-settings.js", 202);
                Object.defineProperty(this, "_meta", {
                    value: {},
                    enumerable: false,
                    writable: true,
                    configurable: true
                });
            }
            _$jscoverage_done("lib/object-settings.js", 211);
            if (_$jscoverage_done("lib/object-settings.js", 211, !arguments)) {
                _$jscoverage_done("lib/object-settings.js", 212);
                return this;
            }
            _$jscoverage_done("lib/object-settings.js", 216);
            if (_$jscoverage_done("lib/object-settings.js", 216, Object.keys(arguments).length === 2) && (_$jscoverage_done("lib/object-settings.js", 216, "string" === typeof arguments[0]) || _$jscoverage_done("lib/object-settings.js", 216, "number" === typeof arguments[0]))) {
                _$jscoverage_done("lib/object-settings.js", 219);
                _unwrap(arguments[0], arguments[1], this._meta);
                _$jscoverage_done("lib/object-settings.js", 221);
                if (_$jscoverage_done("lib/object-settings.js", 221, "function" === typeof self.emit)) {
                    _$jscoverage_done("lib/object-settings.js", 222);
                    self.emit([ "set", arguments[0] ].join("."), null, arguments[1], arguments[0]);
                }
            }
            _$jscoverage_done("lib/object-settings.js", 228);
            if (_$jscoverage_done("lib/object-settings.js", 228, Object.keys(arguments).length === 1) && _$jscoverage_done("lib/object-settings.js", 228, "object" === typeof arguments[0])) {
                _$jscoverage_done("lib/object-settings.js", 230);
                _extend(this._meta, arguments[0]);
                _$jscoverage_done("lib/object-settings.js", 232);
                if (_$jscoverage_done("lib/object-settings.js", 232, "function" === typeof self.emit)) {
                    _$jscoverage_done("lib/object-settings.js", 235);
                    for (var _key in args[0]) {
                        _$jscoverage_done("lib/object-settings.js", 237);
                        if (_$jscoverage_done("lib/object-settings.js", 237, args[0][_key])) {
                            _$jscoverage_done("lib/object-settings.js", 240);
                            self.emit([ "set", _key ].join("."), null, args[0][_key], _key);
                            _$jscoverage_done("lib/object-settings.js", 242);
                            if (_$jscoverage_done("lib/object-settings.js", 242, "object" === typeof args[0][_key])) {
                                _$jscoverage_done("lib/object-settings.js", 244);
                                for (var __key in args[0][_key]) {
                                    _$jscoverage_done("lib/object-settings.js", 246);
                                    self.emit([ "set", _key, __key ].join("."), null, args[0][_key][__key], [ _key, __key ].join("."));
                                }
                            }
                        }
                    }
                }
            }
            _$jscoverage_done("lib/object-settings.js", 260);
            return this;
        },
        enable: function enable(key) {
            _$jscoverage_done("lib/object-settings.js", 271);
            if (_$jscoverage_done("lib/object-settings.js", 271, !this._meta)) {
                _$jscoverage_done("lib/object-settings.js", 272);
                Object.defineProperty(this, "_meta", {
                    value: {},
                    enumerable: false,
                    writable: true,
                    configurable: true
                });
            }
            _$jscoverage_done("lib/object-settings.js", 280);
            this._meta[key] = true;
        },
        disable: function disable(key) {
            _$jscoverage_done("lib/object-settings.js", 291);
            return this._meta ? this._meta[key] = false : null;
        }
    });
    _$jscoverage_done("lib/object-settings.js", 297);
    Settings.defineConstructor(function(defaults) {
        _$jscoverage_done("lib/object-settings.js", 298);
        this.set(defaults);
    });
});