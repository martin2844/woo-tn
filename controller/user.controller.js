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

//Update a users token.
const updateUserToken = async (user, data) => {
    //Destructure needed data to update.
    let {access_token} = data;
    user.access_token = access_token;
    user.updated = true,
    user.dateModified = Date.now();
    user.save();
    return await user;
}

const updateUserData = async (data) => {
    try {
        if(!data.user_id){
            throw "No user_id"
        }
        const user = await findUser(data.user_id);
        const keys = Object.keys(data);
        keys.forEach((key) => {
            if(data[key]) {
                console.log(key + ": " + data[key]);
                user[key] = data[key];
            }
        })
        let newUser = await user.save();
        return newUser;
    } catch (error) {
        console.log(error);
        return false;
    }



}




module.exports = {
    findUser,
    createUser,
    updateUserToken,
    updateUserData
}