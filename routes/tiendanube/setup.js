const express = require('express');
const router = express.Router();
const userController = require('../../controller/user.controller');

router.post("/", async (req, res) => {
    console.log(req.body);
    let {api_client, api_secret, woo_url, email} = req.body
    let user_id = req.body.store_id;
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
        //Then TEST KEYS/URL COMBO
        //THEN IF CORRECT PROCEED TO NEXT PAGE
        res.status(200).send(update);
    } catch (error) {
        res.status(500).send(error);
    }   

})

module.exports = router;