const express = require("express");
const axios = require("axios");
const router = express.Router();
const userController = require('../../controller/user.controller');
const logger = require('../../utils/logger')(module);
let headers = require('../../config/headers');


//Route for auth
router.get("/", async (req, res) => {
    //Parse the code sent by TiendaNuvem
    let { code } = req.query;
    //Create the object
    let info = {
        //Id of our app
        client_id: process.env.CLIENT_ID,
        //Our App's secret
        client_secret: process.env.CLIENT_SECRET,
        //Grant Type, comes with Tiendanube's api
        grant_type: "authorization_code",
        //The code that comes included as a query to generate the access token
        code: code
    }
    
    try {
        console.log(info);
        // We post to tiendanube to get auth and then....
        let userData = await axios.post("https://www.tiendanube.com/apps/authorize/token", info);
        //If we recieved a token
        if(userData.data.access_token) {
            //Deestructure token and id from our response.
            let {access_token, user_id} = userData.data
            //Check if user exists in our Database.
            let userExists = await userController.findUser(user_id);
            //If user exists
            if(userExists !== null) {
                let newData = {
                    access_token: access_token
                }
                //Update user's token
                let updateUser = await userController.updateUserToken(userExists, newData)
                console.log(updateUser);
                logger.info("updated the token of user " + updateUser._id);
            } else {
                //Else, if user does not exist, create a new user.
                console.log("else BLOCK")
                try {
                    let user = await userController.createUser(user_id, access_token);
                    logger.info("user created " + user._id);
                } catch (error) {
                    logger.error(error.message);
                }
            }

            //Now, get from tiendanube's api, the name of the store to display on the template.
            headers.headers.Authentication = "bearer " + access_token;
            logger.info(access_token);
            let storeData = await axios.get(`https://api.tiendanube.com/v1/${user_id}/store`, headers)
            let name = storeData.data.name.es
            let store_name;
            if(userExists !== null && userExists.store_name) {
                store_name = userExists.store_name;
            } else {
                //Else ship the name from the TN api's settings.
                store_name = name;
            }
            if(userExists !== null && !userExists.store_url) {
                userExists.store_url = storeData.data.url_with_protocol;
                await userExists.save();
            }

             //Finally Render the setup Page
            if(userExists !== null) {
                res.render("setup", {
                    user_id: user_id, 
                    api_client: userExists.api_client || "",
                    api_secret: userExists.api_secret || "",
                    store_url: userExists.store_url ||"",
                });
            } else {
                res.render("setup", { 
                    user_id: user_id,
                    store_url: storeData.data.url_with_protocol,
                    api_client: "",
                    pi_secret: "",
                });
            }
        } else {
            //If error here render page with message
            res.render('error', {error: "Error serving token"})
        }
    } catch (error) {
        //Either way we'll serve an error page serving the message here.
        logger.error(error.message);
        res.render('error', {error: error.message});
    }
})


module.exports = router;