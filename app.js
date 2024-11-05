const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/student'); // import Student model

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("MongoDB connection error:", err));


app.post('/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/students', async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).send(students);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).send();
        res.status(200).send(student);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.put('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!student) return res.status(404).send();
        res.send(student);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).send();
        res.send(student);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});