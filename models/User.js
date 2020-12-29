const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    //Tienda Nube User ID
    user_id: {
        type: String,
        required: true
    },
    //Tienda Nube user access_token
    access_token: {
        type: String,
        required: true
    },
    //Secret and clients for connectors
    api_client: {
        type: String,
    },
    api_secret: {
        type: String,
    }, 
    email: {
        type: String,
    },
    updated: {
        type: Boolean
    },
    dateModified: {
        type: Date,
    },
    store_name: {
        type: String
    },
    store_url: {
        type: String
    },
    woo_url: {
        type: String   
    }
 
})

const User = mongoose.model('user', UserSchema);

module.exports = User