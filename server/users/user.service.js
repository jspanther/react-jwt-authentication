const config = require('config.json');
const jwt = require('jsonwebtoken');
const User = require('../models/User_model')

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ email, password }) {
  
    let user = await User.findOne({ email: email });
    if (user.password === password) {
        const token = jwt.sign({ sub: user._id }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token,
        };
    }
}

async function getAll() {
   
    const user = await User.findAll();
  
    return user;
}