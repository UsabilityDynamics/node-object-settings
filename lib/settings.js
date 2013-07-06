/**
 * Create custom objects and methods by aggregating and abstracting esources.
 *
 * @version 0.1.0
 * @class Settings
 * @constractor
 */
require( 'abstract' ).context( function Settings( Settings ) {

  // Bind Constructor
  Settings.module( module );

  // Predefine Default property descriptions
  Settings.meta.set( 'defaults', {
    configurable: true,
    enumerable: true
  });

  // Define Prototypal Properties
  Settings.properties( Settings.prototype, {
    set: function set() {
      //Settings.logger.debug( arguments.callee.name );

      // Wrapper for Emit
      var emit = this.emit ? this.emit.bind( this ) : function emit() {};

      // Key & Value Passed
      if( Object.keys( arguments ).length === 2 ) {
        this.settings = this.settings || {};
        this.settings[ arguments[0] ] = arguments[1];
        emit( [ 'set', arguments[0] ], null, arguments[1], arguments[0] );
      }

      // Object Passed, extend
      if( Object.keys( arguments ).length === 1 && 'object' === typeof arguments[0] ) {
        Settings.extend( this.settings, arguments[0] );

        // @todo Get object path using dot notation
        for( var key in arguments[0] ) {
          if( arguments[0].hasOwnProperty( key ) ) { emit( [ 'set', key ], null, arguments[0][key], key ); }
        }

      }

      return this;

    },
    get: function get() {
      return this.settings[ arguments[0] ] || undefined;
    },
    enable: function enable() {},
    disable: function disable() {}
  });

});