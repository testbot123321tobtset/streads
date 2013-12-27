var assert = require('assert')
  , tests
  , Friendship = geddy.model.Friendship;

tests = {

  'after': function (next) {
    // cleanup DB
    Friendship.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var friendship = Friendship.create({});
    friendship.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
