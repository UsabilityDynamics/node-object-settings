/**
 * Object Settings Module
 *
 * Create custom objects and methods by aggregating and abstracting esources.
 *
 * @version 0.0.1
 *
 * @class Settings
 * @constractor
 *
 * @param id
 * @param config
 * @param defaults
 * @returns {*}
 *
 */
function Settings( id, config, defaults ) {
  Settings.logger.debug( 'object-settings:constructor' );

  // Instance Properties
  Object.defineProperties( this, {
    _id: {
      value: id || this.constructor.name,
      configurable: true,
      enumerable: false,
      writable: true
    },
    _namespace: {
      value: arguments.callee.name,
      configurable: true,
      enumerable: false,
      writable: true
    },
    settings: {
      value: defaults || this.settings || {},
      configurable: true,
      enumerable: false,
      writable: true
    },
    config: {
      value: config || this.config || {},
      configurable: true,
      enumerable: false,
      writable: true
    },
  });

  // Detect non-standard instantiation - not using "new"
  if( !( this instanceof arguments.callee ) ) {
    Settings.logger.debug( 'Notce:', arguments.callee.name, 'instantiated in', this.constructor.name, 'context.' );

    // Recover correct constructor prototype and expose
    for( var name in arguments.callee.prototype ) {
      Object.defineProperty( this, name, Object.getOwnPropertyDescriptor( arguments.callee.prototype, name ) );
    };

  }

  // Return context
  return this;

}

require( 'abstract' ).defineProperties( module.exports = Settings, {
  create: function create( name, config, defaults ) {
    return new Settings( name, config, defaults );
  },
  extend: function extend( target ) {

      target = target ? target : {};

      for( var index in arguments ) {

        for( var key in arguments[ index ] ) {
          target[ key ] = arguments[ index ][ key ];
        }

      }

      return target;

    }
});

require( 'abstract' ).defineProperties( Settings.prototype, {
  id: {
    value: {
      set: function( name ) {
        this._namespace = this._namespace || [];
        if( this._namespace.indexOf( name ) < 0 ) { this._namespace.push( name ); }
      },
      get: function() {
        return this._namespace.join( '.' );
      }
    },
    enumerable: true
  },
  namespace: {
    value: {
      set: function( id ) {
        this._id = this._id || [];
        if( this._id.indexOf( id ) < 0 ) { this._id.push( id ); }
      },
      get: function() { return this._id.join( '.' ); }
    },
    enumerable: true
  },
  set: {
    /**
     * Set a key if a key and value are passed. If object is passed, extend it into settings object
     *
     * @returns {*}
     * @chainable
     */
    value: function set() {
      Settings.logger.debug( arguments.callee.name );

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
    enumerable: true
  },
  get: {
    /**
     * Get the value for a particular key
     *
     * @param name {String}
     */
    value: function get( name ) {
      return this.settings[ name ] || undefined;
    },
    enumerable: true
  },
  enable: {
    /**
     * Get the value for a particular key
     *
     * @param name {String}
     */
    value: function enable( name ) {},
    enumerable: true
  },
  disable: {
    /**
     * Get the value for a particular key
     *
     * @param name {String}
     */
    value: function disable( name ) {},
    enumerable: true
  }
});