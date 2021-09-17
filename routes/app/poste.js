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
    // add likes 
    // PUT request 
    // Private route 

    router.put('/like/:id', auth , async(req,res)=>{
        try {
            const post = await Post.findById(req.params.id); 
            // check if the user already liked the post 
            if(post.likes.filter(like=>likes.user.toString()===req.user.id).length>0){
                return res.status(400).json({msg:'post already liked'})
            }
            // add the  likes in the likes array 
            post.likes.unshift({user: req.user.id}); 
            await post.save(); 
            res.json(post.likes); 

        } catch (error) {
            console.error(error.message); 
        }
    }); 
}); 
router.put('/unlike/:id', auth , async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id); 
        // check if the user already liked the post 
        if(post.likes.filter(like=>likes.user.toString()===req.user.id).length==0){
            return res.status(400).json({msg:'post has not yet been liked'})
        }
        // remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id); 
        post.likes.splice(removeIndex , 1); 
        await post.save(); 
     
    } catch (error) {
        console.error(error.message); 
    }
}); 

// add comment 
// privet route
// using post 

router.post('/comment/:id', [auth,[
    check('text', 'text is empty').not().isEmpty()
]],
 async(req,res)=>{
   try {
        const errors = validationResult(req); 
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    };

    const user =await User.findById(req.user.id).select('-password');
    const post =await Post.findById(req.params.id); 
    const newComment ={
        text: req.body.text,
        name: user.name, 
        avatar: user.avatar,
        user:  req.user.id
    };
    post.comment.unshift(newComment); 
    await post.save(); 
    
   } catch (error) {
       
    console.error(error.message); 
    res.status(500).send('server crached'); 
      
   }
});
// delete the comment 

router.delete('/comment/:id/:comment_id', auth, async(req, res)=>{
    try {
      const post = await Post.findById(req.params.id); 
      // pull comment
      const comment = post.comments.find(comment => comment.id===req.params.comment_id); 
      // check if the comment exist 
      if(!comment){
          return res.status(404).json({msg:'comment does not exist'});

      }; 

      // check the user

      if(comment.user.toString()!= req.user.id){
        return res.status(404).json({msg:'user  does not exist'});
      }; 

      const removIndex = post.comments.map(comment =>comment.user.toString()).indexOf(req.user.id);
      post.comments.splice(removIndex,1); 
      await post.save(); 

      
    } catch (error) {
        console.error(error.message); 
        res.status(500).send('server crached'); 
          
    }
})

module.exports = router;  