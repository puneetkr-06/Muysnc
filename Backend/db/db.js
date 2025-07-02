const mongoose = require('mongoose');

async function connectToDb(){
  await mongoose.connect(process.env.MONGODB_URI)
  .then(()=> {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  })
}

module.exports = connectToDb;