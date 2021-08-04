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
router.get('/',auth,async(req, res)=>{
    try {
        const posts = await Poste.find().sort({date:-1})
        res.json(posts)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server crached')
    }
})
router.get('/:id',auth,async(req, res)=>{


    try {
        const post = await Poste.findById(req.params.id); 
        if(!post){
            return res.status(404).json({msg:'post not found'})
        }
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server crached')
    }
})

router.delete('/:id', auth ,async(req,res)=>{
      try {
          const post = await Post.findById(req.params.id); 

          // check user
          if(post.user.toString()!==req.params.id){
            res.status(401).json({msg:'User not authorised'})
          }
          await post.remove();
          res.json({msg:'message removed'}); 

      } catch (error) {
           
        console.error(error.message); 
        res.status(500).send('server crached'); 
          
      }
    
})

module.exports = router;  