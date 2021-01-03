const express = require('express');
const router = express.Router();
const userController = require('../../controller/user.controller');


router.get('/getUserData', async (req, res) => {
    try {
        let userData = await userController.findUser(req.session.store_id);
        console.log(req.session);
        res.status(200).send(userData);
    } catch (error) {
        res.status(200).send(error);
    }
})

module.exports = router;