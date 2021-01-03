const express = require('express');
const router = express.Router();
const userController = require('../../controller/user.controller');

router.post("/", async (req, res) => {
    console.log(req.body);
    let {api_client, api_secret, woo_url, email, user_id} = req.body
    let data = {
        api_client,
        api_secret,
        woo_url,
        email,
        user_id
    }
    try {
        //First update User
        let update = await userController.updateUserData(data);
        console.log(update);
        req.session.store_id = user_id;
        //Then TEST KEYS/URL COMBO
        //THEN IF CORRECT PROCEED TO NEXT PAGE
        res.status(200).send(update);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }   

})

module.exports = router;