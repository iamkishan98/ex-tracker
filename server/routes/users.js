const router  = require('express').Router()
const Users = require('../models/user.model')

router.route('/').get((req,res)=>{

    console.log("Get user API hit")


    Users.find()
    .then(users=>{ res.json(users)})
    .catch(err => { res.json(err)})
    
})

router.route('/add').post( (req,res) =>{

    console.log("Add user API hit")
    const username = req.body.username
    
    const newuser = new Users({username})
    newuser.save()
    .then(user => { res.json('User added')})
    .catch(err => { res.status(400).json('User not added, as following error occured: ',err)})

})

module.exports = router