import express from 'express'
// import {updateMood} from "./db";
import {getMoods, addMood,updateMood, deleteMood} from './db.js'
// const cors = require('cors');
// const mysqlDB = require('./db')
// import {getMoods, addMood} from './db';


const app = express();
app.use(express.json());

// app.use(cors({
//     // origin: 'http://localhost:8080'
// }));




// app.get("/", (req, res)=>{
//     // res.send("hi")
// })

//with every change in code  the dist has to get rebuild
app.use(express.static('dist'))





app.get("/api/moods", async(req, res)=>{
    console.log("before requestingto db ")

    let moods = await getMoods()
    console.log("After requesting to db ")

    res.send(moods)
})



app.post("/api/moods", async(req, res)=>{
    let note = req.body.newMood.moodText
    let rating = req.body.newMood.moodRating
    let timestamp = Date.now()

    // console.log(note, timestamp, rating)
    let newMood = await addMood(note, timestamp, rating)

})



app.put("/api/moods", async(req, res)=> {
    // console.log(req.body.editedMood)

    let moodId= req.body.editedMood.id
    let note = req.body.editedMood.moodText
    let rating= req.body.editedMood.moodRating

    let  updatedMood = await updateMood(moodId,note, rating)
})





app.delete("/api/moods/:id", async(req, res)=>{

    let moodId = req.params.id
    let  deletedMood = await deleteMood(moodId)
    // res.redirect("")
})







app.use((err,req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('something broke!')

})

app.listen(process.env.PORT || 8080,()=>{
    console.log('Server is running on port', process.env.PORT | 8080)
})