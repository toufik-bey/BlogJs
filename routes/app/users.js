const express = require('express'); 
const router = express.Router(); 
const { check, validationResult} = require('express-validator/check');
const User = require('../../modules/User');
const gravatar = require('gravatar'); 
const jwt = require('jsonwebtoken'); 
const config = require('config'); 
// User registration 

router.post('/',[
    check('name','Name is required')
    .not()
    .isEmpty(),
    check('email','please enter a correct email')
    .isEmail(),
    check('password','please enter a password with 6 or more characters')
    .isLength({min:6})
],
async (req,res)=>{
     const errors = validationResult(req); 
     if(!errors.isEmpty()){
         return res.status(400).json({errors : errors.array()}); 
        }
    const { name , email , password} = req.body; 

    try {
        let user = await User.findOne({email}); 
        if(user) {
            res.status(400).json({errors:[{msg:'User already exist'}]}); 
        }; 
        const avatar  = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        })

         user = new User({
            name,
            email,
            avatar,
            password
        }); 

        await user.save(); 
        // create a paylod 
        const paylod = {
            user:{
                id: user.id
            }
        }; 
        // jwt sign 
        jwt.sign(
            paylod,
            config.get('jwtSecret'),
            (err, token)=>{
                if(err) throw err;
                res.json({token}); 
            }
            ); 
            console.log(req.body); 
    } catch (error) {
        console.error(error.message)
    }


  
});


module.exports = router;  
