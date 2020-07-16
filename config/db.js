const mongoose = require('mongoose');

// Using Promise
/*const connectToDB = () => {
  mongoose
    .connect(
      `mongodb+srv://node-rest:${process.env.MONGO_ATLAS_PWD}@cluster0.isme1.mongodb.net/shop-api?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('Connected to DB successfully.'))
    .catch((err) => console.log(err));
};*/


// Using async-await
const connectToDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://node-rest:${process.env.MONGO_ATLAS_PWD}@cluster0.isme1.mongodb.net/shop-api?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('Connected to DB successfully.');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDB;
