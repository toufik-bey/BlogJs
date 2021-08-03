const express = require('express'); 
const router = express.Router(); 
const auth = require('../../midlware/auth'); 
const jwt = require('jsonwebtoken'); 
const config = require('config'); 
const { check, validationResult} = require('express-validator/check');

router.get('/',auth ,  (req, res) => res.send('auth route')); 


router.post('/',[
    check('email','please enter a correct email')
    .isEmail(),
    check('password').exists()
],
async (req,res)=>{
     const errors = validationResult(req); 
     if(!errors.isEmpty()){
         return res.status(400).json({errors : errors.array()}); 
        }
    const { email , password} = req.body; 

    try {
        let user = await User.findOne({email}); 
        if( !user) {
            res.status(400).json({errors:[{msg:'Invalid credential'}]}); 
        }; 
     
        if(!(password == user.password)){
            return  res
            .status(400)
            .json([{msg:'Invalid crednetential'}])
        } 
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
            )
    
        
            console.log(req.body); 
    } catch (error) {
        console.error(error.message); 
        res.status(500).send('server Error'); 
    }


  
});
module.exports = router;  