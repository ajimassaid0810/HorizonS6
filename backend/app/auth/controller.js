const User = require('../user/model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {getToken} = require('../../utils');

const register = async(req,res,next)=>{
    try{
        const payload = req.body;
        console.log(payload)
        let user = new User(payload);
        await user.save();
        return res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: user
        });
    }catch(err){
        if(err && err.name === 'ValidationError'){
            return res.json({
                error:1,
                massage: err.massage,
                fields: err.errors
            });
        }
        next(err);
    }
}

const localStrategy = async (email,password,done)=>{
    try{
        let user =
        await User.findOne({email})
        .select('-__v -createdAt -updatedAt  -token');

        if(!user) return done();
        if (bcrypt.compareSync(password, user.password)) {
            const { password: _, ...userWithoutPassword } = user.toObject();
            return done(null, userWithoutPassword);
        }
        
    }catch(err){
        done(err,null);
    }
    done();
}

const login= (req,res,next)=>{
    return passport.authenticate('local', async function(err,user){
        if(err) return next(err);
        if (!user) {
            return res.status(401).json({ error: 1, message: 'Email salah atau password salah' });
          }

        try {
            let signed = await new Promise((resolve, reject) => {
                jwt.sign(user, config.secretKey, function(err, token) {
                    if (err) reject(err);
                    resolve(token);
                });
            });

            await User.findByIdAndUpdate(user._id,{$push:{token:signed}});

           
            return res.status(200).json({
                status: 'success',
                message: 'Login berhasil',
                data: {
                    user,
                    token: signed
                }
            });

        } catch (err) {
            return next(err);
        }
    })(req, res, next);
}

const logout = async (req,res,next)=>{
    let token = getToken(req);

    let user = await User.findOneAndUpdate({token: {$in:[token]}},{$pull:{token:token}}, {useFindAndModify:false});

    if(!token||!user){
        res.json({
            error:1,
            message:'No User Found!!'
        });
    }
    return res.status(200).json({
        status: 'success',
        message: 'Logout berhasil',
        data: null
    });
}

const me = (req,res,next)=>{
    if (!req.user) {
        return res.status(401).json({
            status: 'fail',
            message: 'Anda belum login atau token tidak valid',
            data: null
        });
    }

    return res.status(200).json({
        status: 'success',
        message: 'Berhasil mengambil data user',
        data: req.user
    });
}

module.exports = {
    register,
    localStrategy,
    login,
    logout,
    me
}