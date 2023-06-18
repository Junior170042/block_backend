const mongoose = require('mongoose');
const Connect = () => {
    mongoose.set('strictQuery', false);
    mongoose
        .connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(console.log("Connection succeed"))
        .catch((err) => console.log(err));
}

module.exports = Connect;