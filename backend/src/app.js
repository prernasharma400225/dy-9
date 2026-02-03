const express = require("express")
const noteModel =  require("./models/note.model")
const cors = require("cors")



const app = express()
app.use(cors())
app.use(express.json())


/**
 * - post / api/notes
 * - create new note and save data in mongodb
 * - req.body = {title, description}
 */


app.post('/api/notes', async (req,res) => {
    const { title, description } = req.body 

    const note = await noteModel.create({ 
        title, description 
    })

    res.status(201) .json({
        message:"note created successfully",
    })
})



/**
 * - GEt/ api/notes
 * - fetch all the nootes data from mongodb and send them in the response
*/
app.get("/api/notes",async (req, res) => {
    const notes = await noteModel.find()  //array of object k form k rhata h data

    res.status(200).json({
        message: "notes fetched successfully",
        notes
    })
})


/**
 * - delete /api/notes/:id
 * - delete note with the id from req.params
 */
app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully",
    })
})

/**
 * - patch /api/notes/:id
 * - update note with the id from req.params
 * - req.body = {title, description}
 */

app.patch('/api/notes/:id', async (req,res) => {
    const id = req.params.id
    const { description } = req.body

    await noteModel.findByIdAndUpdate(id, { description })

    res.status(200).json({
        message: "notes updated successfully",
    })
})


module.exports = app