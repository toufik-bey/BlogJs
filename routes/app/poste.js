const express = require('express'); 
const router = express.Router(); 
const Poste = require('../../modules/Poste');
const auth = require ('../../midlware/auth');
const User = require('../../modules/User'); 
const { check, validationResult} = require('express-validator/check');

router.post('/', [auth, [
    check('text', 'text is empty').not().isEmpty
]], async(req , res)=>{

    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }  

 try {
    const user = await User.findById(req.user.id).select('-password'); 
    const poste = new Poste({
        text : req.body,
        name : user.name,
        avatar: user.avatar,
        user: req.user.id
    });
    await poste.save(); 

    
 } catch (error) {
     console.error(error.message);
     res.status(500).send('server crached')
 }
    
    
})

module.exports = router;  