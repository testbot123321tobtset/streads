var assert = require('assert')
  , tests
  , Groupship = geddy.model.Groupship;

tests = {

  'after': function (next) {
    // cleanup DB
    Groupship.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var groupship = Groupship.create({});
    groupship.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
