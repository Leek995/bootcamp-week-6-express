const express = require('express');
const app = express();
const  User  = require("./model/User.js");

// put middleware before all routes so all routes can use
app.use(express.json());

app.get('/users', async (request, response) => {
    const users = await User.findAll();
    response.send(users);
})

// next makes sure request is not left hanging and send error to user
app.post('/users', async (request, response, next) => {
    try {
        const user = await User.create(request.body);
        response.send(user.username);
    } catch(error) {
        next(error);
    }
})

app.get('/users/:username', async (request, response, next) => {
    try{
        const user = await User.findOne({
            where: {username: request.params.username}
        })
        response.send(user)
    } catch (error) {
        next(error);
    }
})


module.exports = app;