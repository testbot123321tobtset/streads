var assert = require('assert')
  , tests
  , Thing = geddy.model.Thing;

tests = {

  'after': function (next) {
    // cleanup DB
    Thing.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var thing = Thing.create({});
    thing.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
