/**
 * Object Settings Module
 *
 * Create custom objects and methods by aggregating and abstracting esources.
 *
 * @params options {Object} Configuration options for Settings Options instance.
 * @version 0.0.1
 * @class Settings
 * @constractor
 */
function Settings( options ) {
  Settings.debug( arguments.callee.name );

  // Return new instance
  return Object.create( Settings.prototype, {
    'data': {
      /**
       * Create Data Store, or use existing
       *
       */
      'value': this.data || {},
      'writable': true,
      'enumerable': true
    },
    'options': {
      /**
       * Create Data Store, or use existing
       *
       */
      'value': Settings.extend( options, Settings.defaults ),
      'writable': true,
      'enumerable': true
    }
  });

}

/**
 * Prototypal Properties
 *
 */
Object.defineProperties( Settings.prototype, {
  "set": {
    /**
     * Set a key if a key and value are passed. If object is passed, extend it into settings object
     *
     * @returns {*}
     * @chainable
     */
    "value": function set() {
      Settings.debug( arguments.callee.name );

      // Initial Setting
      if( Object.keys( arguments ).length === 2 && arguments[0] === this.options.store_property ) {
        this.data = arguments[1];
        return this;
      }

      // Key & Value Passed
      if( Object.keys( arguments ).length === 2 ) {
        this.data[ arguments[0] ] = arguments[1];
        // this.emit( 'set', arguments[0], arguments[1] );
        return this;
      }

      // Object Passed
      if( Object.keys( arguments ).length === 1 && 'object' === typeof arguments[0] ) {

        for( var key in arguments[0] ) {
          if( arguments[0].hasOwnProperty( key ) ) {
            this[ key ] = arguments[0][ key ];
            //this.emit( 'set', key, this[ key ] );
          }
        }

        return this;

      }

      return this;

    },
    "enumerable": true
  },
  "get": {
    /**
     * Get the value for a particular key
     *
     * @param name {String}
     */
    "value": function get( name ) {},
    "enumerable": true
  },
  "enable": {
    /**
     * Get the value for a particular key
     *
     * @param name {String}
     */
    "value": function enable( name ) {},
    "enumerable": true
  },
  "disable": {
    /**
     * Get the value for a particular key
     *
     * @param name {String}
     */
    "value": function disable( name ) {},
    "enumerable": true
  },
  "enabled": {
    /**
     * Get the value for a particular key
     *
     * @param name {String}
     */
    "value": function enabled( name ) {},
    "enumerable": true
  },
  "disabled": {
    /**
     * Get the value for a particular key
     *
     * @param name {String}
     */
    "value": function disabled( name ) {},
    "enumerable": true
  }
});

/**
 * Constructor Properties
 *
 */
Object.defineProperties( module.exports = Settings, {
  "defaults": {
    /**
     * Contains defualt options, may be ovewritten
     *
     */
    "value": {
      "data_property": "settings"
    },
    "writable": true,
    "enumerable": true
  },
  "debug": {
    /**
     * Debugger
     *
     */
    "value": require( 'debug' )( 'Settings' ),
    "writable": false,
    "enumerable": false
  },
  "extend": {
    /**
     * Extend Target with Source
     *
     */
    "value": function extend( target ) {

      target = target ? target : {};

      for( var index in arguments ) {

        for( var key in arguments[ index ] ) {
          target[ key ] = arguments[ index ][ key ];
        }

      }

      return target;

    },
    "enumerable": false
  },
  "mixin": {
    /**
     * Mixes Settings Options into current context
     *
     */
    "value": function mixin( options ) {
      return Settings.target( this, options );
    },
    "enumerable": true
  },
  "bind": {
    /**
     * Mixes Settings Options into a target object
     *
     * @params target {Object|Function} Target Object to extend the Obect Settings' methods into.
     */
    "value": function( target, options ) {

      var Instance = Settings( options );

      //console.log( Object.keys( Instance ) );
      for( var key in Instance ) {
        target[ key ] = target[ key ] ? target[ key ] : Instance[ key ];
      }

      return target;

    },
    "enumerable": true
  }
});