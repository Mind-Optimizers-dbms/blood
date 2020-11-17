const mongoose = require("mongoose")
//mongoose.connect(process.env.MONGODB_URL, {
mongoose.connect('mongodb://localhost:27017/blooddonation',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

module.exports = mongoose
