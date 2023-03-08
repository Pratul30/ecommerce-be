const axios = require('axios');
const {Users} = require('../../database/models');

const authServiceRegister = async (req,res, next) => {
    const { username, password, role } = req.body;
    if(!username || !password || !role) return res.status(400).json({ message: 'Invalid entries. Try again.' });
    try {
        await axios({
            method: 'post',
            url: 'http://localhost:3000/register',
            data: {
                username,
                password,
                role
            }
        });
        next();
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

const authServiceLogin = async (req,res, next) => {
    const { username, password } = req.body;
    if(!username || !password) return res.status(400).json({ message: 'Invalid entries. Try again.' });
    try {
        const token = await axios({
            method: 'post',
            url: 'http://localhost:3000/login',
            data: {
                username,
                password,
            }
        });
        res.json({ token: token.data.token });
        next();
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

const validate = async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({ message: 'Token not found' });
    try {
        const user = await axios({
            method: 'get',
            url: 'http://localhost:3000/validate',
            headers: {
                authorization: token
            }
        });
        req.user = user.data.username;
        
    } catch (err) {
        return res.status(401).json({ error: err })
    }
    next();
}

module.exports = {
    authServiceRegister,
    authServiceLogin,
    validate,
}