const express = require("express");
const router = express.Router();
const User = require("../model/User.js")


router.get('/', async (request, response) => {
    const users = await User.findAll();
    response.send(users);
})

// next makes sure request is not left hanging and send error to user
router.post('/', async (request, response, next) => {
    try {
        const user = await User.create(request.body);
        response.send(user.username);
    } catch(error) {
        next(error);
    }
})

router.get('/:username', async (request, response, next) => {
    try{
        const user = await User.findOne({
            where: {username: request.params.username}
        })
        response.send(user)
    } catch (error) {
        next(error);
    }
})

module.exports = router;