const express = require('express');
const router = express.Router();
const userController = require('../../controller/user.controller');
const util = require('util')
const crypto = require('crypto');
const pbkdf2Async = util.promisify(crypto.pbkdf2)


router.get('/getUserData', async (req, res) => {
    try {
        let userData = await userController.findUser(req.session.store_id);
        console.log(req.session);
        res.status(200).send(userData);
    } catch (error) {
        res.status(200).send(error);
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