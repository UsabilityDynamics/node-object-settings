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
function Settings( options, defaults ) {
  Settings.debug( arguments.callee.name );

  // Create new instance from prototype
  var Instance = Object.create( Settings.prototype, {
    'settings': {
      /**
       * Create Data Store, or use existing
       *
       */
      'value': defaults || {},
      'writable': true,
      'enumerable': true
    }
  });

  // Do not extend in global context
  if( this.GLOBAL && this.process ) {
    return Instance;
  }

  // Extend instance into context
  Settings.extend( this, Instance );

  // Return context
  return this;

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

      // Wrapper for Emit
      var emit = this.emit ? this.emit.bind( this ) : function emit() {};

      // Key & Value Passed
      if( Object.keys( arguments ).length === 2 ) {
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
  "use": {
    /**
     * Mixes Settings Options into a target object
     *
     * @method use
     * @params target {Object|Function} Target Object to extend the Obect Settings' methods into.
     * @params defaults {Object} Default settings.
     * @returns settigns {Object} Settings object container.
     */
    "value": function use( target, defaults ) {

      // Create instance and bind
      var Instance = Settings.bind( target || {} )( {}, defaults );

      // Return settings object
      return Instance.settings;

    },
    "enumerable": true
  }
});