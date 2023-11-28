import { User } from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import { createAccesToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    const { user, mail, password } = req.body;

    try {
        const userFound = await User.findOne({ mail });
        if(userFound) return res.status(400).json(["mail in use"]);

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            user,
            mail,
            password: passwordHash
        })

        const nuevoUser = await newUser.save();
        const token = await createAccesToken({id: nuevoUser._id});
        res.cookie('token', token,{
            sameSite: 'none',
            secure: true
        });

        res.json({
            id : nuevoUser._id,
            user : nuevoUser.user,
            mail: nuevoUser.mail
        });
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

export const login = async (req, res) => {
    const { mail, password } = req.body;

    try {

        const userFound = await User.findOne({ mail });
        if(!userFound) return res.status(400).json(["user not founded"]);


        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return res.status(500).json(["password incorrect"]);
        
        const token = await createAccesToken({id: userFound._id});

        res.cookie('token', token,{
            sameSite: 'none',
            secure: true
        });
        res.json({
            id : userFound._id,
            user : userFound.user,
            mail: userFound.mail
        });
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

export const logout = (req, res) => {
    res.clearCookie('token');
    return res.sendStatus(200);
}

export const verify = async (req, res) => {
    const { token } = req.cookies;

    if(!token) return res.status(400).json(["token not found"]);

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(400).json(["token invalid"]);

        const userFound = await User.findById(user.id);
        if(!userFound) return res.status(400).json(["user not founded"]);

        res.json({
            id : userFound._id,
            user : userFound.user,
            mail: userFound.mail
        });
    })
}