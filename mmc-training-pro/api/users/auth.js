import express from 'express';
import { check, validationResult } from 'express-validator';
import Users from '../../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import authMiddleware from '../../middleware/authMiddleware.js';

const authRouter = express.Router();

/* 
rout POST /auth
description : Authentication user & token for authentication purposes
access : Public access
*/
authRouter.get('/', authMiddleware, async (req, res) => {
    //console.log(req.user.id);
    const user = await Users.findById(req.user.id).select("-password");
    if(!user) {
        return res.status(400).json({status:false,msg: 'Invalid user'});
    }

    return res.status(200).json({status:true,data:user});
});

authRouter.post('/', 
check('email', 'Email is required').isEmail(),
check('password', 'Password is required'),
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const { email, password } = req.body;
        let user = await Users.findOne({email});
        if(!user) {
            return res.status(400).json({status:false,msg: 'Invalid user email or password'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({status:false,msg: 'Invalid user password'});
        }

        //1 set payload to the password
        // we will use the generate the token to generate the token and then pass it will generate 
        const payload = {
            user: {
                id: user.id
            }
        };
        //2 generate the token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: "5 days"
            },
            (err, token) => {
                if(err) throw err;
                let data = {...user._doc,token};
                res.status(200).send({status:true,user_info:data});
            }
        );

    } catch (error) {
        res.status(400).send([{status:false,error:error.message}]);
    }
    

    // console.log("Hi from auth");
}); 

export default authRouter;