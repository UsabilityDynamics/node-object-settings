/**
 * Basic Object Settings Tests
 *
 * ## Standalone
 * mocha basic --reporter list --ui exports --watch
 *
 * @type {Object}
 */
module.exports = {

  /**
   * Prepare Environment
   *
   */
  'before': function() {
    module.mocha = require( 'mocha' );
    module.should = require( 'should' );
    module.user = require( 'Faker' ).Helpers.userCard;
    module.constructor = require( '../' );
  },

  "Object Settings": {

    'constructor': {

      'has expected properties': function() {
        module.constructor.should.have.property( 'debug' );
        module.constructor.should.have.property( 'extend' );
        module.constructor.should.have.property( 'use' );
        module.constructor.should.have.property( 'mixin' );
      }

    },

    'instance': {

      'returns expected properties': function() {

        var Target = module.user();

        // Add Object Settings to a property
        Target.settings = new module.constructor;

        Target.settings.should.have.property( 'settings' );
        Target.settings.should.have.property( 'get' );
        Target.settings.should.have.property( 'set' );
        Target.settings.should.have.property( 'enable' );
        Target.settings.should.have.property( 'disable' );

      },

      'can create empty instance': function() {

        var Target = module.user();

        Target.settings = module.constructor.create();

        Target.should.have.property( 'settings' );
        Target.settings.should.have.property( 'get' );
        Target.settings.should.have.property( 'set' );
        Target.settings.should.have.property( 'enable' );
        Target.settings.should.have.property( 'disable' );
        Target.settings.should.have.property( 'settings' );
        Target.settings.set( 'name', 'andy' );

        // Settings will be double nested on unbound instances
        Target.settings.settings.should.have.property( 'name', 'andy' );


      },

      'uses to target object': function() {

        var Target = module.user();

        module.constructor.use( Target );

        //Target.should.have.property( 'settings' );
        Target.should.have.property( 'get' );
        Target.should.have.property( 'set' );
        Target.should.have.property( 'enable' );
        Target.should.have.property( 'disable' );
        Target.set( 'name', 'andy' );

      },

      'sets data': function() {

        var Target = module.user();
        module.constructor.use( Target );

        Target.set( 'color', 'blue' );
        Target.set( 'color2', 'red' );
        Target.set( 'color', 'green' );
        Target.set({ "dasf": "adsf" });
        Target.set({ "dasf2": { 'asdfdsf': "asdfsdf" } });

      },

      'emits events': function( done ) {

        var Target = new ( require( 'eventemitter2' ) ).EventEmitter2({ 'wildcard': true });
        Target.settings = module.constructor.use( Target );

        Target.once( 'set.color', function( error, value, key ) {
          value.should.be.equal( 'blue' );
          key.should.be.equal( 'color' );
          done();
        })

        Target.set( 'color', 'blue' );
        Target.set( 'color2', 'red' );
        Target.set( 'color', 'green' );
        Target.set({ "dasf": "adsf" });
        Target.set({ "dasf2": { 'asdfdsf': "asdfsdf" } });

      },

      'can set defaults': function() {
        var Target = module.user();
        module.constructor.use( Target, { 'color': 'blue' } );
        Target.settings.should.have.property( 'color', 'blue' );
      },

      'can bind settings to prototype object': function() {

        function Person( name ) {
          this.name = name;
        }

        Person.prototype = {
          'age': 50,
          'run': function() {},
          'walk': function() {}
        }

        module.constructor.use( Person );

        Person.set( 'nothing', 'blah' )

        Person.should.have.property( 'settings' );
        Person.settings.should.have.property( 'nothing' );

        // Bind Settings
        module.constructor.use( Person.prototype );

        // Add protoypal setting
        Person.prototype.set( 'height', 72 );

        Person.prototype.should.have.property( 'set' );
        Person.prototype.should.have.property( 'get' );
        Person.prototype.should.have.property( 'enable' );
        Person.prototype.should.have.property( 'settings' );
        Person.prototype.settings.should.have.property( 'height', 72 );

        // Constructor settings should not be here
        Person.prototype.settings.should.not.have.property( 'nothing' );

        // Create instance
        var Bob = new Person( 'Bob' );

        Bob.should.have.property( 'set' );
        Bob.should.have.property( 'get' );
        Bob.should.have.property( 'enable' );
        Bob.should.have.property( 'age', 50 );
        Bob.should.have.property( 'settings' );

        // Constructor settings should not be here
        Bob.settings.should.not.have.property( 'nothing' );

        // Protoypal setting was inherited
        Bob.settings.should.have.property( 'height', 72 );

      },

    }

  },

  /**
   * Destroy Environment
   *
   */
  'after': function() {}

};