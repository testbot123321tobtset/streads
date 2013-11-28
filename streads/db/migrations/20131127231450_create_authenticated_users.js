var CreateAuthenticatedUsers = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('usernameEmail', 'string');
          t.column('firstName', 'string');
          t.column('lastName', 'string');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('authenticatedUser', def, callback);
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
    this.dropTable('authenticatedUser', callback);
  };
};

exports.CreateAuthenticatedUsers = CreateAuthenticatedUsers;
