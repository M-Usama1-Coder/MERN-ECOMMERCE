const mongoose = require("mongoose");

const DataBase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Database Connected Successfully`);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = DataBase;
