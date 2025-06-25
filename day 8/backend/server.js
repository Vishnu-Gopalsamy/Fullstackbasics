import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import {connectDB} from './config/db.js'
import mongoose from 'mongoose'
import User from './model/user.js'

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// custom middleware
const methodFind = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
}
app.use(methodFind)

// Get all users
app.get('/get', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Create a new user
app.post('/post', async (req, res) => {
    try {
        const newUser = new User(req.body)
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(401).json(error)
    }
})

// Update a user by ID
app.put('/put/:id', async (req, res) => {
    try {
        const update = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(update)
    } catch (error) {
        res.status(400).json(error)
    }
})

// Patch route (example)
app.patch('/patch', (req, res) => {
    res.send('from patch')
})

// Delete a user by ID
app.delete('/delete/:id', async (req, res) => {
    try {
        const del = await User.findByIdAndDelete(req.params.id)
        res.json(del)
    } catch (error) {
        res.status(400).json(error)
    }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})