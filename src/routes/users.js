const express = require("express");
const router = express.Router();
const User = require("../model/User.js")
const checkPasswordStrength = require("../middleware/index.js");


// router.get('/', async (request, response) => {
//     const users = await User.findAll();
//     response.send(users);
// })
//
// // next makes sure request is not left hanging and send error to user
// router.post('/', checkPasswordStrength, async (request, response, next) => {
//     try {
//         const user = await User.create(request.body);
//         response.send(user.username);
//     } catch(error) {
//         next(error);
//     }
// })
//
// router.get('/:username', async (request, response, next) => {
//     try{
//         const user = await User.findOne({
//             where: {username: request.params.username}
//         })
//         response.send(user)
//     } catch (error) {
//         next(error);
//     }
// })
router.post("/", checkPasswordStrength, async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.send({ user: user.username });
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const users = await User.findAll({});
        res.send({ users });
    } catch (error) {
        next(error);
    }
});

router.get("/:username", async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { username: req.params.username },
        });
        res.send({ user });
    } catch (error) {
        next(error);
    }
});

router.put("/:username", async (req, res, next) => {
    try {
        await User.update(req.body, { where: { username: req.params.username } });
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.delete("/:username", async (req, res, next) => {
    try {
        await User.destroy({ where: { username: req.params.username } });
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});


module.exports = router;