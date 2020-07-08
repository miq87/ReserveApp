const mongoose = require("mongoose")

mongoose.connect(
    'mongodb+srv://shop:' + process.env.ATLAS_PW + '@cluster0-ab5ek.gcp.mongodb.net/shop?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
)

const heroSchema = mongoose.Schema({
    //_id: mongoose.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
})

module.exports = mongoose.model('Heroes', heroSchema)
