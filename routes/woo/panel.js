const express = require('express');
const router = express.Router();
const userController = require('../../controller/user.controller');
const util = require('util')
const crypto = require('crypto');
const pbkdf2Async = util.promisify(crypto.pbkdf2)
const axios = require('axios');
const headers = require('../../config/headers');
const logger = require("../../utils/logger")(module);

router.get('/getUserData', async (req, res) => {
    try {
        let userData = await userController.findUser(req.session.store_id);
        console.log(req.session);
        res.status(200).send(userData);
    } catch (error) {
        res.status(200).send(error);
    }
})

router.post('/migrate', async (req, res) => {
    let {user_id} = req.query;
    let item = req.body;
    try {
        let user = await userController.findUser(user_id)
        headers.headers.Authentication = "bearer " + user.access_token;
        let migration = await axios.post(`https://api.tiendanube.com/v1/${user_id}/products`, item, headers);
        logger.info("Successfully migrated product")
        res.status(200).send("success");
    } catch (error) {
        logger.error("error at migration")
        logger.error(error);
        console.log(error);
        res.status(500).send("error");
    }

})

router.get("/delay", async (req, res) => {
    await pbkdf2Async('secret', 'salt', 100000, 2048, 'sha512', (err, derivedKey) => {
        if (err) throw err;
        console.log(derivedKey.toString('hex'));
        res.status(200).send("Success");  // '3745e48...08d59ae'
      });
     
   
})

module.exports = router;