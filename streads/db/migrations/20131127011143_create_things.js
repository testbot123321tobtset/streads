var CreateThings = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('title', 'string');
          t.column('description', 'string');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('thing', def, callback);
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
    this.dropTable('thing', callback);
  };
};

exports.CreateThings = CreateThings;
