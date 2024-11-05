const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNumber: { type: Number, unique: true, required: true },
    department: { type: String, enum: ["IT", "CSE", "ECE", "CE"], required: true },
    semester: { type: Number, min: 1, max: 8, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);