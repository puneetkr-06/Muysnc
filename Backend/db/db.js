const mongoose = require('mongoose');

function connectToDb(){
  mongoose.connect(process.env.MONGODB_URI)
  .then(()=> {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  })
}

module.exports = connectToDb;