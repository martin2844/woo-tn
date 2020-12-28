const User = require('../models/User');
const logger = require('../utils/logger')(module);

// Create a new user mongoose method.
const createUser = async (user_id, access_token) => {
    const newUser = new User ({
        user_id: user_id,
        access_token: access_token,
    });
    const user = await newUser.save();
    return user;
}


//Find a user - returns object
const findUser = async (user_id) => {
    logger.info("searching user " + user_id);
    return await User.findOne({user_id: user_id}).exec();
}



module.exports = {
    findUser,
    createUser
}