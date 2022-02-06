const router = require('express').Router()
const Exercises = require('../models/exercise.model')

router.route('/').get((req,res)=>{
    console.log("Get exercise API hit")

    Exercises.find()
    .then(exs=> {res.json(exs)})
    .catch(err => {res.json(err)})
})

router.route('/add').post((req,res)=>{
    console.log("Add exercise API hit")
    console.log(req)
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)

    const newex = new Exercises({username,description,duration,date})

    newex.save()
    .then(exs => { res.json('New Exercise is added')})
    .catch(err => {res.status(400).json(err)})
})

router.route('/:id').delete( (req,res)=>{

    console.log("Delete exercise API hit")

    const deletedex = async ()=>{
        
        const result = await Exercises.findByIdAndDelete(req.params.id)

        console.log(result)
        res.json(result)
    
    }
    deletedex()
})

router.route('/:id').get( (req,res) =>{
    console.log("Get Id API hit")

    const getex = async ()=>{

        const result = await Exercises.findById(req.params.id);

        console.log(result)
        res.json(result)
    }

    getex()    
})

router.route('/:id').post( async (req,res)=>{
    console.log("Update Ex API hit")
    console.log(req.body)
    console.log(req.params.id)
    
 

        const user = await Exercises.findById(req.params.id);
        console.log(user)
        user.username = req.body.username
        user.description = req.body.description
        user.duration = Number(req.body.duration)
        user.date = Date.parse(req.body.date)

        const result = await user.save();
        res.json(result.data)

})

module.exports = router