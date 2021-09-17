const express = require('express'); 
const router = express.Router(); 
const auth = require('../../midlware/auth'); 
const Profile = require('../../modules/Profile'); 

router.get('/me',auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
        if(!profile){
            
           return  res.status(400).json({msg:'there is no profile'})
        }; 

        res.json(profile); 
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server crached'); 
    }

}); 


module.exports = router;  