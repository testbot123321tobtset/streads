var CreateFriendships = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('title', 'string');
          t.column('description', 'text');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('friendship', def, callback);
  };

  this.down = function (next) {
    var callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.dropTable('friendship', callback);
  };
};

exports.CreateFriendships = CreateFriendships;
