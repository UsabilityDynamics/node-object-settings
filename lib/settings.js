/**
 * Create custom objects and methods by aggregating and abstracting esources.
 *
 * @version 0.1.0
 * @class Settings
 * @constractor
 */
require( 'abstract' ).createModel( module.exports = function Settings( model, prototype ) {


  /**
   * Get or create and get storage
   *
   * @param key {String}
   * @returns {*|undefined}
   */
  function get( key ) {
    var _storage = this._meta ? this._meta : this._meta = {};
    return this._meta[ arguments[0] ] || undefined;
  };

  /**
   * Set Key & Value pair, or pass an object
   *
   * @method key
   * @param key {String|Object}
   * @param value {Any}
   * @returns {Object} Context.
   */
  function set( key, value ) {
    model.debug( 'set', 'string' === typeof arguments[0] ? arguments[0] : '{Object}' );

    // Get or create and get storage
    var _storage = this._meta ? this._meta : this._meta = {};

    // Not passing any arguments can be used to instantiate
    if( !arguments ) {
      return this;
    }

    // Wrapper for Emit
    var emit = this.emit ? this.emit.bind( this ) : function emit() {};

    // Key & Value Passed
    if( Object.keys( arguments ).length === 2 ) {
      _storage[ arguments[0] ] = arguments[1];
      emit( [ 'set', arguments[0] ], null, arguments[1], arguments[0] );
    }

    // Object Passed, extend
    if( Object.keys( arguments ).length === 1 && 'object' === typeof arguments[0] ) {

      require( 'util' )._extend( _storage, arguments[0] );

      // @todo Get object path using dot notation
      for( var key in arguments[0] ) {
        if( arguments[0].hasOwnProperty( key ) ) { emit( [ 'set', key ], null, arguments[0][key], key ); }
      }

    }

    return this;

  }

  // Prototypal Properties
  model.properties( prototype, {
    get: get,
    set: set,
    enable: function enable() {},
    disable: function disable() {},
    enabled: function enabled() {},
    disabled: function disabled() {}
  });

  // Define instance constructor and bind to module.exports
  model.defineInstance( function( defaults ) {

    this.set( defaults ); // Set defaults if provided

  });


});

// Constructor Properties
module.exports.properties({
  /**
   * Set Model Options
   *
   * @param options
   */
  configure: function configure( options ) {
    this.options = options;
  },
  /**
   * Debugger
   *
   * @returns {*}
   */
  debug: function() {
    return require( 'debug' )( 'object-settings' ).apply( null, arguments )
  },
  /**
   * Mixing Settings into a target object
   * @param target
   * @param defaults
   * @returns {*}
   */
  mixin: function mixin( target, defaults ) {

    var Instance = this.create();

    // Set properties
    return this.properties( target, {
      set: Instance.set,
      get: Instance.get,
      enable: Instance.enable,
      enabled: Instance.enabled,
      disable: Instance.disable,
      disabled: Instance.disabled,
    }, { enumerable: false }).set( defaults );

  }
});
