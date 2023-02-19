const mongoose = require("mongoose");

function connection(callback) {
  mongoose
    .connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error(err, "---- database");
    });
  var db = mongoose.connection;
  db.on("error", function (err) {
    console.log(err, "---- database");
    process.exit(1);
  });
  db.once("open", function () {
    console.log("connected to database", "---- database");
    callback();
  });
}

module.exports = connection;
