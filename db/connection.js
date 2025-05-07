const mongoose = require("mongoose");
//connect to mongoDB
mongoose
  .connect(process.env.MONGODB_CONNECT)
  .then(() => {
    console.info("connected to mongoDB");
  })
  .catch((error) => {
    console.error(
      "error connecting mongoDB", error.message
    );
  });

module.exports = mongoose;
