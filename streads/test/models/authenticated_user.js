var assert = require('assert')
  , tests
  , AuthenticatedUser = geddy.model.AuthenticatedUser;

tests = {

  'after': function (next) {
    // cleanup DB
    AuthenticatedUser.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var authenticateduser = AuthenticatedUser.create({});
    authenticateduser.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
