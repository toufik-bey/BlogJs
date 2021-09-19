const express = require('express'); 
const router = express.Router(); 
const auth = require('../../midlware/auth'); 
const Profile = require('../../modules/Profile'); 
const { check, validationResult} = require('express-validator/check');

//get profile of the curent user
//privat route
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

//add a profile 
//private route

router.post('/',[auth,[
check('skilles','skilles are required').not().isEmpty(),
check('status','status is required').not().isEmpty(),
]],
 async(req,res)=>{
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
         return res.status(400).json({msg:errors.array()})
    }; 

    

		const {
			company,
			location,
			website,
			bio,
			skills,
			status,
			githubusername,
			youtube,
			twitter,
			instagram,
			linkedin,
			facebook
		} = req.body;

		//Build profile object
		const profileFields = {};
		profileFields.user = req.user;
		if (company) profileFields.company = company;
		if (location) profileFields.location = location;
		if (website) profileFields.website = website;
		if (bio) profileFields.bio = bio;
		if (skills) {
			profileFields.skills = skills.split(',').map(skill => skill.trim());
		}
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;

		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (instagram) profileFields.social.instagram = instagram;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (facebook) profileFields.social.facebook = facebook;


    try {
        const profile = await Profile.findOne({user:req.user.id}); 
        
        if(profile){
            profile = await Profile.findOneAndUpdate(
                { user: req.user },
                { $set: profileFields },
                { new: true }
            );

            return res.json(profile);
        }; 

        profile = new Profile(profileFields); 
        await profile.save(); 

    res.json(profile); 

    } catch (error) {
        console.error(error.message)
        res.status(500).send('server crached'); 
    }
})

// @ DElete profile ,user and post
// @ Private 

router.delete('/',auth,async(req,res)=>{
	try {

		// Delete the profile 
		await Profile.findOneAndDelete({user: req.user.id}); 
		// Delete the user 
		await User.findOneAndDelete({_id: req.user.id}); 

		res.json({msg:'user deleted'}); 



	} catch (error) {
		console.error(error.message); 
		res.status(500).send('server crached')
	}
})

// @route    api/profile/exprience
// @descrpt  add expreince to the profile
// @access   private

router.put('/expreince',[auth,[
	check('title','title is required').not().isEmpty(),
	check('company','company is required').not().isEmpty(),
	check('from', 'the date is required').not().isEmpty(),
]],

async(req,res)=>{

	const errors = validationResult(req); 
	if(!errors.isEmpty()){
	  return	res.status(400).json({errors: errors.array()})
	}
	const {
		title,
		company,
		location,
		from,
		to,
		current,
		description
	} = req.body; 

	const newExprience = {
		title,
		company,
		location,
		from,
		to,
		current,
		description
	};

	try {

		const profile = await Profile.findOne({user: req.user.id}); 
		profile.experience.unshift(newExprience); 
		await profile.save(); 

		res.json(profile)
		
	} catch (error) {
		console.error(error.message); 
		res.status(500).send('server error'); 
	}
}

)


module.exports = router;  