/**
 * Create custom objects and methods by aggregating and abstracting esources.
 *
 * @version 0.1.0
 * @class Settings
 * @constractor
 */
require( 'abstract' ).createModel( function Settings( exports ) {

  // Expose as module
  module.exports = exports;

  // Constructor Properties
  exports.mixin = require( 'abstract' ).utility.mixin.bind( this, this )

  // Prototypal Properties
  exports.properties( exports.prototype, {
    /**
     * Get or create and get storage
     *
     * @param key {String}
     * @returns {*|undefined}
     */
    get: function get( key, fallback ) {
      return this._meta ? this._meta[ arguments[0] ] : fallback || this._meta;
    },
    /**
     * Set Key & Value pair, or pass an object
     *
     * @method key
     * @param key {String|Object}
     * @param value {Any}
     * @returns {Object} Context.
     */
    set: function set( key, value ) {

      // Get or create and get storage
      if( !this._meta ) {
        Object.defineProperty( this, '_meta', {
          value: {},
          enumerable: false,
          writable: true,
          configurable: true
        });
      }

      // Not passing any arguments can be used to instantiate
      if( !arguments ) {
        return this;
      }

      // Wrapper for Emit
      var emit = this.emit ? this.emit.bind( this ) : function emit() {};

      // Key & Value Passed
      if( Object.keys( arguments ).length === 2 ) {
        this._meta[ arguments[0] ] = arguments[1];
        emit( [ 'set', arguments[0] ], null, arguments[1], arguments[0] );
      }

      // Object Passed, extend
      if( Object.keys( arguments ).length === 1 && 'object' === typeof arguments[0] ) {

        require( 'util' )._extend( this._meta, arguments[0] );

        // @todo Get object path using dot notation
        for( var key in arguments[0] ) {
          if( arguments[0].hasOwnProperty( key ) ) { emit( [ 'set', key ], null, arguments[0][key], key ); }
        }

      }

      return this;

    },
    /**
     * Enable an Option
     *
     * @param key
     */
    enable: function enable( key ) {

      if( !this._meta ) {
        Object.defineProperty( this, '_meta', {
          value: {},
          enumerable: false,
          writable: true,
          configurable: true
        });
      }

      this._meta[ key ] = true;

    },
    /**
     * Disable an Option
     *
     * @param key
     * @returns {boolean}
     */
    disable: function disable( key ) {
      return this._meta ? this._meta[ key ] = false : null;
    }
  });

  // Define instance constructor and bind to module.exports
  exports.defineInstance( function( defaults ) {
    this.set( defaults );
  });

});

